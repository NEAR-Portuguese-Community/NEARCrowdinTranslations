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

Nomes de conta Top-level (TLAs) são altamente valiosas, pois fornecem uma raiz de segurança e indexação para instituições, aplicações e usuários. Para permitir acesso justo a eles, os nomes de conta de nível superior que são menores que `MIN_ALLOWED_TOP_LEVEL_ACCOUNT_LENGTH` caracteres (32 quando este texto foi escrito) serão leiloados.

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

> **Nota:** Ao implantar vários exemplos de teste e criar novas contas de desenvolvimento, você precisará "Sair" da carteira NEAR em quaisquer exemplos no `localhost` e "Entrar" novamente! Ao entrar, uma chave de acesso é adicionada à sua conta e a chave privada é salva no localStorage para que o aplicativo possa chamar métodos de contrato sem pedir aprovação novamente. MAS! Existe a chance de que agora você esteja tentando interagir com um contrato que foi implantado em uma conta de desenvolvimento completamente diferente.

### Como criar uma conta de desenvolvedor

- Quando você executa o comando `dev-deploy` da near-cli, ele procura por um arquivo em `/neardev/dev-account` com a ID da conta de desenvolvimento em que a implantação será realizada.

- Se não encontrar uma, ele cria uma conta dev-account (usando nosso serviço de ajuda na nuvem para a criação de contas de teste) e então cria a pasta para você com o arquivo `dev-account`.

- Ele também criará as credenciais associadas, um par de chaves pública e privada aqui: `~/.near-credentials/default/[dev-account-id].json`. Vá em frente e faça o teste:

```
code ~/.near-credentials/default/[dev-account-id].json
```

- Substitua dev-account-id pelo ID da conta em `/neardev/dev-account` e abra o arquivo json no seu editor de escolha (code para VS Code).

### Como obter mais uma conta

- Apague a pasta `/neardev` e execute `near dev-deploy [wasmFile default="/out/main.wasm"]` e você verá que uma nova conta de desenvolvedor foi criada em `neardev` e que as credenciais também são armazenadas para você.

### Ok, eu tenho uma conta de desenvolvimento, e agora?

- Essas contas e pares de chaves associadas encontradas no arquivo json são super úteis para automatizar seus testes.

- Muitos exemplos no ecossistema NEAR usam algum tipo de script `yarn dev:deploy` que implementa contratos e talvez até execute alguns testes. É importante saber como essas contas são criadas, onde suas credenciais são armazenadas e como você mesmo pode usá-las.

---

## Chaves de Acesso

A NEAR usa IDs de contas legíveis em vez de um hash de chave pública como o identificador da conta e muitas chaves ([pares de chaves públicas/privadas](https://en.wikipedia.org/wiki/Public-key_cryptography)) podem ser criadas para cada conta, as quais chamamos de "chaves de acesso". Atualmente, existem dois tipos de chaves de acesso; `FullAccess` & `FunctionCall`.

### Chaves de Acesso Completo

Como o nome sugere, chaves `FullAccess` têm controle total de uma conta semelhante a ter privilégios de administrador em seu sistema operacional. Com tais chaves você tem a capacidade de executar qualquer um dos oito tipos de ação na NEAR sem quaisquer limitações.

1) Criar conta 2) Excluir conta 3) Adicionar chave 4) Excluir chave 5) Implantar contrato 6) Chamada de função 7) Transferir Ⓝ 8) Colocar Ⓝ em stake _(para validadores)_

Veja nossa seção de [especificações de ações](https://nomicon.io/RuntimeSpec/Actions.html) para mais detalhes.

### Chaves Para Chamar Funções

Uma chave `FunctionCall` é única, já que tem apenas permissão para chamar método(s) de um contrato inteligente que _não_ anexam Ⓝ como um depósito (ou seja, funções pagáveis). Estas chaves têm os seguintes três atributos:

1) `allowance` - a quantidade de Ⓝ que a chave está autorizada a gastar em taxas de gás _(opcional - padrão: `null`)_ 2) `receiver_id` - o contrato cujos métodos a chave pode chamar _(obrigatório)_ 3) `method_names` - métodos do contrato que a chave tem permissão para chamar _(opcional)_ **Nota:** Se `allowance` for omitida o padrão será `null` e a chave só poderá chamar métodos de visualização. A permissão não pode ser adicionada após a criação da chave.
> **Nota:** Se nenhum nome de método específico for especificado, todos os métodos poderão ser chamados.

