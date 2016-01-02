var fs = require("fs");
var path = require("path");
var url = require("url");
var validUrl = require("valid-url");

module.exports.newUrl = function(req, res) {
	var urlPar = req.params[0];
	var rsp = {};
	var host = req.headers["host"];
	var dataPath = path.resolve(__dirname, "../data/short-url.json");

	if (validUrl.isUri(urlPar)) {
		fs.readFile(dataPath, {
			encoding: "utf-8"
		}, function(err, data) {
			if (err) throw err;
			fileData = JSON.parse(data);
			var match = fileData.data.filter(function(d) {
				return d.original_url === urlPar;
			})
			if (match.length === 0) {
				rsp.original_url = urlPar;
				rsp.short_url = host + "/" + fileData.data.length;
				fileData.data.push({
					original_url: urlPar,
					id: fileData.data.length
				});
				fs.writeFile(dataPath, JSON.stringify(fileData), {
					encoding: "utf-8"
				}, function(err) {
					if (err) throw err;
					console.log("saved");
				});
			} else {
				rsp.original_url = match[0].original_url;
				rsp.short_url = host + "/" + match[0].id;
			}
			res.send(JSON.stringify(rsp));
		})
	} else {
		rsp.error = "URL invalid";
		res.send(JSON.stringify(rsp));
	}
}
module.exports.getShort = function(req, res) {
	var dataPath = path.resolve(__dirname, "../data/short-url.json");
	fs.readFile(dataPath, {
		encoding: "utf-8"
	}, function(err, data) {
		if (err) throw err;
		var fileData = JSON.parse(data);
		var match = fileData.data.filter(function(d) {
			return String(d.id) === req.params.id;
		})
		if (match.length === 0) {
			res.send(JSON.stringify({
				error: "No short url found for given input"
			}));
		} else {
			res.redirect(match[0].original_url);
		}
	})
}