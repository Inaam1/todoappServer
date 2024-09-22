const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        }    
    }
);

const TodoItem = mongoose.model("Todo", TodoSchema);

module.exports = TodoItem;