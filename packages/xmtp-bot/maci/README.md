```
npm i
```


```
npm start
```

``` sh
curl http://localhost:3000/genKeyPair
# {"publicKey":"macipk.1e7214c096b8c1ea9275c13e6ae9ffe1154fc7049079c856d0bf7f110c625da2","privateKey":"macisk.c818701820049ae0f0c1935a914587d37f39f5ad3a68f5651dfb6cf0f5603348"}
```


``` sh
curl -X POST http://localhost:3000/signup \
-H "Content-Type: application/json" \
-d '{"pubkey": "macipk.a8fcc8359bcbee4109fc2b1aaf14521cbcb40da6bd0d2db841bb4d105ac1cfe9"}'
# {"success":true}
```

```
npx hardhat node
```

```
npx hardhat run scripts/deploy.js --network hardhat
```
