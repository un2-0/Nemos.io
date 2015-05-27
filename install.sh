#This installation script is for Ubuntu.
#Please use 
#
#	sudo sh ./install.sh
#
#to start the installation.
#!/bin/bash
set -e

VERSION=${VERSION:=1.4.2}
OS=${OS:=linux}
ARCH=${ARCH:=amd64}
GOPKG=${GOPKG:=go$VERSION.$OS-$ARCH.tar.gz}
read -p "(Default go package setting: $GOPKG) Go package name: " tmp_go
if [ -z "$tmp_go" ]
then
else
echo ""
echo ""
GOPKG=$tmp_go
fi

if [ -f "$GOPKG" ]
then
else
echo ""
echo ""
echo "Downloading $GOPKG..."
sudo wget "https://storage.googleapis.com/golang/$GOPKG"
fi


echo ""
echo ""
echo "Installing $GOPKG..."
tar -C /usr/local -xzf go$VERSION.$OS-$ARCH.tar.gz
sleep 30

if [ -z "$GOROOT" ] && [ -z "$GOPATH" ]
then
echo ""
echo ""
echo "Setting go path..."
export GOROOT=/usr/local/go
export GOPATH=$HOME/go
export PATH=$PATH:$GOROOT/bin:$GOPATH/bin
fi

echo ""
echo ""
echo "Installing dependencies..."
sudo apt-get install jq git mercurial libgmp3-dev curl vim

echo ""
echo ""
echo "Installing decerver..."
go get github.com/eris-ltd/decerver/cmd/decerver
go install github.com/eris-ltd/decerver/cmd/decerver

echo ""
echo ""
echo "Installing Eris package manager..."
go get github.com/eris-ltd/epm-go/cmd/epm

echo ""
echo ""
echo "Installing ipfs..."
go get github.com/ipfs/go-ipfs/cmd/ipfs

echo ""
echo ""
echo "Downloading SmartVote..."
cd ~/
mkdir .decerver
cd .decerver
mkdir dapps
cd dapps
git clone http://github.com/e-movement/smartvote SmartVote

cd ~/.decerver/dapps/SmartVote

echo ""
echo ""
echo "Initing ipfs..."
chmod -x ./initipfs.sh
gnome-terminal -e ./initipfs.sh

echo ""
echo ""
echo "Start up SmartVote..."
chmod -x ./start.sh
chmod -x ./startipfs.sh
chmod -x ./startbrowser.sh
sudo sh ./start.sh
