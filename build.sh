#! /bin/sh
npm run build
rm -rf ~/study/personal-projects/easy-web/src/main/resources/static/*
cp -rf ./build/* ~/study/personal-projects/easy-web/src/main/resources/static/