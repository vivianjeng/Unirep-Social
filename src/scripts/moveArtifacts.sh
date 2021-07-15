#!/bin/bash

set -e

cd "$(dirname "$0")"
cd ../artifacts

mv ./src/contracts/ ./contracts/
rm -rf ./src/