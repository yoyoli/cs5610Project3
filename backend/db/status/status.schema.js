const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StatusSchema = new Schema(
    {
        user: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = StatusSchema;