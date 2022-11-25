---
id: gas
title: Gas
sidebar_label: Gas
---

Quando você faz chamadas para atualizar ou alterar dados na blockchain NEAR, isso gera algum custo para as pessoas que administram a infraestrutura da blockchain. No final do dia, alguns computadores em algum lugar processam sua solicitação e os [validadores](/docs/validator/staking-overview) que por manterem seus computadores funcionando são recompensados com um capital significativo.

Como em outras blockchains programáveis, a NEAR compensa essas pessoas cobrando _taxas de transação_, também chamadas de _taxas de gás_.

Se você estiver familiarizado com provedores de serviços de nuvem na web2 (Amazon Web Services, Google Cloud, etc), uma grande diferença com blockchains é que _usuários_ são cobrados imediatamente quando fazem uma chamada para um aplicativo, em vez de desenvolvedores enfrentando o custo de usar toda essa infraestrutura. Isso cria novas possibilidades, como apps que não têm o risco de sumir a longo prazo devido à falta de fundos do desenvolvedor/empresa. No entanto, isso também surge com escaladas na velocidade de utilização. Para ajudar com isso, a NEAR também fornece a capacidade de desenvolvedores [cobrir os custos de gás para usuários](#what-about-prepaid-gas), para criar uma experiência mais familiar para aqueles que vêm da web 2.

Quando estiver pensando em gás, tenha em mente dois conceitos:

- **Unidades de gás**: internamente, as taxas de transação não são calculadas diretamente nos tokens NEAR, mas em vez disso passam por uma fase intermédia de "unidades de gás". O benefício das unidades de gás é que são deterministas – a mesma transação custará sempre o mesmo valor de unidades de gás.
- **Preço do gás**: as unidades de gás são depois multiplicadas pelo _preço do gás_ para determinar quanto cobrar aos usuários. Este preço é recalculado automaticamente em cada bloco dependendo da demanda de rede (se o bloco anterior for mais do que a metade completa o preço sobe, caso contrário ele desce, e isto não muda mais do que 1% para cada bloco), e desce até o valor mais baixo configurado pela rede, atualmente 100 milhões <a href="https://www. nanotech-now. com/metric-prefix-table. htm" f-or umid="metric prefixes" sb="2" lbb="2" fo="1">yocto</a>NEAR.

Observe que o preço do gás pode ser diferente entre a rede principal da NEAR & testnet. [Verifique o preço do gás](#whats-the-price-of-gas-right-now) antes de confiar nos números abaixo.

## Pensando em gás

Cada bloco de tempo na NEAR, tem mais ou menos um segundo, concluído por limitação na quantidade de gás por bloco. Você pode consultar este valor usando o [`protocol_config`](/docs/api/rpc#protocol-config) RPC endpoint e procurando por `max_gas_burnt` sob `limit_config`. As unidades de gás foram cuidadosamente calculadas para funcionar com alguns números fáceis de pensar:

- 10¹² unidades de gás, ou **1 TGas** (_[Tera][metric prefixes]Gás_)...
- ≈ **1 milissegundo** de tempo de "computação"
- ...que, por um preço mínimo de gás de 100 milhões de yoctoNEAR, é igual a **0,1 milliNEAR ** de carga

Este `1ms` é uma aproximação grosseira, mas útil, e é o objetivo atual de como as unidades de gás são estabelecidas dentro da blockchain NEAR. Unidades de gás encapsulam não apenas tempo de computação/CPU, mas também tempo de banda larga/rede e armazenamento/IO. Através de um mecanismo de governança, os parâmetros do sistema podem ser ajustados, mudando o mapeamento entre TGas e milissegundos no futuro, mas o conteúdo acima ainda é um bom ponto de partida para pensar sobre o que as unidades de gás significam e de onde vêm.

## O custo de ações comuns

Para te dar um ponto de partida sobre o que esperar por custos em NEAR, a tabela abaixo lista algumas ações comuns, quantos TGas elas atualmente precisam, e qual seria a taxa em miliNEAR, ao preço mínimo de gás de 100 milhões de yN.

| Operação                  | TGas | Taxa (mN) | Taxa (Ⓝ) |
| ------------------------- | ---- | --------- | -------- |
| Criar Conta               | 0.42 | 0.042     | 4.2⨉10⁻⁵ |
| Enviar Fundos             | 0.45 | 0.045     | 4.5⨉10⁻⁵ |
| Stake                     | 0.50 | 0.050     | 5.0⨉10⁻⁵ |
| Chaves de Acesso Completo | 0.42 | 0.042     | 4.2⨉10⁻⁵ |
| Excluir Chave             | 0.41 | 0.041     | 4.1⨉10⁻⁵ |

<blockquote class="info">
<strong> Olhando mais a fundo</strong><br><br> De onde vêm esses números?

NEAR é [configured](https://github.com/near/nearcore/blob/master/nearcore/res/genesis_config.json#L57-L119) com custos base. Um exemplo:

    create_account_cost: {
      send_sir:     99607375000,
      send_not_sir: 99607375000,
      execution:    99607375000
    } O "sir" aqui significa "remetente é destinatário" ("sender is receiver"). Sim, todos eles são idênticos, mas isso pode mudar no futuro.

Quando você faz um pedido para criar uma nova conta, NEAR imediatamente deduz o valor apropriado a `enviar` da sua conta. Então cria um _receipt_, um mecanismo interno de contabilidade para facilitar o design fragmentado e assíncrono da NEAR (se você for da Ethereum, esqueça o que sabe sobre os recibos da Ethereum, já que são completamente diferentes). Criar um recibo tem seus próprios custos associados:

    action_receipt_creation_config: {
      send_sir:     108059500000,
      send_not_sir: 108059500000,
      execution:    108059500000
    } Você pode consultar esse valor usando o [`protocol_config`](/docs/api/rpc#protocol-config) RPC endpoint e procurar por `action_receipt_creation_config`.

O valor apropriado a `enviar` para criar este recibo também é imediatamente deduzido da sua conta.

A ação "criar conta" não será finalizada até o próximo bloco. At this point, the `execution` amount for each of these actions will be deducted from your account (something subtle: the gas units on this next block could be multiplied by a gas price that's up to 1% different, since gas price is recalculated on each block). Adding it all up to find the total transaction fee:

    (create_account_cost.send_sir  + action_receipt_creation_config.send_sir ) * gas_price_at_block_1 +
    (create_account_cost.execution + action_receipt_creation_config.execution) * gas_price_at_block_2

</blockquote>

## Custos de ações complexas

Os números acima devem te dar a sensação de que as transações na NEAR são baratas! Mas eles não te dão muita noção de quanto vai custar para usar um aplicativo mais complexo ou operar um negócio baseado na NEAR. Vamos cobrir alguns cálculos de gás mais complexos: implantar contratos e chamadas a funções.

### Implantação de contratos inteligentes

Os custos básicos de ação incluem dois valores diferentes para a implementação de contratos. Simplificados, estes são:

    deploy_contract_cost: 184765750000,
    deploy_contract_cost_per_byte: 6812999,

Novamente, esses valores podem ser consultados usando o [`protocol_config`](/docs/api/rpc#protocol-config) RPC endpoint.

O primeiro é um custo base, independentemente do tamanho do contrato. Mantendo em mente que cada um precisa ser multiplicado por dois, para conseguirem `enviar` e `executar` custos, e também exigirá o envio & executando um recibo (veja a caixa azul acima), as unidades de gás chegam a:

    2 * 184765750000 +
    2 * contract_size_in_bytes * 6812999 +
    2 * 108059500000

(Divida o número resultante por 10¹² para obter o resultado em TGas!)

Note que isto cobre o custo de upload e escrita de bytes para armazenamento, mas _não_ cobre o custo de guardar esses bytes no armazenamento. O armazenamento de longo prazo é compensado através de [storage staking][], um valor recuperável de custo-por-byte que também será deduzido de sua conta durante a implantação do contrato.

O contrato em AssemblyScript [neste exemplo de Token Fungível](https://github.com/near-examples/FT/pull/42) compila para mais de 16kb (o contrato em Rust é muito maior, mas este [será otimizado](https://github.com/near/near-sdk-rs/issues/167)). Using the calculation above, we find that it requires **0.81 TGas** (and thus 0.081mN at minimum gas price) for the transaction fee to deploy the contract, while 1.5N will be locked up for storage staking.

### Function calls

Given the general-purpose nature of NEAR, function calls win the award for most complex gas calculations. A given function call will use a hard-to-predict amount of CPU, network, and IO, and the amount of each can even change based on the amount of data already stored in the contract!

With this level of complexity, it's no longer useful to walk through an example, enumerating each (see `ext_costs` under `wasm_config` using the [`protocol_config`](/docs/api/rpc#protocol-config) RPC endpoint) of the gas calculations as we go (you can research this yourself, [if you want](https://github.com/near/nearcore/pull/3038)). Instead, let's approach this from two other angles: ballpark comparisons to Ethereum, and getting accurate estimates with automated tests.

#### Ballpark Comparisons to Ethereum

Like NEAR, Ethereum uses gas units to model computational complexity of an operation. Unlike NEAR, rather than using a predictable gas price, Ethereum uses a dynamic, auction-based marketplace. This makes a comparison to Ethereum's gas prices a little tricky, but we'll do our best.

Etherscan gives a [historic Ethereum gas price chart](https://etherscan.io/chart/gasprice). These prices are given in "Gwei", or Gigawei, where a wei is the smallest possible amount of ETH, 10⁻¹⁸. From November 2017 through July 2020, average gas price was 21Gwei. Let's call this the "average" gas price. In July 2020, average gas price went up to 57Gwei. Let's use this as a "high" Ethereum gas fee.

Multiplying Ethereum's gas units by gas price usually results in an amount that's easy to show in milliETH (mE), the same way we've been converting NEAR's TGas to milliNEAR. Let's look at some common operations side-by-side, comparing ETH's gas units to NEAR's, as well as converting to both the above "average" & "high" gas prices.

| Operation                                         | ETH gas units | avg mE | high mE | NEAR TGas             | mN                                     |
| ------------------------------------------------- | ------------- | ------ | ------- | --------------------- | -------------------------------------- |
| Transfer native token (ETH or NEAR)               | 21k           | 0.441  | 1.197   | 0.45                  | 0.045                                  |
| Deploy & initialize a [fungible token][] contract | [1.1M][]      | 23.3   | 63.1    | [9][]<super>†</super> | 0.9 (plus 1.5Ⓝ in [storage staking][]) |
| Transfer a fungible token                         | [~45k][]      | 0.945  | 2.565   | [14][]                | 1.4                                    |
| Setting an escrow for a fungible token            | [44k][]       | 0.926  | 2.51    | [8][]                 | 0.8                                    |
| Checking a balance for a fungible token           | 0             | 0      | 0       | 0                     | 0                                      |

<super>†</super> Function calls require spinning up a VM and loading all compiled Wasm bytes into memory, hence the increased cost over base operations; this is [being optimized](https://github.com/near/nearcore/issues/3094).

While some of these operations on their surface appear to only be about a 10x improvement over Ethereum, something else to note is that the total supply of NEAR is more than 1 billion, while total supply of Ethereum is more like 100 million. So as fraction of total supply, NEAR's gas fees are approximately another 10x lower than Ethereum's. Additionally, if the price of NEAR goes up significantly, then the minimum gas fee set by the network can be lowered.

You can expect the network to sit at the minimum gas price most of the time; learn more in the [Economics whitepaper](https://near.org/papers/economics-in-sharded-blockchain/#transaction-and-storage-fees).

#### Accurate Estimates with Automated Tests

We will have a demonstration of how to do in-depth gas cost estimation soon; [subscribe to this issue](https://github.com/near/devx/issues/253) for updates. Until then, you may want to look at this [example of how to do simulation testing](https://github.com/near-examples/simulation-testing), a powerful way to test your contracts and inspect every aspect of their execution.

If you're using NEAR's AssemblyScript SDK, you can use [two methods](https://github.com/near/near-sdk-as/blob/741956d8a9a44e4252f8441dcd0ba3c19743590a/assembly/runtime/contract.ts#L68-L81), `context.prepaidGas` and `context.usedGas`. These can be used with or without tests to report what the virtual machine knows about attached gas and its consumption at the moment your contract method is being executed:

```ts
/**
* Get the number of gas units attached to the call
*/
get prepaidGas(): u64 {
 return env.prepaid_gas();
}

/**
* Get the number of gas units that was already burnt during the contract execution and
* attached to promises (cannot exceed prepaid gas).
*/
get usedGas(): u64 {
 return env.used_gas();
}
```

## How do I buy gas?

You don't directly buy gas; you attach tokens to transactions.

Calls to NEAR to read data are always free. But when you make a call to add or update data, you have to do so from an account that has some amount of NEAR tokens available in its balance, and these tokens will be attached to pay the gas fee.

If you're coming from Ethereum, you may be used to the idea of paying a higher gas price to get your transaction processed faster. In NEAR, gas costs are deterministic, and you can't pay extra.

For basic operations like "transfer funds," you can't specify an amount to attach. The gas needed is easy to calculate ahead of time, so it's automatically attached for you. (Check it: [`near-cli`](https://github.com/near/near-cli) has a `send` command, which accepts no `gas` parameter; [`near-api-js`](https://github.com/near/near-api-js) has a [`sendTokens`](https://near.github.io/near-api-js/classes/near.near-1.html#sendtokens) function which accepts no `gas` argument.) As shown in the tables above, these operations are cheap, so you probably won't even notice the slight reduction in your account's balance. As shown in the tables above, these operations are cheap, so you probably won't even notice the slight reduction in your account's balance.

Function calls are more complex and you can attach an explicit amount of gas to these transactions, up to a maximum value of 3⨉10¹⁴ gas units. This maximum value of prepaid gas is subject to change but you can query this value by using the [`protocol_config`](/docs/api/rpc#protocol-config) RPC endpoint and search for `max_total_prepaid_gas`.

You can also override the default value of attached gas. Here is an example using [`near-cli`](https://github.com/near/near-cli):

    near call myContract.testnet myFunction "{ \"arg1\": \"val1\" }" --gas=300000000000000

And in [`near-api-js`](https://github.com/near/near-api-js), you can also specify an explicit amount of gas units to attach when calling a change method; see [example here](https://github.com/near-examples/guest-book/blob/ceb2a39e53351b4ffc21d01987e2b0b21d633fa7/src/App.js#L29).

The telltale error that calls for this solution looks like this:

```text
Error:
  Transaction A9BzFKmgNNUmEx9Ue9ARC2rbWeiMnq6LpcXh53xPhSN6 failed.
  Exceeded the prepaid gas
```

<blockquote class="warning">
<strong>How many tokens will these units cost?</strong><br><br> Note that you are greenlighting a maximum number of gas _units_, not a number of NEAR tokens or yoctoNEAR.

These units will be multiplied by the gas price at the block in which they're processed. If the function call makes cross-contract calls, then separate parts of the function will be processed in different blocks, and could use different gas prices. At a minimum, the function will take two blocks to complete, as explained in [the blue box above](#the-cost-of-common-actions).

Assuming the system rests at minimum gas price of 100 million yoctoNEAR during the total operation, a maximum attached gas of 3⨉10¹⁴ would seem to allow a maximum expenditure of 3⨉10²² yN. However, there's also a pessimistic multiplier of about 6.4 to [prevent shard congestion](https://github.com/nearprotocol/NEPs/issues/67).

Multiplying all three of these numbers, we find that maximum attached gas units allow about 0.2Ⓝ to be spent on the operation if gas prices stay at their minimum. If gas prices are above the minimum, this charge could be higher.

What if the gas price is at the minimum during the starting block, but the operation takes several blocks to complete, and subsequent blocks have higher gas prices? Could the charge be more than ~0.2Ⓝ? No. No. The pessimistic multiplier accounts for this possibility.

</blockquote>

## Attach extra gas; get refunded!

How can you know the exact right amount to attach when you call a function? You can't!

Gas units are based on computational complexity for a given operation, which can be affected by a smart contract's state. This is hard to predict ahead of time. And gas price is adjusted each block based on how busy the network was during the previous block, which is also hard to predict ahead of time.

But good news!

- Gas doesn't cost much on NEAR
- If you attach more gas than needed, you'll get refunded

This is also true for basic operations. In the previous section we mentioned that these are automatically calculated and attached. In fact, given that the gas price could be adjusted slightly while these operations are being applied (see blue box [above](#the-cost-of-common-actions)), a slight amount extra is attached, and any beyond what's necessary gets refunded.

## What about Prepaid Gas?

The Near Team understands that developers want to provide their users with the best possible onboarding experience. To realize this vision, developers can design their applications in a way that first-time users can draw funds for purchasing gas directly from an account maintained by the developer. Once onboarded, users can then transition to paying for their own platform use.

In this sense, prepaid gas can be realized using a funded account and related contract(s) for onboarding new users.

_So how can a developer pay the gas fee for their users on NEAR?_

A user can use the funds directly from the developers account suitable only for the gas fees on this dApp. Then the developer has to distinguish users based on the signers' keys instead of the account names.

Check out [Key Concept: Account](/docs/concepts/account) "Did you know?" section, item `#2`.

NEAR Protocol does not provide any limiting feature on the usage of developer funds. Developers can set allowances on access keys that correspond to specific users -- one `FunctionCall` access key per new user with a specific allowance.

## What's the price of gas right now?

You can directly query the NEAR platform for the price of gas on a specific block using the RPC method `gas_price`. This price may change depending on network load. The price is denominated in yoctoNEAR (10^-24 NEAR)

1. Take any recent block hash from the blockchain using [NEAR Explorer](https://explorer.testnet.near.org/blocks)

   _At time of writing, `SqNPYxdgspCT3dXK93uVvYZh18yPmekirUaXpoXshHv` was the latest block hash_

2. Issue an RPC request for the price of gas on this block using the method `gas_price` [documented here](/docs/api/rpc)

   ```bash
   http post https://rpc.testnet.near.org jsonrpc=2.0 method=gas_price params:='["SqNPYxdgspCT3dXK93uVvYZh18yPmekirUaXpoXshHv"]' id=dontcare
   ```

3. Observe the results

   ```json
   {
     "id": "dontcare",
     "jsonrpc": "2.0",
     "result": {
       "gas_price": "5000"
     }
   }
   ```

The price of 1 unit of gas at this block was 5000 yoctoNEAR (10^-24 NEAR).

## Some closing thoughts from the whitepaper

<blockquote class="info">
Fundamentally, the NEAR platform is a marketplace between willing participants.  On the supply side, operators of the validator nodes and other fundamental infrastructure need to be incentivized to provide these services which make up the “community cloud.”  On the demand side, the developers and end-users of the platform who are paying for its use need to be able to do so in a way which is simple, clear and consistent so it helps them.

A blockchain-based cloud provides several specific resources to the applications which run atop it:

- **Compute (CPU)**: This is the actual computer processing (and immediately available RAM) which run the code in a contract.
- **Bandwidth ("Network")**: This is the network traffic between participants and users, including messages which submit transactions and those which propagate blocks.
- **Storage**: Permanent data storage on the chain, typically expressed as a function of both storage space and time.

Existing blockchains like Ethereum account for all of these in a single up front transaction fee which represents a separate accounting for each of them but ultimately charges developers or users for them only once in a single fee. This is a high volatility fee commonly denominated in “gas”.

Developers prefer predictable pricing so they can budget and provide prices for their end users. The pricing for the above-mentioned resources on NEAR is an amount which is slowly adjusted based on system usage (and subject to the smoothing effect of resharding for extreme usage) rather than being fully auction-based. This means that a developer can more predictably know that the cost of running transactions or maintaining their storage.

</blockquote>

To dig deeper into how and why gas works the way it does on NEAR, check out the [Economics](https://near.org/papers/the-official-near-white-paper/#economics) section of the main whitepaper and the [Transaction and Storage Fees](https://near.org/papers/economics-in-sharded-blockchain/#transaction-and-storage-fees) section of the economics whitepaper.

> Got a question?
   <a href="https://stackoverflow.com/questions/tagged/nearprotocol">
> <h8>Ask it on StackOverflow!</h8></a>
  [metric prefixes]: https://www.nanotech-now.com/metric-prefix-table.htm

[fungible token]: https://github.com/near-examples/FT/pull/42
[1.1M]: https://github.com/chadoh/erc20-test
[9]: https://explorer.testnet.near.org/transactions/GsgH2KoxLZoL8eoutM2NkHe5tBPnRfyhcDMZaBEsC7Sm
[storage staking]: ./storage-staking
[~45k]: https://ethereum.stackexchange.com/a/72573/57498
[14]: https://explorer.testnet.near.org/transactions/5joKRvsmpEXzhVShsPDdV8z5EG9bGMWeuM9e9apLJhLe
[8]: https://explorer.testnet.near.org/transactions/34pW67zsotFsD1DY8GktNhZT9yP5KHHeWAmhKaYvvma6
[44k]: https://github.com/chadoh/erc20-test
