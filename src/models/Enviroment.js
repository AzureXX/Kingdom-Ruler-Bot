const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EnviromentSchema = new Schema({
    telegramUserId: {
        type: Number,
        required: "ID is requered"
    },
    day: Number,
    weather: Number
})

const Enviroment = mongoose.model("Enviroment", EnviromentSchema)
module.exports = Enviroment;
