# Aurora lançada no Protocolo NEAR

## A Aurora fornece uma experiência de camada 2 da Ethereum

O crescimento explosivo da DeFi e de NFTs frequentemente causa aumentos nos preços de gas da Ethereum - um problema que limita economicamente a participação de muitos usuários, e impede desenvolvedores de dApp escalarem seus negócios até seu potencial máximo. Para enfrentar esses desafios, estamos orgulhosos de anunciar o lançamento na mainnet da **Aurora**, uma solução transformadora para desenvolvedores que buscam extender seus dApps e acessar novos mercados.

Aurora roda no [Protocolo NEAR](https://near.org/) e aproveita dos muitos recursos exclusivos, incluindo fragmentação e remuneração de gas a desenvolvedores. Aurora consiste de dois componentes principais: o runtime **Aurora Engine** (Maquina Aurora), que possibilita deploy de contratos inteligentes escritos em Solidity e Vyper, e a **Aurora Bridge** (baseado na tecnologia da [Rainbow Bridge](https://near.org/bridge)), fornecendo transferência de tokens e dados entre Ethereum e Aurora, sem autoridade.

Aurora fornece um número de melhorias para desenvolvedores:

1. As tarifas são 1000x inferiores às da Ethereum. Pro exemplo, transferência de um token ERC-20 custa menos de $0.01, enquanto na Ethereum (em 50 Gwei e com preço de ETH a $3000), é aproximadamente $5.40.
2. Aurora é capaz de suportar milhares de transações por segundo, representando um aumento de 50x comparado a Ethereum 1.0.
3. A "finality"(quantia de blocos necessários para validar uma transação) da Aurora herdada do Protocolo NEAR, i.e. dois blocos NEAR, ou aproximadamente dois segundos - substancialmente menor até mesmo que o tempo de confirmação um único bloco de 13 segundos na Ethereum (que não é suficiente para confirmar a transação). Além disso, o "finality" rápido da blockchain NEAR reduz significantemente o risco de ataques frontrunning.
4. Ecosystem growth on Aurora is future-proof: the sharding approach of the underlying NEAR Protocol provides for horizontal EVM scaling, with asynchronous communication between multiple Aurora shards.
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

Para não confundir os usuários, o time decidiu que o contrato da Aurora irá implementar uma interface de token fungível, que representará o saldo ETH do usuário, tanto no runtime NEAR quanto no runtime Aurora. Usuários devem ser capazes de retirar e depositar de ETH para NEAR, e isso vai ser implementado como uma interface [conectora da ponte](https://github.com/aurora-is-near/eth-connector), que embaixo falará com [os contratos principais da ponte](https://github.com/aurora-is-near/rainbow-bridge). This became possible due to the extensible and permissionless nature of the Rainbow Bridge protocol (see more on the bridge architecture [here](https://near.org/blog/eth-near-rainbow-bridge/)).

The code for the Aurora contract and adjacent tools can be found in [the Aurora organisation on Github](https://github.com/aurora-is-near).

## Using ETH to pay for gas fees on Aurora

One of the most notable design decisions is the use of ETH as the base currency within Aurora, for the payment of transaction fees. While a lot of the Ethereum layer 2s require users and developers to acquire the L2’s native tokens, Aurora wants to offer a straightforward, seamless experience for users and developers from the Ethereum community.

The approach is the following:

1. To understand the ETH gas price in the Aurora runtime, a standard JSON-RPC endpoint `eth_gasPrice` is used. The returned value will be used for the future ETH payment to the RPC node (see step 6).
2. A user signs an ordinary Ethereum transaction with their familiar tools (MetaMask, Wallet Connect compatible wallet, CLI, JS libraries, etc.) and sends it to the RPC.
3. The RPC wraps the Ethereum transaction into a NEAR transaction and sends it to the Aurora contract.
4. On the protocol level, the RPC signature is verified and the initial Ethereum transaction is passed to the Aurora Engine contract.
5. The Aurora Engine contract parses the Ethereum transaction and executes it, calculating the EVM gas usage on the way. By the end of the Ethereum transaction execution, some NEAR gas is already burned (according to the rules of NEAR Protocol), while ETH gas is just a calculated number in the Aurora contract.
6. In order to pay for the NEAR gas fee, ETH is used: the Aurora contract calculates the transaction fee and transfers it from the user account to the RPC account.

This approach is viewed from the user side as just paying ETH to the protocol, while in fact it is the $NEAR token which is used for the fees, and RPC nodes acting as proxies/relayers between the user and the NEAR blockchain.

As the first step, the RPC would be able to provide the ETH gas price that will be sufficient for paying for the relaying service. Moreover, based on the responses from the multiple RPC nodes, users would be able to decide which one to use. In the future, relaying services may be structured similarly to [OpenGSN](https://opengsn.org/).

Find more information on ETH as the base token in [this governance forum discussion](https://gov.near.org/t/evm-runtime-base-token/340/38).

## Aurora Roadmap

Besides hotfixing Aurora after its release, the team has the following major milestones in mind:

* Summer 2021:
  * **Uncompromising Ethereum compatibility.** At the moment there are several minor updates to the NEAR Protocol that are going to be included in the next protocol upgrade, so as to enable Aurora to achieve 100% compatibility with Ethereum 1.0.
  * **DAO formation.** We believe that the only way forward with projects like Aurora is to implement a truly decentralised governance and upgradability approach. Accordingly, we’re going to establish a DAO to govern Aurora.
  * **[Potential] token inception.** Once the DAO forms, there will be a decision regarding the creation of an Aurora token. Discussions will happen over the summer.
* Autumn 2021:
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
