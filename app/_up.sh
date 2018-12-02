#!/bin/bash

echo_rbenv_root(){
  if   [ -d "${HOME}/.rbenv" ]; then
    echo "${HOME}/.rbenv"
  elif [ -d "${HOME}/.anyenv/envs/rbenv" ]; then
    echo "${HOME}/.anyenv/envs/rbenv"
  else
    echo "RBENV_ROOT not found" >&2
    exit 1
  fi
}

PORT=$1

export RBENV_ROOT="$(echo_rbenv_root)"
export PATH="${RBENV_ROOT}/bin:${PATH}"
eval "$(rbenv init -)"

BUNDLE_GEMFILE="../Gemfile"

bundle exec ruby app.rb -p $PORT
