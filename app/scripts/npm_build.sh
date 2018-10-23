#!/bin/bash

rm public/js/webpack/*.js
node_modules/.bin/webpack --config webpack.config.js
