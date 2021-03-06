var express = require("express");
var imageSearchCtrl = require("../controllers/image-search-ctrl");
var shortUrlCtrl = require("../controllers/short-url-ctrl");
var timestampCtrl = require("../controllers/timestamp-ctrl");
var multer  = require('multer')
var upload = multer();

var router = express.Router();

router.get("/", function(req, res) {
	var prm = {
		host: req.headers.host
	};
	res.render("index", prm);
})


////  image search api  ////

router.get("/api/latest/imagesearch", imageSearchCtrl.imageSearchLatest)
router.get("/api/imagesearch/:search", imageSearchCtrl.imageSearch);
router.get("/api/imagesearch/", function(req, res) {
	var prm = {
		host: req.headers.host
	};
	res.render("img-search", prm);
});

//// short url api  ////

router.get(/\/api\/shorturl\/new\/(.+)/, shortUrlCtrl.newUrl);
router.get("/api/shorturl/:id", shortUrlCtrl.getShort)
router.get("/api/shorturl/", function(req, res) {
	var prm = {
		host: req.headers.host
	};
	res.render("short-url", prm);
});

///// timestamp api ////////////
router.get("/api/timestamp/:ts", timestampCtrl.timestamp);
router.get("/api/timestamp/", function(req, res) {
	var prm = {
		host: req.headers.host
	};
	res.render("timestamp", prm);
});

///// timestamp api ////////////
router.get("/api/headerparser/parse", function(req, res) {
	var rsp = {};
	var os = req.headers["user-agent"].match(/\(.+?\)/)[0];

	rsp.ipadress = req.headers['x-forwarded-for'];
	rsp.language = req.headers["accept-language"].split(",")[0];
	rsp.software = os.substring(1, os.length - 1);

	res.send(JSON.stringify(rsp));
});
router.get("/api/headerparser/", function(req, res) {
	var prm = {
		host: req.headers.host
	};
	res.render("headerparser", prm);
});

////// file metadata api   /////

router.get("/api/fileanalyse/", function(req, res){
	var prm = {
		host: req.headers.host
	};
	res.render("fileanalyse", prm);
})

router.post("/api/fileanalyse/",upload.single("file"), function(req, res){
	res.send({fileSize: req.file.size + " bytes"});
})

module.exports = router;