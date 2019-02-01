'user strict';

const requestHelper = require('./request.helper');

const responseHelper = {
    success(req, res, data, status = 200) {
        return res.status(status).json({ data, requestId: requestHelper.getRequestId(req) });
    },
    error(req, res, err) {
        const errorResponse = {
            error: {
                code: err.status,
                message: err.message
            },
            requestId: requestHelper.getRequestId(req)
        };
        return res.status(err.status).json(errorResponse);
    }
};

module.exports = responseHelper;