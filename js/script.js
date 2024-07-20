document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');

    async function fetchMarkdown(file) {
        try {
            const response = await fetch(file);
            if (!response.ok) {
                content.innerHTML = '<p>Content not found.</p>';
                console.error('Error fetching the file:', response.statusText);
                return '';
            }
            const text = await response.text();
            return marked(text);
        } catch (error) {
            console.error('Error fetching the file:', error);
            content.innerHTML = '<p>Error loading content.</p>';
            return '';
        }
    }

    async function loadContent() {
        let hash = window.location.hash || '#about';
        let file = `assets/md/${hash.substring(1)}.md`;

        console.log('Loading content for:', hash);
        console.log('Fetching file:', file);

        const markdown = await fetchMarkdown(file);
        content.innerHTML = markdown;
    }

    window.addEventListener('hashchange', loadContent);

    // Load initial content
    loadContent();
});
