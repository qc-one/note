var GSCService = function(server) {
	
	this.host = server;
	this.ws = new sgcWebSocket("ws://" + this.host + ":51103");
};

GSCService.prototype.connect = function(callbackFunc) {
	try {
		
		this.ws.on('open', function (event) {
			}
		);
		this.ws.on('close', function (event) {
			}
		);
		this.ws.on('message', function (event) {
			callbackFunc(event.message);
			}
		);
		this.ws.on('error', function (event) {
			callbackFunc(event.message);
			}
		);
	} catch (e) {
		callbackFunc(e.message);
	}
};

GSCService.prototype.getJsonRequest = function(method, params) {
	var o = {
		"jsonrpc": "2.0",
		"method": method,
		"params": params,
		"id": 1
	};
    var s = JSON.stringify(o);
    return (s);
};

GSCService.prototype.getJsonResponse = function(params) {
	var obj = JSON.parse(params);
	return JSON.stringify(obj.result);
};

GSCService.prototype.alertInnerInfo = function() {
	alert(this.host);
};

GSCService.prototype.send = function(params) {
	if (this.ws.state() === "open")
		this.ws.send(params);
};

GSCService.prototype.hello = function() {
	this.send('hello');
};

GSCService.prototype.getBuild = function() {
	var command = this.getJsonRequest("CardServer.GetBuild", []);
	this.send(command);
};

GSCService.prototype.getVersion = function(index) {
	var command = this.getJsonRequest("CardServer.GetVersion", [index]);
	this.send(command);
};

GSCService.prototype.getFileVersion = function(index) {
	var command = this.getJsonRequest("CardServer.GetFileVersion", [index]);
	this.send(command);
};	  
			  
GSCService.prototype.listCards = function() {
	var command = this.getJsonRequest("CardServer.ListCards", []);
	this.send(command);
};

GSCService.prototype.listCardProducts = function(devicenum) {
	var command = this.getJsonRequest("CardServer.ListCardProducts", [devicenum]);
	this.send(command);
};

GSCService.prototype.signData = function(devicenum, data) {
	var command = this.getJsonRequest("CardServer.SignData", [devicenum, data]);
	this.send(command);
};

GSCService.prototype.getHidInfo = function() {
	var command = this.getJsonRequest("CardServer.GetHidInfo", []);
	this.send(command);
};

GSCService.prototype.findProducts = function(productType, productID) {
	var command = this.getJsonRequest("CardServer.FindProducts", [productType, productID]);
	this.send(command);
};

GSCService.prototype.getServerList = function() {
	var command = this.getJsonRequest("CardServer.GetServerList", []);
	this.send(command);
};

