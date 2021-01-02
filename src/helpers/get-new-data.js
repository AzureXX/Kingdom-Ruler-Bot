const { get } = require('mongoose');

const getNewData = (ctx, changes) => {
    const { data: current } = ctx.state.user;
    const data = JSON.parse(JSON.stringify(current));

    changes.forEach((change) => {
        switch (change.type) {
            case 'update-name':
                data.name = change.data;
                break;

            case 'update-resources':
                if (typeof data.resources != 'object') data.resources = {};
                data.resources = {
                    ...data.resources,
                    ...change.data,
                };
                break;

            case 'add-to-inventory':
                if (typeof data.inventory === 'array') data.inventory = [];
                change.data.forEach((item) => {
                    data.inventory.push(item);
                });
                break;

            case 'use-item':
                if (typeof data.inventory === 'array') data.inventory = [];
                for (let i = 0; i < data.inventory.length; i++) {
                    const item = data.inventory[i];
                    if (item[0] === change.data) {
                        if (item[1] === 1) {
                            data.inventory.splice(i, 1);
                        } else {
                            item[1]--;
                        }
                        break;
                    }
                }
                break;
            case 'start-new-day':
                if (!data.environment) {
                    data.environment = {};
                }
                if (
                    !data.environment.day ||
                    typeof data.environment.day !== 'number'
                ) {
                    data.environment.day = 0;
                }
                data.environment.day++;
                break;
            default:
                break;
        }
    });
    return data;
};

module.exports = getNewData;
