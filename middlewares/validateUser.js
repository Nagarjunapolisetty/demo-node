export const validateUser = (req, res, next) => {
    const { firstName, lastName, email, password, date_of_birth, role } = req.body;

    if (typeof firstName !== 'string' || firstName.length < 3 || typeof lastName !== 'string' || lastName.length < 3) {
        return res.status(400).json({
            message: 'First name and Last name must be at least 3 characters',
        });
    }

    const emailRegex = /\S+@\S+\.\S+/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({
            message: 'Invalid email format',
        });
    }

    if (password.length < 8) {
        return res.status(400).json({
            message: 'Password must be at least 8 characters long',
        });
    }

    if (!/[A-Z]/.test(password)) {
        return res.status(400).json({
            message: 'Password must contain at least one uppercase letter',
        });
    }

    if (!/[a-z]/.test(password)) {
        return res.status(400).json({
            message: 'Password must contain at least one lowercase letter',
        });
    }

    if (!/[0-9]/.test(password)) {
        return res.status(400).json({
            message: 'Password must contain at least one number',
        });
    }

    if (!/[\W_]/.test(password)) {
        return res.status(400).json({
            message: 'Password must contain at least one special character',
        });
    }
    
    next();
};