const {check} = require('express-validator');

const Validate = {
	adminValidation: () => {
		return [
			check('title', 'please enter the title').notEmpty({ignore_whitespace: true})
		];
	}
};

module.exports = Validate;
