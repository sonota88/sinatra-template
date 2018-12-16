#!/bin/bash

PORT=$1

curl http://localhost:${PORT}/shutdown
