const keys = ["ShortsNavigation", "ShortsHomepage", "ShortsSearch", "ShortsAccounts"];

document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.sync.get(keys).then((obj) => {
        keys.forEach(key => {
            const checkbox = document.getElementById(`${key}`);
            if (checkbox) {
                checkbox.checked = obj[key] ?? true;
            }
        });
    });

    keys.forEach(key => {
        const checkbox = document.getElementById(`${key}`);
        if (checkbox) {
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    chrome.storage.sync.set({[key]: 'none'})
                }
                else{
                    chrome.storage.sync.set({[key]: ''})
                }

            }, false);
        }
    });
}, false);