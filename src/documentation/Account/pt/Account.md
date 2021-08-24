---
id: account
title: Conta
sidebar_label: Conta
---

NEAR usa identificadores de conta legíveis por humanos ao invés hash de chaves publicas. Para um vídeo de 20 minutos de explicação, veja [esse "Lunch and Learn"](https://www.youtube.com/watch?time_continue=18&v=2_Ekz7w6Eo4&feature=emb_logo) no Youtube.

## Regras para ID de Conta

- tamanho mínimo de 2 caracteres
- tamanho máximo de 64 caracteres
- `ID da Conta` consiste nas `partes da ID da Conta` separados por `.`
- `Uma parte da ID da Conta` consiste em símbolos alfanuméricos separados por `_` ou `-`.

Nome de contas são similares a nomes de domínio. Qualquer um pode criar uma conta top-level (TLA) sem separadores, como por exemplo `near`. Somente `near` pode criar `alice.near`. E somente `alice.near` pode criar `app.alice.near` e assim por diante. Note, `near` NÃO pode criar `app.alice.near` diretamente.

Esse é o regex de um ID de conta, sem verificar o tamanho: `^(([a-z\d]+[\-_])*[a-z\d]+\.)*([a-z\d]+[\-_])*[a-z\d]+$`

---

## Contas Top-level

Nomes de conta Top-level (TLAs) são altamente valiosas, pois fornecem uma raiz de segurança e indexação para instituições, aplicações e usuários. Para permitir acesso justo a eles, os nomes de contas top-level que são menores que `MIN_ALLOWED_TOP_LEVEL_ACCOUNT_LENGTH` caracteres (32 caracteres quando este texto foi escrito) serão leiloados.

Especificamente, apenas a conta `REGISTRAR_ACCOUNT_ID` pode criar novas contas de nível superior que sejam menores que `MIN_ALLOWED_TOP_LEVEL_ACCOUNT_LENGTH` caracteres. `REGISTRAR_ACCOUNT_ID` implementa uma interface padrão de `Account Naming` (nome da conta) que lhe permite criar novas contas.

Não implementaremos o leilão de `registrar` no lançamento. Em vez disso, vamos permitir que ele venha a ser utilizado pela Near Foundation em algum momento futuro.

Atualmente, todas as contas da `mainnet` usam um nome de conta de nível superior `near` (como `exemplo.near`) e todas as contas da `testnet` usam um nomes de conta de nível superior `testnet` (como `exemplo.testnet`).

---

## Subcontas

Como mencionado anteriormente, os nomes de conta na NEAR seguem um padrão de nomenclatura semelhante ao de domínios de sites com regras similares. Contas podem criar quantas subcontas quiserem, e apenas a conta pai pode criar uma subconta. Por exemplo, `exemplo.near` pode criar `subconta1.exemplo.near` e `subconta2.exemplo.near` mas NÃO PODE criar `sub.subconta.exemplo.near`. Apenas `subconta.exemplo.near` pode criar `sub.subconta.exemplo.near`, da mesma forma que `teste.near` NÃO PODE criar `subconta.exemplo.near`. Apenas a conta pai direta tem permissão para criar uma subconta.

Experimente usando o nosso comando [`near-cli`](/docs/tools/near-cli), [`near create-account`](/docs/tools/near-cli#near-create-account), no seu terminal.

---

## Contas Implícitas

Contas implícitas funcionam de forma semelhante às contas do Bitcoin/Ethereum. Elas permitem que você reserve um ID de conta antes que ele seja criado, gerando um par de chaves ED25519 localmente. Este par de chaves tem uma chave pública que mapeia para uma representação hexadecimal de 64 caracteres, que se torna o ID da conta.

***Exemplo:***
- Chave pública na base58: `BGCCDDHfysuuVnaNVtEhhqeT4k9Muyem3Kpgq2U1m9HX`
- Conta implícita: `98793cd91a3f870fb126f66285808c7e094afcfc4eda8a970f6648cdf0dbd6de`

[ [Clique aqui](/docs/roles/integrator/implicit-accounts) ] para obter mais informações, bem como um guia sobre a criação de contas implícitas.

---

## Contas de Desenvolvedor

As contas de desenvolvedor são contas especiais feitas automaticamente por ferramentas como near-cli e a carteira para ajudá-lo a automatizar os testes e a implantação de contratos. Como todas as contas podem ter um contrato, mas a reimplantação de contratos NÃO cria um novo estado, frequentemente você quer implantar em uma conta completamente diferente durante os testes.

> **Note:** When deploying multiple test examples and creating new dev accounts, you will need to "Sign Out" of the NEAR Wallet on any `localhost` examples and "Sign In" again! Signing in adds an access key to your account and saves the private key in localStorage so the app can call contract methods without asking for approval again. BUT! There's a chance you're now trying to interact with a contract that is deployed on a completely different dev account.

### Como criar uma conta de desenvolvedor

- When you run the command `dev-deploy` from near-cli, it looks for a file here `/neardev/dev-account` with the dev account ID to deploy to.

- If it doesn't find one, it creates a dev-account (using our cloud helper service for creating test accounts) and then creates the folder for you with the `dev-account` file.

- It will also create the associated credentials, a public and private keypair here: `~/.near-credentials/default/[dev-account-id].json`. Go ahead and try it:

```
code ~/.near-credentials/default/[dev-account-id].json
```

- Replace dev-account-id with the account ID here `/neardev/dev-account` and open the json file up in your editor of choice (code for VS Code).

### Como obter mais uma conta

- Delete the folder `/neardev` and run `near dev-deploy [wasmFile default="/out/main.wasm"]` and you'll see a new dev account was created in `neardev` and credentials are also stored for you.

### Ok, eu tenho uma conta de desenvolvimento, e agora?

- These accounts and associated keypairs found in the json file are super useful for automating your testing.

- Many examples in the NEAR ecosystem use some sort of `yarn dev:deploy` script that deploys contracts and maybe even run some tests. It's important to know how these accounts are created, where their credentials are stored and how you can use them yourself.

---

## Chaves de Acesso

NEAR uses human readable account IDs instead of a public key hash as the account identifier and many keys ([public/private key pairs](https://en.wikipedia.org/wiki/Public-key_cryptography)) can be created for each account that we call "Access Keys". Currently, there are two types of access keys; `FullAccess` & `FunctionCall`.

### Chaves de Acesso Completo

As the name suggests, `FullAccess` keys have full control of an account similar to having administrator privileges on your operating system. With this key you have the ability to perform any of the eight action types on NEAR without any limitations.

1) Create Account 2) Delete Account 3) Add Key 4) Delete Key 5) Deploy Contract 6) Function Call 7) Transfer Ⓝ 8) Stake Ⓝ _(for validators)_

