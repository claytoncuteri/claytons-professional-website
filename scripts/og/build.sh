#!/bin/sh
# Renders every scripts/og/*.html card to public/og/<name>.png (1200x630).
# Needs Google Chrome or Chromium locally (set CHROME_BIN if it is somewhere else).
# The PNGs are committed, so production never needs Chrome.
set -e
cd "$(dirname "$0")/../.."
args=""
for f in scripts/og/*.html; do
  name=$(basename "$f" .html)
  args="$args $f public/og/$name.png"
done
# shellcheck disable=SC2086
node scripts/og/render-og.mjs $args
