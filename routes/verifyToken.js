const jwt = require("jsonwebtoken");
let count = 0;
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            if (err) 
                res.status(403).json("Token is not valid")

            req.user = user;
            console.log('logging user - ');
            console.log(count++);

            next();
        });
    } else {
        return res.status(401).json("You're not Authenticated!");
    }
};

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json('you are not allowed to do that!');
        }
    })
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            console.log('admin delete');
            next();
        } else {
            res.status(403).json('you are not allowed to do that!');
        }
    })
}
module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
};
