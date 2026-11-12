#!/bin/sh
set -eu

repo_root=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
cd "$repo_root"

version=$(node -p 'require("./manifest.json").version')
mkdir -p dist
archive="dist/reddit-global-popular-v${version}.zip"
rm -f "$archive"

zip -q "$archive" \
  manifest.json popular-url.js links.js LICENSE NOTICE \
  icons/icon-16.png icons/icon-32.png icons/icon-48.png icons/icon-128.png

echo "$archive"
