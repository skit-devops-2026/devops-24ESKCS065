#!/usr/bin/env bash

set -e

echo "Checking PlaceTrack files..."

test -f index.html
test -f login.html
test -f signup.html
test -d css
test -d js

echo "All tests passed."