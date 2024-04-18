const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const userRoutes = require('./routes/userRoutes');
const userServices = require('./services/userService');
const jwt = require('jsonwebtoken');
const SECRET_KEY = '9f8b7c6d8e9a7b8c9d0aebfcadbec9f8b7c6d8e9a7b8c9d0aebfcadbec9f8b7c';

const app = express();

app.use(session({
    secret: 'secret',  // Change to use environment variable in production
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }  // Change to true if using HTTPS
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(express.json());

passport.use(new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
        try {
            const admin = await userServices.getAdminByEmail(email);
            if (!admin) {
                return done(null, false, { message: 'Incorrect email.' });
            }
            const isMatch = await bcrypt.compare(password, admin.password);
            if (!isMatch) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, admin);
        } catch (error) {
            return done(error);
        }
    }
));

passport.serializeUser((admin, done) => {
    done(null, admin.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const admin = await userServices.getAdminById(id);
        done(null, admin);
    } catch (error) {
        done(error, null);
    }
});
app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingAdmin = await userServices.getAdminByEmail(email);
        if (existingAdmin) {
            return res.status(409).send('Email already in use');
        }
        const newAdmin = await userServices.addAdmin(email, password);
        const token = jwt.sign({ id: newAdmin.id, email: newAdmin.email }, SECRET_KEY, { expiresIn: '1h' });
        res.status(201).json({ token, id: newAdmin.id, email: newAdmin.email });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).send('Error signing up admin');
    }
});

app.post('/login', passport.authenticate('local'), (req, res) => {
    const token = jwt.sign({ id: req.user.id, email: req.user.email }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ message: 'Logged in successfully', token });
});

app.use('/users', userRoutes);

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
