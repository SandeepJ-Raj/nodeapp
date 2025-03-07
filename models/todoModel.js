const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    desc: {
        type: String,
        require: [true, "Please add description"]
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    item_done: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("todo", todoSchema);