document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');

    async function fetchMarkdown(file) {
        const response = await fetch(file);
        if (!response.ok) {
            content.innerHTML = '<p>Content not found.</p>';
            return '';
        }
        const text = await response.text();
        return marked(text);
    }

    async function loadContent() {
        let hash = window.location.hash || '#about';
        let file = `assets/md/${hash.substring(1)}.md`;

        const markdown = await fetchMarkdown(file);
        content.innerHTML = markdown;
    }

    window.addEventListener('hashchange', loadContent);

    // Load initial content
    loadContent();
});
