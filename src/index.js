require('dotenv').config();
const { Telegraf } = require('telegraf');
const { Stage } = require('telegraf');
const session = require('telegraf/session');
/*
======================
        SCENES      
======================
*/
const GetNameScene = require('./scenes/get-name');
const stage = new Stage();
stage.register(GetNameScene);
stage.on("leave",(ctx) => {
    return ctx.reply('Hello All')
})
// OTHER
const db = require('./helpers/db.js');
const keyboards = require('./helpers/keyboards');
const text = require('./helpers/text');
const helpers = require('./helpers');
const TOKEN = process.env.API_TOKEN;
const mongoose = require('mongoose');

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Mongodb is connected'))
    .catch((err) => console.error(err));

const bot = new Telegraf(TOKEN);
bot.use(session());

bot.catch((err, ctx) => {
    console.log(`Ooops, encountered an error for ${ctx.updateType}`, err);
});

bot.use(async (ctx, next) => {
    ctx.state.user = await db.getUserData(ctx.from.id);
    return next();
});

bot.use(stage.middleware());

bot.start((ctx) => {
    ctx.scene.enter('GET_NAME_SCENE');
});

bot.help((ctx) => {
    const message = `<strong>It is help message</strong>`;
    const inline_keyboard = keyboards.constructKeyboard();

    ctx.reply(message, {
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: inline_keyboard,
        },
    });
});
bot.command('resources', (ctx) => {
    const message = `<strong>Resources:</strong>
        Wood: ${0}
        Stone: ${0}
        Copper: ${0}
  `;
    const inline_keyboard = keyboards.constructKeyboard();
    ctx.reply(message, {
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: inline_keyboard,
        },
    });
});

bot.command('update', (ctx) => {
    db.setUserData(ctx, [
        { type: 'update-resources', data: { wood: 8, stone: 2, stick: 5 } },
        { type: 'add-to-inventory', data: [[2,3], [4,5]]},
        { type: 'start-new-day'},
        { type: 'use-item', data: 2}
    ]);
})
bot.on('callback_query', (ctx) => {
    const query = ctx.update.callback_query;
    ctx.editMessageReplyMarkup({ inline_keyboard: [] })
        .then(() => {
            const message = `<strong>You journey continues</strong>`;
            const inline_keyboard = keyboards.constructKeyboard();
            ctx.reply(message, {
                parse_mode: 'HTML',
                reply_markup: {
                    inline_keyboard: inline_keyboard,
                },
            });
        })
        .catch((err) => console.log(err.message));
});

bot.launch();