See our [action specifications](https://nomicon.io/RuntimeSpec/Actions.html) section for more details.

### Chaves Para Chamar Funções

A `FunctionCall` key is unique as it only has permission to call a smart contract's method(s) that _do not_ attach Ⓝ as a deposit (i.e. payable functions). These keys have the following three attributes:

1) `allowance` - the amount of Ⓝ the key is allowed to spend on gas fees _(optional - default: `null`)_ 2) `receiver_id` - contract the key is allowed to call methods on _(required)_ 3) `method_names` - contract methods the key is allowed to call _(optional)_ **Note:** If `allowance` is omitted the default will be `null` and key will only be allowed to call view methods. Allowance can not be added after key is created.
> **Note:** If no specific method names are specified, all methods may be called.

The easiest way to create a `FunctionCall` key with your dApp is to prompt users to sign in using [NEAR Wallet](https://wallet.testnet.near.org/) via `near-api-js`'s [`WalletConnection`](https://github.com/near/near-api-js/blob/0aefdb01a151f7361463f3ff65c77dbfeee83200/lib/wallet-account.js#L13-L139). This prompts users to authorize access and upon approval a `FunctionCall` key is created. This key is only allowed to call methods on the contract that redirected the user to NEAR Wallet with a default allowance of 0.25 Ⓝ to cover gas costs for transactions. As non-monetary transactions are performed with this key, you will notice the allowance decreases and once 0.25 Ⓝ is burnt a new key will need to be created. If a request is made to transfer _ANY_ amount of tokens with a `FunctionCall` key, the user will be redirected back to wallet to authorize this transaction. You can see this functionality in action by trying out [NEAR Guestbook](https://near-examples.github.io/guest-book/).

Another way to create a `FunctionAccess` key is to use `near-cli`'s [`add-key`](/docs/tools/near-cli#near-add-key) command. With `near-cli` you can be more specific with your `FunctionCall` key by only allowing it to call specific contract methods as well as make adjustments to the allowance amount.

`FunctionCall` access keys are a powerful usability feature of NEAR opening up many possibilities. Not only can you eliminate the need for users to authorize small transactions over and over again but you could even allow a user to interact with the blockchain without ever having to create an account. This can be accomplished by having the dApp automatically create a `FunctionCall` key that points to itself with a single click on your front-end allowing anyone to interact with your dApp seamlessly.

---

## Comparação com o Ethereum

If you're familiar with development on Ethereum, it's worth making a quick note about how accounts are different. The image below summarizes some key differences.

![Ethereum vs NEAR accounts](/docs/assets/accounts-compare-ethereum-v-near.png)

_image source: medium.com/@clinder_

---

## Contas e Contratos

Each NEAR account can only hold 1 smart contract. For applications where users should be able to organize multiple contracts you can create "subaccounts" whose "master account" is the user account. The format of a subaccount would include a dot in the name like `contract1.user-A-account`, `contract2.user-A-account`, etc. NEAR restricts the creation of accounts with a dot in the name such that these accounts can only by created by `user-A-account`, as if the user account is a top-level domain like `your-company.com` if you're familiar with this model.

Using NEAR CLI you could deploy new contracts to your account like this:

```bash
near deploy --wasm-file path/to/contract.wasm --account-id contractAccount.developerAccount.testnet --master-account yourAccount.testnet
```

Note for this to work you will need to login with NEAR CLI and authorize it to use the master account (`YOUR_ACCOUNT.testnet`) on your behalf. Learn more about [NEAR CLI here](/docs/tools/near-cli)

> Got a question?
   <a href="https://stackoverflow.com/questions/tagged/nearprotocol">
> <h8>Ask it on StackOverflow!</h8></a>
