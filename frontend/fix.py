import sys

with open(r'c:\Users\nkira\Videos\remix_--u-think (1)\frontend\src\pages\Scholarships\Scholarships.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('{\\`inline-flex px-3 py-1 text-xs font-bold rounded-full \\${', '{`inline-flex px-3 py-1 text-xs font-bold rounded-full ${')
content = content.replace('}\\`}>', '}`}>')

with open(r'c:\Users\nkira\Videos\remix_--u-think (1)\frontend\src\pages\Scholarships\Scholarships.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
