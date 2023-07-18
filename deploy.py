import sys
import subprocess
from datetime import date

test = False
if len(sys.argv) >= 2:
    if sys.argv[1] == '-t' or sys.argv[1] == '-test':
        test = True

list = None
if test:
    print("[알림] TEST 환경 배포입니다.")
    print("[알림] 카테고리 추출 시작.")
    list = subprocess.check_output(['python', 'get-category.py', '-test'], shell=True, text=True)
else:
    print("[알림] REAL 환경 배포입니다.")
    print("[알림] 카테고리 추출 시작.")
    list = subprocess.check_output(['python', 'get-category.py'], shell=True, text=True)

print("[알림] 카테고리 추출 끝.")
with open('./_data/category_structure.yml', 'r', encoding="utf-8") as f:
    doc = f.read()
    print(doc)
print("[알림] 태그 추출 시작.")
subprocess.run(['python', 'get-tag.py', list], shell=True, text=True)
print("[알림] 태그 추출 끝.")
with open('./_data/tags.yml', 'r', encoding="utf-8") as f:
    doc = f.read()
    print(doc)

# subprocess.run(['git', 'add', '.'], shell=True)
# subprocess.run(['git', 'commit', '-m', '[자동 배포]: '+str(date.today())], shell=True)

