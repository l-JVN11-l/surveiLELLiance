const { htmlToMarkdown } = require("./htmlToMarkdown");

// get those secrets but dont tell lell what they are
const API_KEY = process.env.CANVAS_API_KEY;
const SCHOOL = process.env.CANVAS_SCHOOL;
const COURSE_ID = process.env.CANVAS_COURSE_ID;

// make the fetch urLELLs
const BASE_URL = `https://${SCHOOL}.instructure.com`;
const ENDPOINT = `/api/v1/announcements?context_codes[]=course_${COURSE_ID}&latest_only=true`;
const BEARER_TEXT = `Bearer ${API_KEY}`;

// helper variabLELLs and functions
const intervaLELL = 60 * 1000;
let lastId = 0;

const intepretData = (data) => {
    return {
        title: data.title,
        message: htmlToMarkdown(data.message)
    };
};

// main announcement checker
async function checkAnnouncements(channel) {
    try {
        const response = await fetch(BASE_URL + ENDPOINT, {
            headers: {
                Authorization: BEARER_TEXT
            }
        });

        const data = await response.json();

        if (!data.length) return;

        const announcement = data[0];

        // dont send the same announcement repeatedly
        if (announcement.id === lastId) return;

        lastId = announcement.id;

        const { title, message } = intepretData(announcement);

        await channel.send({
            content: `## 📢  ${title}\n\n${message}`
        });

        console.log(`Sent announcement: ${title}`);

    } catch (error) {
        console.error("Canvas error:", error);
    }
}

// interval
function startAnnouncementChecker(channel) {
    // check immediately
    checkAnnouncements(channel);

    // then check every minute
    setInterval(() => {
        checkAnnouncements(channel);
    }, intervaLELL);
}

module.exports = {
    startAnnouncementChecker
};