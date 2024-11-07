const fs = require('fs');
const path = require('path');

const MOCK_DATA_PATH = path.join(__dirname, 'mockData.json');
const OUTPUT_DIR = path.join(__dirname, '../content/blog'); // Adjust path as needed

function fetchMockData() {
    const data = fs.readFileSync(MOCK_DATA_PATH, 'utf8');
    return JSON.parse(data);
}

function kebabCaseTitle(title) {
    // Convert title to lowercase and replace spaces/special characters with hyphens
    const kebabTitle = title
        .toLowerCase()
        .replace(/[^a-z0-9\s]+/g, '') // Remove non-alphanumeric characters except spaces
        .replace(/\s+/g, '-')          // Replace spaces with hyphens
        .split('-')                    // Split into words
        .slice(0, 10)                  // Limit to 10 words
        .join('-');                    // Join back with hyphens
    return kebabTitle;
}

function formatMarkdown(blog) {
    return `---
title: "${blog.title}"
date: "${blog.internal.createdAt}"
tags: ${JSON.stringify(blog.tags)}
tldr: "${blog.tldr}"
summary: "${blog.summary}"
whyMatters: "${blog.whyMatters}"
slug: "${kebabCaseTitle(blog.title)}"
---
${blog.bulletPoints}
`;
}

function createMarkdownFiles() {
    const blogs = fetchMockData();

    if (!fs.existsSync(OUTPUT_DIR)){
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    blogs.forEach(blog => {
        // Generate filename from title in kebab case and limit to 10 words
        const filename = `${kebabCaseTitle(blog.title)}.md`;
        const filePath = path.join(OUTPUT_DIR, filename);
        
        const markdownContent = formatMarkdown(blog);

        fs.writeFileSync(filePath, markdownContent, 'utf8');
        console.log(`Markdown file created: ${filePath}`);
    });
}

createMarkdownFiles();
