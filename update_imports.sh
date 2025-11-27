#!/bin/bash

# Actualizar imports relativos a path aliases
find src -type f \( -name "*.tsx" -o -name "*.ts" \) ! -path "*/node_modules/*" -exec sed -i \
  -e "s|from ['\"]\.\.\/\.\.\/store\/|from '@/store/|g" \
  -e "s|from ['\"]\.\.\/\.\.\/\.\.\/store\/|from '@/store/|g" \
  -e "s|from ['\"]\.\.\/store\/|from '@/store/|g" \
  -e "s|from ['\"]\.\.\/\.\.\/icons['\"]|from '@/icons'|g" \
  -e "s|from ['\"]\.\.\/\.\.\/\.\.\/icons['\"]|from '@/icons'|g" \
  -e "s|from ['\"]\.\.\/icons['\"]|from '@/icons'|g" \
  -e "s|from ['\"]\.\.\/\.\.\/context\/|from '@/context/|g" \
  -e "s|from ['\"]\.\.\/\.\.\/\.\.\/context\/|from '@/context/|g" \
  -e "s|from ['\"]\.\.\/context\/|from '@/context/|g" \
  -e "s|from ['\"]\.\.\/\.\.\/hooks\/|from '@/hooks/|g" \
  -e "s|from ['\"]\.\.\/\.\.\/\.\.\/hooks\/|from '@/hooks/|g" \
  -e "s|from ['\"]\.\.\/hooks\/|from '@/hooks/|g" \
  -e "s|from ['\"]\.\.\/\.\.\/components\/|from '@/components/|g" \
  -e "s|from ['\"]\.\.\/\.\.\/\.\.\/components\/|from '@/components/|g" \
  -e "s|from ['\"]\.\.\/components\/|from '@/components/|g" \
  -e "s|from ['\"]\.\.\/\.\.\/layout\/|from '@/layout/|g" \
  -e "s|from ['\"]\.\.\/\.\.\/\.\.\/layout\/|from '@/layout/|g" \
  -e "s|from ['\"]\.\.\/layout\/|from '@/layout/|g" \
  -e "s|from ['\"]\.\.\/\.\.\/utils\/|from '@/utils/|g" \
  -e "s|from ['\"]\.\.\/\.\.\/\.\.\/utils\/|from '@/utils/|g" \
  -e "s|from ['\"]\.\.\/utils\/|from '@/utils/|g" \
  {} \;

echo "Imports actualizados"
