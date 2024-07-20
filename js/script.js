document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');

    async function fetchMarkdown(file) {
        const response = await fetch(file);
        const text = await response.text();
        return marked(text);
    }

    async function loadContent() {
        let hash = window.location.hash || '#about';
        let file = `${hash.substring(1)}.md`;

        const markdown = await fetchMarkdown(`assets/md/${file}`);
        content.innerHTML = markdown;
    }

    window.addEventListener('hashchange', loadContent);

    loadContent();
});
