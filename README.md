
# README.md


# timed-to-do-list-api
An api for the timed to do list client

## About

Timed-to-do-list-API is the Node.js server for the timed-to-do-list reactk application. 

## How to install and test it
```
$ git clone https://github.com/aegre/timed-to-do-list
$ cd timed-to-do-list
$ npm install
$ npm start
```
> You will need to have installed Node.js and MongoDB on your machine in order to test the api. Make sure you install both first.

## Using dummy data
In order to provide a quick way to test the application, the api has a method for create 50 dummy completed tasks with the duration consumed around an 80% and 100%.
To use this method you only need to make a HTTP GET request to the  generate-dummy-data route.


```
$ GET {serverurl}/api/generate-dummy-data
```
