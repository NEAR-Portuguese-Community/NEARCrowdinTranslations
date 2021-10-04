---
id: epoch
title: Época (Epoch)
sidebar_label: Época (Epoch)
---

> Uma **época (epoch)** é uma unidade de tempo durante a qual os validadores permanecem constantes.

- Tanto a `testnet` quanto a `mainnet` têm uma época que dura ~12 horas ou 43.200 segundos para ser exato.
- Você pode ver esta configuração fazendo a requisição **[`protocol_config`](/docs/api/rpc#protocol-config)** ao endpoint RPC e pesquisando por `epoch_length`.

**Nota:** Os nós fazem coleta de lixo dos blocos após 5 épocas (~2.5 dias) a menos que sejam [nós arquivo](/docs/roles/integrator/exchange-integration#running-an-archival-node).

**Exemplo:**

<!--DOCUSAURUS_CODE_TABS-->

<!--JSON-->

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "EXPERIMENTAL_protocol_config",
  "params": {
    "finality": "final"
  }
}
```

<!--HTTPie-->

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=EXPERIMENTAL_protocol_config \
  params:='{
    "finality": "final"
  }'
```

<!--END_DOCUSAURUS_CODE_TABS-->

**Exemplo de Resposta:**

```json
{
    "jsonrpc": "2.0",
    "result": {
        "protocol_version": 44,
        "genesis_time": "2020-07-21T16:55:51.591948Z",
        "chain_id": "mainnet",
        "genesis_height": 9820210,
        "num_block_producer_seats": 100,
        "num_block_producer_seats_per_shard": [
            100
        ],
        "avg_hidden_validator_seats_per_shard": [
            0
        ],
        "dynamic_resharding": false,
        "protocol_upgrade_stake_threshold": [
            4,
            5
        ],
        "epoch_length": 43200,
        "gas_limit": 1000000000000000,
        "min_gas_price": "1000000000",
        "max_gas_price": "10000000000000000000000",
        "block_producer_kickout_threshold": 90,
        "chunk_producer_kickout_threshold": 90,

// ---- snip ----
}
```

Você pode aprender mais sobre como épocas são usadas para gerenciar a rede de validação no [FAQ Validadores](/docs/validator/staking-faq#what-is-an-epoch).

> Tem alguma dúvida?
   <a href="https://stackoverflow.com/questions/tagged/nearprotocol"><h8>Pergunte no StackOverflow!</h8></a>
