const Connection = require('../App/MultiConnection');
const adminConnection = Connection.getAdminDBConnection();
const timestamps = require('mongoose-timestamp');
const mongoose = require('mongoose');

const adminSchema = new adminConnection.Schema({
	admin_id: String,
	title: {type: String, default: ''},
	description:  {type: String, default: ''},
	status: {type: Boolean, default: false}
});
adminSchema.plugin(timestamps);

let adminModel = mongoose.model('admin', adminSchema);

module.exports = adminModel;
