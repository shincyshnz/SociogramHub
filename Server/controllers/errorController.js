const errorController = (err, req, res, next) => {
    try {
        console.log("== Error Controller ==", err.message);
        res.status(err.status).json({
            message: err.message,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(`An unknown error occurred. ${error?.message}`);
    } finally {
        next();
    }
};

module.exports = errorController;