A forma mais simples de criar uma chave `FunctionCall` com seu dApp é pedir que os usuários se autentiquem usando a [carteira NEAR](https://wallet.testnet.near.org/) através da [`WalletConnection`](https://github.com/near/near-api-js/blob/0aefdb01a151f7361463f3ff65c77dbfeee83200/lib/wallet-account.js#L13-L139) da `near-api-js`. Isso pede aos usuários que autorizem acesso e após a aprovação uma chave `FunctionCall` é criada. Esta chave só tem permissão para chamar métodos do contrato que redirecionou o usuário para a carteira NEAR com uma allowance padrão de 0.25 Ⓝ para cobrir os custos de gás das transações. Conforme as transações não monetárias são realizadas com esta chave, você notará que a permissão diminui e uma vez que 0,25 Ⓝ seja queimado uma nova chave precisará ser criada. Se um pedido for feito para transferir _QUALQUER_ quantidade de tokens com uma chave de `FunctionCall`, o usuário será redirecionado de volta à carteira para autorizar a transação. Você pode ver esta funcionalidade em ação testando o [livro de visitas da NEAR](https://near-examples.github.io/guest-book/).

Outra forma de criar uma chave de `FunctionAccess` é utilizar o comando [`add-key`](/docs/tools/near-cli#near-add-key) do `near-cli`. Com o `near-cli` você pode ser mais específico com a sua chave de `FunctionCall` permitindo que ela só chame métodos específicos de contratos, bem como fazer ajustes no valor autorizado.

Chaves de acesso `FunctionCall` são um recurso de usabilidade poderoso da NEAR abrindo muitas possibilidades. Você pode não só eliminar a necessidade de usuários autorizar pequenas transações várias e várias vezes, mas até mesmo permitir que um usuário interaja com a blockchain sem precisar criar uma conta. Isso pode ser feito fazendo com que o dApp crie automaticamente uma chave `FunctionCall` que aponta para si mesmo com um único clique no seu front-end permitindo que qualquer um interaja com seu dApp sem problemas.

---

## Comparação com o Ethereum

Se você está familiarizado com o desenvolvimento na Ethereum, vale a pena fazer uma breve observação sobre como as contas são diferentes. A imagem abaixo resume algumas diferenças principais.

![Contas Ethereum vs. NEAR](/docs/assets/accounts-compare-ethereum-v-near.png)

_fonte da imagem: medium.com/@clinder_

---

## Contas e Contratos

Cada conta NEAR pode conter um único contrato inteligente. Para aplicativos em que os usuários devem ser capazes de organizar vários contratos você pode criar "subcontas" cuja "conta mestre" é a conta do usuário. O formato de uma subconta incluiria um ponto no nome, como `contrato1.conta-de-usuário-A`, `contrato2.conta-de-usuário-A`, etc. A NEAR restringe a criação de contas com um ponto no nome, de modo que tais contas só possam ser criadas por `conta-de-usuário-A`, como se a conta de usuário fosse um domínio de topo como `sua-empresa.com` se você estiver familiarizado com este modelo.

Usando o NEAR CLI você pode implantar novos contratos na sua conta assim:

```bash
near deploy --wasm-file caminho/para/o/contrato.wasm --account-id contaDoContrato.contaDoDesenvolvedor.testnet --master-account suaConta.testnet
```

Note que para isto funcionar você precisará fazer login com o NEAR CLI e autorizá-lo para usar a conta mestre (`SUA_CONTA.testnet`) em seu nome. Saiba mais sobre o [NEAR CLI aqui](/docs/tools/near-cli)

> Tem alguma dúvida?
   <a href="https://stackoverflow.com/questions/tagged/nearprotocol">
> <h8>Pergunte no StackOverflow!</h8></a>
