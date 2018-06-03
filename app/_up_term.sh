#!/bin/bash

gnome-terminal -e "/bin/bash -c
  \"
    ./_up.sh $1
    if [ \$? -ne 0 ]; then
      sleep 60
    fi
  \"
" &
