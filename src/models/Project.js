const mongoose = require('mongoose');
const FileSchema = new mongoose.Schema({
    filename: String,
    content: String,
    updatedAt: Date
});
const ProjectSchema = new mongoose.Schema({
    name: {
         type: String, 
         required: true 
        },
    owner: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    collaborators: [{ 
        type: mongoose.Schema.Types.ObjectId,
         ref: 'User'
     }],
    files: [FileSchema]
}, { timestamps: true });
module.exports = mongoose.model('Project', ProjectSchema);