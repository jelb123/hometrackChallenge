process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');

let app = require('../app');
let should = chai.should();

chai.use(chaiHttp);

////
// Invalid payload
describe('/POST / empty request', () => {
    it('it should return a 400 error', (done) => {
        chai.request(app)
            .post('/')
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                res.body.should.have.property('error').eql('Could not decode request: JSON parsing failed');
                done();
            });
    });
});

describe('/POST / One valid property but payload not an array', () => {
	it('it should return a 400 error', (done) => {
        let payload = {
		    "payload": {
	            "address": {
	                "buildingNumber": "28",
	                "lat": -33.912542000000002,
	                "lon": 151.00293199999999,
	                "postcode": "2198",
	                "state": "NSW",
	                "street": "Donington Ave",
	                "suburb": "Georges Hall"
	            },
	            "propertyTypeId": 3,
	            "readyState": "init",
	            "reference": "aqsdasd",
	            "shortId": "6Laj49N3PiwZ",
	            "status": 0,
	            "type": "htv",
	            "workflow": "completed"
	        }
		};
		chai.request(app)
            .post('/')
			.send(payload)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                res.body.should.have.property('error').eql('Could not decode request: JSON parsing failed');
                done();
            });
    });
});

describe('/POST / One property with no "type" field', () => {
	it('it should return a 400 error', (done) => {
        let payload = {
		    "payload": [{
	            "address": {
	                "buildingNumber": "28",
	                "lat": -33.912542000000002,
	                "lon": 151.00293199999999,
	                "postcode": "2198",
	                "state": "NSW",
	                "street": "Donington Ave",
	                "suburb": "Georges Hall"
	            },
	            "propertyTypeId": 3,
	            "readyState": "init",
	            "reference": "aqsdasd",
	            "shortId": "6Laj49N3PiwZ",
	            "status": 0,
	            "workflow": "completed"
	        }]
		};
		chai.request(app)
            .post('/')
			.send(payload)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                res.body.should.have.property('error').eql('Could not decode request: JSON parsing failed');
                done();
            });
    });
});

describe('/POST / One property with no "workflow" field', () => {
	it('it should return a 400 error', (done) => {
        let payload = {
		    "payload": [{
	            "address": {
	                "buildingNumber": "28",
	                "lat": -33.912542000000002,
	                "lon": 151.00293199999999,
	                "postcode": "2198",
	                "state": "NSW",
	                "street": "Donington Ave",
	                "suburb": "Georges Hall"
	            },
	            "propertyTypeId": 3,
	            "readyState": "init",
	            "reference": "aqsdasd",
	            "shortId": "6Laj49N3PiwZ",
	            "status": 0,
				"type": "htv"
	        }]
		};
		chai.request(app)
            .post('/')
			.send(payload)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                res.body.should.have.property('error').eql('Could not decode request: JSON parsing failed');
                done();
            });
    });
});

describe('/POST / One property with no "address" field', () => {
	it('it should return a 400 error', (done) => {
        let payload = {
		    "payload": [{
	            "propertyTypeId": 3,
	            "readyState": "init",
	            "reference": "aqsdasd",
	            "shortId": "6Laj49N3PiwZ",
	            "status": 0,
				"type": "htv",
				"workflow": "completed"
	        }]
		};
		chai.request(app)
            .post('/')
			.send(payload)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                res.body.should.have.property('error').eql('Could not decode request: JSON parsing failed');
                done();
            });
    });
});

describe('/POST / One property with no "street" field', () => {
	it('it should return a 400 error', (done) => {
        let payload = {
		    "payload": [{
	            "address": {
	                "buildingNumber": "28",
	                "lat": -33.912542000000002,
	                "lon": 151.00293199999999,
	                "postcode": "2198",
	                "state": "NSW",
	                "suburb": "Georges Hall"
	            },
	            "propertyTypeId": 3,
	            "readyState": "init",
	            "reference": "aqsdasd",
	            "shortId": "6Laj49N3PiwZ",
	            "status": 0,
				"type": "htv",
				"workflow": "completed"
	        }]
		};
		chai.request(app)
            .post('/')
			.send(payload)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                res.body.should.have.property('error').eql('Could not decode request: JSON parsing failed');
                done();
            });
    });
});

describe('/POST / One property with no "buildingNumber" field', () => {
	it('it should return a 400 error', (done) => {
        let payload = {
		    "payload": [{
	            "address": {
	                "lat": -33.912542000000002,
	                "lon": 151.00293199999999,
	                "postcode": "2198",
	                "state": "NSW",
					"street": "Donington Ave",
	                "suburb": "Georges Hall"
	            },
	            "propertyTypeId": 3,
	            "readyState": "init",
	            "reference": "aqsdasd",
	            "shortId": "6Laj49N3PiwZ",
	            "status": 0,
				"type": "htv",
				"workflow": "completed"
	        }]
		};
		chai.request(app)
            .post('/')
			.send(payload)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                res.body.should.have.property('error').eql('Could not decode request: JSON parsing failed');
                done();
            });
    });
});

