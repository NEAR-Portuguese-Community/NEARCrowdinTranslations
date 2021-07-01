# Send NEAR to Anyone with NEAR Drops

As important as scalability is (just take a look at ETH Gas Station to see how important), there is more to a quality user experience than transactions-per-second.

We want NEAR to be easy to use for both developers and end users: user accounts have human readable names, developers can pay for fees on behalf of their users, and smart contracts can be built with popular programming languages.

And now, users and apps can send NEAR to anyone, whether they have a NEAR account or not.

# A Better Way to Onboard Users

Introducing NEAR Drops: a feature that makes onboarding users to NEAR much simpler.

In essence, a NEAR drop lets you send a link to whoever you want with a certain amount of $NEAR attached to it. This allows:

1. App developers to onboard users and pay for their NEAR account
2. Users to send $NEAR to their friends, whether they have an account or not

For app developers, NEAR Drops substantially improve the user onboarding process. Simply send new users a NEAR Drop referral link, they’ll be redirected to the NEAR Wallet’s account creation page, and they can create an account called [user].near. That’s it. They now have a NEAR account.

On NEAR, a user account is similar to a smart contract account on Ethereum, plus an Ethereum Name Service (ENS) name. This means that users get a readable account name and advanced key management, but it also means that creating a user account requires some $NEAR. With NEAR Drops, users can create an account without needing to have any $NEAR themselves.

# How NEAR Drops Work

There are two main functions in the NEAR Drop contract: send and create_account_and_claim. The send function is called to initiate the NEAR drop, and requires a $NEAR deposit, which will pay for the account creation costs and be transferred to the end recipient. The function takes the public key of a public/private keypair as an argument, adds the key to the NEAR Drop contract as an authorized access key, and records the $NEAR deposit as owned by the public key.

Next, the developer sends the private key to the end user, generally in the form of a referral link. The user will go through the NEAR Wallet onboarding process and choose an account name. In the Wallet,  a new public/private keypair is generated, and the Wallet calls the create_account_and_claim function with the user’s selected account name. This transaction is signed by the private key received in the link from the previous step, as only this key is authorized to call the NEAR Drop contract and retrieve the deposited $NEAR.

In turn, create_account_and_claim will recover the public key from the signature, create an account with the chosen account name, add the new public key (of which the private key is only known by the recipient) as the full access key for the new account, fund it with the $NEAR (less transaction fees), and remove the original public key as an access key on the contract.

And Voila! The user now has a non-custodial, funded NEAR account.

# Try it Out

You can try NEAR Drops out for yourself here: https://near-drop-mainnet.onrender.com/

After logging in:

1. Select “Create New NEAR Drop”.
2. Enter the amount of NEAR you’d like to add to the link (try 50)
3. Authorize the transaction
4. Copy the link, and send it to a friend! (Or open it yourself)

If you want to dive even deeper into the technical details, the code for NEAR drops is publicly available in the near-linkdrop repository (from line 48).We believe that NEAR drops significantly reduces the barriers of entry to the NEAR platform and are excited to see our community start using it!
