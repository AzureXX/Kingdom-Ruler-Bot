const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    telegramUserId: {
        type: Number,
        required: "ID is requered"
    },
    data: {},
    saveFileString: String
})

const User = mongoose.model("User", UserSchema)
module.exports = User;
