# Step 3 – Writing web3

## The goal for today is to write contracts that compile.

Make sure you clone every repository and build it locally. Getting each application running is as important as reading the code because today you will be focused on understanding how all the moving parts work.

If you get stuck on one application for some reason, just ask for help in Discord and MOVE ON immediately. If possible, don’t wait for someone to reply before you continue or you will lose time.

## CORE Activities

In the Resources section below choose AssemblyScript or Rust

* REVIEW all 3 applications labeled as CORE Activity for your language

If you prefer to have specific steps, you could do something like this to study each contract or dApp carefully:

1. Pick any contract from Step 2 or dApp from Step 3 (see below)
2. Clone the repo locally (or in Gitpod if using Windows)
3. Make sure you can find the contract source code and that you can compile the contract to a .wasm file
4. Test the contract somehow so you know it’s working. You can do this using NEAR CLI commands or by running existing unit or simulation tests, or even by using a web interface if the dApp has one. The KEY idea here is to make sure you will NOTICE a change to the contract if you make one
5. Make any small change to the contract. Not a big change, but something simple.
6. Rebuild and retest (repeat steps 3 & 4)
7. Did the change you made work as expected? Or did you break something?
8. Ask for help if you need it
9. Keep repeating 6-7-8 until your confidence increases… until you believe you understand the contract and can control it
10. Delete the contract and write it again from your notes (you took notes right?). You can also just rewrite small parts of the contract, of course.

# Resources

## Remember for today’s activity

* You DO need to build (and run tests, if available for) each dApp (“decentralized app”)
* You should TRY to understand EVERY line of code in the contract

## AssemblyScript

|Name|Notes|Code|
|-|-|-|
|CORE|
|Guestbook|Leave a message with an optional donation|https://github.com/near-examples/guest-book|
|Simple Counter|This contract implements simple counter backed by storage on blockchain.|https://github.com/near-examples/counter|
|Simple Counter without SDK|This example shows how to make a simple NEAR AssemblyScript contract. Normally the SDK does a lot behind the scenes. When calling a function with arguments it deserializes it for you, so in this example each exposed function has no arguments. Furthermore, if a function returns a value the SDK will serialize it for you too, so again these functions do not return anything.  Unfortunately current the serialization must be imported, which adds bloat to the generated binary. In this example we only use the host imports and the generated optimized binary is only 309 bytes!  The advantage to using AssemblyScript is that you can write code that generates Wasm text that is readable and close to the code that you wrote. This makes AssemblyScript a great language to learn about WebAssembly!|https://github.com/near-examples/simple_counter_as|
|BONUS|
|Exploring NEAR Protocol APIs|This workshop includes several activities:  - a client-side playground to better understand how near-api-js works - a console-based challenge to practice using NEAR Shell to manage keys, create accounts and deploy contracts - a monitoring challenge to apply lessons about near-api-js and JSON RPC API into a single interface |https://github.com/near-examples/workshop--exploring-near-apis|
|Exploring AssemblyScript Contracts|This workshop includes several activities:  - a scavenger hunt through several AssemblyScript projects to get you quickly oriented - a debugging challenge to fix a few failing unit tests with broken contracts - a development lifecycle challenge to guide you through NEAR platform tools for testing - a design challenge to create new contracts and related models that satisfy a set of requirements |https://github.com/near-examples/workshop--exploring-assemblyscript-contracts|
|Example of NEAR Wallet integration|This example demonstrates how to integrate your application with NEAR Wallet. The contract is quite simple. It can store the account_id of last sender and return it. It also shows how you can debug contracts using logs.|https://github.com/near-examples/wallet-example|
|Jest tests that run on TestNet |Explore new ways of running tests on NEAR|https://github.com/near-examples/jestnet|

---

## Rust

