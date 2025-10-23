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

echo_port(){
  if [ "$1" != "" ]; then
    echo "$1"
  else
    echo "9000" # default
  fi
}

cmd_up(){
  local port="$1"; shift

  export RBENV_ROOT="$(echo_rbenv_root)"
  export PATH="${RBENV_ROOT}/bin:${PATH}"
  eval "$(rbenv init -)"

  BUNDLE_GEMFILE="../Gemfile"

  if [ "$APP_ENV" = "development" ]; then
    # sudo sysctl fs.inotify.max_user_instances=512

    cmd_restart $port "$@"

    bundle exec ifchanged \
      --do="bash run.sh restart" \
      $(pwd)/{run.sh,app.rb}
  else
    bundle exec rackup -p $port -o 0.0.0.0
  fi
}

cmd_down(){
  local port="$1"; shift

  local pid=$(curl --max-time 5 --silent http://localhost:${port}/pid)
  echo "pid (${pid})" >&2

  if [ "$pid" = "" ]; then
    return 1
  else
    kill $pid
  fi
}

cmd_restart() {
  local port="$1"; shift

  echo "  | -->> down" >&2
  cmd_down $port "$@"
  sleep 3

  echo "  | -->> start" >&2
  bundle exec rackup -p $port -o 0.0.0.0 &
}

if [ $# -ge 1 ]; then
  cmd="$1"; shift
else
  cmd="up"
fi

case $cmd in
  up)
    port=$(echo_port "$1"); shift
    cmd_up "$port" "$@"
    ;;
  up-devel)
    port=$(echo_port "$1"); shift
    APP_ENV=development cmd_up "$port" "$@"
    ;;
  restart)
    port=$(echo_port "$1"); shift
    cmd_restart "$port" "$@"
    ;;
  down)
    port=$(echo_port "$1"); shift
    cmd_down "$port" "$@"
    ;;
  *)
    echo "invalid command" >&2
    exit 1
    ;;
esac