describe('/POST / One property with no "suburb" field', () => {
	it('it should return a 400 error', (done) => {
        let payload = {
		    "payload": [{
	            "address": {
	                "buildingNumber": "28",
	                "lat": -33.912542000000002,
	                "lon": 151.00293199999999,
	                "postcode": "2198",
	                "state": "NSW",
					"street": "Donington Ave"
	            },
	            "propertyTypeId": 3,
	            "readyState": "init",
	            "reference": "aqsdasd",
	            "shortId": "6Laj49N3PiwZ",
	            "status": 0,
				"type": "htv",
				"workflow": "completed"
	        }]
		};
		chai.request(app)
            .post('/')
			.send(payload)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                res.body.should.have.property('error').eql('Could not decode request: JSON parsing failed');
                done();
            });
    });
});

describe('/POST / One property with no "postcode" field', () => {
	it('it should return a 400 error', (done) => {
        let payload = {
		    "payload": [{
	            "address": {
	                "buildingNumber": "28",
	                "lat": -33.912542000000002,
	                "lon": 151.00293199999999,
	                "state": "NSW",
					"street": "Donington Ave",
					"suburb": "Georges Hall"
	            },
	            "propertyTypeId": 3,
	            "readyState": "init",
	            "reference": "aqsdasd",
	            "shortId": "6Laj49N3PiwZ",
	            "status": 0,
				"type": "htv",
				"workflow": "completed"
	        }]
		};
		chai.request(app)
            .post('/')
			.send(payload)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                res.body.should.have.property('error').eql('Could not decode request: JSON parsing failed');
                done();
            });
    });
});

describe('/POST / One property with no "state" field', () => {
	it('it should return a 400 error', (done) => {
        let payload = {
		    "payload": [{
	            "address": {
	                "buildingNumber": "28",
	                "lat": -33.912542000000002,
	                "lon": 151.00293199999999,
					"postcode": "2198",
					"street": "Donington Ave",
					"suburb": "Georges Hall"
	            },
	            "propertyTypeId": 3,
	            "readyState": "init",
	            "reference": "aqsdasd",
	            "shortId": "6Laj49N3PiwZ",
	            "status": 0,
				"type": "htv",
				"workflow": "completed"
	        }]
		};
		chai.request(app)
            .post('/')
			.send(payload)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                res.body.should.have.property('error').eql('Could not decode request: JSON parsing failed');
                done();
            });
    });
});

////
// Everything valid with 1 property in array
describe('/POST / One property with all fields valid but not meeting "workflow" criteria', () => {
	it('it should return a 200 success with an empty array', (done) => {
        let payload = {
		    "payload": [
		        {
		            "address": {
		                "buildingNumber": "Level 6",
		                "postcode": "2060",
		                "state": "NSW",
		                "street": "146 Arthur Street",
		                "suburb": "North Sydney"
		            },
		            "propertyTypeId": 3,
		            "readyState": "init",
		            "reference": "asdasd",
		            "shortId": "E9eQVYEMkub2",
		            "status": 4,
		            "type": "htv",
		            "valfirm": null,
		            "workflow": "pending"
		        },
		    ]
		};
		chai.request(app)
            .post('/')
			.send(payload)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('response');
				res.body.response.should.be.an('array');
				res.body.response.should.be.empty;
                done();
            });
    });
});

describe('/POST / One property with all fields valid but not meeting "type" criteria', () => {
	it('it should return a 200 success with an empty array', (done) => {
        let payload = {
		    "payload": [
		        {
		            "address": {
		                "buildingNumber": "Level 6",
		                "postcode": "2060",
		                "state": "NSW",
		                "street": "146 Arthur Street",
		                "suburb": "North Sydney"
		            },
		            "propertyTypeId": 3,
		            "readyState": "init",
		            "reference": "asdasd",
		            "shortId": "E9eQVYEMkub2",
		            "status": 4,
		            "type": "avm",
		            "valfirm": null,
		            "workflow": "completed"
		        },
		    ]
		};
		chai.request(app)
            .post('/')
			.send(payload)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('response');
				res.body.response.should.be.an('array');
				res.body.response.should.be.empty;
                done();
            });
    });
});

