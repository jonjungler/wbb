/*
代理
*/
const express = require('express');
const port = '3000';
const path = require('path');
const proxyMiddleWare = require("http-proxy-middleware");

const app = express();
app.use(express.static(path.join(__dirname)));

// app.use("/ajax",proxyMiddleWare(proxyOption));

var server = app.listen(port, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
});