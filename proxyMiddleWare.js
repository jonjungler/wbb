/*
代理
*/
const express = require('express');
const port = '3000';
const path = require('path');
const proxyMiddleWare = require("http-proxy-middleware");

// const proxyPath = 'http://10.45.9.137:8080'; // 测试服务器
// const proxyPath = 'http://10.45.10.17:8080'; // demo测试服务器
const proxyPath = 'http://10.45.10.9:8080';// UAT 服务器
// const proxyPath = 'http://10.45.16.110:8080'; // 向东服务器
// const proxyPath = 'http://10.45.16.151:8080'; // 葛丹服务器
// const proxyPath = 'http://10.64.230.232:8080'; // 葛丹服务器

const proxyOption ={target:proxyPath,changeOrigoin:true};
const app = express();
app.use(express.static(path.join(__dirname,'./app')));

// app.use("/ajax",proxyMiddleWare(proxyOption));

var server = app.listen(port, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
});