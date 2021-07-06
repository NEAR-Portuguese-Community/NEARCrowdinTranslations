# Envie NEAR para qualquer pessoa com NEAR Drops

Por mais importante que seja a escalabilidade (apenas dê uma olhada no ETH Gás Station para ver quão importante), há mais coisas importantes para uma boa experiência de usuário além das transações-por-segundo.

Nós queremos que a rede NEAR seja fácil de usar tanto para desenvolvedores quanto para usuários finais: contas de usuários têm nomes legíveis, os desenvolvedores podem pagar taxas em nome dos seus usuários e os contratos inteligentes podem ser construídos com linguagens de programação populares.

E agora, os usuários e aplicativos podem enviar NEAR para qualquer pessoa, quer ela tenha uma conta NEAR ou não.

# Melhorando a Integração de Novos Usuários

Apresentando o NEAR Drops: uma ferramenta que faz a introdução de usuários ser muito mais simples na rede NEAR.

Basicamente, a NEAR Drops permite que você envie um link para quem quiser com um certo valor de $NEAR vinculado a ele. Isto permite:

1. Desenvolvedores de apps introduzirem usuários e pagarem por sua conta NEAR
2. Usuários enviarem $NEAR para seus amigos, tendo eles uma conta ou não

Para desenvolvedores de aplicativos, o NEAR Drops melhora substancialmente o processo de introdução do usuário. Basta enviar um link de referência para novos usuários, eles serão redirecionados para a página de criação de conta da NEAR Wallet, podendo assim criarem uma conta chamada [nome].near. É isso! Eles agora têm uma conta NEAR.

Na NEAR, uma conta de usuário é similar a uma conta de contrato inteligente da Ethereum, somada a um nome Ethereum Name Service (ENS). Isso significa que os usuários obtêm um nome de conta legível e com um avançado gerenciamento de chaves, mas também significa que a criação de uma conta de usuário requer alguns $NEAR. Com NEAR Drops, os usuários podem criar uma conta sem precisar ter nenhum $NEAR próprio.

# Como o NEAR Drops Funciona

Existem duas funções principais no contrato NEAR Drop: send e create_account_and_claim. A função send é chamada para iniciar o NEAR Drops, e requer um depósito de $NEAR, que pagará pelos custos de criação da conta e será transferido para o beneficiário final. A função recebe a chave pública de um par de chaves público/privado como um argumento, adiciona a chave do contrato NEAR Drop como uma chave de acesso autorizada, e registra o depósito $NEAR como pertencente à chave pública.

Em seguida, o desenvolvedor envia a chave privada para o usuário final, geralmente na forma de um link de referência. O usuário passará pelo processo de introdução da NEAR Wallet e escolherá um nome de conta. Na carteira, um novo par de chaves público/privado é gerado, e a carteira chama a função create_account_and_claim com o nome de conta selecionado. Esta transação é assinada pela chave privada recebida no link do passo anterior, pois somente esta chave está autorizada a chamar o contrato da NEAR Drop e recuperar o depósito de $NEAR.

Por sua vez, create_account_and_claim irá recuperar a chave pública da assinatura, criar uma conta com o nome escolhido, adicionar a nova chave pública (da qual a chave privada é conhecida apenas pelo destinatário) como a chave de acesso total para a nova conta, depositar fundos com o $NEAR (diminuindo as taxas de transação) e remover a chave pública original como chave de acesso no contrato.

E Voila! O usuário agora possui uma conta NEAR sem custódia e com fundos.

# Experimente!

Você pode testar o NEAR Drops sozinho aqui: https://near-drop-mainnet.onrender.com/

Após o login:

1. Selecione "Create New NEAR Drop".
2. Insira a quantidade de NEAR que você gostaria de adicionar ao link (tente 5)
3. Autorize a transação
4. Copie o link e envie para um amigo! (Ou abra você mesmo)

Se você quiser se aprofundar ainda mais nos detalhes técnicos, o código para o NEAR Drops está disponível publicamente no repositório `near-linkdrop` (a partir da linha 48). Nósacreditamos que o NEAR Drops diminui significativamente as barreiras de entrada na plataforma NEAR e estamos animados para ver a nossa comunidade começar a usá-la!
