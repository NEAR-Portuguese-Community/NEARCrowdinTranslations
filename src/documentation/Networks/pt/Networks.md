---
id: networks
title: Redes NEAR
sidebar_label: Redes
---

O Protocolo NEAR opera em várias redes cada uma operando com seus próprios validadores independentes e estado único. Estas redes são as seguintes:

* [`mainnet (rede principal)`](/docs/concepts/networks#mainnet)
* [`testnet (rede de testes)`](/docs/concepts/networks#testnet)
* [`betanet (rede beta)`](/docs/concepts/networks#betanet)
* [`localnet (rede local)`](/docs/concepts/networks#localnet)

---


## `mainnet`

A `mainnet` é para contratos inteligentes prontos para produção e transferências de tokens que tem valor. Contratos prontos para `mainnet` devem ter passado por testes rigorosos e reviews de segurança independentes se necessário. `mainnet` é a única rede que o estado é garantido de persistir ao longo do tempo _(sujeito às garantias típicas de segurança do processo de validação da rede)_.

* [ [Status](https://rpc.mainnet.near.org/status) ]
* [ [Explorador](https://explorer.near.org) ]
* [ [Carteira](https://wallet.near.org) ]
* [ [Snapshots de Dados](/docs/develop/node/intro/node-data-snapshots) ]

**Nota: a flag para[ seleção da rede ](/docs/tools/near-cli#network-selection)na `near-cli` é `production`.</p>

---

## `testnet`

A `testnet` é uma rede pública e a última rede de testes para alterações do `nearcore`, antes da implantação na `mainnet`. A `testnet` destina-se a testar todos os aspectos da plataforma NEAR antes da implantação na `mainnet`. Da criação de conta, simulação de transferência de token, ferramentas de desenvolvimento e desenvolvimento de contrato inteligente, o ambiente da `testnet` assemelha-se muito ao comportamento da `mainnet`. Todas as alterações do `nearcore` são implantadas como candidatas de lançamento primeiro na rede de testes, antes de serem lançadas na `mainnet`. Um número de validadores da `testnet` validam transações e criam novos blocos. Os desenvolvedores de dApp lançam suas aplicações na `testnet` antes de implantá-las na `mainnet`. É importante notar que a `testnet` tem suas próprias transações e estados.

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
