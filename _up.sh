#!/bin/bash

PORT=$1

bundle exec ruby app.rb -p $PORT

# for production
# bundle exec ruby app.rb -p $PORT -e production
