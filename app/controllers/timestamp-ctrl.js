var validator = require("validator");
var dateFormat = require("dateformat");

module.exports.timestamp = function(req, res) {
	var timeParam;
	if (validator.isNumeric(req.params.ts)) {
		timeParam = new Date(parseInt(req.params.ts) * 1000);
	} else {
		timeParam = new Date(req.params.ts);
	}
	var rsp = {
		unix: null,
		natural: null
	};

	if (timeParam != "Invalid Date") {
		rsp.unix = timeParam.getTime() / 1000;
		rsp.natural = dateFormat(timeParam, "mmmm dd, yyyy");
	}

	res.send(JSON.stringify(rsp));
}