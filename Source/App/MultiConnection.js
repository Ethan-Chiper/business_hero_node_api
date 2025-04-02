const mongoose = require('mongoose');
const Config = require('./Config');
const DB_URL = Config.BUSINESS_DB_URL;

const MultiDBConnection = {
	establish: async (Express) => {
		return await new Promise((resolve) => {
			let adminDBCheck = false;
			mongoose.set('strictQuery', true);
			try {
				mongoose.connect(DB_URL);
				console.log('admin database connection established');
				adminDBCheck = true;
			} catch (error) {
				throw error;
			}
			mongoose.set('debug', true);

			resolve([
				adminDBCheck
			]);
		})
			.then(() => {
				Express.listen('5025', () => {
					console.log('server is running in 5025');
				});
			})
			.catch((error) => {
				throw error;
			});
	},

	getAdminDBConnection: () => {
		return mongoose;
	}
};

module.exports = MultiDBConnection;
