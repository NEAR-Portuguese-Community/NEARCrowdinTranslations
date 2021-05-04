# App simples em AssemblyScript

\*\*\*\*[**O tutorial original pode ser encontrado na documentação oficial da NEAR aqui**](https://learn.figment.io/network-documentation/near/tutorials/simple-webassembly-script).

## A multiplayer "Place" game with shared world state.

Os jogos multijogador compartilham um único mundo que todos os jogadores podem afetar. Vamos construir um!

Isso é geralmente estabelecido utilizando um sistema de coordenadas que representa locais no mundo. O mapeamento simples de valor-chave armazena o estado do mundo em coordenadas específicas.

In this tutorial, we will write a very simple game with a shared world state. The world is represented as a square playing field with the only property available at each location is its "color". Some of you may recognize this as "place", which made its way around the Internet a while ago.

Abaixo está um exemplo de uma versão em grande escala para a qual muitas pessoas contribuíram.

![space shuttle against starry sky](https://docs.near.org/docs/assets/spaceship-2.png)

#### Vamos começar!

## Step 1 - Create a new Token Contract Project in Gitpod

Abra uma nova guia ou janela no navegador:

* Open a new Token Contract Project in [Gitpod](https://gitpod.io/#https://github.com/near-examples/token-contract-as)

When this opens in GitPod, the code will generate a unique NEAR account for this project and build then deploy the template files. You can take a look at what we're starting with by viewing the launched webpage.

Na aba terminal Gitpod:

* `CMD + clique` em `http://localhost:1234`

This sample project has a token smart contract and also some JavaScript tests that invoke smart contract functions. There are two testing suites that perform these tests, AS-pect and Jest.

* Jest allows us to perform integration tests on NEAR's testnet network.
* AS-pect allows us to test our smart contract on a locally mocked network.

You can try running these tests right away to see the code interacting with the blockchain.

Para executar estes testes...

No Gitpod:

* clique em **Terminal** &gt;&gt; **New Terminal**

Na nova aba que abre no final do Gitpod:

* digite `yarn test` no prompt de comando

Isto irá executar os dois testes e registrar os resultados no seu console. Se você quiser executar apenas uma das suítes de teste, você pode digitar o seguinte no seu terminal.

* `yarn asp` to run only AS-pect tests
* `yarn jest` para executar apenas testes Jest

Go ahead and explore the code in these tests to get a better understanding of the actions they perform.

* AS-pect test files are located in `assembly/__tests__/example.spec.ts` & `token.spec.ts`
* The Jest test file is located in `src/test.js`

Once the testing suites are complete, your test results should look like this:

**AS-pect Test**

![Token Contract AS-pect test](https://docs.near.org/docs/assets/token-contract-aspect-test.png)

**Jest Test**

![Default Token Contract Test ](https://docs.near.org/docs/assets/default-token-contract-test.png)

Note that `test-account-tTIMESTAMP-XXXXXXX` is an automatically generated NEAR account for this particular project. Try not to be distracted by these details, but compare the developer log output with the statements in the file `src/test.js`.

{% hint style="info" %}
We are not going to keep any of the code from this template. It's just there as a starting point.
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

Copy
```

Em seguida, precisaremos de uma função `getMap`, que retorna o estado completo do jogo \(não queremos fazer uma chamada separada para cada coordenada!\)

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

Copy
```

* Clique em **File** &gt;&gt; **Save** para salvar as alterações

Este contrato inteligente está agora pronto para ser reimplantado na rede de teste NEAR, mas antes de fazer isso, vamos testá-lo localmente para garantir que tudo se comporte como esperado. This is where AS-pect comes in handy!

## Passo 3 - Escreva alguns testes para o contrato

Lets test our code to make sure our smart contract works as expected by writing a JavaScript test in AS-pect.

First lets delete one of the old test files that will no longer work with our new smart contract.

In Gitpod's explorer:

* navigate to `assembly/__tests__/` and expand the folder
* right click on `token.spec.ts` and click **Delete**
* now click on `example.spec.ts`
* Replace the **entire contents of the file** with the following code

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

Copy
```

* Clique em **File** &gt;&gt; **Save** para salvar as alterações

O teste "getMap" simplesmente invoca a função `getMap` do contrato e retorna o estado atual. Nosso teste "setCoords" irá modificar o estado do jogo atualizando uma coordenada do mapa com base nos parâmetros que passamos para a função `setCoords`.

_**Agora execute os seus testes!**_

No seu terminal de teste_**:**_

* digite `yarn asp`

Depois de terminar, você deverá ver os testes aprovados semelhantes aos seguintes:

![AS-pect tests for smart contract game](https://docs.near.org/docs/assets/token-contract-aspect-game-test.png)

Now that we know our code is executing as intended, our newly created smart contract can be deployed with confidence to the blockchain.

Nas suas janelas do terminal:

* Selecione a primeira aba de terminal à esquerda que está executando o servidor localhost
* Segure `CTRL + C` para parar o servidor e exibir o prompt de comando
* Digite `yarn dev` para reconstruir e republicar o seu contrato modificado

Notice the console log right above `Server running at http://localhost:1234` that says `Done deploying to dev-159486XXXXXXX-XXXXXXX`. This is the account ID of our smart contract we just created and can also be found in `neardev/dev-account.env`. By entering this ID in the [NEAR Explorer](https://explorer.testnet.near.org/) search bar, we can see all of the account activity. If you look now, you should see confirmation of the contract being deployed as well as a transfer of 500 Ⓝ to the account. This tool will come in handy later so we can view all of the transactions we'll make.

## Passo 4 - Fazer uma interface simples

Parabéns! Todo o seu trabalho na blockchain está feito!

Now, let's make a very simple JavaScript user interface \(UI\). First, we'll need to initialize the pieces we need so we can interact with the smart contract. Then, we'll write a few functions that will allow us to paint on our canvas and save coordinate changes to the blockchain using the smart contract we wrote above.

No arquivo `src/main.js`:

* Replace the values of `viewMethods` and `changeMethods` \(lines 17 & 18\) with our new smart contract methods.

```javascript
window.contract = await near.loadContract(nearConfig.contractName, {
  viewMethods: ["getMap"],        // <-- find this line and change it to match
  changeMethods: ["setCoords"],   // <-- find this line and change it to match
  sender: window.walletAccount.getAccountId()
});
Copy
```

Now lets write the "NEAR Place" application code.

In the same file `src/main.js` :

* Append the following code to the bottom of the file
* Review the code and comments to help you understand what's taking place

```javascript
// NEAR Place application Code

/**
 * initialize the board with empty colors
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
 * handle a mouse click event on the canvas element
 * @param event the event raised by mouse click on the canvas
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

  console.log(`The point (${coords}) was set to color #${rgb}`);
  let args = {
    coords,
    value: rgb
  };
  window.contract.setCoords(args);
}

/**
 * capture the mouse position
 * @param canvas the canvas element on the page
 * @param event the event raised by mouse click on the canvas (see handleCanvasClick)
 */
function getMousePosition(canvas, event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}

/**
 * get the map from the blockchain
 */
async function getBoard() {
  const result = await window.contract.getMap();

  renderBoard(result)
  return result;
}

/**
 * helper function to render the board to the developer console
 */
function renderBoard(board){

  console.log("\n\nThe NEAR Place board is currently stored on the blockchain as ...");
  console.table(array_chunks(board, 10)); // assuming rows are 10 wide

  // src: https://stackoverflow.com/questions/8495687/split-array-into-chunks#comment84212474_8495740
  function array_chunks(array, chunk_size){
    return Array(Math.ceil(array.length / chunk_size))
              .fill().map((_, index) => index * chunk_size)
              .map(begin => array.slice(begin, begin + chunk_size))
  }
}

Copy
```

Next, update the following block of code so our `loadBoardAndDraw` method gets invoked.

No mesmo arquivo `src/main.js`:

* Chain `.then(loadBoardAndDraw)` on line 43 and a half to hook into the application launch process

```javascript
window.nearInitPromise = connect()
  .then(updateUI)
  .then(loadBoardAndDraw)         // <-- insert this line in this location
  .catch(console.error);
Copy
```

Finally, we will need to add an event listener that will call our `handleCanvasClick` function when we interact with the canvas. Copy the code below and insert it right after the other two `document.querySelector` code blocks \(line 41 and a half\).

```javascript
document.querySelector('#myCanvas').addEventListener('click', (event) => {
  handleCanvasClick(event);
});
Copy
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
      <p>Imagine your drawing living <b>forever</b> on the blockchain.</p>
    </div>
    <div class="sign-in" style="display: none;">
      <p>You'll need to sign in to call contract methods</p>
      <button class="btn btn-primary">Sign In</button>
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
        <label>Select Color &uarr;<label>
      </div>
    </div>
    <div class="after-sign-in sign-out" style="display: none;">
      <button class="btn btn-primary">Sign Out</button>
    </div>
  </div>
  <script src="https://cdn.jsdelivr.net/gh/nearprotocol/near-api-js/dist/near-api-js.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script>
  <script src="./config.js"></script>
  <script src="./main.js"></script>
</body>
</html>

Copy

```

* Clique em **File** &gt;&gt; **Save All** para salvar todas as alterações

**É isso! Agora vamos lançar nosso aplicativo e começar a desenhar no blockchain!**

No Gitpod**:**

* vá para a primeira aba de terminal que tem seu servidor em execução
* `CMD + clique` em `http://localhost:1234`

This is what the app should look like as soon as it launches:

![NEAR Place webpage on launch](https://docs.near.org/docs/assets/near-place-webpage-on-launch.png)

**Note:** If you open your JavaScript developer console \(open before the page loads, or refresh the page afterwards\) you should see a table that looks like this:

![NEAR Place JavaScript developer console on launch](https://docs.near.org/docs/assets/near-place-console-on-launch.png)

Go ahead and click **Sign In** to connect this app to your NEAR Wallet. After you log in, you will be redirected back to your app and a small black canvas should appear. Select a color and start creating art on the blockchain!

![NEAR Place drawing after sign in](https://docs.near.org/docs/assets/near-place-painting.png)

Each time you click a coordinate and change the color in your canvas we are interacting with the blockchain. The smart contract we wrote earlier gets called, executes the transaction \(recording and storing it in-state\), and logs our signature. Not only will your painting live forever on the network, but so will every brushstroke of its creation!

You can view a summary of these transactions in your [NEAR Wallet](https://wallet.testnet.near.org/) or dive deeper into the details by searching for your account ID or the smart contract account ID in [NEAR Explorer](https://explorer.testnet.near.org/).

Viva a programação! 🚀

Se você teve alguma dificuldade após este tutorial ou simplesmente quer discutir tecnicamente a NEAR conosco, você pode [**participar da nossa comunidade hoje mesmo**](https://discord.gg/fszyM7K)!
