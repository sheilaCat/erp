# Description

## erp

One mini ERP system made for my graduation design.

express + mongoose + redis + semantic-ui

# How to start

install dependencies:

```
  $ cd . && npm install
```

run the app:

```
  $ DEBUG=erp:* npm start
```

debug:

```
node-debug app.js --debug=3000

```
# modules

1. [ejs-mate](https://github.com/JacksonTian/ejs-mate)

Template engine.

1. [validator](https://www.npmjs.com/package/validator#server-side-usage)

Validate form.

1. [log4js](http://blog.fens.me/nodejs-log4js/)

Record Log.Control the output of log content with six levels of log4js.

1. [connect-redis](https://www.npmjs.com/package/connect-redis)

Redis session store.

...

# Folder structure

```
├─bin
├─common
├─controller
├─logs
├─middleware
├─model
├─node_modules
├─proxy
├─public
│  ├─image
│  ├─javascript
│  ├─lib
│  └─stylesheet
└─views
```

# Screenshot

## Login

![img](http://thumbsnap.com/i/FBoJSuxm.png?0725)

## index

![img](http://img.hoop8.com/1607C/F1XJaPDP.png)

## profile

![img](http://thumbsnap.com/i/oHGsJoft.png?0725)

## account

![img](http://img.hoop8.com/1607C/qNDkz6z5.png)

## form

![img](http://img.hoop8.com/1607C/IY44soD2.png)