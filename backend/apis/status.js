const express = require('express');
const router = express.Router();
const StatusModel = require('../db/status/status.model');

// GET
router.get('/', async function (req, res) {
    try {
        const statuses = await StatusModel.find()
        .sort({ createdAt: -1 })
        .populate('user', 'username');
        res.json(statuses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST
router.post('/', async function(req, res) {
    const { user, content } = req.body;

    if (!user || !content) {
        return res.status(400).json({ error: 'Missing user or content' });
    }

    try {
        const newStatus = new StatusModel({ user, content });
        await newStatus.save();
        res.status(201).json(newStatus);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// UPDATE
router.put('/:id', async function(req, res) {
    const statusId = req.params.id;
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ error: 'Missing content' });
    }

    try {
        const updatedStatus = await StatusModel.findByIdAndUpdate(
            statusId,
            { content },
            { new: true }
        );

        if (!updatedStatus) {
            return res.status(404).json({ error: 'Status not found' });
        }

        res.json(updatedStatus);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE
router.delete('/:id', async function(req, res) {
    const statusId = req.params.id;
    try {
        const deletedStatus = await StatusModel.findByIdAndDelete(statusId);
        if (!deletedStatus) {
            return res.status(404).json({ error: 'Status not found' });
        }
        res.json({ message: 'Status deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;