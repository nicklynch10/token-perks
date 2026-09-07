import re,html,sys
raw=open(sys.argv[1],encoding='utf-8').read()
raw=re.sub(r'<script.*?</script>',' ',raw,flags=re.S|re.I)
raw=re.sub(r'<style.*?</style>',' ',raw,flags=re.S|re.I)
raw=re.sub(r'<[^>]+>',' ',raw)
text=html.unescape(re.sub(r'[ \t\xa0]+',' ',raw))
text=re.sub(r'\n\s*\n+','\n',text)
open(sys.argv[2],'w',encoding='utf-8').write(text)
print(len(text))
