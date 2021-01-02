const actions = require('./actions');

const constructKeyboard = (data) => {
   return actions.constructInitialActionKeyboard(data);
}

module.exports = {
    constructKeyboard
}