// var background = chrome.extension.getBackgroundPage()
// background.console.log("Test");

chrome.history.search({ text: "", maxResults: 1000 }, page => {
    function getSiteName(url) {
      let start = url.indexOf("//")
      let end = url.indexOf("/", start + 2) + 1
      return url.slice(start + 2, end - 1)
    }

    function getUrls (urlHist) {
        let today = new Date().toJSON().slice(0,10).replace(/-/g,'/');
        let browserHistory = {};
        // console.log(urlHist);
        // loop through history and fill browserHistory for today
        for(let i = 0; i < urlHist.length; i++) {
            let date = new Date(urlHist[i].lastVisitTime);
            let dayInArr = date.toJSON().slice(0,10).replace(/-/g,'/');
            console.log({today, dayInArr});
            if(dayInArr !== today) {
                continue;
            }
            let minutes = (date.getHours() * 60) + (date.getMinutes());
            let webName = getSiteName(urlHist[i].url);
            // console.log(webName);
            
            if(browserHistory.hasOwnProperty(webName)) {
                
                let currTime = browserHistory[webName].currTimeinMin;
                console.log({webName, currTime, minutes});
                    browserHistory[webName].timeSpent += (minutes - browserHistory[webName].currTimeinMin);
                    browserHistory[webName].currTimeinMin = minutes;
            } else {
                console.log('hi');
                browserHistory[webName] = {currTimeinMin: minutes, timeSpent: 0};
                console.log({webName})
            }
            
        }
        console.log(browserHistory);
        return browserHistory;
    }
    chrome.extension.onConnect.addListener(function(port) {
      port.postMessage(page.slice(0, 5))
    })
    return getUrls(page);
});



