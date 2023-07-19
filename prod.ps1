conda activate base
python ./deploy.py
git add .
git commit -m '배포'
git push