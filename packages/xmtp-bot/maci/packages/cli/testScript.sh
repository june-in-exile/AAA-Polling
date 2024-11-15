#! /bin/bash
# rm -r ./proofs
# rm tally.json

Coordinator_Pubkey="macipk.281830024fb6d21a4c73a89a7139aff61fbbddad731ef2dc2db9516171fd390e"
Coordinator_Prikey="macisk.bf92af7614b07e2ba19dce65bb7fef2b93d83b84da2cf2e3af690104fbc52511"

Alice_Pubkey1="macipk.a8fcc8359bcbee4109fc2b1aaf14521cbcb40da6bd0d2db841bb4d105ac1cfe9"
Alice_Prikey1="macisk.e2890d29ee46acba383c304f699775fd1b21afd106624e749f41e9066ed9c2c4"

Alice_Pubkey2="macipk.85a47a74dc5f30715b2f86061eaf6351ea8d6644b51aa7e978e2f2626c2616f7"
Alice_Prikey2="macisk.df0357f79630a2080878fbeabaa1c94d59aba11aa9f6196af29541deac967dff"

Alice_Pubkey3="macipk.01bdc5983726e9a24cac2fe122716892e50cd4b5c76f6697762583fcf3cd32f9"
Alice_Prikey3="macisk.bbbe84137a635ea5206eed8344100490885808954f5caf6266e3a8432ac62148"

Alice_Pubkey4="macipk.2dfeead9db703ec7ce958614cc5cd43fcc885f39b5bbf655c96d6d463538b494"
Alice_Prikey4="macisk.f6027f25d7ebd465c9a58f34c8eef0238e427cf3bdf751b6b6209f33087827dc"

Bob_Pubkey1="macipk.1cfcfe8b461e286dbbbb285b05d55be9dcd8f79e66373f25cbfe9048b3625820"
Bob_Prikey1="macisk.8ab4a7d95a1877f92caa79fb50d13a48d9ebfa43d6ad88a1972a8a9634841a9e"

Bob_Pubkey2="macipk.9e1b20fffb2f18eb9f9d5568f7bf814f7cf6c34ca76d6f1cc112d2086e36207e"
Bob_Prikey2="macisk.3a9726c99bd34740d065abab89526a0d6f81e8e572e923c2c6e0dab868558c16"

Cara_Pubkey1="macipk.06f739ac9c9e33ac9e97488c79fab6ac0d9ac4891e80b0d5a2f232a2e1eb4156"
Cara_Prikey1="macisk.5f1f43d59720287b71bae00d0c06edb06054f6d36a0467516373c08d0132834a"

Cara_Pubkey2="macipk.982f767d3e42f0bfe9a863d471cf5907b5465f7966b3941502078b5aab662d18"
Cara_Prikey2="macisk.dfcd850abcfba6c6a9fc23047e0564c2e6143b03c5070d83a0177ae0c38b6fed"

node build/ts/index.js deployVkRegistry
node build/ts/index.js setVerifyingKeys \
    --state-tree-depth 10 \
    --int-state-tree-depth 1 \
    --msg-tree-depth 2 \
    --vote-option-tree-depth 2 \
    --msg-batch-depth 1 \
    --process-messages-zkey-qv ./zkeys/ProcessMessages_10-2-1-2_test/ProcessMessages_10-2-1-2_test.0.zkey \
    --tally-votes-zkey-qv ./zkeys/TallyVotes_10-1-2_test/TallyVotes_10-1-2_test.0.zkey
node build/ts/index.js create -s 10

#Alice
node build/ts/index.js signup \
    --pubkey $Alice_Pubkey1
node build/ts/index.js isRegisteredUser \
    --pubkey $Alice_Pubkey1 \
    --quiet false
#Bob
node build/ts/index.js signup \
    --pubkey $Bob_Pubkey1
node build/ts/index.js isRegisteredUser \
    --pubkey $Bob_Pubkey1 \
    --quiet false
#Cara
node build/ts/index.js signup \
    --pubkey $Cara_Pubkey1
node build/ts/index.js isRegisteredUser \
    --pubkey $Cara_Pubkey1 \
    --quiet false

node build/ts/index.js deployPoll \
    --pubkey $Coordinator_Pubkey \
    -t 300 -i 1 -m 2 -b 1 -v 2
node build/ts/index.js getPoll \
    --quiet false

POLL_ID="0"

# The publish here works in reverse order (the last publish is processed first)

