```
npm i
```


```
npm start
```

``` sh
curl http://localhost:3000/genKeyPair
# {"publicKey":"macipk.16441504f78195e645a094a3845fa1d4539df4d9a74626d63c8e1823057ee052","privateKey":"macisk.3e23d0fbcabefbbf7e2fdb4a0d4a64266c52638c4a3593a46e2d2215d4aeed16"}
```


``` sh
curl -X POST http://localhost:3000/signup \
-H "Content-Type: application/json" \
-d '{"publicKey": "macipk.16441504f78195e645a094a3845fa1d4539df4d9a74626d63c8e1823057ee052"}'
# {"success":true}%
```


``` sh
curl -X POST http://localhost:3000/vote \
-H "Content-Type: application/json" \
-d '{"publicKey": "macipk.16441504f78195e645a094a3845fa1d4539df4d9a74626d63c8e1823057ee052", "privateKey":"macisk.3e23d0fbcabefbbf7e2fdb4a0d4a64266c52638c4a3593a46e2d2215d4aeed16", "option": "1"}'
# {"success":true}%
```

``` sh
curl http://localhost:3000/tally
# {"tally":"ETHGlobal.com"}
```


```
npx hardhat node
```

```
npx hardhat run scripts/deploy.js --network hardhat
```


Coordinator:
[✓] Public key: macipk.a8fcc8359bcbee4109fc2b1aaf14521cbcb40da6bd0d2db841bb4d105ac1cfe9
[✓] Private key: macisk.e2890d29ee46acba383c304f699775fd1b21afd106624e749f41e9066ed9c2c4

