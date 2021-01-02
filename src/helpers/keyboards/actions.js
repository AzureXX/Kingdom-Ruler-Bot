const constructInitialActionKeyboard = (data) => [
    [{
        text: "Collect Wood",
        callback_data: JSON.stringify({action: "actions_collect_wood", day: 0})
    }],
    [{
        text: "Collect Stone",
        callback_data: "actions_collect_stone"
    },
    {
        text: "Collect Berries",
        callback_data: "actions_collect_berries"
    }]
]

module.exports = {
    constructInitialActionKeyboard
}