#!/bin/bash

set -e

HOST=event-creator.collective.gg

aws s3 sync --size-only --cache-control "max-age=31536000" --exclude "build/*.html" build/ s3://$HOST/
aws s3 cp --cache-control "max-age=0" build/index.html s3://$HOST/index.html
aws s3 cp --cache-control "max-age=0" build/200.html s3://$HOST/200.html
