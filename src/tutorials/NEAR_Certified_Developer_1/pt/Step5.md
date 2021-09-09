# Passo 5 – Implantando web3

## O objetivo é implantar seus contratos e verificar se eles funcionam.

Quando dizemos "aplicativo" no NEAR costumamos dizer software que foi escrito para definir:

1. on-chain data and behavior controlled by smart contracts (eg. NFT contract)
2. off-chain data and behavior communicating with smart contracts (eg. web app) We have looked at many contracts and applications and now we will deploy them.

Deploying to MainNet is out of scope so we will focus on TestNet and, as bonus activity, LocalNet where you can build in private. Tudo o que for executado na TestNet deve funcionar bem na MainNet. This is the only purpose of TestNet, in fact: to provide a full preview of our work before we take it live on MainNet.

## Principais atividades

### 1. Implantar pelo menos uma aplicação no TestNet

* Escolha um (ou mais) dos contratos e aplicativos que você viu no dia 1 e dia 2. Não importa, ao implantar, se o aplicativo é escrito em Rust ou AssemblyScript. Todo o código do contrato é compilado para WebAssembly e implantado na rede para ser executado dentro de uma máquina virtual compatível com Wasm.
* Você usará um comando como o yarn dev para a maioria dos aplicativos, mas você pode também fazer o deploy de um aplicativo usando NEAR CLI com near dev-deploy para TestNet (ou near deploy se você já criou uma conta).

### 2. Verifique se a aplicação foi implantada

* Use NEAR Explorer to verify the deployment (find evidence of the deployment to the target account to which the contract was deployed)

* Use o NEAR CLI para executar o comando near state <contract-account> e note que o code_hash não é o valor padrão de todos os 1s

### 3. Verifique o seu uso da aplicação

* Use o NEAR Explorer para verificar a implantação (localize um registro de quaisquer transações relacionadas à sua conta ou relaciona a conta de destino na qual o contrato foi implantado)
