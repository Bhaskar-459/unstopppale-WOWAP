import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import path from 'path';
import UserModel from '../Backend/models/UserModel.js';

const router = express.Router();
const __dirname = path.resolve();

router.use(cookieParser());

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '/Frontend/user/login.html'));
});

router.post('/login', async (req, res) => {
    try {
        console.log(req.body);
        const { email, password, role} = req.body;
        const user = await UserModel.findOne({ email });
        console.log(user);

        if (!user) {
            res.status(404);
            return res.redirect('/user/login');
        }
       
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            res.status(400)
            console.log('Invalid password');
            return res.redirect('/user/login');
        }

        const token = jwt.sign({ id: user._id, role: user.role }, 'secret', { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });

        // Redirect based on the role
        if (role === 'doctor') {
            res.redirect('/doctor');
        } else if (role === 'nurse') {
            res.redirect('/nurse');
        } else if (role === 'receptionist') {
            res.redirect('/receptionist');
        } else {
            res.status(400).send({ message: 'Invalid role' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Internal server error' });
    }
});

router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '/Frontend/user/register.html'));
});

router.post('/register', async (req, res) => {
    try {
        console.log(req.body);
        const { email, username, password, role } = req.body;
        const userExists = await UserModel.findOne({ email});
        if (userExists) {
            res.redirect('/user/login');
            return;
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await UserModel.create({ email, username, password: hashedPassword, role });
        console.log(user);
        const token = jwt.sign({ id: user._id, role: user.role }, 'secret', { expiresIn: '1h' });

        res.cookie('token', token, { httpOnly: true });
        console.log('Role:', role);
        if (role === 'doctor') {
            console.log('Doctor');  
            res.redirect('/doctor');
        } else if (role === 'nurse') {
            res.redirect('/nurse');
        } else if (role === 'receptionist') {
            res.redirect('/receptionist');
        } else {
            res.status(400).send({ message: 'Invalid role' });
        }

        // res.status(201).send({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Internal server error' });
    }
});

export default router;
