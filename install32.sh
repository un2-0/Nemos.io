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
ARCH=${ARCH:=386}
GOPKG=${GOPKG:=go$VERSION.$OS-$ARCH.tar.gz}
read -p "(Default go package setting: $GOPKG) Go package name: " tmp_go
if [ ! -z "$tmp_go" ]
then
echo ""
echo ""
GOPKG=$tmp_go
fi

if [ ! -f "$GOPKG" ]
then
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
cd ~/
sudo chmod -R 777 go

echo ""
echo ""
echo "Installing Eris package manager..."
#go get github.com/eris-ltd/epm-go
cd $GOPATH/src/github.com/eris-ltd/epm-go
make thelonious

echo ""
echo ""
echo "Installing ipfs..."
go get github.com/ipfs/go-ipfs/cmd/ipfs

echo ""
echo ""
echo "Downloading SmartVote..."
cd ~/
sudo chmod -R 777 ipfs

if [ ! -d ".eris" ]
then
mkdir .eris
fi
sudo chmod -R 777 .eris
cd .eris
if [ ! -d "dapps" ]
then
mkdir dapps
fi
cd dapps
if [ ! -d "SmartVote" ]
then
git clone http://github.com/e-movement/smartvote SmartVote
fi
cd SmartVote
sudo chmod 777 package.json
echo ""
echo ""
echo "Initing ipfs..."
ipfs init
sleep 10 & sudo chmod -R 777 $HOME/.ipfs

echo ""
echo ""
echo "Start up SmartVote..."
sudo chmod u+x ./start.sh
sudo chmod u+x ./startipfs.sh
sudo chmod u+x ./startbrowser.sh

echo ""
echo ""
echo "SmartVote installation Done."
