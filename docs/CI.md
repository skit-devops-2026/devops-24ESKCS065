# PlaceTrack CI Pipeline

## Overview

PlaceTrack uses GitHub Actions for continuous integration. The CI pipeline
automatically runs whenever code is pushed or a pull request is opened.

## Pipeline Stages

The CI pipeline contains the following stages:

1. Repository hygiene checks
2. Project installation checks
3. Automated tests
4. Build validation

## Commands

The Makefile provides the following commands:

```bash
make install
make test
make build