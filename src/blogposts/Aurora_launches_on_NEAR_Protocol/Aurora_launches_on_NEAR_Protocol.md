# Aurora launches on NEAR Protocol

## Aurora Provides an Ethereum Layer-2 Experience

The explosive growth of DeFi and NFTs frequently causes surges in Ethereum gas prices––a problem that economically limits the participation of many users, and prevents dApp developers from scaling their businesses to their full potential. To address these challenges, we’re proud to announce the mainnet release of **Aurora**, a turnkey solution for developers seeking to extend their dApps to reach additional markets.

Aurora runs on [NEAR Protocol](https://near.org/) and takes advantage of its many unique features, including sharding and developer gas fee remuneration. Aurora consists of two core components: the **Aurora Engine** runtime, which allows for the seamless deployment of Solidity and Vyper smart contracts, and the **Aurora Bridge** (based on the [Rainbow Bridge](https://near.org/bridge) technology), providing for the permissionless transfer of tokens and data between Ethereum and Aurora.

Aurora provides a number of enhancements for developers:

1. Aurora fees are up to 1,000x lower than Ethereum’s. For example, the cost of transferring a ERC-20 token is below $0.01, while for Ethereum (at 50 Gwei and an ETH price of $3,000), it’s around $5.40.
2. Aurora is able to host thousands of transactions per second, representing an increase of 50x compared to Ethereum 1.0.
3. Aurora transaction finality inherits from the underlying NEAR Protocol, i.e. two NEAR blocks, or approximately two seconds—substantially lower even than a single block confirmation time of 13 seconds in Ethereum (which is not enough for transaction finality). Also, fast finality of NEAR blockchain reduces significantly the risk of frontrunning attacks.
4. Ecosystem growth on Aurora is future-proof: the sharding approach of the underlying NEAR Protocol provides for horizontal EVM scaling, with asynchronous communication between multiple Aurora shards.
5. Aurora offers a greener option for Ethereum users: full, uncompromising Ethereum compatibility on top of the decentralised and climate-neutral Proof-of-Stake L1 NEAR Protocol.
6. Aurora solves the current and future computational challenges of the Ethereum ecosystem, while preserving the existing engineering investment in both smart contracts and front-end code.

## Aurora architecture

**Aurora is implemented as a smart contract** on the NEAR blockchain. What does this mean?

1. Aurora can benefit from all current and future advantages of NEAR blockchain
2. Simplification of the early-stage maintenance, upgrade, and governance of Aurora, enabling rapid response times in case of emergency such as the discovery of security vulnerabilities.
3. Soon after launch, the plan is to make use of SputnikDAO version 2, a customizable DAO-based governance framework on NEAR, to launch AuroraDAO for ecosystem governance.

The current architecture of Aurora looks as follows:

The Aurora smart contract implements two main interfaces: Execution and Token. The Execution interface allows users to send ordinary Ethereum transactions (for example, created with MetaMask, [ethers.js](https://docs.ethers.io/v5/) or [web3.py](https://web3py.readthedocs.io/en/stable/)). Underneath, these transactions get decoded (RLP), verified (secp256k1), and executed in the EVM runtime ([Sputnik VM](https://github.com/rust-blockchain/evm)).

Some operations allowed in the EVM runtime may be moved to the NEAR Protocol level (and thus become precompiles) in case a smart contract does not deliver the target performance. For example, there is currently a scheduled NEAR Protocol upgrade, which will include an [extended Math API](https://github.com/near/nearcore/pull/3954).

Aurora also allows for permissionless token bridging. It uses the Rainbow Bridge technology for transfers from Ethereum and internal NEAR token transfers to allow for NEAR-native assets to be transferred to Aurora. Thus Aurora becomes a point of connection for Ethereum and NEAR economies.

In case of the need for additional precompiles, a protocol upgrade will be proposed to NEAR validators. The information on the required precompiles will be collected once sufficient load testing has been performed.

As per the outcome of [the discussion](https://gov.near.org/t/evm-runtime-base-token/340/38) on the Aurora base token, the EVM runtime will maintain native balances in Ether (ETH). This means that a user should move their ETH over the Aurora Bridge before sending any other transactions.

In order not to confuse users, the team decided that the Aurora contract will implement a fungible token interface, which will represent the user’s ETH balance in both the NEAR base runtime and the Aurora runtime. Users should be able to withdraw and deposit ETH to NEAR, and this will be implemented as [a separate bridge connector](https://github.com/aurora-is-near/eth-connector) interface, which underneath will speak to [the core bridge contracts](https://github.com/aurora-is-near/rainbow-bridge). This became possible due to the extensible and permissionless nature of the Rainbow Bridge protocol (see more on the bridge architecture [here](https://near.org/blog/eth-near-rainbow-bridge/)).

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
