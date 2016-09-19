# Privacy Prefs

## Purpose

Firefox contains a number of `about:config` preferences that can improve user
privacy.

This [Shield Study](https://wiki.mozilla.org/Firefox/Shield/Shield_Studies) 
add-on sets these preferences to non-default values, so we can measure [user 
feedback and their effect on Firefox
usage](https://wiki.mozilla.org/Firefox/Shield/Shield_Studies#What_data_do_Shield_Studies_normally_collect.3F).

## General Setup and Install

1. Install `shield` and `jpm`: `npm install -g shield-study-cli jpm`
2. Clone this repo and change to its directory
3. `npm install`
4. `shield run . -- -b Aurora`

