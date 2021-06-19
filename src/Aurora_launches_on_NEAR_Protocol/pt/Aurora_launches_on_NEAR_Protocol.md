# Aurora é lançada no Protocolo NEAR

## A Aurora fornece uma experiência de camada 2 da Ethereum

O crescimento explosivo da DeFi e de NFTs frequentemente causa aumentos nos preços de gas da Ethereum - um problema que limita economicamente a participação de muitos usuários, e impede desenvolvedores de dApp escalarem seus negócios até seu potencial máximo. Para enfrentar esses desafios, estamos orgulhosos de anunciar o lançamento na mainnet da **Aurora**, uma solução transformadora para desenvolvedores que buscam extender seus dApps e acessar novos mercados.

Aurora roda no [Protocolo NEAR](https://near.org/) e aproveita dos muitos recursos exclusivos, incluindo fragmentação e remuneração de gas a desenvolvedores. Aurora consiste de dois componentes principais: o runtime **Aurora Engine** (Maquina Aurora), que possibilita deploy de contratos inteligentes escritos em Solidity e Vyper, e a **Aurora Bridge** (baseado na tecnologia da [Rainbow Bridge](https://near.org/bridge)), fornecendo transferência de tokens e dados entre Ethereum e Aurora, sem autoridade.

Aurora fornece um número de melhorias para os desenvolvedores:

1. As tarifas são 1000x inferiores às da Ethereum. Pro exemplo, transferência de um token ERC-20 custa menos de $0.01, enquanto na Ethereum (em 50 Gwei e com preço de ETH a $3000), é aproximadamente $5.40.
2. Aurora é capaz de suportar milhares de transações por segundo, representando um aumento de 50x comparado a Ethereum 1.0.
3. A "finality"(quantia de blocos necessários para validar uma transação) da Aurora herdada do Protocolo NEAR, i.e. dois blocos NEAR, ou aproximadamente dois segundos - substancialmente menor até mesmo que o tempo de confirmação um único bloco de 13 segundos na Ethereum (que não é suficiente para confirmar a transação). Além disso, o "finality" rápido da blockchain NEAR reduz significantemente o risco de ataques frontrunning.
4. O crescimento do ecossistema na Aurora tem visão de futuro: a abordagem nativamente fragmentada do protocolo NEAR provê escala horizontal da EVM, com comunicação assíncrona entre vários fragmentos da Aurora.
5. A Aurora oferece uma opção mais verde para usuários Ethereum; total compatibilidade não comprometedora com Ethereum em cima do descentralizado, climaticamente neutro, baseado em Proof-of-Stake, e L1 Protocolo NEAR.
6. Aurora resolve problemas computacionais atuais e futuros do ecossistema Ethereum, preservando o investimento de engenharia tanto nos contratos inteligentes como no front-end.

## Arquitetura Aurora

**Aurora é implementada como um contrato inteligente** na blockchain NEAR. O que isso significa?

1. Aurora pode se beneficiar de todas as vantagens da blockchain NEAR, atuais e futuras
2. Simplificação da manutenção em fase inicial, atualização, e governança da Aurora, permitindo tempo de resposta rápido em caso de de emergência, tal como descoberta de vulnerabilidades.
3. Logo após o lançamento, o plano é fazer uso da versão 2 do SputnikDAO, um framework NEAR customizável de governança baseado em DAO, para lançar a AuroraDAO para governança do ecossistema.

A arquitetura atual da Aurora é a seguinte:

O contrato inteligente da Aurora implementa duas principais interfaces: Execução e Token. A interface de Execução permite aos usuários enviar transações comuns da Ethereum (por exemplo, criadas com MetaMask, [ethers.js](https://docs.ethers.io/v5/) ou [web3.py](https://web3py.readthedocs.io/en/stable/)). Por baixo, essas transações são decodificadas (RLP), verificadas (secp256k1), e executadas na runtime EVM ([SputnikVM](https://github.com/rust-blockchain/evm)).

Algumas operações permitidas na runtime EVM podem ser movidas para o nível do Protocolo NEAR (tornando-se pré-compilações) no caso de um contrato inteligente não entregar o desempenho pretendido. Por exemplo, existe atualmente uma atualização programada do protocolo NEAR, que incluirá uma [API estendida de Matemática](https://github.com/near/nearcore/pull/3954).

Aurora também permite tokens atravessarem a ponte, em ambiente sem autoridade. Ela usa a tecnologia da Rainbow Bridge para transferência de Ethereum e transferência interna de token NEAR para possibilitar ativos nativos NEAR serem transferidos para Aurora. Assim, Aurora torna-se um ponto de conexão para as economias Ethereum e NEAR.

No caso de necessidade de pré-compilação adicional, será proposta uma atualização do protocolo aos validadores NEAR. As informações necessárias das pré-compilações serão coletadas assim que forem realizados testes de carga suficientes.

De acordo com o resultado [das discussões](https://gov.near.org/t/evm-runtime-base-token/340/38) sobre o token base da Aurora, o runtime EVM vai manter os saldos nativos em Ether (ETH). Isto significa que um usuário deve mover seu ETH através da Aurora Bridge antes de enviar quaisquer outras transações.

Para não confundir os usuários, o time decidiu que o contrato da Aurora irá implementar uma interface de token fungível, que representará o saldo ETH do usuário, tanto no runtime NEAR quanto no runtime Aurora. Usuários devem ser capazes de retirar e depositar de ETH para NEAR, e isso vai ser implementado como uma interface [conectora da ponte](https://github.com/aurora-is-near/eth-connector), que embaixo falará com [os contratos principais da ponte](https://github.com/aurora-is-near/rainbow-bridge). Isso tornou-se possível devido a natureza extensível do protocolo da Rainbow Bridge (veja mais sobre a arquitetura [aqui](https://near.org/blog/eth-near-rainbow-bridge/)).

Os códigos do contrato inteligente da Aurora e das ferramentas adjacentes podem ser encontrados na [organização Aurora no Github](https://github.com/aurora-is-near).

## Usando ETH para pagar taxas de gás na Aurora

Uma das decisões mais notáveis de design é o uso de ETH como moeda base dentro da Aurora, para o pagamento das taxas de transação. Ao contrario de grande parte da layer 2 da Ethereum que exige que seus usuários e desenvolvedores adquiram os tokens nativos da L2, Aurora quer oferecer uma experiência direta e ininterrupta para usuários e desenvolvedores da comunidade Ethereum.

A abordagem é a seguinte:

1. Para pegar o preço de gas ETH no runtime Aurora, um endpoint JSON-RPC padrão é usado, o `eth_gasPrice`. O valor retornado será usado no futuro pagamento de ETH para o nó RPC (veja o passo 6).
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

* Verão de 2021:
  * **Descomprometendo a compatibilidade com Ethereum.** No momento há várias atualizações menores no protocolo NEAR que serão incluídas na próxima atualização do protocolo de modo a permitir que a Aurora alcance 100% de compatibilidade com a rede Ethereum 1.0.
  * **Formação da DAO.** Acreditamos que o único caminho a seguir em projetos como o Aurora é implementar uma abordagem de governança e atualização verdadeiramente descentralizada. Assim, estabeleceremos uma DAO para governar a Aurora.
  * **[Potential] Criação de token.** Uma vez que a DAO se forme, haverá uma decisão sobre a criação de um token Aurora. As discussões vão ocorrer durante o verão.
* Outono de 2021:
  * **Fast token transfers.** Because of the limitations of the Ethereum blockchain (high transaction fees, slow finality of transactions, and the absence of [EIP-665](https://eips.ethereum.org/EIPS/eip-665)), transfers over the Rainbow Bridge in the direction of Ethereum are currently slow: it can take up to 16 hours for a transfer from NEAR to Ethereum. We are going to solve this problem for fungible token transfers.
  * **Simplified “Hide the Blockchain” Experience.** The advanced account model of NEAR Protocol enables seamless interaction with the blockchain even for users who aren’t familiar with crypto UX elements like  wallets and additional software. In fact, there’s a way to completely hide the blockchain details from the end user. We plan to introduce a similar logic to Aurora.
  * **Gas fee denominated in ERC-20s.** The way the Aurora RPC works gives us an ability to naturally propose to the user to pay the transaction fee with any ERC-20 token. In other words, users could pay their transaction fee in USDT or DAI.
* 2022:
  * **Horizontal scaling.** The major feature of the NEAR Protocol is sharding and the ability to dynamically scale the blockchain. Our end goal is to deliver this functionality to the Ethereum ecosystem through enabling sharding for Aurora.

## Try Aurora Today

With low costs, best-in-class transaction finality, and scalability, Aurora redefines what is possible in the Ethereum ecosystem while also expanding NEAR’s ecosystem to welcome and accommodate EVM-based applications.

With Aurora, Ethereum users can work with familiar applications while benefiting from the efficiency of NEAR; as the transaction cost is several orders of magnitude cheaper than that of Ethereum, Aurora removes a steep financial barrier to entry for users and developers––especially newcomers to the ecosystem. Our goal is to create an interoperable future where the gaps between blockchains, developers, and users are bridged. Aurora does just that by allowing for a seamless user experience and allowing assets to pass uninterrupted between the Ethereum and NEAR blockchains. Merging crypto-economies can facilitate the development of creator communities that will bring this technology to the mainstream.

Aurora is fully compatible with Ethereum 1.0, including base fees paid in ETH and out-of-the-box operability with all existing wallets and other tools. To start using Aurora, please visit https://aurora.dev.

—

Join the Aurora community via official [Telegram](https://t.me/auroraisnear) group, [Developer Telegram](https://t.me/auroraisnearsupport) group, [Support Telegram](https://t.me/auroraisnearsupport) group, and follow on [Twitter](https://twitter.com/auroraisnear).

*Disclaimer: This article is provided for informational purposes only. It is not intended to be used as legal, tax, investment, financial, or other advice.*
