# Step 2 – Reading web3

## The goal for today is to read as many contracts as you can.

Try to figure out how to get to the contract code. Then move to quickly read the code. You want to see as much as you can. Ask yourself about the “purpose” of the contract (why is it?) and “code” (what is it?)

* AssemblyScript contracts are files that end in .ts, usually main.ts or index.ts
* Rust contracts are always in a file named lib.rs.

## CORE Activities

Choose AssemblyScript or Rust and REVIEW all 3 contracts labeled as CORE Activity for your language


## BONUS Activities

Clone the [starter repository](https://github.com/Learn-NEAR/starter--AssemblyScript) for AssemblyScript and follow the instructions.

# Resources

## Remember for today’s activity

* You do NOT need to build and test each contract
* You do NOT need to understand every line of code
* You SHOULD simply read through the contracts as if you are looking at art or listening to music without worring about every dot or note

## AssemblyScript

|Name|Notes|Code|
|-|-|-|
|CORE|
|SputnikDAO|This contract is a simple version of a DAO to give out tips, bounties and grants. Allows anyone to send a proposal to reward other people with funds and get a council to vote for it.  The major difference between this and Moloch DAO design is that this contract would receive its function via donation and council has equal rights.|https://github.com/VitalPointAI/SputnikDao-AS-Contract/tree/main/sputnikdao-as|
|Multisig|This contract provides a multisig scheme that allows making transfers, calling functions and adding / removing keys |https://github.com/VitalPointAI/Multisig-Contract|
|Whitelist|The purpose of this contract is to maintain the whitelist of the staking pool contracts account IDs that are approved by NEAR Foundation.  |https://github.com/VitalPointAI/Whitelist-Contract|
|BONUS|
|Counter|This contract implements simple counter backed by storage on blockchain. |https://github.com/near-examples/counter|
|Guest Book|Sign in with NEAR and add a message to the guest book|https://github.com/near-examples/guest-book|
|Cross Contract Calls|This repo is organized around a series of lessons about making cross contract calls|https://github.com/near-examples/cross-contract-calls|
|NEAR Collection Examples|This repository serves to demonstrate differences in gas consumption when storing or retrieving data from the NEAR blockchain using AssemblyScript collection methods found in near-sdk-as.|https://github.com/near-examples/collection-examples-as|
|NEAR AssemblyScript Workshop|This workshop includes several activities that introduce the basic concepts of writing contracts for NEAR Protocol using AssemblyScript|https://github.com/near-examples/workshop--exploring-assemblyscript-contracts|
|NEAR Ice Cream|This dApp demonstrates buying ice cream with NEAR tokens |https://github.com/near/near-icecream|
|Crypto Corgis|This dApp is an implementation of Crypto Kitties for NEAR|https://github.com/nearprotocol/corgis|
|SputnikDAO Factory |This contract is a factory that creates instances of SputnikDAO |https://github.com/VitalPointAI/SputnikDao-AS-Contract/tree/main/sputnikdao-as-factory|
|Voting|Port of NEAR core-contract as AssemblyScript|https://github.com/theophoric/near-core-contracts-as/tree/master/contracts/voting|

---

## Rust

|Name|Notes|Code|
|-|-|-|
|CORE|
|SputnikDAO|This contract is a simple version of a DAO to give out tips, bounties and grants. Allows anyone to send a proposal to reward other people with funds and get a council to vote for it.  The major difference between this and Moloch DAO design is that this contract would receive its function via donation and council has equal rights.|https://github.com/near-daos/sputnik-dao-contract/tree/main/sputnikdao|
|Linkdrop|LinkDrop contract allows any user to create a link that their friends can use to claim tokens even if they don't have an account yet.  |https://github.com/near/near-linkdrop|
|Non-Fungible Token|This repository includes NFT implementations in Rust and AssemblyScript for NEP#4|https://github.com/near-examples/NFT|
|Whitelist|The purpose of this contract is to maintain the whitelist of the staking pool contracts account IDs that are approved by NEAR Foundation.  |https://github.com/near/core-contracts/tree/master/whitelist|
|BONUS|
|wNEAR|The aim of the contract is to enable the wrapping of the native Ⓝ token into a NEP21 compatible token. |https://github.com/near/core-contracts/tree/master/w-near|
|Voting|The purpose of this contract is solely for validators to vote on whether to unlock token transfer. |https://github.com/near/core-contracts/tree/master/voting|
|Staking Pool|This contract provides a way for other users to delegate funds to a single validation node.  |https://github.com/near/core-contracts/tree/master/staking-pool|
|Staking Pool Factory|This contract deploys and automatically whitelists new staking pool contracts. It allows any user to create a new whitelisted staking pool.  |https://github.com/near/core-contracts/tree/master/staking-pool-factory|
|Multisig|This contract provides a multisig scheme that allows making transfers, calling functions and adding / removing keys |https://github.com/near/core-contracts/tree/master/multisig|
|Lockup|This contract acts as an escrow that locks and holds an owner's tokens for a lockup period. |https://github.com/near/core-contracts/tree/master/lockup|
|SputnikDAO Factory|This contract is a factory that creates instances of SputnikDAO |https://github.com/near-daos/sputnik-dao-contract/tree/main/sputnikdao-factory|
|Berryclub|Draw with pixels. Your pixels earn you more pixels, so better artists get more pixels to draw.  |https://github.com/evgenykuzyakov/berryclub|
|Fungible Token|This repository includes FT implementations in Rust and AssemblyScript for NEP#21 - Fungible Token  |https://github.com/near-examples/FT|
|Counter|This contract implements simple counter backed by storage on blockchain. |https://github.com/near-examples/rust-counter|
|Voting App|This is an example implementation of a voting app on NEAR|https://github.com/near-examples/voting-app|
|NEAR Collection Examples|This repository serves to demonstrate differences in gas consumption when storing or retrieving data from the NEAR blockchain using Rust collection methods found in near-sdk-rs.  |https://github.com/near-examples/collection-examples-rs|

---
