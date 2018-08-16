// var background = chrome.extension.getBackgroundPage()
// background.console.log("Test");

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({ color: "#3aa757" }, function() {
    console.log("The color is green.")
  })
})

chrome.history.search({ text: "", maxResults: 1000 }, page => {
  chrome.extension.onConnect.addListener(function(port) {
    port.postMessage(page.slice(0, 5))
  })
})
