var express = require("express");
var imageSearchCtrl = require("../controllers/image-search-ctrl");
var shortUrlCtrl = require("../controllers/short-url-ctrl");

var router = express.Router();

router.get("/", function (req, res) {
	res.send("OK");
})


////  image search api  ////

router.get("/api/latest/imagesearch", imageSearchCtrl.imageSearchLatest)
router.get("/api/imagesearch/:search", imageSearchCtrl.imageSearch);
router.get("/api/imagesearch/", function(req, res){
	var prm = {host: req.headers.host};
	res.render("img-search", prm);
});

//// short url api  ////
router.get(/\/api\/shorturl\/new\/(.+)/, shortUrlCtrl.newUrl);
router.get("/api/shorturl/:id", shortUrlCtrl.getShort)
router.get("/api/shorturl/", function(req, res){
	var prm = {host: req.headers.host};
	res.render("short-url", prm);
});
module.exports = router;