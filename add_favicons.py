import glob
import re

favicons = '''<link rel="icon" type="image/x-icon" href="public/favicon/favicon.ico"/>
<link rel="icon" type="image/png" sizes="32x32" href="public/favicon/favicon-32x32.png"/>
<link rel="icon" type="image/png" sizes="16x16" href="public/favicon/favicon-16x16.png"/>
<link rel="apple-touch-icon" sizes="192x192" href="public/favicon/favicon-192x192.png"/>
'''

for html_file in glob.glob('*.html'):
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if already has favicon
    if 'favicon' in content:
        print(f'Skipping {html_file} - favicon already present')
        continue
    
    # Insert after <meta charset="utf-8"/>
    content = re.sub(
        r'(<meta charset="utf-8"/?>)',
        r'\1\n' + favicons,
        content,
        count=1
    )
    
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'Updated {html_file}')

print('Done!')
