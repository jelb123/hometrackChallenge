var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
	const payload = req.body.payload;

	if (Array.isArray(payload) && payload.every(isPropertyValid)) {
		const propertiesArr = payload.filter(isCompleteAndHtv)
		.map((property) => buildAddress(property.address))
		.map((fullAddress) => {
		  	return {
			    concataddress: fullAddress,
			    workflow: "completed",
			    type: "htv"
			};
		})

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

// Ensures the property has all the required fields
function isPropertyValid({workflow, type, address}) {
	return (workflow && type && address && isAddressValid(address));
}

// Ensures property has the required address fields
function isAddressValid({buildingNumber, street, suburb, state, postcode}) {
	return (buildingNumber && street && suburb && state && postcode);
}

function isCompleteAndHtv(property) {
	return (property.workflow === "completed" && property.type === "htv");
}

function buildAddress({unitNumber, buildingNumber, street, suburb, state, postcode}) {
	const address = `${(unitNumber != undefined ? unitNumber + ' ' : '')}` +
		`${buildingNumber} ${street} ${suburb} ${state} ${postcode}`;

	return address;
}
