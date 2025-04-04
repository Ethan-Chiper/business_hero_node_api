const AdminModel = require('../Models/AdminModel');
const {isEmpty} = require('../Helpers/Utils');

const AdminQuery = {
	/**
	 * To do database query on Admin Model.
	 * @param queryOptions
	 * @returns {Promise<*>}
	 */
	findOneAdmin: async (queryOptions) => {
		if (isEmpty(queryOptions?.method)) queryOptions.method = 'findOne';
		let projection = queryOptions?.projection || {admin_id: 1, status: 1};
		let condition = queryOptions || {};
		let options = queryOptions?.options || {lean: true};
		return await AdminModel[queryOptions.method](condition, projection, options);
	},

	createAdmin: async (queryOptions) => {
		let document = queryOptions || {};
		let options = queryOptions || {};
		const admin = await AdminModel.create([document], options);
		return admin[0];
	},

	updateAdmin: async (condition, projection) => {
        if (isEmpty(projection)) projection = { new: true };
        return await AdminModel.findOneAndUpdate(condition, projection);
    },

	//For testing purpose
	deleteAdmin: async (condition, options) => {
		if (isEmpty(condition)) return;
		if (isEmpty(options)) options = {};

		return await AdminModel.deleteOne(condition, options);
	}
};

module.exports = AdminQuery;
