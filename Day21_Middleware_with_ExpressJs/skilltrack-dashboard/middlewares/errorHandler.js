// Error Handling Middleware (User Story 5)
module.exports = (err, req, res, next) => {
    console.error("SERVER ERROR:", err.stack);

    res.status(500).json({
        success: false,
        message: "Something went wrong on the server!"
    });
};
