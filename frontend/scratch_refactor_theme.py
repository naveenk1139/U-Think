import os
import re

TARGET_DIR = 'src'

# Map old classes to new semantic classes
REPLACEMENTS = {
    r'\bbg-white\b': 'bg-card',
    r'\bbg-gray-50\b': 'bg-background',
    r'\bbg-gray-100\b': 'bg-background-secondary',
    r'\bbg-slate-50\b': 'bg-background',
    r'\bbg-slate-100\b': 'bg-background-secondary',
    r'\bbg-slate-200\b': 'border-border', # often used for subtle backgrounds or borders
    r'\bborder-gray-100\b': 'border-border',
    r'\bborder-gray-200\b': 'border-border',
    r'\bborder-slate-100\b': 'border-border',
    r'\bborder-slate-200\b': 'border-border',
    r'\btext-gray-900\b': 'text-text-primary',
    r'\btext-gray-800\b': 'text-text-primary',
    r'\btext-gray-700\b': 'text-text-secondary',
    r'\btext-gray-600\b': 'text-text-secondary',
    r'\btext-gray-500\b': 'text-text-muted',
    r'\btext-gray-400\b': 'text-text-muted',
    r'\btext-slate-900\b': 'text-text-primary',
    r'\btext-slate-800\b': 'text-text-primary',
    r'\btext-slate-700\b': 'text-text-secondary',
    r'\btext-slate-600\b': 'text-text-secondary',
    r'\btext-slate-500\b': 'text-text-muted',
    r'\btext-slate-400\b': 'text-text-muted',
    r'\btext-black\b': 'text-text-primary',
    r'\bshadow-sm\b': 'shadow-sm shadow-black/5 dark:shadow-none',
}

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    for pattern, replacement in REPLACEMENTS.items():
        content = re.sub(pattern, replacement, content)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

for root, _, files in os.walk(TARGET_DIR):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            process_file(os.path.join(root, file))