If this is your first time using Rust on your computer, please follow this [Intro to Rust](https://docs.near.org/docs/tutorials/contracts/intro-to-rust) in our docs. The “3-Step Rust Installation” will help you install the required software.

|Name|Notes|Code|
|-|-|-|
|CORE|
|NEAR Names|Invite users to a seamless onboarding process|https://github.com/near-examples/nearnames|
|Live App Review 6 - Progressive Onboarding|Companion repository for these videos:   - https://www.youtube.com/watch?v=Y-HYCcYVmz8 - https://www.youtube.com/watch?v=W29QmxiJh84 - https://www.youtube.com/watch?v=8kbxBqDSe_A|https://github.com/near-apps/prog-onboarding|
|Live App Review 7 - Coin Flip |Companion repository for this video: https://www.youtube.com/watch?v=mr6GdB7CHPg|https://github.com/near-apps/coin-flip|
|BONUS|
|NEAR Place|Draw with pixels. Your pixels earn you more pixels, so better artists get more pixels to draw.|https://github.com/near-examples/place|
|Proof of Work Transfer Faucet|(please note that the repository name is the NOT the same as the name of the application.  "Token Printer" is the friendly dApp name but technically this is a faucet with the additional feature of making the user complete some proof of work to take time between requests for tokens.  also note that "proof of work" here is NOT related to network consensus and proof of stake for NEAR or proof of work for Bitcoin and Ethereum 1.0 ... "proof of work" is a general term for any algorithm that consumes verifiable time and cannot be tricked to work faster)  This example consists of 2 parts:  - Transfer Faucet contract that allows to transfer tokens to a desired account for doing required Proof of Work - Faucet frontend that allows to enter the account ID to receive transfer|https://github.com/near-examples/token-printer|
|NEAR Voting Application|A voting app that allows users to create multiple-choice polls, capture votes and render results|https://github.com/near-examples/voting-app|
|Simple Counter|This contract implements simple counter backed by storage on blockchain.|https://github.com/near-examples/rust-counter|
|Simulation Testing|The purpose of this repository is to illustrate how to write simulation tests for smart contracts. This is particularly useful for decentralized apps that make use of cross-contract calls.|https://github.com/near-examples/simulation-testing|
|WebRTC Live streaming|Stream live from the browser. Let other people connect by URL using NEAR|https://github.com/near-examples/webrtc-live|
|[WIP] Web RTC Chat|WebRTC based video calls using NEAR to establish connection|https://github.com/near-examples/webrtc-chat|
|Token Factory|Issue your own token and without touching a line of code. Use the advanced UI features including image processing and integer rounding techniques to create and issue the most sophisticated fungible tokens.|https://github.com/near-examples/token-factory|
|LinkDrop Frontend|The app allows you to send funds to the Linkdrop contract which will create "Drops". You will have a list of these in local storage and you can remove them at any time. This claims the funds back to your current account.|https://github.com/near-examples/rust-linkdrop-app|
|Poker|Play online poker without third parties (and without fees). Bet with NEAR. Profit. Based on Mental Poker algorithm proposed by Shamir, Rivest, Adleman.|https://github.com/near-examples/poker|
|Unlimited NEAR Place|Draw with pixel for free using contract account funds.|https://github.com/near-examples/free-place|
|NEAR Delegation App|Example frontend for delegating to staking pool on NEAR|https://github.com/near-examples/delegation-app|
|NEAR Message|Frontend for status message demo|https://github.com/near-examples/near-msg|
|Fungible Token - NEP 141|This is ONLY A TEST of the fungible token standard and a wrapped version of NEAR tokens.  Even the repo for the token standard and wrapped NEAR is a WIP branch.|https://github.com/near-apps/ft-141-demo|
|wNEAR|This is ONLY A TEST of the fungible token standard and a wrapped version of NEAR tokens.  Even the repo for the token standard and wrapped NEAR is a WIP branch.|https://github.com/near-apps/w-near-test|
|Live App Review 1 - App Access Keys|Companion repository for this video: https://www.youtube.com/watch?v=dT99JLpO2Q8|https://github.com/near-apps/nearbp|
|Live App Review 4 - Cross Contract Calls|Companion repository for this video:  https://www.youtube.com/watch?v=aX7uG3yzUzI|https://github.com/near-apps/cross-contract|
|Social Token Drop Template|Companion repository for this video: https://www.youtube.com/watch?v=IWHmG6WCiPA|https://github.com/near-apps/social-drop|
|Social Token Drop PART 2|Companion repository for this video: https://www.youtube.com/watch?v=899I-V6olTM|https://github.com/near-apps/social-drop-2|
|Live App Review 5 - Payments API Part 1|Companion repository for this video: https://www.youtube.com/watch?v=0MySC4UDCXM|https://github.com/near-apps/payments-api|
|Live App Review 8 - Payments Contract (Payments API Part 2) |Companion repository for this video: https://www.youtube.com/watch?v=540WO236bhA|https://github.com/near-apps/payments-contract|
|Live App Review 9 - Subscription Contract + App (Payments API Part 3) |Companion repository for this video: https://www.youtube.com/watch?v=SAMFNaB5ca4|https://github.com/near-apps/subscription-contract|
|NEAR Accounts Marketplace |https://near.bet  You can offer your brilliant account names, obtain perfect names for personal usage or business, or bet onto cheap bids to increase their price and get up to 50% rewards.  Everything is built decentralized way, there are two separate contracts keeping consistency and security.|https://github.com/Kouprin/accounts-marketplace/|
