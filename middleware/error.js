const error = (err, req, res, next) => {
    console.log("======Error Summary======");
    console.error(err.message);
    console.log("======Error Details======");
    console.error(err.stack);

    res.status(500).json({
        ERROR: "Internal Server Error",
    });
};

module.exports = error;