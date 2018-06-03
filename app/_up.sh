#!/bin/bash

PORT=$1

export PATH="${HOME}/.rbenv/bin:${PATH}"
eval "$(rbenv init -)"

# export PATH="${HOME}/.anyenv/bin:${PATH}"
# eval "$(anyenv init -)"

BUNDLE_GEMFILE="../Gemfile"

bundle exec ruby app.rb -p $PORT

# for production
# bundle exec ruby app.rb -p $PORT -e production
