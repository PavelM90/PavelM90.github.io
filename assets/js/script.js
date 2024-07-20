document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');
    const baseUrl = window.location.origin;

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

            if (typeof marked === 'undefined' || typeof marked.parse !== 'function') {
                console.error('marked is not a function');
                content.innerHTML = '<p>Error loading content.</p>';
                return '';
            }

            console.log('Parsing Markdown with marked');
            return marked.parse(text); // Use marked.parse instead of marked(text)
        } catch (error) {
            console.error('Error fetching the file:', error);
            content.innerHTML = '<p>Error loading content.</p>';
            return '';
        }
    }

    async function loadContent() {
        let hash = window.location.hash || '#';
        let file;

        if (hash === '#' || hash === '#home') {
            file = `${baseUrl}/assets/md/main.md`; // Path to your main.md file
        } else {
            file = `${baseUrl}/assets/md/${hash.substring(1)}.md`;
        }

        console.log('Loading content for:', hash);
        console.log('Fetching file:', file);

        const markdown = await fetchMarkdown(file);
        console.log('Markdown content:', markdown);
        content.innerHTML = markdown;

        // Toggle background visibility based on hash
        toggleBackgroundVisibility(hash);
    }

    function ensureMarkedLoaded(callback) {
        if (typeof marked === 'undefined' || typeof marked.parse !== 'function') {
            setTimeout(() => ensureMarkedLoaded(callback), 100);
        } else {
            callback();
        }
    }

    function toggleBackgroundVisibility(hash) {
        const body = document.body;
        if (hash === '#' || hash === '#home') {
            body.classList.add('home');
        } else {
            body.classList.remove('home');
        }
    }

    window.addEventListener('hashchange', () => {
        console.log('Hash changed:', window.location.hash);
        loadContent();
    });

    // Load initial content
    ensureMarkedLoaded(loadContent);
});
