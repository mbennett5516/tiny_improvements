const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const KudoSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: "Please enter a title"
    },
    body: {
        type: String,
        trim: true,
        required: "Please ender a Kudo"
    },
    sender: {
        type: Schema.Types.ObjectId,
        rel: "User"
    },
    recipient: {
        type: Schema.Types.ObjectId,
        rel: "User"
    }
})

const Kudo = mongoose.model('Kudo', KudoSchema);

module.exports = Kudo