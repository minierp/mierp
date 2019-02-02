// git checkout -b gh-pages  新建并切换
// git branch -D gh-pages

git checkout gh-pages  

git commit -m  ''

git subtree push --prefix dist/mierp origin gh-pages

git checkout master  //切换分支
