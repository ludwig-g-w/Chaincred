#!/bin/bash

# Arguments, properly quoted
original_file="$1"
custom_name="$2"

# Convert custom name to PascalCase for filenames
pascal_case_name=$(echo "$custom_name" | sed -r 's/(^|-)(\w)/\U\2/g')

# Convert custom name to kebab-case for directories, using tr for case conversion
kebab_case_name=$(echo "$custom_name" | sed -r 's/([A-Z])/-\1/g' | sed 's/^-//' | tr 'A-Z' 'a-z')

# Directory and filenames setup
new_dir="lib/screens/$kebab_case_name"
new_file_name="${pascal_case_name}.tsx"
web_file_name="${pascal_case_name}.web.tsx"

# Save original content
original_content=$(cat "$original_file")

# Make directory if it doesn't exist
mkdir -p "$new_dir"

# Create new files and populate them
file_base_name="${pascal_case_name}"  # base filename without extension
echo "export { default } from '@lib/screens/$kebab_case_name/$file_base_name';" > "$original_file"
echo "$original_content" > "$new_dir/$new_file_name"
echo "export { default } from '@lib/components/WebNotImplemented';" > "$new_dir/$web_file_name"

echo "Files have been created and modified successfully in $new_dir."
