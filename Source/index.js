const Express = require('express');
const App = Express();
let helmet = require('helmet');
App.use(Express.json());
App.use(helmet.hidePoweredBy());

require('../Source/App/MultiConnection').establish(App);
/***--------------------------------------------------------------------------***/
App.use('/api/admin', require('./Routes/AdminRouter'));
/***--------------------------------------------------------------------------***/

module.exports = App;
