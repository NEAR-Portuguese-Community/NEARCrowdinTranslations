---
id: networks
title: Redes NEAR
sidebar_label: Redes
---

O Protocolo NEAR opera em várias redes cada uma operando com seus próprios validadores independentes e estado único. Estas redes são as seguintes:

* [`mainnet (rede principal)`](/docs/concepts/networks#mainnet)
* [`testnet (rede teste)`](/docs/concepts/networks#testnet)
* [`betanet (rede beta)`](/docs/concepts/networks#betanet)
* [`localnet (rede local)`](/docs/concepts/networks#localnet)

---


## `mainnet`

`mainnet` é para contratos inteligentes prontos para produção e transferências de tokens que tem valor. Contratos prontos para `mainnet` devem ter passado por testes rigorosos e reviews de segurança independentes se necessário. `mainnet` é a única rede que o estado é garantido de persistir ao longo do tempo _(sujeito às garantias típicas de segurança do processo de validação da rede)_.

* [ [Status](https://rpc.mainnet.near.org/status) ]
* [ [Explorador](https://explorer.near.org) ]
* [ [Carteira](https://wallet.near.org) ]
* [ [Snapshots de Dados](/docs/develop/node/intro/node-data-snapshots) ]

**Nota: a flag para[ seleção da rede ](/docs/tools/near-cli#network-selection)na `near-cli` é `production`.</p>

---

## `testnet`

`testnet` is a public network and the final testing network for `nearcore` changes before deployment to `mainnet`. `testnet` is intended for testing all aspects of the NEAR platform prior to `mainnet` deployment. From account creation, mock token transfers, development tooling, and smart contract development, the `testnet` environment closely resembles `mainnet` behavior. All `nearcore` changes are deployed as release candidates on first testnet, before the changes are released on `mainnet`. A number of `testnet` validators validate transactions and create new blocks. dApp developers deploy their applications on `testnet` before deploying on `mainnet`. It is important to note that `testnet` has its own transactions and states.

* [ [Status](https://rpc.testnet.near.org/status) ]
* [ [Explorer](https://explorer.testnet.near.org) ]
* [ [Wallet](https://wallet.testnet.near.org) ]
* [ [Data Snapshots](/docs/develop/node/intro/node-data-snapshots) ]

**Note:** `near-cli` [network selection](/docs/tools/near-cli#network-selection) flag is `development` _or_ `testnet`. _(This network is selected by default with `near-cli` and may not need additional configuration)_

---

## `betanet`

`betanet` is a public network, where `nearcore` is run to test its stability and backward compatibility. Validators on `betanet` are participants in the Betanet Analysis Group, where they engage in active discussions, submit bug reports, and participate in issue resolution. On `betanet` protocol changes, there are automated hard forks, where the state is compressed into a new genesis. As such, new genesis exists frequently on `betanet`, and there are no historical data snapshots. `betanet` usually has daily releases with protocol features that are not yet stabilized. State is maintained as much as possible but there is no guarantees with its high volatility.

* [ [Status](https://rpc.betanet.near.org/status) ]
* [ [Explorer](https://explorer.betanet.near.org) ]
* [ [Wallet](https://wallet.betanet.near.org) ]

`near-cli` [network selection](/docs/tools/near-cli#network-selection) variable is `betanet`

---

## `localnet`

`localnet` is intended for developers who want to work with the NEAR platform independent of the public blockchain. You will need to generate nodes yourself. `localnet` gives you the total control over accounts, economics, and other factors for more advanced use cases (including making changes to `nearcore`). For developers, `localnet` is the right choice if you prefer to avoid leaking information about your work during the development process.

More on local development [here](/docs/develop/node/validator/running-a-node)

`near-cli` [network selection](/docs/tools/near-cli#network-selection) variable is `local`

---
> Got a question?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol">
  <h8>Ask it on StackOverflow!</h8>
</a>
