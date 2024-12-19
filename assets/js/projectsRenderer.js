// projectsRenderer.js
class ProjectsManager {
    constructor() {
        this.currentLang = 'es';
        this.template = document.getElementById('projectTemplate');
        this.container = document.getElementById('projectsContainer');
    }

    async initialize() {
        try {
            const response = await fetch('assets/data/projects.json');
            this.data = await response.json();
            this.render();
            this.initializeLanguageSwitch();
        } catch (error) {
            console.error('Error loading projects:', error);
        }
    }

    render() {
        this.container.innerHTML = '';
        this.data.projects.forEach(project => this.renderProject(project));
    }

    renderProject(project) {
        const card = this.template.content.cloneNode(true);
        const article = card.querySelector('article');
        
        // Set title and description
        article.querySelector('.project-title').textContent = 
            project[`title${this.currentLang.toUpperCase()}`];
        article.querySelector('.project-description').textContent = 
            project.descriptions[this.currentLang];
        
        // Render images
        const slider = article.querySelector('.image-slider');
        this.renderImages(slider, project);
        
        // Render technologies
        const techBox = article.querySelector('.img-info-box');
        this.renderTechnologies(techBox, project.technologies);
        
        // Render links
        if (project.links) {
            const buttonsContainer = article.querySelector('.containerButtons');
            this.renderLinks(buttonsContainer, project.links);
        }
        
        this.container.appendChild(article);
    }

    renderImages(slider, project) {
        // Add images
        project.images.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = project[`title${this.currentLang.toUpperCase()}`];
            img.loading = 'lazy';
            slider.appendChild(img);
        });

        // Add video if exists
        if (project.video) {
            const frame = document.createElement('div');
            frame.className = 'frame';
            frame.innerHTML = `
                <iframe 
                    width="600" 
                    height="340" 
                    src="${project.video}" 
                    title="YouTube video" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            `;
            slider.appendChild(frame);
        }
    }

    renderTechnologies(container, technologies) {
        technologies.forEach(tech => {
            const div = document.createElement('div');
            div.className = 'img-info-container';
            div.innerHTML = `
                <img class="img-info" src="${tech.icon}" alt="${tech.name}">
                <span class="img-info-text">${tech.name}</span>
            `;
            container.appendChild(div);
        });
    }

    renderLinks(container, links) {
        Object.entries(links).forEach(([type, url]) => {
            const a = document.createElement('a');
            a.href = url;
            a.target = '_blank';
            a.rel = 'noopener';
            a.className = 'animated-button';
            a.textContent = this.data.translations[this.currentLang].buttons[type];
            container.appendChild(a);
        });
    }

    initializeLanguageSwitch() {
        const btn = document.getElementById('buttonLanguage');
        btn.addEventListener('click', () => {
            this.currentLang = this.currentLang === 'es' ? 'en' : 'es';
            btn.textContent = this.currentLang.toUpperCase();
            this.updateLanguage();
        });
    }

    updateLanguage() {
        // Update titles
        document.getElementById('proyectsTitle').textContent = 
            this.data.translations[this.currentLang].proyectsTitle;
        document.getElementById('contactTitle').textContent = 
            this.data.translations[this.currentLang].contactTitle;
        
        // Re-render all projects
        this.render();
    }
}