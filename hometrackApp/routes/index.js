var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
	const payload = req.body.payload;

	const propertiesArr = payload.filter((property) => {
		return (property.workflow === "completed" && property.type === "htv");
	}).map((property) => {
		const address = concatAddress(property.address);
		return {
			concataddress: address,
			workflow: property.workflow,
			type: property.type
		};
	});

	res.status(200).json({
		response: propertiesArr
	});
});

module.exports = router;

function concatAddress({unitNumber, buildingNumber, street, suburb, state, postcode}) {
	let address = "";
	address += (unitNumber != undefined ? unitNumber + ' ' : '');
	address += buildingNumber + ' ';
	address += street + ' ';
	address += suburb + ' ';
	address += state + ' ';
	address += postcode + ' ';

	return address;
}
