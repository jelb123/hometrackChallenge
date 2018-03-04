var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
	const payload = req.body.payload;

	if (Array.isArray(payload) && payload.every(isPropertyValid)) {
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
	} else {
		res.status(400).json({
			"error": "Could not decode request: JSON parsing failed"
		});
	}
});

module.exports = router;

function isPropertyValid(property) {
	return (property.workflow && property.type && property.address);
}

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
