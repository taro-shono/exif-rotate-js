#!/bin/bash -ex

REPO_VERSION=`npm view 'exif-rotate-js' version 2>/dev/null`
LOCAL_VERSION=`node -p "require('./package.json').version"`

if [[ "$REPO_VERSION" = "$LOCAL_VERSION" ]]; then
  echo "$LOCAL_VERSION exists. skip publish."
else
  npm publish
  git tag v${LOCAL_VERSION}
  git push --tags origin
fi
