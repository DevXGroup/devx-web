#!/bin/bash

# Script to clean up commit messages by removing Claude references
# This script uses sed to remove specific patterns from commit messages

# Remove lines containing Claude references and clean up formatting
sed -e '/🤖 Generated with \[Claude Code\]/d' \
    -e '/Co-Authored-By: Claude/d' \
    -e '/\.claude\/ directory (Claude Code CLI)/d' \
    -e '/Generated with Claude Code/d' \
    -e '/Claude Code/d' \
    -e 's/Add \.claude\/ directory (Claude Code CLI)/Add development configuration directory/' \
    -e 's/- Add \.claude\/ directory (Claude Code CLI)/- Add development configuration directory/' \
    -e '/^[[:space:]]*$/N;/^\n$/d' \
    | # Remove empty lines at the end
    sed -e :a -e '/^\s*$/N;$!ba' -e 's/^\s*\n*//' -e 's/\n*\s*$/\n/'