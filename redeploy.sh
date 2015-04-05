#!/bin/bash

echo "redeploying..."
echo "removing the blockchain folder"
epm rm SmartVote
rm -r ~/.decerver/blockchains
echo "reinitializing epm"
epm init
echo "creating a new bloackchain called SmartVote"
epm new -type thel -name SmartVote -checkout 
echo "deploying contracts..."
epm deploy -diff ~/.decerver/dapps/SmartVote/contracts/SmartVote.pdx
gedit ~/.decerver/dapps/SmartVote/package.json
