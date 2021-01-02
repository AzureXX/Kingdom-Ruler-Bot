const { BaseScene } = require('telegraf');
const db = require('../helpers/db');
const getNameScene = new BaseScene('GET_NAME_SCENE');

getNameScene.enter((ctx) => {
    ctx.reply('Choose your name', {
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Say your name later',
                        callback_data: 'exit',
                    },
                ],
            ],
        },
    }).then((msg) => {
        ctx.scene.state.msg = {
            message_id: msg.message_id,
            chatId: msg.chat.id,
        };
    });
});

getNameScene.action('exit', (ctx) => {
    ctx.deleteMessage();
    ctx.reply('OK, will ask it later');
    return ctx.scene.leave();
});

getNameScene.leave((ctx) => {
    if (ctx.scene.state.name) {
        const { chatId, message_id } = ctx.scene.state.msg;
        ctx.telegram.editMessageReplyMarkup(chatId, message_id);
        return ctx.reply(
            `Welcome to your virtual kingdom, ${ctx.scene.state.name}`
        );
    }
    return;
});

// What to do if user entered a raw message or picked some other option?
getNameScene.use((ctx) => {
    ctx.scene.state.name = ctx.message.text;
    const name = ctx.message.text;

    db.setUserData(ctx, [
        { type: 'update-name', data: name },
    ]);
    return ctx.scene.leave();
});

module.exports = getNameScene;
