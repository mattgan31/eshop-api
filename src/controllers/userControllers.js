import bcrypt from 'bcrypt';
import models from '../models/init-models';
import jwt from 'jsonwebtoken';

const createUser = async (req, res, next) => {
    if (req.body.username == '') {
        return res.status(401).send({
            status: 401,
            message: "Username is required"
        });
    } else if (req.body.password == '') {
        return res.status(401).send({
            status: 401,
            message: "Password is required"
        });
    } else {
        try {
            const salt = await bcrypt.genSalt(10);
            const passHash = bcrypt.hashSync(req.body.password, salt);
            const user = await req.context.models.users.create({
                username: req.body.username,
                password: passHash,
            });
            req.user = user;
            next();
        } catch (error) {
            console.log(error);
            return res.json(error);
        }
    }
}

const userLogin = async (req, res) => {
    const data = req.body;

    await findUserByUsername(data.username).then((user) => {
        if (user.username) {
            if (bcrypt.compareSync(data.password, user.password)) {
                const token = jwt.sign(
                    {
                        id: user.id
                    },
                    process.env.SECRET_KEY,
                    {
                        expiresIn: "2d",
                    }
                );
                const { password, ...userData } = user.dataValues;
                return res.json({
                    status: 200,
                    data: {
                        userData,
                        token
                    }
                });
            } else {
                return res.json({
                    status: 401,
                    error: "Login error"
                });
            }
        } else {
            return res.json({
                status: 404,
                error: "User not found"
            });
        }
    }).catch((error) => {
        console.log(error);
        return res.json({
            status: 404,
            error
        });
    })
}

const findUserByUsername = async (username) => {
    const user = await models.users.findOne({
        where: { username: username }
    }).catch((error) => {
        console.log(error);
        return res.json(error);
    });
    return user;
}

export default {
    createUser,
    userLogin
}
