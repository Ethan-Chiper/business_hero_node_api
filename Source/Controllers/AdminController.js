/* eslint-disable unicorn/prefer-ternary */
/* eslint-disable unicorn/numeric-separators-style */
const {getNanoId, isEmpty,createUserAndTokenInKong} = require('../Helpers/Utils');
const {createAdmin,findOneAdmin, updateAdmin, deleteAdmin} = require('../Repository/AdminRepository');
const Controllers = {
	/**
	 * Admin SignUp
	 * @param request
	 */
	signUp: async (request) => {
		try {
			let data = request?.body;

			let adminData = {
				admin_id: getNanoId(),
				title: data?.title ?? '',
				description: data?.description?? '',
				status: data?.status
			};

			let admin = await createAdmin(adminData);
			if (!isEmpty(admin)) {
				let createKongUser = await createUserAndTokenInKong({
					id: 'admin_' + admin?.admin_id
				});
				if (createKongUser?.error) {
					return {error: true, message: 'Please provide valid data'};
				} else {
					return {
						error: false, message: 'Admin created', data: {admin: admin}
					};
				}
			}
			return {error: true, message: 'data create failure'};
		} catch (error) {
			return {error: true, message: error};
		}
	},
	/***
	 * admin detail
	 * @param adminId
	 * @returns {Promise<{error: boolean, message: string}|{data: *, error: boolean, message: string}>}
	 */
	details: async (adminId) => {
		try{
			if (isEmpty(adminId)){
				return {error: true, message: 'admin_id is empty'};
			}
			let admin = await findOneAdmin({admin_id: adminId});
			if (isEmpty(admin)) {
				return {error: true, message: 'Invalid Credentials!'};
			}return {error: false, message: 'Admin Details:', data: admin};
		}catch(error){
			return {error: true, message: error};
		}
	},
	/**
	 * update
	 * @param {*} requestData 
	 * @returns 
	 */
	Update: async (requestData) => {
        try {
            if (isEmpty(requestData)) {
                return {
                    error: true,
                    message: 'Admin data is not empty',
                    data: undefined
                };
            }else {
                const admin = await findOneAdmin({
                    admin_id: requestData?.admin_id
                });
                if (isEmpty(admin)) {
                    return {
                        error: true,
                        message: 'admin data is not found',
                        data: undefined
                    };
                }
                let requestObject = {
                    title: requestData?.title,
                    description: requestData?.description,
                    status: requestData?.status
                };
                let UpateResult = await updateAdmin(requestObject);
                if (!isEmpty(UpateResult)) {
                    return {
                        error: false,
                        message: 'admin updated successful',
                        data: UpateResult
                    };
                } else {
                    return {
                        error: true,
                        message: 'admin is not updated',
                        data: undefined
                    };
                }
            }
        } catch (error) {
            return {
                error: true,
                message: error.message,
                data: undefined
            };
        }
    },
	/**
	 * Delete Admin
	 * @param {*} adminId 
	 * @returns 
	 */
	Delete: async (adminId) => {
		try{
			if (isEmpty(adminId)){
				return {error: true, message: 'admin_id is empty'};
			}
			let admin = await findOneAdmin({admin_id: adminId});
			if (isEmpty(admin)) {
				return {error: true, message: 'Invalid Credentials!'};
			}
			let deleteAdminData = await deleteAdmin({admin_id: adminId});
			return {error: false, message: 'Admin Details:', data: deleteAdminData};
		}catch(error){
			return {error: true, message: error};
		}
	},

};

module.exports = Controllers;
