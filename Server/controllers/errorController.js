const errorController = (err, req, res, next) => {
    try {
        console.log("== Error Controller ==", err.message);
        res.status(400).json({
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