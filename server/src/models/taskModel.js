const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: [true, "title is required"],
        },
        completed: {
            type: Boolean,
            default: false,
        },
        startTime: {
            type: Date
        },
        elapsedTime: {
            type: Number
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true 
        }

    },
    {
        timestamps: true 
    }
);

module.exports = mongoose.model('Task', taskSchema);