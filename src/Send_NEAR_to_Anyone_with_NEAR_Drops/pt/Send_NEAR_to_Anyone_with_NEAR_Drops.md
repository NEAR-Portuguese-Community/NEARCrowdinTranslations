# Envie NEAR para qualquer pessoa com NEAR Drops

Por mais importante que seja a escalabilidade (apenas dê uma olhada no ETH Gás Station para ver quão importante), há mais para uma boa experiência de usuário do que apenas transações-por-segundo.

Nós queremos que a rede NEAR seja fácil de usar tanto para desenvolvedores quanto para usuários finais: contas de usuários têm nomes legíveis, os desenvolvedores podem pagar taxas em nome dos seus usuários e os contratos inteligentes podem ser construídos com linguagens de programação populares.

E agora, os usuários e aplicativos podem enviar NEAR para qualquer pessoa, quer ela tenha uma conta NEAR ou não.

# Uma Jeito Melhor de Introduzir Usuários

Apresentando o NEAR Drops: uma ferramenta que faz a introdução de usuários ser muito mais simples na rede NEAR.

Basicamente, a NEAR Drops permite que você envie um link para quem quiser com um certo valor de $NEAR vinculado a ele. Isto permite:

1. Desenvolvedores de apps introduzirem usuários e pagarem por sua conta NEAR
2. Usuários enviaren $NEAR para seus amigos, tendo eles uma conta ou não

For app developers, NEAR Drops substantially improve the user onboarding process. Simply send new users a NEAR Drop referral link, they’ll be redirected to the NEAR Wallet’s account creation page, and they can create an account called [user].near. That’s it. They now have a NEAR account.

On NEAR, a user account is similar to a smart contract account on Ethereum, plus an Ethereum Name Service (ENS) name. This means that users get a readable account name and advanced key management, but it also means that creating a user account requires some $NEAR. With NEAR Drops, users can create an account without needing to have any $NEAR themselves.

# How NEAR Drops Work

There are two main functions in the NEAR Drop contract: send and create_account_and_claim. The send function is called to initiate the NEAR drop, and requires a $NEAR deposit, which will pay for the account creation costs and be transferred to the end recipient. The function takes the public key of a public/private keypair as an argument, adds the key to the NEAR Drop contract as an authorized access key, and records the $NEAR deposit as owned by the public key.

Next, the developer sends the private key to the end user, generally in the form of a referral link. The user will go through the NEAR Wallet onboarding process and choose an account name. In the Wallet,  a new public/private keypair is generated, and the Wallet calls the create_account_and_claim function with the user’s selected account name. This transaction is signed by the private key received in the link from the previous step, as only this key is authorized to call the NEAR Drop contract and retrieve the deposited $NEAR.

In turn, create_account_and_claim will recover the public key from the signature, create an account with the chosen account name, add the new public key (of which the private key is only known by the recipient) as the full access key for the new account, fund it with the $NEAR (less transaction fees), and remove the original public key as an access key on the contract.

And Voila! The user now has a non-custodial, funded NEAR account.

# Experimente!

Você pode testar o NEAR Drops sozinho aqui: https://near-drop-mainnet.onrender.com/

Após o login:

1. Selecione "Create New NEAR Drop".
2. Insira a quantidade de NEAR que você gostaria de adicionar ao link (tente 5)
3. Autorize a transação
4. Copie o link e envie para um amigo! (Ou abra você mesmo)

If you want to dive even deeper into the technical details, the code for NEAR drops is publicly available in the near-linkdrop repository (from line 48).We believe that NEAR drops significantly reduces the barriers of entry to the NEAR platform and are excited to see our community start using it!
