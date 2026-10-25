#!/usr/bin/env bash
# bb runs this in each new managed worktree.
set -euo pipefail
npm ci --no-audit --no-fund
