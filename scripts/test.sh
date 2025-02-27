#!/usr/bin/env bash


echo -e "\033[34mTesting...\n\033[0m";

set -e # this will cause the shell to exit immediately if any command exits with a nonzero exit value.

export NODE_ENV=test

lerna bootstrap --hoist --ignore-scripts
lerna run build --stream
lerna run test --concurrency 1
