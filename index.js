function removeShortsFromSearch(display) {
    /*
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
     */

    if (!window.location.href.includes("/results")) return;
    const url = new URL(window.location.href);
    const hasFilter = url.searchParams.get("sp") === "EgIQAQ%3D%3D";

    if (display === "none" && !hasFilter) {
        url.searchParams.append("sp", "EgIQAQ%3D%3D");
        window.location.replace(url.toString());
    } else if (display !== "none" && hasFilter) {
        url.searchParams.delete("sp");
        window.location.replace(url.toString());
    }
}


function removeShortsFromAccounts(display) {

// ✅ Return early if the URL doesn't match ANY of the expected patterns
    if (
        !window.location.href.includes("/channel/") &&
        !window.location.href.includes("/c/") &&
        !window.location.href.includes("/@")
    ) return;
    const shortSection = document.querySelectorAll(".ytd-reel-shelf-renderer");
    if (shortSection?.length) {
        const parent = shortSection[0].closest(".ytd-section-list-renderer");
        if (display === "none") {
            parent.classList.add("antiShorts")
        } else {
            parent.classList.remove("antiShorts")
        }
    }
    const getTabElements = () =>
        Array.from(document.querySelectorAll(".ytTabShapeHostClickable:not(.antiShorts)"));
    const shortPage = document.querySelector(".ytTabShapeHostClickable[tab-title=\"Shorts\"]");
    if (!shortPage) return;

    const tabGroupShapeSlider = document.querySelector(".tabGroupShapeSlider");
    const currentTabElement = document.querySelector(".ytTabShapeHostClickable[aria-selected=\"true\"]");

    if (display === "none") {
        shortPage.classList.add("antiShorts")
        const currentIndex = getTabElements().findIndex(el => el === currentTabElement);
        tabGroupShapeSlider.style.transform = `translateX(${Math.round(72.3 * currentIndex)}px)`;
    } else {
        shortPage.classList.remove("antiShorts")
        const currentIndex = getTabElements().findIndex(el => el === currentTabElement);
        tabGroupShapeSlider.style.transform = `translateX(${Math.round(72.3 * currentIndex)}px)`;
    }
}

function removeShortsFromHomePage(display) {
    if (window.location.href !== "https://www.youtube.com/") return;
    const shortsSections = document.querySelectorAll("span.ytd-rich-shelf-renderer");
    if (!shortsSections) return;
    shortsSections.forEach(el => {
        if (!el.innerText.includes("Shorts")) return;
        const parent = el.closest(".ytd-rich-grid-renderer");
        if (display === "none") {
            parent.classList.add("antiShorts")
        } else {
            parent.classList.remove("antiShorts")
        }
    })
}

function removeShortsFromNavigation(display) {
    const navigationTabs = document.querySelectorAll(".ytd-mini-guide-entry-renderer[title=\"Shorts\"]");
    if (!navigationTabs) return;
    navigationTabs.forEach(el => {
        if (display === "none") {
            el.classList.add("antiShorts")
        } else {
            el.classList.remove("antiShorts")
        }
    })

    const shortsTab = document.querySelector(".yt-simple-endpoint[title=\"Shorts\"]");
    if (!shortsTab) return;
    if (display === "none") {
        shortsTab.classList.add("antiShorts")
    } else {
        shortsTab.classList.remove("antiShorts")
    }
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

const observer = new MutationObserver(() => {
    removeShorts()
});
observer.observe(document.body, {childList: true, subtree: true});

chrome.storage.onChanged.addListener(function (changes, area) {
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