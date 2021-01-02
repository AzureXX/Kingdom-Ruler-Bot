const db = require('./db.js');
const keyboards = require('./keyboards');
const text = require('./text');

const sendReply = (ctx) => {
    const message = text.constructText();
    const inline_keyboard = keyboards.constructKeyboard();
    ctx.reply(message, {
        parse_mode: 'HTML',
        reply_markup: {
        inline_keyboard: inline_keyboard,
        },
    });
}

module.exports = {
    sendReply
}