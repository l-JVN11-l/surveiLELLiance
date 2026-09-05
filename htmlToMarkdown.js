const TurndownService = require("turndown");

const turndownService = new TurndownService();

// helper: html to markdown (WE love turndown)
function htmlToMarkdown(html) {
    return turndownService.turndown(html);
}

module.exports = {
    htmlToMarkdown
};