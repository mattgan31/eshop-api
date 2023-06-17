import jwt  from "jsonwebtoken";
const verifyToken = (req, res, next) => {
    let bearer = req.headers.authorization;
    if (!bearer) {
        return res.json({
            status: 404,
            error: "Unauthorized"
        });
    }
    bearer = bearer.split(" ");
    const token = bearer[1];
    const logined = jwt.verify(token, process.env.SECRET_KEY);
    if (!logined) {
        return res.json({
            status: 404,
            error: "Unauthorized"
        })
    }
    req.user = logined;
    next();
}

export default {
    verifyToken
}
