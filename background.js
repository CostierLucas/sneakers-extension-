chrome.runtime.onInstalled.addListener(() => {
    chrome.scripting.executeScript({
        file: 'data.js',
    });
});

chrome.runtime.onMessage.addListener(function (message, sender) {
    if (message.sendBack) {
        chrome.tabs.sendMessage(sender.tab.id, message.data);
    } else if (message.title == "paymentsbx") {
        chrome.tabs.create({
            url: message.data
        });
    }
});


