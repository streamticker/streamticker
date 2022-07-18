#!/bin/bash

docker build . -t registry.hop.io/streamticker/streamticker:latest --platform linux/amd64
docker push registry.hop.io/streamticker/streamticker:latest
