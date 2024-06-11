import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    console.log("herehrehrehr",req.cookies.token);
    try {
        const token = req.cookies.token;
        console.log("herehrehrehr",token);
        if (!token) {
            return res.status(401).send({ message: 'Unauthorized' });
        }
        const decoded = jwt.verify(token, 'secret');
        console.log("herehrehrehr",decoded);
        req.role = decoded.role;
        next();
    } catch (error) {
        return res.status(401).send({ message: 'Unauthorizediii' });
    }
}

export default authMiddleware;