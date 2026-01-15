function removeShortsFromSearch(display) {
    document.querySelectorAll(".ytChipShapeOnlyTextPadding").forEach(el => {
        if (el.innerText === "Shorts") {
            let parent = el.parentNode.parentNode.parentNode.parentNode;
            parent.style.display = display;
        }
    });
    document.querySelectorAll("div.ytd-video-renderer:has(a.yt-simple-endpoint[href*='/shorts/'])").forEach(el => {
        el.style.setProperty("display", `${display}`, "important");
    })
    document.querySelectorAll(".ytGridShelfViewModelHost").forEach(el => {
        el.style.setProperty("display", `${display}`, "important");
    })
}

function removeShortsFromAccounts(display) {
    document.querySelectorAll(".ytd-reel-shelf-renderer").forEach(el => {
        if (el.innerText === "Shorts") {
            const shortPage = el.parentNode;
            if (display === "none") {
                shortPage.classList.add("antiShorts")
            }
            else{
                shortPage.classList.remove("antiShorts")
            }
        }
    });
    document.querySelectorAll(".yt-tab-shape--host-clickable[tab-title=\"Shorts\"]").forEach(el => {
        el.style.setProperty("display", `${display}`, "important");
    })
}

function removeShortsFromHomePage(display) {
    document.querySelectorAll(".ytd-rich-section-renderer").forEach(el => {
        if (display === "none") {
            el.classList.add("antiShorts")
        } else {
            el.classList.remove("antiShorts")
        }
    })
}

function removeShortsFromNavigation(display) {
    document.querySelectorAll(".ytd-mini-guide-entry-renderer[title=\"Shorts\"]").forEach(el => {
        el.style.setProperty("display", `${display}`, "important");
    })
    document.querySelector(".yt-simple-endpoint[title=\"Shorts\"]").style.setProperty("display", `${display}`, "important");
}

let Shorts_Navigation = 'none';
let Shorts_Homepage = 'none';
let Shorts_Search = 'none';
let Shorts_Accounts = 'none';

chrome.storage.sync.get(["ShortsNavigation", "ShortsHomepage", "ShortsSearch", "ShortsAccounts"]).then((obj) => {
    Shorts_Navigation = obj.ShortsNavigation === undefined ? Shorts_Navigation : obj.ShortsNavigation;
    Shorts_Homepage = obj.ShortsHomepage === undefined ? Shorts_Homepage : obj.ShortsHomepage;
    Shorts_Search = obj.ShortsSearch === undefined ? Shorts_Search : obj.ShortsSearch;
    Shorts_Accounts = obj.ShortsAccounts === undefined ? Shorts_Accounts : obj.ShortsAccounts;
});

function removeShorts() {
    removeShortsFromNavigation(Shorts_Navigation)
    removeShortsFromSearch(Shorts_Search)
    removeShortsFromAccounts(Shorts_Accounts)
    removeShortsFromHomePage(Shorts_Homepage)
}

const observer = new MutationObserver( () => {
    removeShorts()
});
observer.observe(document, {childList: true, subtree: true});

chrome.storage.onChanged.addListener( function (changes, area) {
    for (let [key, {
        oldValue,
        newValue
    }
    ] of Object.entries(changes)) {
        if (key === "ShortsNavigation") {
            Shorts_Navigation = newValue
        }

        if (key === "ShortsHomepage") {
            Shorts_Homepage = newValue
        }

        if (key === "ShortsSearch") {
            Shorts_Search = newValue
        }

        if (key === "ShortsAccounts") {
            Shorts_Accounts = newValue
        }
    }
    removeShorts()
})