# 0. Alice, Bob, Cara all signs up with their Pubkey1
# 1. Alice votes for option 0 with weight 2
# 2. Alice votes for option 0 with weight 2 again, and update to Pubkey2
# 3. Alice votes for option 1 with weight 6, but she uses Prikey1
# 4. Alice votes for option 2 with weight 9, and update to Pubkey3
# 5. Alice votes for option 2 with weight 7, and update to Pubkey4
# 6. Bob votes for option 5 with weight 1, and update to Pubkey2
# 7. Bob votes for option 6 with weight 1, but he uses Prikey1
# 8. Cara votes for option 10 with weight 5
# 9. Cara votes for option 10 with weight 0, and update to Pubkey2
# 10. Cara votes for option 11 with weight 4
# 11. Cara votes for option 10 with weight 1, but she uses Prikey1
# 11. Finally,
#   Alice should vote for option 0 with credit 4 and option 2 with credit 49
#   Bob should vote for option 5 with credit 1
#   Cara should vote for option 11 with credit 16

#Cara
node build/ts/index.js publish \
    --pubkey $Cara_Pubkey1\
    --privkey $Cara_Prikey1 \
    --state-index 3 \
    --vote-option-index 10 \
    --new-vote-weight 1 \
    --nonce 4 \
    --poll-id $POLL_ID

node build/ts/index.js publish \
    --pubkey $Cara_Pubkey2\
    --privkey $Cara_Prikey2 \
    --state-index 3 \
    --vote-option-index 11 \
    --new-vote-weight 4 \
    --nonce 3 \
    --poll-id $POLL_ID

node build/ts/index.js publish \
    --pubkey $Cara_Pubkey2\
    --privkey $Cara_Prikey1 \
    --state-index 3 \
    --vote-option-index 10 \
    --new-vote-weight 0 \
    --nonce 2 \
    --poll-id $POLL_ID

node build/ts/index.js publish \
    --pubkey $Cara_Pubkey1\
    --privkey $Cara_Prikey1 \
    --state-index 3 \
    --vote-option-index 10 \
    --new-vote-weight 5 \
    --nonce 1 \
    --poll-id $POLL_ID

# Bob
node build/ts/index.js publish \
    --pubkey $Bob_Pubkey1 \
    --privkey $Bob_Prikey1 \
    --state-index 2 \
    --vote-option-index 6 \
    --new-vote-weight 1 \
    --nonce 2 \
    --poll-id $POLL_ID

node build/ts/index.js publish \
    --pubkey $Bob_Pubkey2 \
    --privkey $Bob_Prikey1 \
    --state-index 2 \
    --vote-option-index 5 \
    --new-vote-weight 1 \
    --nonce 1 \
    --poll-id $POLL_ID

# Alice
node build/ts/index.js publish \
    --pubkey $Alice_Pubkey4 \
    --privkey $Alice_Prikey3 \
    --state-index 1 \
    --vote-option-index 2 \
    --new-vote-weight 7 \
    --nonce 4 \
    --poll-id $POLL_ID

node build/ts/index.js publish \
    --pubkey $Alice_Pubkey3 \
    --privkey $Alice_Prikey2 \
    --state-index 1 \
    --vote-option-index 2 \
    --new-vote-weight 9 \
    --nonce 3 \
    --poll-id $POLL_ID

node build/ts/index.js publish \
    --pubkey $Alice_Pubkey1 \
    --privkey $Alice_Prikey1 \
    --state-index 1 \
    --vote-option-index 1 \
    --new-vote-weight 6 \
    --nonce 3 \
    --poll-id $POLL_ID

node build/ts/index.js publish \
    --pubkey $Alice_Pubkey2 \
    --privkey $Alice_Prikey1 \
    --state-index 1 \
    --vote-option-index 0 \
    --new-vote-weight 2 \
    --nonce 2 \
    --poll-id $POLL_ID

node build/ts/index.js publish \
    --pubkey $Alice_Pubkey1 \
    --privkey $Alice_Prikey1 \
    --state-index 1 \
    --vote-option-index 0 \
    --new-vote-weight 2 \
    --nonce 1 \
    --poll-id $POLL_ID
    
node build/ts/index.js timeTravel -s 300
node build/ts/index.js mergeSignups --poll-id $POLL_ID
node build/ts/index.js mergeMessages --poll-id $POLL_ID
node build/ts/index.js genProofs \
    --privkey $Coordinator_Prikey \
    --poll-id $POLL_ID \
    --process-zkey ./zkeys/ProcessMessages_10-2-1-2_test/ProcessMessages_10-2-1-2_test.0.zkey \
    --tally-zkey ./zkeys/TallyVotes_10-1-2_test/TallyVotes_10-1-2_test.0.zkey \
    --tally-file tally.json \
    --output proofs/ \
    -tw ./zkeys/TallyVotes_10-1-2_test/TallyVotes_10-1-2_test_js/TallyVotes_10-1-2_test.wasm \
    -pw ./zkeys/ProcessMessages_10-2-1-2_test/ProcessMessages_10-2-1-2_test_js/ProcessMessages_10-2-1-2_test.wasm \
    -w true \
    -q false 
node build/ts/index.js proveOnChain \
    --poll-id $POLL_ID \
    --proof-dir proofs/ 
node build/ts/index.js verify \
    --poll-id $POLL_ID \
    --tally-file tally.json
