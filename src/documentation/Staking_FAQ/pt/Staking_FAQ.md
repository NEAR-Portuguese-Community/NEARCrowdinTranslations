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
- Coletar as ofertas dos novos validadores

Para uma época, os validadores são atribuídos aleatoriamente em shards. Depois que a época acabou, os validadores são reorganizados e atribuídos a shards diferentes. Os validadores participam de várias rodadas de validação no decorrer da época. Para cada rodada, um dos validadores em cada shard é escolhido como produtor de chunks e um validador é escolhido de todo o conjunto de validadores para ser o produtor de blocos.

### Qual é a quantia mínima que deve ser colocada em stake como um validador?

Na MainNet, a quantidade mínima é dinâmica e é definida pela quantidade de tokens NEAR colocados em stake por outros validadores.

### O que é um comportamento de slashing?

Para dar segurança à sua rede Proof-of-Stake, o protocolo NEAR pune os validadores que fazem transições de estado inválidas. Um exemplo é a assinatura de dois blocos com a mesma altura (isso também é definido como um 'equívoco'). Quando isso acontece, o stake do validador é progressivamente destruído ou 'cortado', com base na entidade do ataque.

### O protocolo NEAR aplica slashing por falta de atividade?

Não. No entanto, o protocolo mede a atividade de cada validador e se os blocos gerados forem menos de 90% do esperado, o nó será expulso e perderá seu lugar. Neste caso, um validador pode re-fazer staking após duas épocas, e começar a assinar blocos novamente após três épocas.

### Quais são as responsabilidades de um validador?

Em linhas gerais, os validadores devem executar o nó e geralmente estar online. Além disso, eles precisam estar constantemente conectados ao [chat oficial do Slack](https://near.chat) no canal `#community-validator-announcement`, para o caso de emergências e hard forks futuros. Além disso, é muito importante manter as chaves privadas seguras, caso contrário os adversários podem usá-las para assinar blocos maliciosos e acionar o slashing do protocolo.

### Posso fazer stake em um shard diferente?

Não há como um validador escolher o shard. O protocolo atribui aleatoriamente validadores a shards no início de cada época. O nó possui uma época para baixar seu estado. Os nós NEAR têm uma rotina automática de 'coleta de lixo' que deleta o estado de shards anteriores após cinco épocas, para liberar armazenamento não utilizado. Grandes validadores terão que gerar blocos assinando em vários shards, portanto é importante dimensionar o servidor e a rede adequadamente.

### Como eu executo um nó?

Siga [este tutorial.](/docs/develop/node/validator/running-a-node)

### Do validators receive incentives for testing the protocol?

We don’t offer rewards to validators at this point in time. However, we may offer bounties for reporting critical bugs or valuable contributions to the codebase on [GitHub](https://github.com/near/nearcore). Just keep an eye for all the “good first issue” posts. In the meantime, join the channel `#community-validator-announcement` on our [Official Slack](https://near.chat) to be constantly updated, and be the first to know if we plan to offer incentives in the future.

### Como funciona a delegação de staking?

NEAR doesn’t implement delegation on the protocol level. Instead NEAR allows smart contracts to stake, because in NEAR contracts and accounts are the same.

Thus, if validators want to accept delegated stake, they must deploy a contract with specific rules of how delegation and reward splitting works and advertise that contract as destination to delegate.  See the [delegation docs](/docs/validator/delegation) for more.

### Onde posso encontrar a pasta neardev/?
*Ultima atualização: ???*

Once you run 'near login', a folder, called 'neardev', will be created in the directory in which you ran 'near login'.

### Posso ser um validador na rede TestNet?
*Ultima atualização: ???*

Not at this time. MainNet and TestNet networks are run only by a set of permissioned validators. If you want to test your setup, you can configure your node to run on BetaNet, by following the tutorial on [Github](https://github.com/nearprotocol/stakewars) and requesting some BetaNet tokens via [this form](https://forms.gle/kZk2Gv79TB9qm3KP7).

### Why did my node get kicked-out of the validation process on BetaNet?
*Ultima atualização: ???*

Considering that you are running betanet, you might be kicked out because your node is not producing enough blocks. Please try again or open an issue on [GitHub](https://github.com/nearprotocol/stakewars) if you are experiencing reoccurring issues.

Please note that sometimes we had to reset the BetaNet, and nodes might need to be reinstalled to work properly. We normally announce these updates in our official join the channel `#community-validator-announcement` on our [Official Slack](https://near.chat) and Stake Wars repo on [Github](https://github.com/nearprotocol/stakewars).

### After logging in using NEAR CLI with 'near login', I always receive an error message “Exceeded 10 status check attempts.” How should I solve this?
*Ultima atualização: ???*

This means that something is broken in the wallet, please reach out to us on Slack for troubleshooting.

### Could someone permissionlessly delegate to me as a validator?
*Ultima atualização: 20200501*

It is important to remember that delegation is not implemented on the protocol level, which means each validator can have their own contract that they use to attract delegators. Delegation is supposed to be permissionless, but of course the validators can write their own staking contract to be permissioned if they would like. Also they get to decide commission fees and how reward distribution works.


### My stake has been delegated but rewards aren't showing up. How do I see them?
*Ultima atualização: 20201022*

If a staking pool hasn't had an action applied to it recently (like someone delegating or undelegating), it will show an old balance on all staked accounts (which may show up on your wallet account).  To see an updated balance, you can "ping" the pool. See the [delegation docs](/docs/validator/delegation) and search for `ping` for how to do this.

Tem alguma dúvida?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol">
  <h8>Pergunte no StackOverflow! </h8>
</a>
