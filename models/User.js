const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    username: {
        type: String,
        trim: true,
        required: "You must enter a username"
    },
    password: {
        type: String,
        trim: true,
        required: "You must enter a password"
    },
    kudos: [{
        type: Schema.Types.ObjectId,
        rel: 'Kudo'
    }]
})

const User = mongoose.model('User', UserSchema);

module.exports = User;  