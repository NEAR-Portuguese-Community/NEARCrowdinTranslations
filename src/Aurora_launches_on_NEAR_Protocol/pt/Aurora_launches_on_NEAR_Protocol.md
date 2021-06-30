# Aurora é lançada no Protocolo NEAR

## A Aurora fornece uma experiência de camada 2 da Ethereum

O crescimento explosivo da DeFi e de NFTs frequentemente causa aumentos nos preços de gás da Ethereum - um problema que limita economicamente a participação de muitos usuários, e impede desenvolvedores de dApp escalarem seus negócios até seu potencial máximo. Para enfrentar esses desafios, estamos orgulhosos de anunciar o lançamento na mainnet da **Aurora**, uma solução transformadora para desenvolvedores que buscam extender seus dApps e acessar novos mercados.

Aurora roda no [Protocolo NEAR](https://near.org/) e aproveita dos muitos recursos exclusivos, incluindo fragmentação e remuneração de gás a desenvolvedores. Aurora consiste de dois componentes principais: o runtime **Aurora Engine** (Máquina Aurora), que possibilita deploy de contratos inteligentes escritos em Solidity e Vyper, e a **Aurora Bridge** (baseado na tecnologia da [Rainbow Bridge](https://near.org/bridge)), fornecendo transferência não permissionada de tokens e dados entre Ethereum e Aurora.

Aurora fornece um número de melhorias para os desenvolvedores:

1. As taxas são 1000x inferiores às da Ethereum. Pro exemplo, transferência de um token ERC-20 custa menos de $0.01, enquanto na Ethereum (em 50 Gwei e com preço de ETH a $3000), é aproximadamente $5.40.
2. Aurora é capaz de suportar milhares de transações por segundo, representando um aumento de 50x comparado a Ethereum 1.0.
3. A "finality"(quantia de blocos necessários para validar uma transação) da Aurora herdada do Protocolo NEAR, dois blocos no protocolo NEAR, ou aproximadamente dois segundos - substancialmente menor até mesmo que o tempo de confirmação de um único bloco de 13 segundos na rede Ethereum (que não é suficiente para confirmar a transação). Além disso, o "finality" rápido da blockchain NEAR reduz significantemente o risco de ataques frontrunning.
4. O crescimento do ecossistema na Aurora tem visão de futuro: a abordagem nativamente fragmentada do protocolo NEAR provê escala horizontal da EVM, com comunicação assíncrona entre vários fragmentos da Aurora.
5. A Aurora oferece uma opção mais verde para usuários Ethereum: total compatibilidade não comprometedora com Ethereum em cima de um protocolo de primeira camada (L1) descentralizado, neutro para o clima e baseado em Proof-of-Stake, o Protocolo NEAR.
6. Aurora resolve problemas computacionais atuais e futuros do ecossistema Ethereum, preservando o investimento de engenharia tanto nos contratos inteligentes como no front-end.

## Arquitetura da Aurora

**Aurora é implementada como um contrato inteligente** na blockchain NEAR. O que isso significa?

1. Aurora pode se beneficiar de todas as vantagens da blockchain NEAR, atuais e futuras
2. Simplificação da manutenção em fase inicial, atualização, e governança da Aurora, permitindo tempo de resposta rápido em caso de de emergência, tal como descoberta de vulnerabilidades.
3. Logo após o lançamento, o plano é fazer uso da versão 2 do SputnikDAO, um framework NEAR customizável de governança baseado em DAO, para lançar a AuroraDAO para governança do ecossistema.

A arquitetura atual da Aurora é a seguinte:

O contrato inteligente da Aurora implementa duas principais interfaces: Execução e Token. A interface de Execução permite aos usuários enviar transações comuns da Ethereum (por exemplo, criadas com MetaMask, [ethers.js](https://docs.ethers.io/v5/) ou [web3.py](https://web3py.readthedocs.io/en/stable/)). Por baixo, essas transações são decodificadas (RLP), verificadas (secp256k1), e executadas no ambiente em tempo de execução da EVM ([SputnikVM](https://github.com/rust-blockchain/evm)).

Algumas operações permitidas na runtime EVM podem ser movidas para o nível do Protocolo NEAR (tornando-se pré-compilações) no caso de um contrato inteligente não entregar o desempenho pretendido. Por exemplo, está programada uma atualização no protocolo NEAR, que incluirá uma [API estendida de Matemática](https://github.com/near/nearcore/pull/3954).

Aurora também permite tokens não permicionados atravessarem a ponte. Ela usa a tecnologia da Rainbow Bridge para transferência de Ethereum e transferência interna de token NEAR para possibilitar ativos nativos NEAR serem transferidos para Aurora. Assim, Aurora torna-se um ponto de conexão para as economias Ethereum e NEAR.

No caso de necessidade de pré-compilação adicional, será proposta uma atualização do protocolo aos validadores NEAR. As informações necessárias das pré-compilações serão coletadas assim que forem realizados testes de carga suficientes.

De acordo com o resultado [das discussões](https://gov.near.org/t/evm-runtime-base-token/340/38) sobre o token base da Aurora, a EVM vai manter, em tempo de execução, os saldos nativos em Ether (ETH). Isto significa que um usuário deve mover seu ETH através da Aurora Bridge antes de enviar quaisquer outras transações.

Para não confundir os usuários, o time decidiu que o contrato da Aurora irá implementar uma interface de token fungível, que representará o saldo ETH do usuário, tanto em tempo de execução da NEAR quanto da Aurora. Usuários devem ser capazes de retirar e depositar de ETH para NEAR, e isso vai ser implementado como uma interface [conectora da ponte](https://github.com/aurora-is-near/eth-connector), que embaixo falará com [os contratos principais da ponte](https://github.com/aurora-is-near/rainbow-bridge). Isso tornou-se possível devido a natureza extensível do protocolo da Rainbow Bridge (veja mais sobre a arquitetura [aqui](https://near.org/blog/eth-near-rainbow-bridge/)).

Os códigos do contrato inteligente da Aurora e das ferramentas adjacentes podem ser encontrados na [organização Aurora no Github](https://github.com/aurora-is-near).

## Usando ETH para pagar taxas de gás na Aurora

Uma das decisões mais notáveis de design é o uso de ETH como moeda base dentro da Aurora, para o pagamento das taxas de transação. Ao contrario de grande parte da layer 2 da Ethereum que exige que seus usuários e desenvolvedores adquiram os tokens nativos da L2, Aurora quer oferecer uma experiência direta e ininterrupta para usuários e desenvolvedores da comunidade Ethereum.

A abordagem é a seguinte:

1. Para pegar o preço de gás ETH no runtime Aurora, um endpoint JSON-RPC padrão é usado, o `eth_gasPrice`. O valor retornado será usado no futuro pagamento de ETH para o nó RPC (veja o passo 6).
2. O usuário assina uma transação comum da Ethereum usando uma de suas ferramentas familiares (MetaMask, carteiras compatíveis com Wallet Connect, CLI, JS libraries, etc.) e a manda para o RPC.
3. O RPC converte a transação em uma transação NEAR e a manda para o contrato da Aurora.
4. A nível de protocolo, a assinatura RPC é verificada e a transação Ethereum inicial é passada para o contrato Aurora Engine.
5. O contrato Aurora Engine analisa a transação Ethereum e a executa, calculando o uso de gás da EVM no caminho. No final da execução da transação Ethereum, algum gás NEAR já foi queimado (de acordo com as regras do Protocolo NEAR), enquanto o gás ETH é somente um número calculado no contrato Aurora.
6. Para pagar a taxa de gás NEAR, ETH é usado: o contrato Aurora calcula a taxa de transação e a transfere da conta do usuário para a conta do RPC.

Esta abordagem é vista do lado do usuário como somente pagar ETH para o protocolo, enquanto, na verdade o token $NEAR é usado para pagamento das taxas, e os nós RPC atuam como proxies/retransmissão entre o usuário e a blockchain NEAR.

Como primeiro passo, o RPC deve fornecer o preço em gás ETH que será suficiente para o pagamento do serviço de transmissão. Além disso, baseado nas respostas de vários nós RPC, usuários seriam capazes de decidir qual usar. No futuro, serviços de retransmissão podem ser estruturados de forma semelhante ao [OpenGSN](https://opengsn.org/).

Encontre mais informações sobre ETH como token base [nessa discussão do fórum de governança](https://gov.near.org/t/evm-runtime-base-token/340/38).

## Roteiro da Aurora

Além dos consertos rápidos na Aurora depois do lançamento, o time tem os seguintes marcos importantes em mente:

* Verão de 2021 (no hemisfério norte):
  * **Descomprometendo a compatibilidade com Ethereum.** No momento há várias atualizações menores no protocolo NEAR que serão incluídas na próxima atualização do protocolo de modo a permitir que a Aurora alcance 100% de compatibilidade com a rede Ethereum 1.0.
  * **Formação da DAO.** Acreditamos que o único caminho a seguir em projetos como o Aurora é implementar uma abordagem de governança e atualização verdadeiramente descentralizada. Assim, estabeleceremos uma DAO para governar a Aurora.
  * **[Potential] Criação de token.** Uma vez que a DAO se forme, haverá uma decisão sobre a criação de um token Aurora. As discussões vão ocorrer durante o verão.
* Outono de 2021 (no hemisfério norte):
  * **Transferências rápidas de tokens.** Devido às limitações da blockchain Ethereum (taxas de transação elevadas, finalização lenta das transações e a ausência de [EIP-665](https://eips.ethereum.org/EIPS/eip-665)), atualmente as transferências através da Rainbow Bridge na direção da Ethereum são lentas: uma transferência da NEAR para a Ethereum pode levar até 16 horas. Vamos resolver este problema para as transferências de tokens fungíveis.
  * **Experiência simplificada "Escondendo a Blockchain".** O modelo avançado de conta do protocolo NEAR permite uma interação perfeita com a blockchain, mesmo para usuários que não estejam familiarizados com elementos da cripto UX, como carteiras e software adicional. Na verdade, há uma maneira de esconder completamente do usuário final os detalhes relacionados à blockchain. Pretendemos introduzir à Aurora uma lógica semelhante.
  * **Taxa de gás denominada em ERC-20s.** A forma de funcionamento da Aurora RPC nos dá a habilidade de propor naturalmente ao usuário o pagamento da taxa de transação com qualquer token ERC-20. Em outras palavras, os usuários poderiam pagar suas taxas de transação em USDT ou DAI.
* 2022:
  * **Escalonamento horizontal.** A principal característica do protocolo NEAR é o sharding e a capacidade de escalar dinamicamente a blockchain. Nosso objetivo final é oferecer esta funcionalidade ao ecossistema Ethereum habilitando o sharding na Aurora.

## Experimente Hoje a Aurora

Com custos baixos, a melhor finalização de transações e escalabilidade, a Aurora redefine o que é possível no ecossistema Ethereum, enquanto também expande o ecossistema NEAR para dar boas-vindas e acomodar aplicações baseadas na EVM.

Com a Aurora, os usuários da Ethereum podem trabalhar com aplicativos familiares, beneficiando-se da eficiência da NEAR; como o custo de transação é várias ordens de magnitude mais barato do que o da Ethereum, a Aurora remove uma grande barreira financeira à entrada dos utilizadores e dos desenvolvedores, especialmente os recém-chegados ao ecossistema. Nosso objetivo é criar um futuro interoperável onde haja pontes nas lacunas entre blockchains, desenvolvedores e usuários. A Aurora faz exatamente isso ao possibilitar uma experiência de usuário perfeita e permitir que os ativos passem ininterruptos entre as blockchains Ethereum e NEAR. A fusão das economias criptográficas pode facilitar o desenvolvimento de comunidades criadoras que popularizarão essa tecnologia.

Aurora é totalmente compatível com a Ethereum 1.0, incluindo as taxas de base pagas em ETH e a operabilidade pronta para o uso com todas as carteiras existentes e outras ferramentas. Para começar a usar a Aurora, visite https://aurora.dev.

—

Junte-se à comunidade Aurora através do grupo oficial do [Telegram](https://t.me/auroraisnear), do grupo do [Telegram para desenvolvedores](https://t.me/auroraisnearsupport), do grupo do [Telegram para ajuda](https://t.me/auroraisnearsupport) e siga o [Twitter](https://twitter.com/auroraisnear).

*Aviso: Este artigo é fornecido apenas para fins informativos. Ele não se destina a ser utilizado como aconselhamento jurídico, fiscal, financeiro ou de qualquer outro tipo.*
