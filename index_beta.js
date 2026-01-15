// YouTube Navigation
const ShortsNavigation = document.getElementById('ShortsNavigation');

async function removeShortsNavigation(shouldHide) {
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        func: (hide) => {
            const interval = setInterval(() => {
                const navigators = document.getElementsByClassName("ytd-mini-guide-entry-renderer");
                for (const navigator of navigators) {
                    const title = navigator.getAttribute("title")
                    if (title.includes("Shorts")) {
                        navigator.style.display = hide ? "none" : "";
                    }
                }
                clearInterval(interval);
            }, 500)
        },
        args: [shouldHide]
    })
}

if (ShortsNavigation) {
    removeShortsNavigation(ShortsNavigation.checked);

    ShortsNavigation.addEventListener('change', () => {
        removeShortsNavigation(ShortsNavigation.checked);
    });
}



async function removeShortsSearch(section) {
    let [tab] = await chrome.tabs.query({active: true});
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        func: () => {
            if (section.checked === true) {

                const shortsSection = document.getElementsByClassName("ytGridShelfViewModelHost");

                for (const short of shortsSection) {
                    short.style.display = "none";
                }
                // Individual Shorts
                const thumbnails = document.querySelectorAll(".ytd-item-section-renderer > #dismissible > .ytd-item-renderer > #thumbnail");
                for (const thumbnail of thumbnails) {
                    if (thumbnail.href.includes("https://www.youtube.com/shorts/")) {
                        let video = thumbnail.closest(".ytd-item-section-renderer");
                        video.style.display = "none";
                    }
                }
            }
        }
    })
}

// YouTube Search
const ShortsSearch = document.getElementById('ShortsSearch');
removeShortsSearch(ShortsSearch);


async function removeShortsHomePage(section) {
    let [tab] = await chrome.tabs.query({active: true});
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        func: () => {
            if (section.checked === true) {
                const shortsSection = document.getElementsByClassName("shortsSection");
                for (const short of shortsSection) {
                    short.style.display = "none";
                }
            }
        }
    })
}

// YouTube Homepage
const shortsHomepage = document.getElementById('ShortsHomepage');
removeShortsHomePage(shortsHomepage);


async function removeShortsAccountPage(page) {
    let [tab] = await chrome.tabs.query({active: true});
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        func: () => {
            if (page.checked === true) {
                const clickableTab = document.getElementsByClassName("yt-tab-shape--host-clickable");
                for (const clickable of clickableTab) {
                    if (clickable.title.includes("Shorts")) {
                        clickable.style.display = "none";
                    }
                }
            }
        }
    })
}

// YouTuber Page
const YouTuberPage = document.getElementById('ShortsFromAccounts');
removeShortsAccountPage(YouTuberPage);