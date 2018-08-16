var background = chrome.extension.getBackgroundPage()
background.console.log("Test")

chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create("popup.html", {
    id: "camCaptureID",
    innerBounds: {
      width: 700,
      height: 600
    }
  })
})
