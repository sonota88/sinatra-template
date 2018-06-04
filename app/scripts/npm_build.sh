#!/bin/bash

rm public/js/*.js
node_modules/.bin/webpack --config webpack.config.js
