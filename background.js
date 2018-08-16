// var background = chrome.extension.getBackgroundPage()
// background.console.log("Test");

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({ color: "#3aa757" }, function() {
    console.log("The color is green.")
  })
})

// let history = {};

chrome.history.search({ text: "" }, page => {
  function getSiteName(url) {
    let start = url.indexOf("//")
    let end = url.indexOf("/", start + 2) + 1
    return url.slice(start + 2, end - 1)
  }

  function getUrls(urlHist) {
    let browserHistory = {}
    console.log(urlHist)
    for (let i = 0; i < urlHist.length; i++) {
      let date = new Date(urlHist[i].lastVisitTime * 1000)
      let minutes = date.getHours() * 60 + date.getMinutes()
      let webName = getSiteName(urlHist[i].url)
      // console.log(webName);

      if (browserHistory.hasOwnProperty(webName)) {
        let currTime = browserHistory[webName].currTimeinMin
        console.log({ minutes, currTime })
        browserHistory[webName].timeSpent += minutes - browserHistory[webName].currTimeinMin
        browserHistory[webName].currTimeinMin = minutes
      } else {
        browserHistory[webName] = { currTimeinMin: minutes, timeSpent: 0 }
      }
    }
    console.log(browserHistory)
    return browserHistory
  }

  return getUrls(page)
})
