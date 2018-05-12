const accountSid = 'ACca83b7bfe983f94261fddc3062e9f7f8';
const authToken = '64777135182e2a3e3e82f01b1820ea8b';
const client = require('twilio')(accountSid, authToken);
const request = require('request');
const fs = require('fs');
const split = require('split');
const VoiceResponse = require('twilio').twiml.VoiceResponse;


var phoneNumberToContact;
var businessOwner = "Strawberry";
var businessName = "AmazingCo";
var address = "282819283";
var ownerEmail = "strawberry@AmazingCo.com";



request({
  url: 'https://api.foursquare.com/v2/venues/search',
  method: 'GET',
  qs: {
    client_id: 'LRUA0MJDF02JHHVUG30CDNFOINFW22131AG2LJZL0O3J1YTR',
    client_secret: 'PH45W0QZ5TTQQRRNFAVTQFKVPLHDP1RW01VUVDNPKBY1MD4O',
    ll: '39.7391,-75.5398' , 
		 v: '20180323',
    query: 'delaware registered',
    limit: 1
  }
}, function(err, res, body) {
  if (err) {
    console.error(err);
  } else {
  var parsedBody = JSON.parse(body); 
	var coolArray = parsedBody.response.venues[0];
	var contactArray = coolArray.contact;

phoneNumberToContact = contactArray.phone;
client.calls
  .create({
    url: 'http://twimlets.com/echo?Twiml=%3CResponse%3E%3CSay%3EHello!+My+name+is+'+ businessOwner + 'and+I+would+like+to+start+a+Delaware+business+for+my+company+' +businessName + '.+My+business+is+already+registered+as+a+smart+contract+at+' + address + '.+Would+you+be+able+to+help+me+in+this+process?+Email+me+at+' + ownerEmail + 'to+get+back+to+me.+Thanks!%3C%2FSay%3E%%3C%2FResponse%3E',
    to: '+19255239179',
    from: '+15305645305',
  })
 .then(call => process.stdout.write(call.sid));
const response = new VoiceResponse();
response.say('Hello how are you? I love you!');
console.log(response.toString());}
});

