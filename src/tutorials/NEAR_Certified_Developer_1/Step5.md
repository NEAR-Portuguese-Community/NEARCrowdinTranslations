# Step 5 – Deploying web3

## The goal is to deploy your contracts and verify they work.

When we say “application” on NEAR we usually mean software that has been written to define:

1. on-chain data and behavior controlled by smart contracts (eg. NFT contract)
2. off-chain data and behavior communicating with smart contracts (eg. web app)
We have looked at many contracts and applications and now we will deploy them.

Deploying to MainNet is out of scope so we will focus on TestNet and, as bonus activity, LocalNet where you can build in private. Anything that runs on TestNet should work just as well on MainNet. This is the only purpose of TestNet, in fact: to provide a full preview of our work before we take it live on MainNet.

## CORE Activities

### 1. Deploy at least one application to TestNet

* Choose any one (or more) of the contracts and applications you saw on Day 1 and Day 2. It doesn’t matter, when deploying, whether the application is written in Rust or AssemblyScript. All contract code is compiled to WebAssembly and deployed to the network to be run inside a Wasm-compatible virtual machine.
* You will use a command like yarn dev for most applications but you can just as easily deploy an application using NEAR CLI with near dev-deploy for TestNet (or near deploy if you have already created an account).

### 2. Verify the application was deployed

* Use NEAR Explorer to verify the deployment (find evidence of the deployment to the target account to which the contract was deployed)

* Use NEAR CLI to issue the command near state <contract-account> and notice that the code_hash is not the default value of all 1s

### 3. Verify your use of the application

* Use NEAR Explorer to verify the deployment (find a record of any transactions related to your account or related the target account to which the contract was deployed)
