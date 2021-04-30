**Um Guia para Iniciantes sobre a Carteira NEAR e o Processo de Staking**

Devido à demanda popular, aqui está um guia completo. nem um pouco chato, sobre como criar uma carteira e fazer staking de $NEAR no protocolo NEAR. Vamos manter isso simples e fácil. É sobre isso que vamos falar:

*   Criação de uma conta na NEAR.
*   Adição de fundos à conta
*   O que acontece se você não adicionar fundos à sua conta
*   Como importar ou adicionar uma conta
*   Como fazer stake, escolher um validador, e desfazer o stake
*   Como conectar sua conta a um Dapp na NEAR
*   Como monitorar o rendimento percentual anual (APY) do seu staking

Hopefully this guide will be nice and straightforward, but if it’s not, feel free to ask further questions in the [NEAR Wallet Support Group on Telegram](https://t.me/NEARSupport).

Okay let’s get started!

**Step 1**

To get started with everything, you will want to go to [https://wallet.near.org/](https://wallet.near.org/). This is your homebase. If you have already created an account and you don’t want to connect a new Account to that existing one, then you can open up an incognito browser. If it’s your first time it will bring you to this page below:

**Step 2**

Assuming you are planning on creating an account, you will want to select the blue box on the left — ‘Create Account’. The screen below is what will pop up:

This is where you have the opportunity to create a NEAR Account. It can be a bit tricky if you are unfamiliar with the process so bear with me.

You pick your account name and then click ‘Create Account’. In the example below I picked the name ‘Examplesample’ but you can pick anything. And no, you cannot change your account name once you have claimed (although you can buy and sell it).

Next you need to agree to terms and conditions and privacy policy. That is two quick check marks on the left (unless you want to read it lol).

Okay, this is the next screen that pops up. You need to choose your security method. Note: This can be changed after the account is created, but you should still select the one that is going to be most secure (i.e. use a _Recovery Phrase_ or a _Ledger Nano S or X_).

The next screen I took off, because it is the seed phrase. It should be 12 characters long. You will want to **absolutely back up that phrase.** Backing up means, put it on 4 pieces of paper. Give one piece to your mom, another in your sock drawer, a third for your bank box and a fourth for the bottom of a file cabinet in an envelope labelled ‘boring’. Most people don’t lose funds from having their seed phrase compromised: Most lose it and never get it back.

**And as a quick side note:** Your seed phrase is your access to your wallet. Don’t share it with anyone ever. If you lose it there is no customer support to get it back so make sure you really back up those phrases.

To make sure you have got the seed phrase correctly recorded, you will be prompted to input one of the words at random. After you do that, you will be brought to this screen:

Here is where things can get a little tricky. NEAR is built around an Account model, where users have human readable ID’s. In order to get that ID though, you need to fund your account with 1 NEAR. So here is how you get the ID you selected earlier on in the process:

1.  You keep the window open. Under no circumstances in the process should you close the window. If your computer freezes and you have to restart, you will have to start all over again and re-input the desired account, get a new seed phrase, and so forth.
2.  Now, in another window, you want to go to your exchange account that you bought NEAR from, and send 1 NEAR (or maybe 2–3) to this one time funding address. The key here is _in another window._ Do not close the window with the above image on it. A list of exchanges that currently offer $NEAR can be found [here](https://coinmarketcap.com/currencies/near-protocol/markets/).
3.  A second option is to fund your new account with Moonpay. Under this option you will click the second lower button and go through the moonpay creation and funding process.
4.  A third option is to request from a friend or someone who has NEAR to send you 1 NEAR to your temporary alphanumeric address. **Remember, don’t close the original window under any circumstances.**

**But wait, what if I accidentally closed the window after it told me not to?** If you did it on a normal browser, you can go back to [https://wallet.near.org/](https://wallet.near.org/) and it will have you logged in with that as your address. You will still be able to receive NEAR from that address, it just won’t be a real NEAR Account. If this happens, you won’t be able to upgrade and you will have to start over again with a new account and seed phrase.

Once you have finally received that 1 NEAR to the Open Window, that you will never close, the screen below is what you should see. Congratulations your account is funded and that account ID is yours forever (or until you decide to sell it).

**Step 3**

Get setup with your account. Now that your account is funded you click ‘_Continue to Account’_ to get onto the wallet home interface.

**Note:** Once you are on the home interface there are different options available on the top left of the bar. On the right column you can see your different security permissions. Remember at the beginning when I mentioned how you can change up security after you are all set up? Well now is the time that you can do that. You can enable Email and Phone access on top of your seed phrase for quicker access.

**Enabling other forms of access:**

Below that, you can look into ‘**Enabling 2 Factor Authentication**’ from your email. This is highly recommended, as it means that even if your account is compromised, no action can be taken without first confirming that action with a special code sent to your email.

**Step 4: Adding or Importing an Account**

Before we get into the nitty gritty of staking, you might want to connect other existing NEAR Accounts you have set up to the wallet interface. This will allow you to navigate quickly between accounts. On the top right corner you can either click _import_ or _create new account._

If you want to **_Import an existing account_** you just have to click the _‘recover’_ seed phrase box and input that account’s seed phrase. Nice.

Alright, if you have made it this far, well done. You are now set up with your NEAR Account and ready to stake. Just as a quick reminder: From the moment your account has been funded the sole method of receiving and sending NEAR and any token from the wallet is via your newly created Account ID. Do not ever use the temporary address again once your account has been funded.

**Staking from the NEAR Wallet**

This next part will go into the details on how to stake and unstake from the NEAR wallet. Like the setup, it’s pretty easy once you are familiar with the process.

**Step 1: Staking NEAR**

Go to the **_Staking_** tab on the top left of the screen. Click on it and you will get a screen as displayed below.

This is the first step in staking. You will want to click the blue button ‘Stake My Tokens’. Once you do that, you will be prompted to **Select a Validator** from the list of NEAR Validators.

There are a couple of things to pay attention to here:

First of all, look at the fee set beneath the validators name. That fee is representative of the amount that the validator will take for allowing you to stake with them. So when you calculate your Annual Percent Yield (APY), subtract whatever that percentage is from your total reward.

Second, if you already know what validator you want to use to stake with, you can search them based upon their Account ID in the top search bar. In this example case, we will use SharpDarts because Rune Bentien is a great guy who uses the funds to re-invest in projects building on NEAR (side note: highly recommend SharpDarts). A full list of validators can be found [here](https://explorer.near.org/nodes/validators).

Once you have selected your validator pool you click ‘Stake with Validator’ and then you are asked to input the amount that you would like to stake. If you want to stake everything in your wallet click ‘Use Max’. Note as explained in the photo below, there is always 0.35 NEAR reserved for Fees.

Select the amount you would like to Stake:

Once you have entered an amount, you must then confirm your stake as depicted in the picture below. All you have to do is click ‘Confirm’.

**This is what it looks like when you have successfully staked.**

Okay, so with that model you are now staking on NEAR Protocol. You can check in on updates and rewards from the ‘Staking’ tab of the wallet.

**Step 2: Withdrawing Rewards (“Unstaking”)**

So now that you are all set up and staking, you may want to withdraw your rewards from time to time. This next step will show you how to do that.

To start, you go to your staking tab. You will see as depicted in the image below a notice about how earned rewards are automatically restaked. If you want to unstake you have to select the _‘Unstake’_ on the right hand side.

This will then prompt you to select which validator you would like to unstake from. Unless you are staking through multiple different validators there should only be one option.

After selecting the validator, the following screen will then prompt you to input how many tokens you wish to unstake. You can then choose to either unstake the amount of your earned rewards or more if you like.

The last step of the unstaking process is to confirm that you are ready to unstake that amount of NEAR that you have inputted. As it explains in the interface, the tokens become available on the 4th epoch after release which is usually between 52–65 hours in time.

After hitting confirm you will then get this friendly ‘Success’ screen.

Shortly after, if you check back on the ‘staking’ tab of your wallet, you will be able to see if the tokens that you have unstaked are ‘pending release’ or available to withdraw. Once they are available to withdraw you can simply select ‘Withdraw’ to have them deposited back into your wallet.

And that is pretty much all there is to it. Very intuitive. Very easy. Minimum wait time is 4 epochs. Don’t forget that number. As Matt Lockyer explained below — it is on the 4th epoch that you can withdraw your NEAR:

NEAR DevRel Lead Matt Lockyer in the [NEAR Protocol Official Chat](https://t.me/cryptonear) on unstaking process.

**How Do I Connect My NEAR Wallet to a Dapp on NEAR?**

Okay, this is absolutely the last part of this guide. I realize it’s long. Many people sometimes ask how they can use the NEAR Wallet to connect to existing dapps on NEAR. It is super simple. Like super simple. Here is what you do. You head over to a NEAR Dapp. You can check out the different dApps at [Awesome NEAR](https://awesomenear.com/). This one happens to be [near.bet](https://near.bet/#/) — a place to buy and sell accounts (Shoutout to Alex K.). Somewhere on their interface you look for the ‘_Sign in with NEAR Wallet Option_’. Give that a click.

[near.bet](https://near.bet/#/)

It will then take you to this screen in your wallet. Note that if you have multiple accounts connected through the wallet you can decide which account you would like to allow the Dapp to access.

Once you click ‘Allow’ you are good to go, and your Account will be automatically connected to the dapp going forward — Funds and all. Simple, Sleek, and Easy.

**How Do I Track My Staking APY?**

Final, final question: How can I track my staking APY? There are a ton of websites for this. Perhaps the most customizable one is: [**https://www.stakingrewards.com/earn/near-protocol**](https://www.stakingrewards.com/earn/near-protocol).

As you can see, all you have to do is input the number of tokens you have, and the amount of time you intend to lock up for. Fun fact, you can actually also simulate how your rewards will increase depending on how the price goes up or down using the _Price_ tab on the left hand side.

Okay, that’s all there is to it. Remember if you have questions on the wallet there is a telegram support group for you [here](https://t.me/NEARSupport). I hope this helped. Welcome to the NEAR Ecosystem!

_Disclaimer: None of the information discussed above should be taken as investment or taxation advice. The views expressed are descriptive in nature detailing how to use a product of NEAR Protocol._
