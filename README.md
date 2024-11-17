# Volt
> A Privacy-Focused Web3 Polling System. 

## Description
The user uses Web3Auth as an login choice, and we uses the identity to register to xmtp. After registering xmtp, user can use it to send message to our polling bot.
We use MACI as a polling method, so the server bot will help dealing with users and MACI.  We took privacy from MACI so nobody will know which voting is done by whom, and by creating a new privy account everytime in the vote, user will never reveal who he is.

## Features

### Seamless Web3 Access
`Volt` integrates Web3Auth for simple and secure login, ensuring every users, include web2 users can quickly access without complex setups. This identity is then seamlessly registered to XMTP, enabling decentralized messaging capabilities. Users can send messages to the `Volt` polling bot directly, creating a smooth and user-friendly interaction.

### Enhanced Privacy Through MACI and privy
`Volt` leverages "Minimal Anti-Collusion Infrastructure (MACI)" and "Privy" to ensure private and tamper-proof polling. With MACI, voting anonymity is guaranteed, as no one can link a vote to its voter. By creating a new Privy account for each vote, `Volt` further enhances privacy, ensuring participants' identities remain protected, even across multiple polls.

### Decentralized and Trustworthy Governance
`Volt` empowers communities and DAOs with a transparent and tamper-resistant polling system. The platform facilitates trust in every vote by combining decentralized identity, secure communication, and advanced privacy technology. This makes it an ideal tool for DAOs and organizations prioritizing fair and democratic decision-making.

## How it's Made
Our project is based on ZKP to prove that "the decrypted votes are tallied correctly" without "publicly decrypting them", so that the informations about the users are still hidden. Besides, we extend the voting system to include more features like anonymity (by creating multiple new wallet with Privy), AI-resistance (by verify the votes with WorldID), and channels to keep communication with the voters (by XMTP). We have also verified our contracts on blockscout to make sure they work as expected. In the future Sign Protocol will also be integrated into out project to make the polling result more trustable

## Structure

### Web3Auth - onboarding users via social logins
Users are given a better choice to login via social.

### XMTP - a better user experience
XMTP serves as user interaction, allowing users to interact with our system through the 1:1 agent. For example, one can vote on a poll by sending a message to out bot.

### Privy - hiding user identities
Privy allows users to create a wallet each time they vote, which enhances the anynomity of identities in the system.

### MACI - hiding polling options
MACI(Minimal Anti-Collusion Infrastructure) allows on-chain polling to be  executed with reduced risk of cheating by leveraging

## How to run 

1. start the frontend
```
cd packages/frontend
yarn dev
```

2. start the bot
```
cd packages/xmtp-bot
yarn dev
```

