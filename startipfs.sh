#!/bin/bash

if [ -z "$GOROOT" ] && [ -z "$GOPATH" ]
then
echo ""
echo ""
echo "Setting go path."
export GOROOT=/usr/local/go
export GOPATH=$HOME/go
export PATH=$PATH:$GOROOT/bin:$GOPATH/bin
fi

ipfs daemon --writable
