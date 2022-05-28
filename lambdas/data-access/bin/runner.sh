#!/usr/bin/env bash

export SCRIPT=$1
export AWS_REGION=$2
export AWS_PROFILE="saml"

node ./bin/${SCRIPT}.js ${@:3}
