const dateBuilder = require('./main');

test(('Returned date equals to today\'s date'), () => {
    expect(dateBuilder()).toBe("09/16/2020")
})

test(('Returned date does not equal to today\'s date'), () => {
    expect(dateBuilder()).not.toBe("09/17/2020")
})