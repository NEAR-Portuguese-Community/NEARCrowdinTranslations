---
id: staking
title: Executando um Nó de Validação
sidebar_label: Executando o Nó
---

## Staking na BetaNet oficial

### _LEIA ESTA PARTE ANTES DE COMEÇAR_

Aguarde até que o seu nó esteja totalmente sincronizado antes de enviar uma transação de staking. Um nó fora de sincronização não pode produzir ou validar blocos, então se você for escolhido como validador, você está correndo o risco de ser expulso da coleção de validadores e perder suas recompensas se o seu nó não mantém o tempo de uptime apropriado (ou seja, validar/produzir o número de blocos necessários para esse período).

Staking está desabilitado na *TestNet*, então vamos trabalhar na *BetaNet*. Portanto, você terá que configurar o seu NEAR Shell para BetaNet em duas etapas.
1. Para esta sessão atual: execute o comando `export NODE_ENV=betanet`
2. Adicione esta mesma linha (`export NODE_ENV=betanet`) ao final do arquivo `~/.bashrc` para garantir que esta variável de ambiente persista se a máquina reiniciar.

Agora você pode usar os serviços online da BetaNet abaixo:

|            ⛔️ TestNet             |             ✅ BetaNet             |
|:---------------------------------:|:---------------------------------:|
| https://explorer.testnet.near.org | https://explorer.betanet.near.org |
|  https://wallet.testnet.near.org  |  https://wallet.betanet.near.org  |
|   https://rpc.testnet.near.org    |   https://rpc.betanet.near.org    |

Please also note that BetaNet will be reset every Tuesday at 6pm, to deploy the weekly release. You will have to restart your node (stop and start the service) to trigger the automatic update by `nearup` and avoid to lose your status of validator. Join NEAR Protocol [validator channel on Telegram](https://t.me/near_validators) or [Discord](https://discord.gg/ZMPr3VB) to know when the new node release is deployed, and you can safely restart your node.


## Node requirements

To become a validator, you need a node running on your machine or cloud provider with the following minimum spec:

```bash
At least 2 CPUs
At least 4GB RAM
At least 50 GB free disk
```

## Setting up your environment

**IMPORTANT: Make sure you have the latest version of NEAR Shell and Node Version; 12.x**

If this is not the case, follow the setps below to set up your environment; don't worry this won't take long. To stake, make sure that you have

* an account with tokens on **BetaNet**. If you have not set up an account yet, please navigate to the following page, set it up and come right back: [Create Account](../local-setup/create-account.md). Remember to use the [BetaNet wallet](https://wallet.betanet.near.org)!
* `near-shell`, our CLI tool, which which will require [node.js](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/get-npm). You can check whether you have node.js and npm already installed by

  1. Open your command line;
  2. Type in
    ```bash
    node -v
    ```
    This should display your node version in the command line.
    ```bash
    npm -v
    ```
    This should display your npm version in the command line.

    Otherwise, go ahead and install it with the following links [node.js](https://nodejs.org/en/download/). Note that node usually installs npm automatically. However, if you miss npm, please install it [from here](https://www.npmjs.com/get-npm).

Once node and npm are installed, go ahead and download the Near Shell; type the following in your terminal:

```bash
# Download Near Shell with npm:
npm i -g near-shell
```
Once Near Shell is installed, go ahead and run your node.

### Run a Node

Now that you have the Near Shell, we can set-up your node. Please follow [Nearup documentation](https://github.com/near/nearup).

**IMPORTANT you will need your account ID here, which is your username from the account that you created in the previous step.**

Please come back to this screen, once you have completed the previous steps.

When asked for the account ID, enter the username of the account you want to stake with. You will be returned a public key used for staking; this will look similar to:

```bash
Stake for user 'thefutureisnear.test' with 'ed25519:97JLghrxUQMaX2pcerVB5FNFu4qk8rx8J3fnWRyoEB7M'
```

Make sure you copy this validator\_key as you will need it for the next step. You can also find this public key at the following path in your near files `~/.near/betanet/validator_key.json`

## Send a staking transaction

Awesome! Once you completed the previous steps, you are all set for staking.

First let's authenticate near shell by running the command `near login`

You will be asked to navigate to a url to authenticate your staking account.

```bash
Please navigate to this url and follow the instructions to log in:
https://wallet.betanet.near.org/login/?title=NEAR+Shell&public_key=FSgxX7YwuCveCeYqsSAB3sD8dgdy3XBWztCQcEjimpaN
```
Once done, enter that account ID in the shell:

```bash
Please enter the accountId that you logged in with:
```

When you have entered your account ID, it will display the following message:

`Missing public key for <asdfasdf> in default` `Logged in with masternode24`

This message is not an error, it just means that it will create a public key for you.

Now you're ready to send a staking transaction.

```bash
near stake <accountId> <staking public key> <amount to stake>
```

Staking 50,000 NEAR should be enough on BetaNet.

You should see a success message that looks something like:

```text
Staking 50000 on thefutureisnear with public key = A4inyaard6yzt1HQL8u5BYdWhWQgCB87RbRRHKPepfrn.
```

<blockquote class="warning">
    <strong>heads up</strong><br><br>
    NEAR Protocol provides contract-based delegation. Take some time to learn more, reading the Stake Wars Ep.II <a href="https://near.org/blog/stake-wars-episode-ii/" target="_blank">blog post</a>.
</blockquote>

## Being chosen to become a validator

After this, you will need to wait the ~6 hours bonding period on BetaNet to see if you have staked enough to become a validator. You can see you are a validator when in the logs of the node you see "V/" - where V means this node is currently a validator.

![](assets/validators%20%281%29.png)

Legend: # 7153 | BlockHeight V/1 | 'V' (validator) or '—' (regular node)

The 0/0/40 shows the total validators: connected peers / up to date peers / my peers. This number may change over time.

To learn more about how validators are chosen, take a look at the [Validator FAQ](../validator/validator-faq.md).

## See current list of Validators and stake amounts

To see the current list of validators, you can take a look here: [http://rpc.betanet.near.org/status](http://rpc.betanet.near.org/status)

If you would like to see how much a validator is staking, you can run the command `near state <account name>`in Near Shell.

```bash
{
  amount: '100011163887239132720351',
  code_hash: '11111111111111111111111111111111',
  locked: '97985903901882082761',
  storage_paid_at: 25,
  storage_usage: 182
}
```

## Automatically re-staking

NEAR Protocol automatically re-stake your rewards, unless you decide to unlock the funds. Issue the command `near stake` again, with a lower value, and your funds will be unlocked within three epochs (~9 hours on BetaNet, ~36 hours on TestNet).
