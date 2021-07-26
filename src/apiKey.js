import jsSHA from "jssha";

const apiID = "e076b2463e674e1e95cf5fd189f15b00";
const apiKey = "nL1Irz7_VltcPMn6JTT7VyW-yWI";

const getAuthorizationHeader = function () {
	var GMTString = new Date().toGMTString();
	var ShaObj = new jsSHA("SHA-1", "TEXT");
	ShaObj.setHMACKey(apiKey, "TEXT");
	ShaObj.update("x-date: " + GMTString);
	var HMAC = ShaObj.getHMAC("B64");
	var Authorization =
		'hmac username="' +
		apiID +
		'", algorithm="hmac-sha1", headers="x-date", signature="' +
		HMAC +
		'"';

	return {
		Authorization: Authorization,
		"X-Date": GMTString,
	};
};

export default getAuthorizationHeader();
