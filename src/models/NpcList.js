const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NpcListSchema = new Schema({
    telegramUserId: {
        type: Number,
        required: 'ID is requered',
    },
    npcList: [
        {
            name: String,
            health_points: Number,
            mana_points: Number,
            inventory: [[Number]],
            equipment: {
                head: [Number],
                torso: [Number],
                legs: [Number],
                foot: [Number],
                leftHand: [Number],
                rightHand: [Number],
                necklace: [Number],
                ring: [[Number]],
            },
            stats: {
                strength: Number,
                dexterity: Number,
                endurance: Number,
                intelligence: Number,
                luck: Number,
            },
            skills: {
                woodcutting: Number,
                miner: Number,
                gatherer: Number,
                swordsmanship: Number,
                knife_usage: Number,
                fishing: Number,
            },
            traits: [Number],
            effects: [[Number]],
            relationship: [[Number]],
            family: {
                father: String,
                mother: String,
                real_father: String,
                real_mother: String
            },
        },
    ],
});

const NpcList = mongoose.model('NpcList', NpcListSchema);
module.exports = NpcList;
