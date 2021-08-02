---
id: staking-faq
title: Staking FAQ
sidebar_label: Staking FAQ
---

### O que é um validador?

Usamos o termo validador para se referir a um nó que esteja engajado na construção e manutenção da rede. Existem três papéis para os quais os validadores são automaticamente selecionados:

1. Produtor de bloco
2. Produtor de pedaço de bloco
3. Pescadores são validadores

O produtor de bloco é responsável pela criação e transmissão do bloco que contém todos os pedaços atuais (blocos de fragmentos). Em comparação, o produtor de pedaços de blocos coleta transações para o fragmento dado.

A coleção de transações para o fragmento é chamada de um pedaço (chunk). Uma vez criado um pedaço e um bloco, a informação têm de ser comunicada a outros produtores de pedaços, pescadores e outros nós validadores na rede. Os pescadores e outros nós validadores fornecem segurança verificando a validade das transições de estado em blocos diferentes.

### Como posso me tornar um validador?

Você precisa de uma conta com valor suficiente de fundos. Siga a documentação [aqui](/docs/validator/staking) para entender como se tornar um validador, e [aqui](/docs/develop/node/validator/running-a-node) para executar um nó.

Passos mais específicos:
1. Criar um novo par de chaves que será usado para staking para determinada conta, e carregá-lo com os fundos que você deseja colocar em stake
2. Iniciar um nó com o novo par de chaves armazenado em `validator_key.json`
3. Enviar uma transação de staking usando sua carteira / CLI com sua conta, incluindo o valor e a chave pública do par de chaves recém-geradas.
4. Aguarde até que o nó se torne um validador

<blockquote class="warning">
<strong>Atenção</strong><br><br>

Os validadores externos não podem se juntar à MainNet nem à TestNet, só podem testar seus nós na BetaNet. Mais informações abaixo

</blockquote>

### O que é 'staking'?

Chamamos de staking um processo de envio de `StakeTransaction` que informa a rede que uma determinada conta deseja se tornar um validador nas próximas épocas. Este tipo específico de transação deve fornecer uma chave pública e um valor de staking. Depois que a transação for enviada, um nó que tenha uma chave privada associada com a chave pública da transação de staking deve esperar até duas épocas para se tornar um validador. **importante**: um nó pode se tornar um validador somente se o valor na transação de staking estiver acima do preço do lugar definido pelo protocolo.

### O que é uma época?

Uma época é o intervalo de tempo que consiste de várias rodadas de consenso. Note-se que não há garantia do número exato de rodadas de consenso. Atualmente, uma época dura cerca de metade de um dia e é usada para
- Medir o desempenho e uptime dos validadores
- Collect the bids from new validators

For one epoch, validators are randomly assigned into shards. After the epoch is over, validators are reshuffled and assigned to different shards. Validators participate in several validation rounds within the epoch. For each round, one of the validators in each shard is chosen to be the chunk producer and one validator is chosen of the entire set of validators to be the block producer.

### Qual é a quantia mínima que deve ser colocada em stake como um validador?

On the MainNet, the minimum amount is dynamic, and is defined by the amount of NEAR tokens put at stake by other validators.

### What is a slashing behavior?

In order to secure its Proof-of-Stake network, NEAR Protocol punish the validators that commit invalid state transitions. An example is signing two blocks with the same height (this is also defined as 'equivocation'). When this happens, the validator's stake is progressively destroyed, or 'slashed', based on the entity of the attack.

### Is NEAR enforcing liveness fault slashing?

No. However, the protocol measures the uptime of each validator, and if the generated blocks are less than 90% of expected, the node will be kicked-out and lose its seat. In this case, a validator can re-stake after two epochs, and begin to sign blocks again after three epochs.

### What are the responsibilities of a validator?

High level, validators must run node and be mostly online. Also, they have to be constantly connected on the official [Slack chat](https://near.chat) in the `#community-validator-announcement` channel, in case of emergencies and upcoming hard forks. Also, it is very important to keep private keys safe, otherwise adversaries might use them to sign malicious blocks, and trigger the protocol slashing.

### Can I stake on a different shard?

There's no way for a validator to decide the shard. The protocol randomly assigns validators to shards at the beginning of each epoch. The node has one epoch to download its state. NEAR nodes have an automatic 'garbage collection' routine that deletes the state of previous shards after five epochs, to free up unused storage. Large validators will have to generate blocks signing across multiple shards, therefore it's important to size server and networking accordingly.

### How do I run a node?

Follow [this tutorial.](/docs/develop/node/validator/running-a-node)

### Do validators receive incentives for testing the protocol?

We don’t offer rewards to validators at this point in time. However, we may offer bounties for reporting critical bugs or valuable contributions to the codebase on [GitHub](https://github.com/near/nearcore). Just keep an eye for all the “good first issue” posts. In the meantime, join the channel `#community-validator-announcement` on our [Official Slack](https://near.chat) to be constantly updated, and be the first to know if we plan to offer incentives in the future.

### How does delegating staking works?

NEAR doesn’t implement delegation on the protocol level. Instead NEAR allows smart contracts to stake, because in NEAR contracts and accounts are the same.

Thus, if validators want to accept delegated stake, they must deploy a contract with specific rules of how delegation and reward splitting works and advertise that contract as destination to delegate.  See the [delegation docs](/docs/validator/delegation) for more.

### Where can I find the neardev/ folder?
*Last updated: ???*

Once you run 'near login', a folder, called 'neardev', will be created in the directory in which you ran 'near login'.

### Can I be a validator on the TestNet network?
*Last updated: ???*

Not at this time. MainNet and TestNet networks are run only by a set of permissioned validators. If you want to test your setup, you can configure your node to run on BetaNet, by following the tutorial on [Github](https://github.com/nearprotocol/stakewars) and requesting some BetaNet tokens via [this form](https://forms.gle/kZk2Gv79TB9qm3KP7).

### Why did my node get kicked-out of the validation process on BetaNet?
*Last updated: ???*

Considering that you are running betanet, you might be kicked out because your node is not producing enough blocks. Please try again or open an issue on [GitHub](https://github.com/nearprotocol/stakewars) if you are experiencing reoccurring issues.

Please note that sometimes we had to reset the BetaNet, and nodes might need to be reinstalled to work properly. We normally announce these updates in our official join the channel `#community-validator-announcement` on our [Official Slack](https://near.chat) and Stake Wars repo on [Github](https://github.com/nearprotocol/stakewars).

### After logging in using NEAR CLI with 'near login', I always receive an error message “Exceeded 10 status check attempts.” How should I solve this?
*Last updated: ???*

This means that something is broken in the wallet, please reach out to us on Slack for troubleshooting.

### Could someone permissionlessly delegate to me as a validator?
*Last Updated: 20200501*

It is important to remember that delegation is not implemented on the protocol level, which means each validator can have their own contract that they use to attract delegators. Delegation is supposed to be permissionless, but of course the validators can write their own staking contract to be permissioned if they would like. Also they get to decide commission fees and how reward distribution works.


### My stake has been delegated but rewards aren't showing up. How do I see them?
*Last updated: 20201022*

If a staking pool hasn't had an action applied to it recently (like someone delegating or undelegating), it will show an old balance on all staked accounts (which may show up on your wallet account).  To see an updated balance, you can "ping" the pool. See the [delegation docs](/docs/validator/delegation) and search for `ping` for how to do this.

Got a question?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol">
  <h8>Ask it on stack overflow! </h8>
</a>
