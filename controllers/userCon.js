const prisma = require('../prisma/index');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

exports.register = async (req, res, next) => {
    try {
        let { name, email, password } = req.body;
        if (!name || !email || !password ) {
            return res.status(400).send('Please input all fields')
        };
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt)
        const user = await prisma.user.create({
            data: {
                name, email, password
            }
        });
        return res.status(201).send(user)
    } catch (error) {
        return res.status(500).send(error)
    }
};

exports.login = async (req, res) => {
    let email = req.body.email;
    let pass = req.body.password;

    try {
        var users = await prisma.user.findUnique({
            where: {email: email}
        })
        if (!users) {
            return res.status(404).send({ message: 'incorrect email!!' })
        };

        const password = users.password;
        let passMatch = await bcrypt.compare(pass, password)
        let key = 'webmobtech';

        if (passMatch) {
            const token = jwt.sign({
                id: users._id
            }, key)
            res.status(201).send({ token: token })
        } else {
            return res.status(400).send('incorrect password!!')
        }
    } catch (e) {
        return res.status(500).send(e.message)
    }
};


exports.getUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await prisma.user.findMany({
            where: { id: id }
        });
        return res.status(200).send(user)
    } catch (error) {
        return res.status(500).send(error)
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const user = await prisma.user.update({
            where: { id: id },
            data: req.body
        });
        return res.status(201).send(user)
    } catch (error) {
        return res.status(500).send(error)
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await prisma.user.delete({
            where: { id: id }
        });
        return res.status(200).send('successfully deleted data!!')
    } catch (error) {
        return res.status(500).send(error)
    }
};