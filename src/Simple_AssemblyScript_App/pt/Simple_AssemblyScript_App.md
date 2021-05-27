# App simples em AssemblyScript

\*\*\*\*[**O tutorial original pode ser encontrado na documentação oficial da NEAR aqui**](https://learn.figment.io/network-documentation/near/tutorials/simple-webassembly-script).

## Um jogo multiplayer com estado mundial compartilhado.

Os jogos multiplayer compartilham um único mundo em que todos os jogadores podem afetar. Vamos construir um!

Isso é geralmente estabelecido utilizando um sistema de coordenadas que representa locais no mundo. O mapeamento simples de valor-chave armazena o estado do mundo em coordenadas específicas.

Neste tutorial, escreveremos um jogo muito simples com um estado de mundo compartilhado. O mundo é representado como um campo de jogo quadrado no qual a única propriedade disponível em cada local é sua "cor". Alguns de vocês podem reconhecer isto como "place", o qual se espalhou pela Internet algum tempo atrás.

Abaixo está um exemplo de uma versão em grande escala para a qual muitas pessoas contribuíram.

![space shuttle against starry sky](https://docs.near.org/docs/assets/spaceship-2.png)

#### Vamos começar!

## Passo 1 - Criar um novo projeto de contrato de token no Gitpod

Abra uma nova guia ou janela no navegador:

* Abrir um novo projeto de contrato de token no [Gitpod](https://gitpod.io/#https://github.com/near-examples/token-contract-as)

Quando for aberto no GitPod, o código irá gerar uma conta NEAR única para este projeto e compilar e, então, fazer deploy dos arquivos de template. Você pode ter uma ideia de qual é o nosso ponto de partida visualizando a página aberta.

Na aba do terminal no Gitpod:

* `CMD + clique` em `http://localhost:1234`

Este exemplo de projeto tem um contrato inteligente de token e também alguns testes em JavaScript que invocam funções de contrato inteligente. Existem dois conjuntos de testes que executam esses testes, AS-pect e Jest.

* Jest nos permite realizar testes de integração na rede de testes (testnet) da NEAR.
* AS-pect nos permite testar nosso contrato inteligente em uma rede simulada localmente.

Você pode tentar rodar esses testes imediatamente para ver o código interagindo com a blockchain.

Para executar estes testes...

No Gitpod:

* clique em **Terminal** &gt;&gt; **New Terminal**

Na nova aba que abre no final do Gitpod:

* digite `yarn test` no prompt de comando

Isto irá executar os dois testes e registrar os resultados no seu console. Se você quiser executar apenas uma das suítes de teste, você pode digitar o seguinte no seu terminal.

* `yarn asp` para executar somente testes AS-pect
* `yarn jest` para executar apenas testes Jest

Vá em frente e explore o código nestes testes para obter uma melhor compreensão das ações que realizam.

* Arquivos de teste AS-pect estão localizados em `assembly/__tests__/example.spec.ts` & `token.spec.ts`
* O arquivo de teste Jest está localizado em `src/test.js`

Depois que os testes estiverem concluídos, seus resultados devem ficar assim:

**Teste AS-pect**

![Token Contract AS-pect test](https://docs.near.org/docs/assets/token-contract-aspect-test.png)

**Teste Jest**

![Default Token Contract Test ](https://docs.near.org/docs/assets/default-token-contract-test.png)

Observe que `test-account-tTIMESTAMP-XXXXXXX` é uma conta NEAR gerada automaticamente para este projeto em particular. Tente não se distrair por esses detalhes, mas compare a saída do log do desenvolvedor com as instruções no arquivo `src/test.js`.

{% hint style="info" %}
Não vamos querer nenhum código deste exemplo. Está lá apenas como um ponto de partida.
{% endhint %}

## Passo 2 - Escrever um contrato inteligente

Neste jogo simples, precisamos criar apenas duas ações:

1. Ver o estado do mundo: `getCoords`
2. Faça mudanças no estado de coordenadas específicas: `setCoords`

No arquivo `assembly/main.ts`:

* Substituir **todo o conteúdo do arquivo** pelo seguinte código

```javascript
import { storage } from "near-sdk-as";

export function setCoords(coords: string, value: string): void {
  storage.setString(coords, value);
}

export function getCoords(coords: string): string {
  let result = storage.getString(coords);
  if(result) {
    return result;
  }

  return "";
}
```

Em seguida, precisaremos de uma função `getMap`, que retorna o estado completo do jogo (não queremos fazer uma chamada separada para cada coordenada!)

No mesmo arquivo `assembly/main.ts`:

* Acrescentar o seguinte código no final

```javascript
export function getMap(): string[] {
  let num_rows = 10;
  let num_cols = 10;
  let total_cells = num_rows * num_cols;
  var arrResult:string[] = new Array(total_cells);
  let i = 0;
  for (let row = 0; row < num_rows; row++) {
    for (let col = 0; col < num_cols; col++) {
      let cellEntry = storage.getString(row.toString() + "," + col.toString());
      if(cellEntry) {
        arrResult[i] = cellEntry;
      } else {
        arrResult[i] = "";
      }

      i++;
    }
  }
  return arrResult;
}
```

* Clique em **File** &gt;&gt; **Save** para salvar as alterações

Este contrato inteligente está agora pronto para ser reimplantado na rede de teste NEAR, mas antes de fazer isso, vamos testá-lo localmente para garantir que tudo se comporte como esperado. É aqui que AS-pect vem a calhar!

## Passo 3 - Escreva alguns testes para o contrato

Vamos testar nosso código para garantir que nosso contrato inteligente funcione conforme esperado, escrevendo um teste em JavaScript com AS-pect.

Primeiro vamos deletar um dos antigos arquivos de teste que não funcionarão mais com nosso novo contrato inteligente.

No explorador do Gitpod:

* navegue para `assembly/__tests__/` e expanda a pasta
* clique com o botão direito no `token.spec.ts` e clique em **Delete**
* agora clique em `example.spec.ts`
* Substitua **todo o conteúdo do arquivo** pelo seguinte código

```javascript
import { getMap, setCoords } from "../main";

  describe("getMap", () => {
    it('gets the board state', () => {
       const viewResult = getMap();
       expect(viewResult.length).toBe(100); // board is 10 by 10
    })

  describe("setCoords", () => {
    it("modifies the board state", () => {

       setCoords("0,0", "111111")
       const viewResult = getMap();
       //você pode enviar um log para o console invocando o método log()
       //log(viewResult[0]);
       expect(viewResult.length).toBe(100);
       // entrada 0,0 deve ser 111111!
       expect(viewResult[0]).toBe("111111");
    });
  });
});
```

* Clique em **File** &gt;&gt; **Save** para salvar as alterações

O teste "getMap" simplesmente invoca a função `getMap` do contrato e retorna o estado atual. Nosso teste "setCoords" irá modificar o estado do jogo atualizando uma coordenada do mapa com base nos parâmetros que passamos para a função `setCoords`.

_**Agora execute os seus testes!**_

No seu terminal de teste_**:**_

* digite `yarn asp`

Depois de terminar, você deverá ver os testes aprovados semelhantes aos seguintes:

![AS-pect tests for smart contract game](https://docs.near.org/docs/assets/token-contract-aspect-game-test.png)

Agora que sabemos que nosso código está sendo executado como queremos, podemos fazer deploy do nosso contrato inteligente recém criado na blockchain.

Nas suas janelas do terminal:

* Selecione a primeira aba de terminal à esquerda que está executando o servidor localhost
* Segure `CTRL + C` para parar o servidor e exibir o prompt de comando
* Digite `yarn dev` para reconstruir e republicar o seu contrato modificado

Observe o log do console logo acima de `Server running at http://localhost:1234` que diz `Done deploying to dev-159486XXXXXXX-XXXXXXX`. Esta é a identificação da conta do nosso contrato inteligente que acabamos de criar e também pode ser encontrada em `neardev/dev-account.env`. Ao inserir esse ID na barra de pesquisa do [NEAR Explorer](https://explorer.testnet.near.org/), podemos ver toda a atividade da conta. Se você olhar agora, deve ver a confirmação do contrato do qual estamos fazendo deploy, bem como uma transferência de 500N para a conta. Essa ferramenta será útil mais tarde, para que possamos ver todas as transações que faremos.

## Passo 4 - Fazer uma interface simples

Parabéns! Todo o seu trabalho na blockchain está feito!

Agora, vamos fazer uma interface de usuário (UI) simples em JavaScript. Primeiro, precisaremos inicializar as peças de que precisamos para poder interagir com o contrato inteligente. Então, vamos escrever algumas funções que nos permitirão pintar em nossa tela e salvar as mudanças das coordenadas na blockchain usando o contrato inteligente que escrevemos acima.

No arquivo `src/main.js`:

* Substitua os valores de `viewMethods` e `changeMethods` (linhas 17 & 18) por nossos novos métodos do contrato inteligente.

```javascript
window.contract = await near.loadContract(nearConfig.contractName, {
  viewMethods: ["getMap"],        // <-- encontre esta linha e altere-a para corresponder
  changeMethods: ["setCoords"],   // <-- encontre esta linha e altere-a para corresponder
  sender: window.walletAccount.getAccountId()
});
```

Agora vamos escrever o código do aplicativo "NEAR Place".

No mesmo arquivo `src/main.js`:

* Acrescente o seguinte código ao final do arquivo
* Revise o código e os comentários para ajudá-lo a entender o que está acontecendo

```javascript
// Código do aplicativo NEAR Place

/**
 * inicializar o quadro com cores vazias
 */
function loadBoardAndDraw() {
  const board = getBoard().then(fullMap => {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    let i = 0;
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        let color = fullMap[i] || "000000";
        ctx.fillStyle = "#" + color;
        ctx.fillRect(x * 10, y * 10, 10, 10);
        i++;
      }
    }
  });
}

/**
 * manipular um evento de clique do mouse no elemento de tela
 * @param event o evento gerado pelo clique do mouse na tela
 */
function handleCanvasClick(event) {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  const position = getMousePosition(canvas, event);
  const x = Math.floor(position.x / 10);
  const y = Math.floor(position.y / 10);

  const coords = x + "," + y;
  const rgb = document.getElementById("picker").value;
  ctx.fillStyle = "#" + rgb;
  ctx.fillRect(x * 10, y * 10, 10, 10);

  console.log(`O ponto (${coords}) foi marcado com #${rgb}`);
  let args = {
    coords,
    value: rgb
  };
  window.contract.setCoords(args);
}

/**
 * capturar a posição do mouse
 * @param canvas o elemento da tela na página
 * @param event o evento gerado pelo clique do mouse na tela (veja handleCanvasClick)
 */
function getMousePosition(canvas, event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}

/**
 * obter o mapa da blockchain
 */
async function getBoard() {
  const result = await window.contract.getMap();

  renderBoard(result)
  return result;
}

/**
 * função auxiliar para renderizar a placa para o console do desenvolvedor
 */
function renderBoard(board){

  console.log("\n\nA placa NEAR Place está atualmente armazenada na blockchain como...");
  console.table(array_chunks(board, 10)); // assumindo que a largura das linhas é 10

  // src: https://stackoverflow.com/questions/8495687/split-array-into-chunks#comment84212474_8495740
  function array_chunks(array, chunk_size){
    return Array(Math.ceil(array.length / chunk_size))
              .fill().map((_, index) => index * chunk_size)
              .map(begin => array.slice(begin, begin + chunk_size))
  }
}
```

Em seguida, atualize o seguinte bloco de código para que nosso método `loadBoardAndDraw` seja invocado.

No mesmo arquivo `src/main.js`:

* Acrescente `.then(loadBoardAndDraw)` na linha 43 para ligar ao processo de inicialização do aplicativo

```javascript
window.nearInitPromise = connect()
  .then(updateUI)
  .then(loadBoardAndDraw)         // <-- insira esta linha neste local
  .catch(console.error);
```

Finalmente, precisaremos adicionar um ouvinte de eventos que chamará nossa função `handleCanvasClick` quando interagirmos com a tela. Copie o código abaixo e insira-o logo após os outros dois blocos de código `document.querySelector` (linha 41).

```javascript
document.querySelector('#myCanvas').addEventListener('click', (event) => {
  handleCanvasClick(event);
});
```

_**Quase pronto!**_

Tudo o que falta fazer é atualizar nosso arquivo HTML para renderizar tudo conforme esperado.

No arquivo `src/index.html`:

* Substitua **todo o conteúdo do arquivo** pelo seguinte código

```javascript
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jscolor/2.0.4/jscolor.min.js"></script>
  <title>NEAR PLACE</title>
</head>
<body style="background: #fff">
  <div class="container">
    <div class="jumbotron">
      <h1>NEAR PLACE</h1>
      <p>Imagine seu desenho vivendo <b>para sempre</b> na blockchain.</p>
    </div>
    <div class="sign-in" style="display: none;">
      <p>Você precisa entrar para poder chamar métodos do contrato</p>
      <button class="btn btn-primary">Entrar</button>
    </div>
    <div class="after-sign-in" style="display: none;">
      <div align="center">
        <canvas
          id="myCanvas"
          width="100"
          height="100"
          style="border:1px solid #000000"></canvas>
        </canvas>
      </div>
      <div align="center">
        <input class="jscolor" id="picker" value="ab2567"/><br>
        <label>Selecionar cor &uarr;<label>
      </div>
    </div>
    <div class="after-sign-in sign-out" style="display: none;">
      <button class="btn btn-primary">Sair</button>
    </div>
  </div>
  <script src="https://cdn.jsdelivr.net/gh/nearprotocol/near-api-js/dist/near-api-js.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script>
  <script src="./config.js"></script>
  <script src="./main.js"></script>
</body>
</html>

```

* Clique em **File** &gt;&gt; **Save All** para salvar todas as alterações

**É isso! Agora vamos lançar nosso aplicativo e começar a desenhar na blockchain!**

No Gitpod**:**

* vá para a primeira aba de terminal que tem seu servidor em execução
* `CMD + clique` em `http://localhost:1234`

É assim que o aplicativo deve se parecer ao iniciá-lo:

![NEAR Place webpage on launch](https://docs.near.org/docs/assets/near-place-webpage-on-launch.png)

**Nota:** Se você abrir seu console de desenvolvedor JavaScript (abra antes do carregamento da página, ou abra e atualize a página), você deve ver uma tabela que se parece com isso:

![NEAR Place JavaScript developer console on launch](https://docs.near.org/docs/assets/near-place-console-on-launch.png)

Vá em frente e clique em **Entrar** para conectar este app à sua carteira NEAR. Depois de entrar, você será redirecionado de volta para o seu aplicativo e uma pequena tela preta deverá aparecer. Selecione uma cor e comece a criar arte na blockchain!

![NEAR Place drawing after sign in](https://docs.near.org/docs/assets/near-place-painting.png)

Cada vez que você clicar em uma coordenada e mudar a cor da sua arte, estamos interagindo com a blockchain. O contrato inteligente que escrevemos anteriormente é chamado, executa a transação (gravando-a e armazenando-a em estado), e registra nossa assinatura. Não só sua pintura irá viver para sempre na rede, mas o mesmo acontecerá com cada pincelada de sua criação!

Você pode ver um resumo dessas transações na sua [NEAR Wallet](https://wallet.testnet.near.org/) ou mergulhar mais nos detalhes procurando o ID da sua conta ou o ID da conta do contrato inteligente no [NEAR Explorer](https://explorer.testnet.near.org/).

Viva a programação! 🚀

Se você teve alguma dificuldade após este tutorial ou simplesmente quer discutir tecnicamente a NEAR conosco, você pode [**participar da nossa comunidade hoje mesmo**](https://discord.gg/fszyM7K)!

