---
id: staking-overview
title: Orientações sobre Staking
sidebar_label: Orientações
---

## Bem Vindo

Nesta seção você será introduzido aos princípios do staking e a como rodar seu próprio nó validador.

Protocolo NEAR usa Proof-of-Stake (PoS) para fazer a segurança da blockchain. Os _Validadores_ são a comunidade de operadores de nó que tomam conta do [consenso da blockchain](../roles/integrator/faq#which-consensus-algorithm-does-near-use). Tecnicamente, os _nós validadores_ são servidores que agregam transações em blocos, os executam, e mantém o último estado da blockchain. Os donos desses nós, os _Validadores_, ganham prêmios por seu serviço no final de cada época (\~12 horas).

Todos os Validadores devem deixar uma certa quantia de tokens NEAR em _stake_, o que representa um colateral contra um possível comportamento desonesto. _Tokens em stake_ não podem ser gastos: se um Validador desonesto atacar o consenso da blockchain, o protocolo progressivamente destrói seu stake (veja [slashing](staking-faq#what-is-a-slashing-behavior)). Tokens em Stake podem ser _desbloqueados_ a qualquer momento, mas continuam sem poder ser gastos por três épocas, mesmo que o nó validador fique offline ou decida parar de validar.

O protocolo NEAR escolhe automaticamente os melhores validadores com um leilão. Qualquer um que esteja executando um nó de validação pode participar fazendo stake de seus tokens. No final de cada época, o protocolo NEAR seleciona automaticamente os nós com a maior participação, tornando-os elegíveis para gerar novos blocos e obter recompensas. Se o stake é pequeno demais, o nó de validação não receberá um _lugar de validador_ e funcionará como um nó de retransmissão normal, esperando pela próxima época (veja a [dinâmica de mercado](economics#understand-market-dynamics) na página da economia de validador).

Validadores podem aumentar seu stake, e assim suas recompensas, pedindo _delegação_. Delegação é a oportunidade para todos os titulares de tokens participarem em parceria com um validador, alugando uma pequena porção do seu nó de validação. _Delegadores_ podem travar seus fundos em uma [_staking pool_](https://github.com/near/core-contracts), e receber recompensas no final de cada época, menos as taxas pagas ao Validador.

As recompensas NEAR são previsíveis e proporcionais ao seu stake. O protocolo gera novos tokens a uma taxa de \~5% da oferta total (anualizada) e a maioria deles são recompensas. Como exemplo, se a oferta total for um bilhão de tokens, e as recompensas anuais forem \~4.5%, todos os validadores dividirão 45 milhões de tokens NEAR (veja a [página sobre economia](/docs/validator/economics) para mais detalhes). Independente se você ser validador ou delegador, quanto mais stake você faz, maior é a sua parte dessas recompensas.


## Para Delegadores
Se você quer recompensas por fazer staking, mas não quer executar seu próprio nó de validação, mesmo assim gaste algum tempo para conhecer a economia da NEAR e o que é preciso para se tornar um grande validador. Estes são alguns bons pontos de partida:

1. Entenda a [economia de um validador](/docs/validator/economics)
2. Veja os validadores atuais no [explorador de blocos](https://explorer.near.org/nodes/validators). Colete informações sobre sua confiabilidade, taxas e stake atual.
4. Planeje adequadamente sua custódia de tokens, a partir das [opções de custódia disponíveis](../tokens/token-custody).
5. Verifique o que os validadores oferecem para você, pergunte se eles usam a [staking pool](https://github.com/near/core-contracts) dos contratos principais NEAR ou seus próprios contratos inteligentes.
6. Se você é proficiente com a interface de linha de comando, consulte a [página sobre delegação](/docs/validator/delegation) para obter uma lista de comandos de baixo nível que você pode usar para fazer stake.
7. Junte-se aos canais dos validadores no [Discord](https://near.chat) para fazer perguntas e conhecer a comunidade de staking da NEAR.

<blockquote class="info">
    <strong>você sabia?</strong><br><br>
    O protocolo NEAR não pune os delegadores. Então, se o seu validador favorito errar e for cortado, você só perderá algumas recompensas, e seu stake permanecerá intacto.
</blockquote>

## Para Validadores
You are decided to see how deep the rabbit hole goes? No worries! NEAR is like many other Proof of Stake networks: keep your servers online \~100% of the time, be always ready to update your node, participate in the community. However, you have important differentiation factors, such as staking via smart contracts; planned protocol upgrades without hard forks; gas fees that burn tokens instead of giving rewards.

You can find additional material below:

1. Understand the [Economics of a Validator](/docs/validator/economics)
2. Check the basic [staking commands](/docs/validator/staking)
3. Deploy your staking pool from the [core contracts](https://github.com/near/core-contracts)


You are still here? If you want to learn more about NEAR, have a look at
* [The Beginner’s Guide to the NEAR Blockchain](https://near.org/blog/the-beginners-guide-to-the-near-blockchain/) to get a high level overview on NEAR.
* [The NEAR Whitepaper](https://near.org/papers/the-official-near-white-paper) to see the big picture.
* [Economics in Sharded Blockchain](https://near.org/papers/economics-in-sharded-blockchain/) to know more about the incentives structure of NEAR.
* [Sharding Design: Nightshade](https://near.org/papers/nightshade) to gain a more detailed understanding of the consensus mechanism.

If anything is unclear or you get stuck, please head over to our official chat on [Discord](https://near.chat), and join the validators section.

<blockquote class="warning">
    <strong>Heads up!</strong><br><br>
    Once you open the Discord link above, you must complete an automated verification and enable your role as "validator", otherwise you'll not be able to send messages in the validator channels.
</blockquote>

## Stake Wars testnet

Stake Wars was NEAR's incentivized testnet for professional validators. This initiative is over, but you can still learn from it.

NEAR’s [MainNet](https://explorer.near.org/) is now "community governed" ([see full roadmap](https://near.org/blog/mainnet-roadmap/) and the [launch blogpost](https://near.org/blog/near-mainnet-phase-2-unrestricted-decentralized/)) so any validator can join. However, the network is running on a single shard, temporarily limiting the available slots for validators. As a result, you may need a high amount of tokens (around 1% of the total stake) to have your node _elected_ as a block producer, and receive the rewards.

While the network is getting additional shards and become more accessible for smaller validators, you can still use the [Stake Wars repo](https://github.com/nearprotocol/stakewars) to understand the techincal needs, test the stability of your system, and learn some of the unique aspects of NEAR’s delegation in preparation for the next phase of the protocol.

If you want to know more about this opportunity, read the ["Stake Wars is Over, but We’re Just Getting Started" blog post](https://near.org/blog/stake-wars-is-over-but-were-just-getting-started/).
> Got a question?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol">
  <h8>Ask it on StackOverflow!</h8></a>
