// YouTube Navigation
const ShortsNavigation = document.getElementById('ShortsNavigation');
if (ShortsNavigation.checked === true) {
    const navigators = document.getElementsByClassName("ytd-mini-guide-entry-renderer");
    for (const navigator of navigators) {
        const title = navigator.getAttribute("title")
        if (title.includes("Shorts")) {
            navigator.style.display = "none";
        }
    }
}


// YouTube Search
const ShortsSearch = document.getElementById('ShortsSearch');
if (ShortsSearch.checked === true) {
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


// YouTube Homepage
const shortsHomepage = document.getElementById('ShortsHomepage');
if (shortsHomepage.checked === true) {
    const shortsSection = document.getElementsByClassName("shortsSection");
    for (const short of shortsSection) {
        short.style.display = "none";
    }
}

// YouTuber Page
const YouTuberPage = document.getElementById('ShortsFromAccounts');
if (YouTuberPage.checked === true) {
    const clickableTab = document.getElementsByClassName("yt-tab-shape--host-clickable");
    for (const clickable of clickableTab) {
        if (clickable.title.includes("Shorts")) {
            clickable.style.display = "none";
        }
    }
}