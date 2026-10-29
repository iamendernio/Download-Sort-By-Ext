function computeExt(string) {
    if (!string || !string.includes('.')) {
        return null;
    }

    const parts = string.split('.');
    const ext = parts.pop();
    return ext ? ext.trim().toLowerCase() : null;
}

chrome.downloads.onDeterminingFilename.addListener((downloadItem, suggest) => {
    console.log("Curr file", downloadItem.filename);

    const filenameExt = computeExt(downloadItem.filename)

    if (filenameExt) {

        const cleanFilename = downloadItem.filename.split(/[/\\]/).pop();
        const newFilename = `${filenameExt}/${cleanFilename}`;

        suggest({
            filename: newFilename,
            conflictAction: 'uniquify'
        });
    } else {
        suggest();
    }


    return false;
});