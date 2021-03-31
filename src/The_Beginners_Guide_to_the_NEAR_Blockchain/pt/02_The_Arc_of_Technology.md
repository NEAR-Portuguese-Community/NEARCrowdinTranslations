## O Arco da Tecnologia

Vale a pena verificar rapidamente como chegamos aqui porque irá ajudá-lo a entender o contexto do ecossistema atual. Em [um post recente](https://near.org/blog/the-evolution-of-the-open-web/) entramos em mais detalhes, mas aqui vai uma versão rápida:

**Bitcoin** é o "dinheiro programável" ou "ouro digital" original. Ele tem feito um bom trabalho cumprindo essas funções, mas seu uso até agora como uma plataforma de computação de uso mais geral (como nós estamos construindo) é em grande parte um acidente. Basicamente, desenvolvedores viram que eles podiam adaptar alguns programas básicos sobre a funcionalidade limitada que o Bitcoin forneceu e começaram a usar o Bitcoin como base para algumas dessas novas aplicações, porque agora é altamente confiável e seguro.

Infelizmente, as transações são muito caras e, como isso definitivamente NÃO era o que a plataforma Bitcoin se destinava, a funcionalidade é muito limitada. A plataforma é lenta (aproximadamente 4 transações por segundo), cara e um enorme desperdício de energia global.

**Ethereum**, lá atras em 2014, tentou endereçar diretamente esse caso de uso criando uma plataforma que era, desde de o dia 1, destinada ao uso da mesma tecnologia de blockchain para construir um computador virtual global onde qualquer aplicação poderia ser construída.

Então, se o Bitcoin era realmente uma calculadora básica, Ethereum era uma elegante calculadora de gráficos TI-83, na qual você poderia desenvolver algumas coisas interessantes, até jogos se fossem básicos. Embora isso coloca muitas boas ideias em questão, continua sendo lento (14 transações por segundo) e ainda é bastante custoso para os desenvolvedores usarem. Eles tem tendado dar melhorar isso, mas agora estão tendo dificuldades nessa mudança, por causa de quanto trabalho técnico, valor armazenado e crescimento da comunidade já ocorreu no seu modelo legado.

**“Layer 2” scaling** solutions, including “state channels” and “side chains”, have popped up to try and improve the performance and cost of these slower (but rather secure) platforms by taking some of the work off the main chain and doing it elsewhere. They exist for both Bitcoin and Ethereum but haven’t achieved the adoption we hoped.

**The first serious challenger blockchains** launched in 2017–2018 with a wide variety of approaches to helping the scaling problem. They generally tried centralizing more of the hardware (eg EOS) but most of the approaches are still ultimately bounded by a fixed limit because every single one of the “nodes” that make up the network are repeating the exact same work, whether there are 21 of them or 1,000. So these approaches have been able to achieve throughputs of thousands (or more) transactions per second but often sacrifice decentralization to do so.

**Next generation scalable blockchains** like NEAR represent the new wave. In this case, NEAR breaks free from the idea that every single node which participates in the network has to run all of the code because that essentially creates one big wasteful bottleneck and slows down all of the other approaches.

To fix this, NEAR uses a technique called “sharding” from the database world (technical explanation) which splits the network so that much of the computation is actually being done in parallel. This allows the network’s capacity to scale up as the number of nodes in the network increases so there isn’t a theoretical limit on the network’s capacity.

Unlike a lot of other sharding approaches, which still require nodes to be run on increasingly complex hardware (reducing the ability of more people to participate in the network), NEAR’s technique allows nodes to stay small enough to run on simple cloud-hosted instances.

Mas não é tudo sobre dimensionamento. In fact, for scaling to even be a benefit, **developers need to be able to create apps that people actually use** and current blockchains make this difficult on both the developer and the end-user. Many of these issues have to be addressed by setting up the protocol properly from the beginning and few projects who focus on scalability have taken this properly into account.

For example, many scalability solutions require developers to build and provision their own blockchain (or “app chain”), which is a massive amount of work and maintenance, and it seems equally as unnecessary for most teams as building and on-premise server farm would be for most traditional web developers. By comparison, NEAR allows developers to just deploy their app without thinking too much about how the infrastructure around it operates or scales, which is more like the modern clouds like Amazon AWS or GCP or Azure which drive almost all of today’s web applications.
