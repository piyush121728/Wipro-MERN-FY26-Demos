// Validation Middleware for Student Routes (User Story 2)
module.exports = (req, res, next) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            success: false,
            message: "Name and email are required fields."
        });
    }

    next();
};