describe('/POST / One property with all fields valid and meet criteria', () => {
	it('it should return a 200 success with the property meeting criteria', (done) => {
        let payload = {
		    "payload": [
		        {
		            "address": {
		                "buildingNumber": "Level 6",
		                "postcode": "2060",
		                "state": "NSW",
		                "street": "146 Arthur Street",
		                "suburb": "North Sydney"
		            },
		            "propertyTypeId": 3,
		            "readyState": "init",
		            "reference": "asdasd",
		            "shortId": "E9eQVYEMkub2",
		            "status": 4,
		            "type": "htv",
		            "valfirm": null,
		            "workflow": "completed"
		        },
		    ]
		};
		chai.request(app)
            .post('/')
			.send(payload)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('response');
				res.body.response.should.be.an('array');
				res.body.response.length.should.eql(1);
				res.body.should.deep.equal({
				    "response": [
				        {
				            "concataddress": "Level 6 146 Arthur Street North Sydney NSW 2060",
				            "workflow": "completed",
				            "type": "htv"
				        }
				    ]
				})
				done();
            });
    });
});

////
// Multiple properties

// Multiple properties with one containing missing fields
describe('/POST / Multiple properties with one missing "type" field', () => {
	it('it should return a 400 error', (done) => {
        let payload = {
		    "payload": [
		        {
		            "address": {
		                "buildingNumber": "28",
		                "lat": -33.912542000000002,
		                "lon": 151.00293199999999,
		                "postcode": "2198",
		                "state": "NSW",
		                "street": "Donington Ave",
		                "suburb": "Georges Hall"
		            },
		            "propertyTypeId": 3,
		            "readyState": "init",
		            "reference": "aqsdasd",
		            "shortId": "6Laj49N3PiwZ",
		            "status": 0,
		            "workflow": "pending"
		        },
		        {
		            "address": {
		                "buildingNumber": "Level 6",
		                "postcode": "2060",
		                "state": "NSW",
		                "street": "146 Arthur Street",
		                "suburb": "North Sydney"
		            },
		            "propertyTypeId": 3,
		            "readyState": "init",
		            "reference": "asdasd",
		            "shortId": "E9eQVYEMkub2",
		            "status": 4,
		            "type": "htv",
		            "valfirm": null,
		            "workflow": "completed"
		        }
			]
		};
		chai.request(app)
            .post('/')
			.send(payload)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                res.body.should.have.property('error').eql('Could not decode request: JSON parsing failed');
                done();
            });
    });
});

describe('/POST / Multiple properties with one missing "workflow" field', () => {
	it('it should return a 400 error', (done) => {
        let payload = {
		    "payload": [
		        {
		            "address": {
		                "buildingNumber": "28",
		                "lat": -33.912542000000002,
		                "lon": 151.00293199999999,
		                "postcode": "2198",
		                "state": "NSW",
		                "street": "Donington Ave",
		                "suburb": "Georges Hall"
		            },
		            "propertyTypeId": 3,
		            "readyState": "init",
		            "reference": "aqsdasd",
		            "shortId": "6Laj49N3PiwZ",
					"type": "htv",
		            "status": 0,
		        },
		        {
		            "address": {
		                "buildingNumber": "Level 6",
		                "postcode": "2060",
		                "state": "NSW",
		                "street": "146 Arthur Street",
		                "suburb": "North Sydney"
		            },
		            "propertyTypeId": 3,
		            "readyState": "init",
		            "reference": "asdasd",
		            "shortId": "E9eQVYEMkub2",
		            "status": 4,
		            "type": "htv",
		            "valfirm": null,
		            "workflow": "completed"
		        }
			]
		};
		chai.request(app)
            .post('/')
			.send(payload)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                res.body.should.have.property('error').eql('Could not decode request: JSON parsing failed');
                done();
            });
    });
});

describe('/POST / Multiple properties with one meeting criteria', () => {
	it('it should return a 200 success', (done) => {
        let payload = {
		    "payload": [
		        {
		            "address": {
		                "buildingNumber": "28",
		                "lat": -33.912542000000002,
		                "lon": 151.00293199999999,
		                "postcode": "2198",
		                "state": "NSW",
		                "street": "Donington Ave",
		                "suburb": "Georges Hall"
		            },
		            "propertyTypeId": 3,
		            "readyState": "init",
		            "reference": "aqsdasd",
		            "shortId": "6Laj49N3PiwZ",
					"type": "htv",
		            "status": 0,
					"workflow": "pending"
		        },
		        {
		            "address": {
		                "buildingNumber": "Level 6",
		                "postcode": "2060",
		                "state": "NSW",
		                "street": "146 Arthur Street",
		                "suburb": "North Sydney"
		            },
		            "propertyTypeId": 3,
		            "readyState": "init",
		            "reference": "asdasd",
		            "shortId": "E9eQVYEMkub2",
		            "status": 4,
		            "type": "htv",
		            "valfirm": null,
		            "workflow": "completed"
		        }
			]
		};
		chai.request(app)
            .post('/')
			.send(payload)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('response');
				res.body.response.should.be.an('array');
				res.body.response.length.should.eql(1);
				res.body.should.deep.equal({
					"response": [
				        {
				            "concataddress": "Level 6 146 Arthur Street North Sydney NSW 2060",
				            "workflow": "completed",
				            "type": "htv"
				        }
				    ]
				})
				done();
            });
    });
});

