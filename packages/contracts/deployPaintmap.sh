#!/bin/bash
source .env.local

forge script -vvv src/script/DeployPaintmap.s.sol:DeployPaintmap --ffi --chain-id $CHAIN_ID --rpc-url $RPC_URL \
  --private-key $DEPLOYER_PRIVATE_KEY --broadcast --verify --etherscan-api-key $ETHERSCAN_API_KEY
