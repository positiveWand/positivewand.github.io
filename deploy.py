import subprocess
from datetime import date

list = subprocess.check_output(['python', 'get-category.py'], shell=True, text=True)
subprocess.run(['python', 'get-tag.py', list], shell=True, text=True)

subprocess.run(['git', 'add', '.'], shell=True)
subprocess.run(['git', 'commit', '-m', '[자동 배포]: '+date.today()], shell=True)

