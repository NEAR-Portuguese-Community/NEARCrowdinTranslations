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


## `rede principal`

A `mainnet` é para contratos inteligentes prontos para produção e transferências de tokens que tem valor. Contratos prontos para `mainnet` devem ter passado por testes rigorosos e reviews de segurança independentes se necessário. `mainnet` é a única rede que o estado é garantido de persistir ao longo do tempo _(sujeito às garantias típicas de segurança do processo de validação da rede)_.

* [ [Status](https://rpc.mainnet.near.org/status) ]
* [ [Explorador](https://explorer.near.org) ]
* [ [Carteira](https://wallet.near.org) ]
* [ [Snapshots de Dados](/docs/develop/node/intro/node-data-snapshots) ]

**Nota: a flag para[ seleção da rede ](/docs/tools/near-cli#network-selection)na `near-cli` é `production`.</p>

---

## `rede de testes`

A `testnet` é uma rede pública e a última rede de testes para alterações do `nearcore`, antes da implantação na `mainnet`. A `testnet` destina-se a testar todos os aspectos da plataforma NEAR antes da implantação na `mainnet`. Da criação de conta, simulação de transferência de token, ferramentas de desenvolvimento e desenvolvimento de contrato inteligente, o ambiente da `testnet` assemelha-se muito ao comportamento da `mainnet`. Todas as alterações do `nearcore` são implantadas como candidatas de lançamento primeiro na rede de testes, antes de serem lançadas na `mainnet`. Um número de validadores da `testnet` validam transações e criam novos blocos. Os desenvolvedores de dApp lançam suas aplicações na `testnet` antes de implantá-las na `mainnet`. É importante notar que a `testnet` tem suas próprias transações e estados.

* [ [Estado](https://rpc.testnet.near.org/status) ]
* [ [Explorador](https://explorer.testnet.near.org) ]
* [ [Carteira](https://wallet.testnet.near.org) ]
* [ [Snapshots de dados](/docs/develop/node/intro/node-data-snapshots) ]

**Nota:**A flag de [seleção de rede](/docs/tools/near-cli#network-selection) da `near-cli` é `development` _ou_ `testnet`. _(Esta rede é selecionada por padrão com `near-cli` e pode não precisar de uma configuração adicional)_

---

## `rede beta`

A `betanet` é uma rede pública, onde o `nearcore` é executado para testar sua estabilidade e compatibilidade com versões anteriores. Os validadores na `betanet` são participantes do Grupo de Análise da Betanet (Betanet Analysis Group) onde se empenham em discussões ativas, relatam erros e participam da resolução de problemas. Na `betanet` o protocolo muda, existem hard forks automatizados, em que o estado é comprimido em uma nova gênese. Como tal, existe frequentemente uma nova gênese na `betanet`, e não existem snapshots de dados históricos. `betanet` usually has daily releases with protocol features that are not yet stabilized. State is maintained as much as possible but there is no guarantees with its high volatility.

* [ [Estado](https://rpc.betanet.near.org/status) ]
* [ [Explorador](https://explorer.betanet.near.org) ]
* [ [Carteira](https://wallet.betanet.near.org) ]

`near-cli` [network selection](/docs/tools/near-cli#network-selection) variable is `betanet`

---

## `rede local`

`localnet` is intended for developers who want to work with the NEAR platform independent of the public blockchain. You will need to generate nodes yourself. `localnet` gives you the total control over accounts, economics, and other factors for more advanced use cases (including making changes to `nearcore`). For developers, `localnet` is the right choice if you prefer to avoid leaking information about your work during the development process.

More on local development [here](/docs/develop/node/validator/running-a-node)

`near-cli` [network selection](/docs/tools/near-cli#network-selection) variable is `local`

---
> Got a question?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol">
  <h8>Ask it on StackOverflow!</h8>
</a>
