## The Arc of Technology

It’s worth checking in quickly with how we got here because it will help you understand the context of the current ecosystem. [A recent post](https://near.org/blog/the-evolution-of-the-open-web/) goes into greater detail but here’s the quick version:

**Bitcoin** is the original “programmable money” or “digital gold”. It has been doing a pretty good job of fulfilling those functions but its use so far as a more general-purpose computing platform (like we’re building) is mostly an accident. Essentially, developers saw they could hack together some basic programs on top of the limited functionality that Bitcoin provided and they began using Bitcoin as the base for some of these new applications because it’s now highly trusted and secure.

Unfortunately, transactions are very costly and, because this was definitely NOT what the Bitcoin platform was meant for, the functionality is very limited. The platform there is slow (roughly 4 transactions per second), costly, and a massive waste of global energy.

**Ethereum**, back in 2014, tried to directly address this use case by creating a platform that was, from day 1, intended to use the same blockchain technology to build a global virtual computer which any application could be built on top of.

So, if Bitcoin was really just a basic calculator, Ethereum was a fancy TI-83 graphing calculator on which you could write some interesting, if basic, games. While it put lots of good ideas into place, it is also rather slow (14 transactions per second) and still quite costly for developers to use. They’ve tried to upgrade this but are now having difficulty pivoting because of how much technical work, value storage and community growth has already occurred in their legacy model.

**“Layer 2” scaling** solutions, including “state channels” and “side chains”, have popped up to try and improve the performance and cost of these slower (but rather secure) platforms by taking some of the work off the main chain and doing it elsewhere. They exist for both Bitcoin and Ethereum but haven’t achieved the adoption we hoped.

**The first serious challenger blockchains** launched in 2017–2018 with a wide variety of approaches to helping the scaling problem. They generally tried centralizing more of the hardware (eg EOS) but most of the approaches are still ultimately bounded by a fixed limit because every single one of the “nodes” that make up the network are repeating the exact same work, whether there are 21 of them or 1,000. So these approaches have been able to achieve throughputs of thousands (or more) transactions per second but often sacrifice decentralization to do so.

**Next generation scalable blockchains** like NEAR represent the new wave. In this case, NEAR breaks free from the idea that every single node which participates in the network has to run all of the code because that essentially creates one big wasteful bottleneck and slows down all of the other approaches.

To fix this, NEAR uses a technique called “sharding” from the database world (technical explanation) which splits the network so that much of the computation is actually being done in parallel. This allows the network’s capacity to scale up as the number of nodes in the network increases so there isn’t a theoretical limit on the network’s capacity.

Unlike a lot of other sharding approaches, which still require nodes to be run on increasingly complex hardware (reducing the ability of more people to participate in the network), NEAR’s technique allows nodes to stay small enough to run on simple cloud-hosted instances.

But it’s not all about scaling. In fact, for scaling to even be a benefit, **developers need to be able to create apps that people actually use** and current blockchains make this difficult on both the developer and the end-user. Many of these issues have to be addressed by setting up the protocol properly from the beginning and few projects who focus on scalability have taken this properly into account.

For example, many scalability solutions require developers to build and provision their own blockchain (or “app chain”), which is a massive amount of work and maintenance, and it seems equally as unnecessary for most teams as building and on-premise server farm would be for most traditional web developers. By comparison, NEAR allows developers to just deploy their app without thinking too much about how the infrastructure around it operates or scales, which is more like the modern clouds like Amazon AWS or GCP or Azure which drive almost all of today’s web applications.
