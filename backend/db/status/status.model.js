const mongoose = require('mongoose');
const StatusSchema = require('./status.schema');

const StatusModel = mongoose.model('Status', StatusSchema);

module.exports = StatusModel;