chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.executeScript({ file: "highlighter.js" });
});
