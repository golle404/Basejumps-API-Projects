var fs = require("fs");
var google = require('googleapis');
var customsearch = google.customsearch('v1');
var path = require("path");

module.exports.imageSearch = function (req, res) {
	var offset = parseInt(req.query.offset) || 1;
	var start = (offset - 1) * 10 + 1;
	var dataPath = path.resolve(__dirname, "../data/img-search.json");
	
	customsearch.cse.list({
			cx: process.env.GGL_CX,
			q: req.params.search,
			auth: process.env.GGL_API_KEY,
			searchType: "image",
			start: start
		},
		function (err, resp) {
			if (err) throw err;

			var imgData = [];
			resp.items.forEach(function (item) {
				imgObj = {};
				imgObj.url = item.link;
				imgObj.snippet = item.snippet;
				imgObj.thumbnail = item.image.thumbnailLink;
				imgObj.context = item.image.contextLink;
				imgData.push(imgObj);

			})
			fs.readFile(dataPath, {
					encoding: "utf-8"
				},
				function (err, data) {
					if (err) throw err;

					searchData = JSON.parse(data);
					if (searchData.data.length > 10) {
						searchData.data.pop();
					}
					searchData.data.unshift({
						term: req.params.search,
						when: new Date().toJSON()
					});

					fs.writeFile(dataPath, JSON.stringify(searchData), {
						encoding: "utf-8"
					}, function (err) {
						if (err) throw err;
						console.log("saved");
					});
				})

			res.send(imgData);
		});
}
module.exports.imageSearchLatest = function (req, res) {
	var dataPath = path.resolve(__dirname, "../data/img-search.json");
	fs.readFile(dataPath, {
			encoding: "utf-8"
		},
		function (err, data) {
			if (err) throw err;
			var rsp = JSON.parse(data);
			res.send(JSON.stringify(rsp.data))
		})
}