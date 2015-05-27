#!/bin/bash
set -e

if [ -z "$GOROOT" ] && [ -z "$GOPATH" ]
then
echo ""
echo ""
echo "Setting go path."
export GOROOT=/usr/local/go
export GOPATH=$HOME/go
export PATH=$PATH:$GOROOT/bin:$GOPATH/bin
fi

chmod +x ./startipfs.sh
chmod +x ./startbrowser.sh

echo ""
echo ""
echo "Your environment good human ->"
printenv

echo ""
echo ""
echo "Setting Defaults to start the DApp."
remote_host=${REMOTE_HOST:=150.203.235.209}
fetch_port=${FETCH_PORT:=50505}
remote_port=${REMOTE_PORT:=30303}
key_session="$(strings /dev/urandom | grep -o '[[:alnum:]]' | head -n 10 | tr -d '\n' ; echo)"
key_session=${KEY_SESSION:=$key_session}
local_host=${LOCAL_HOST:=0.0.0.0}
local_port=${LOCAL_PORT:=30303}
max_peers=${MAX_PEERS:=10}
log_level=${LOG_LEVEL:=3}
root_contract=${ROOT_CONTRACT:="0x0d7ea56e379123ca3ba2ab5e887c62c5898f9cc4"}
read -p "(Previous root contract: $root_contract) Root contract: " tmp_root_contract
if [ -z "$tmp_root_contract" ]
then
echo ""
echo ""
echo "Using previous root contract: $root_contract."
else
echo ""
echo ""
echo "Using new root contract: $tmp_root_contract."
root_contract=$tmp_root_contract
fi

echo ""
echo ""
echo "Fetching the Chain."
epm --log 3 fetch --checkout --name SmartVote $remote_host:$fetch_port
echo "The chain has been fetched and checked out."

echo ""
echo ""
echo "Setting Defaults"
epm config key_session:$key_session\
  local_host:$local_host \
  local_port:$local_port \
  max_peers:$max_peers

echo ""
echo ""
echo "Setting the Key File"
if [ -z "$KEY_FILE" ]
then
  echo "No key file given."
else
  echo "Using the given key file."
  epm config key_file:${KEY_FILE}
fi

echo ""
echo ""
echo "Setting Connection."
epm config remote_host:$remote_host remote_port:$remote_port use_seed:true
epm config log_level:$log_level

echo ""
echo ""
echo "Catching up the Chain... This may take a minute ->"
echo ""
echo ""
epm --log 3 run &
sleep 90
kill $(epm plop pid)

blockchain_id=$(epm plop chainid)
echo ""
echo ""
echo "Configuring package.json"
echo "blockchain_id: $blockchain_id"
echo "root_contract: $root_contract"
echo "peer_server_address: $remote_host:$remote_port"

cp package.json /tmp/

jq '.module_dependencies[0].data = {peer_server_address: "'$remote_host:$remote_port'", blockchain_id: "'$blockchain_id'", root_contract: "'$root_contract'"}' /tmp/package.json \
  > package.json

echo ""
echo ""
echo "Your Key Session is ... ->"
echo $key_session

echo ""
echo ""
echo "Your genesis.json is ... ->"
epm plop genesis

echo ""
echo ""
echo "Your config.json is ... ->"
epm plop config

echo ""
echo ""
echo "Your package.json is ... ->"
cat package.json

echo ""
echo ""
echo "Starting up! (Wheeeeeee says the marmot)"
echo ""
echo ""

gnome-terminal -e ./startipfs.sh
sleep 5 && curl http://localhost:3000/admin/switch/SmartVote & 
decerver & gnome-terminal -e ./startbrowser.sh
