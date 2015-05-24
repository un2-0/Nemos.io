#!/bin/sh

# flame out if the contracts don't deploy
abort()
{
    echo >&2 '
***************
*** ABORTED ***
***************
'
    echo "An error occurred. Exiting..." >&2
    exit 1
}

trap 'abort' 0
set -e

echo ""
echo ""
echo "Making a Chain."
cd ~/.decerver/dapps/SmartVote
epm new --checkout --name SmartVote --no-edit
epm config log_level:${LOG_LEVEL:=3}
echo "The chain has been made."

echo ""
echo ""
echo "Setting Connection."
cd contracts
epm --log 5 deploy SmartVote.pdx

# Now we need to tell the DApp about our chain and then we’re ready to VRoom.
blockchain_id=$(epm plop chainid)
root_contract=$(epm plop vars | grep DOUG | cut -d : -f 2)

echo "Configuring package.json with blockchain_id ($blockchain_id) and "
echo "root_contract ($root_contract)."
cd ..
mv package.json /tmp/

jq '.module_dependencies[0].data |= . * {peer_server_address: "111.111.111.111:9999", blockchain_id: "'$blockchain_id'", root_contract: "'$root_contract'"}' /tmp/package.json \
  > package.json

# put the SmartVote DApp in focus
sleep 5 && curl http://localhost:3000/admin/switch/SmartVote &

# for tests, kill even if its infinitely mining
decerver
