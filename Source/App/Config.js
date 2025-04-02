const Dotenv = require('dotenv');
Dotenv.config({path: 'Source/App/.env'});
const environment = process.env;
module.exports = {
	BUSINESS_DB_URL: environment.DB_URL_BUSINESS_SYSTEM || 'mongodb://localhost:27017/business_hero',
	KONG_URL: environment.KONG_API || 'http://192.168.0.102:7001/consumers/'
};
