const { Context } = require('telegraf');
const User = require('../models/User');
const getNewData = require('./get-new-data');

const initialData = {
    enviroment: {
        day: 1,
    },
    resources: {
        wood: 0,
        stone: 0,
        gold: 0,
    },
    inventory: [],
};
const getUserData = async (id) => {
    try {
        const user = await User.findOne({ telegramUserId: id });
        if (user) {
            return user;
        } else {
            const user = new User({ telegramUserId: id, data: initialData });
            await user.save();
            console.log('New User is created');
            return user;
        }
    } catch (error) {
        console.error(error);
    }
};

const setUserData = async (ctx, changes) => {
    try {
        const { telegramUserId: id } = ctx.state.user;

        const data = getNewData(ctx, changes);
        console.log(data);

        const user = await User.findOneAndUpdate(
            { telegramUserId: id },
            {
                data: data,
            },
            { new: true, useFindAndModify: false }
        );
        if (user) {
            return user;
        } else {
            console.log('no such user exist');
        }
    } catch (error) {
        console.error(error);
    }
};
module.exports = {
    getUserData,
    setUserData,
};
