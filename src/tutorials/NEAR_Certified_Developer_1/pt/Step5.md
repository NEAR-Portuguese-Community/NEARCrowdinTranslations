# Passo 5 – Implantando a web3

## O objetivo é implantar seus contratos e verificar se eles funcionam.

Quando dizemos "aplicativo" no NEAR costumamos dizer software que foi escrito para definir:

1. dados na blochain e comportamento controlado por contratos inteligentes (por ex. contrato NFT)
2. dados e comportamento fora da blockchain comunicando com contratos inteligentes (ex. aplicativo web) Nós analisamos muitos contratos e aplicativos e agora vamos fazer deploy deles.

O deploy na MainNet está fora de escopo, por isso nos concentramos na TestNet e, como atividade bônus, a LocalNet, em que você poderá construir de forma privada. Tudo o que rodar na TestNet deve funcionar igualmente bem na MainNet. Este é o único objetivo da TestNet, de fato: fornecer uma prévia completa do nosso trabalho antes de o colocarmos no ar na MainNet.

## Principais atividades

### 1. Implantar pelo menos uma aplicação no TestNet

* Escolha um (ou mais) dos contratos e aplicativos que você viu nos dias 1 e 2. Não importa, ao implantar, se o aplicativo é escrito em Rust ou AssemblyScript. Todo o código do contrato é compilado para WebAssembly e implantado na rede para ser executado dentro de uma máquina virtual compatível com Wasm.
* Você usará um comando como o yarn dev para a maioria dos aplicativos, mas você pode também fazer o deploy de um aplicativo usando NEAR CLI com near dev-deploy para TestNet (ou near deploy se você já criou uma conta).

### 2. Verifique se a aplicação foi implantada

* Use o NEAR Explorer para verificar o deploy. Ele localiza evidências do deploy para a conta de destino na qual o contrato foi implantado.

* Use o NEAR CLI para executar o comando near state <contract-account> e note que o code_hash não é o valor padrão de todos os 1s

### 3. Verifique o seu uso da aplicação

* Use o NEAR Explorer para verificar a implantação (localize um registro de quaisquer transações relacionadas à sua conta ou relacionada à conta de destino na qual o contrato foi implantado)
