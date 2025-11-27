#!/bin/bash

# Fix unterminated string literals (mixed quotes)
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i "s/from '@\([^']*\)\"/from '@\1'/g" {} +
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i 's/from "@\([^"]*\)"/from "@\1'"'"'/g' {} +

echo "Fixed quote issues in all TypeScript files"
