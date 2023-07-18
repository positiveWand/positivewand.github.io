import sys
import subprocess
from datetime import date

test = False
if len(sys.argv) >= 2:
    if sys.argv[1] == '-t' or sys.argv[1] == '-test':
        test = True

# print(test)

list = None
if test:
    list = subprocess.check_output(['python', 'get-category.py', '-test'], shell=True, text=True)
else:
    list = subprocess.check_output(['python', 'get-category.py'], shell=True, text=True)
subprocess.run(['python', 'get-tag.py', list], shell=True, text=True)

# subprocess.run(['git', 'add', '.'], shell=True)
# subprocess.run(['git', 'commit', '-m', '[자동 배포]: '+str(date.today())], shell=True)

