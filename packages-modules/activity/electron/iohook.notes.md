

MacOs
====
Need to perform this to make it work in MacOs https://github.com/wilix-team/iohook/issues/124#issuecomment-731925826


Steps Followed

1. pre install

```
brew install cmake 
brew install automake 
brew install libtool 
brew install pkg-config 
brew install autoconf
```

if installed already upgrade to latest

```
brew upgrade <pacakge_name>
```

2. Clone repo

```
git clone https://github.com/wilix-team/iohook.git iohook
cd iohook
```

comment out: https://github.com/wilix-team/iohook/blob/master/libuiohook/src/darwin/input_hook.c#L380

3. install && build

```
npm install   
npm install cmake-js  
npx cmake-js compile -r node -v 12.21.0 (whatever version you are using)
npm run build
```

4. Copy the generated build file

node-v72-darwin-x6

```
cp /Users/iohook/build/Release/iohook.node ./Users/admin-layout/node_modules/iohook/builds/node-v72-darwin-x64/build/Release
```
