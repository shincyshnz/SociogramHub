const errorController = (err, req, res, next) => {
    try {
        console.log("== Error Controller ==", err);
        res.status(err.status || 400).json({
            message: err?.message || err,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(`An unknown error occurred. ${error?.message}`);
    } finally {
        next();

    };
}
module.exports = errorController;