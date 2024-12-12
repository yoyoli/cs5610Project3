const express = require('express');
const router = express.Router();
const UserModel = require('../db/user/user.model');
const StatusModel = require('../db/status/status.model');

// GET all users
router.get('/', async function (req, res) {
    try {
        const users = await UserModel.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST Create Account
router.post('/', async function (req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Missing username or password' });
    }
    try {
        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ error: 'Username already exists' });
        }
        const newUser = new UserModel({ username, password });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// POST Log In
router.post('/login', async function (req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Missing username or password' });
    }
    try {
        const user = await UserModel.findOne({ username, password });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        res.status(200).json({ message: 'Login successful', user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT Update user
router.put('/:id', async function (req, res) {
    const { id } = req.params;
    const { username, password } = req.body;
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            id,
            { username, password },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE Delete user
router.delete('/:id', async function (req, res) {
    const { id } = req.params;
    try {
        const deletedUser = await UserModel.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(deletedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const user = await UserModel.findById(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const statuses = await StatusModel.find({ user: user._id }).sort({ createdAt: -1 });
      res.json({ user, statuses });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});


module.exports = router;
