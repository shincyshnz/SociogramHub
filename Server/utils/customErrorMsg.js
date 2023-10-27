const customErrorMessage = (status, errMsg) => {
    let err = new Error(errMsg);
    err.status = status;
    throw err;
};

module.exports = { customErrorMessage };