describe('/POST / Seven properties with two meeting criteria', () => {
	it('it should return a 200 success', (done) => {
        let payload = {
		    "payload": [
		        {
		            "address": {
		                "buildingNumber": "28",
		                "lat": -33.912542000000002,
		                "lon": 151.00293199999999,
		                "postcode": "2198",
		                "state": "NSW",
		                "street": "Donington Ave",
		                "suburb": "Georges Hall"
		            },
		            "propertyTypeId": 3,
		            "readyState": "init",
		            "reference": "aqsdasd",
		            "shortId": "6Laj49N3PiwZ",
		            "status": 0,
		            "type": "htv",
		            "workflow": "pending"
		        },
		        {
		            "address": {
		                "buildingNumber": "Level 6",
		                "postcode": "2060",
		                "state": "NSW",
		                "street": "146 Arthur Street",
		                "suburb": "North Sydney"
		            },
		            "propertyTypeId": 3,
		            "readyState": "init",
		            "reference": "asdasd",
		            "shortId": "E9eQVYEMkub2",
		            "status": 4,
		            "type": "htv",
		            "valfirm": null,
		            "workflow": "completed"
		        },
		        {
		            "address": {
		                "buildingNumber": "25",
		                "postcode": "4000",
		                "state": "QLD",
		                "street": "Mary St",
		                "suburb": "Brisbane"
		            },
		            "propertyTypeId": 3,
		            "readyState": "init",
		            "reference": "asdas",
		            "shortId": "nQMyWWLBvu4A",
		            "status": 1,
		            "type": "avm",
		            "workflow": "pending"
		        },
		        {
		            "address": {
		                "buildingNumber": "92",
		                "postcode": "2000",
		                "state": "NSW",
		                "street": "Pitt Street",
		                "suburb": "Sydney",
		                "unitNumber": "Suite 1 Level 8"
		            },
		            "propertyTypeId": 3,
		            "readyState": "complete",
		            "reference": "asdasd",
		            "shortId": "ZM73nE4nKH56",
		            "status": 4,
		            "type": "avm",
		            "workflow": "cancelled"
		        },
		        {
		            "address": {
		                "buildingNumber": "28",
		                "lat": -33.912542000000002,
		                "lon": 151.00293199999999,
		                "postcode": "2198",
		                "state": "NSW",
		                "street": "Donington Ave",
		                "suburb": "Georges Hall"
		            },
		            "propertyTypeId": 3,
		            "readyState": "complete",
		            "reference": "asdasdas",
		            "shortId": "AQzAB5xMXFNx",
		            "status": 3,
		            "type": "avm",
		            "workflow": "completed"
		        },
		        {
		            "address": {
		                "buildingNumber": "360",
		                "postcode": "3000",
		                "state": "VIC",
		                "street": "Elizabeth St",
		                "suburb": "Melbourne",
		                "unitNumber": "Level 28"
		            },
		            "propertyTypeId": 3,
		            "readyState": "complete",
		            "reference": "asdas",
		            "shortId": "yebZvgdA7FRk",
		            "status": 1,
		            "type": "htv",
		            "workflow": "completed"
		        },
		        {
		            "address": {
		                "buildingNumber": "153",
		                "postcode": "2229",
		                "state": "NSW",
		                "street": "Denman Avenue",
		                "suburb": "CARINGBAH",
		                "unitNumber": "Suite 7"
		            },
		            "propertyTypeId": 3,
		            "readyState": "complete",
		            "reference": "asdas",
		            "shortId": "YP7NJVNpVCdr",
		            "status": 4,
		            "type": "htv",
		            "workflow": "cancelled"
		        }
		    ]
		};
		chai.request(app)
            .post('/')
			.send(payload)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('response');
				res.body.response.should.be.an('array');
				res.body.response.length.should.eql(2);
				res.body.should.deep.equal({
					"response": [
				        {
				            "concataddress": "Level 6 146 Arthur Street North Sydney NSW 2060",
				            "workflow": "completed",
				            "type": "htv"
				        },
				        {
				            "concataddress": "Level 28 360 Elizabeth St Melbourne VIC 3000",
				            "workflow": "completed",
				            "type": "htv"
				        }
				    ]
				})
				done();
            });
    });
});
