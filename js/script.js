document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');
    const baseUrl = window.location.origin;  // Dynamically set the base URL

    async function fetchMarkdown(file) {
        try {
            console.log(`Fetching file: ${file}`);
            const response = await fetch(file);
            if (!response.ok) {
                content.innerHTML = '<p>Content not found.</p>';
                console.error('Error fetching the file:', response.statusText);
                return '';
            }
            const text = await response.text();
            console.log('File fetched successfully');

            if (typeof marked !== 'function') {
                console.error('marked is not a function');
                content.innerHTML = '<p>Error loading content.</p>';
                return '';
            }

            return marked(text);
        } catch (error) {
            console.error('Error fetching the file:', error);
            content.innerHTML = '<p>Error loading content.</p>';
            return '';
        }
    }

    async function loadContent() {
        let hash = window.location.hash || '#about';
        let file = `${baseUrl}/assets/md/${hash.substring(1)}.md`;

        console.log('Loading content for:', hash);
        console.log('Fetching file:', file);

        const markdown = await fetchMarkdown(file);
        console.log('Markdown content:', markdown);
        content.innerHTML = markdown;
    }

    window.addEventListener('hashchange', () => {
        console.log('Hash changed:', window.location.hash);
        loadContent();
    });

    // Load initial content
    loadContent();
});
