// projectsRenderer.js
class ProjectsManager {
    constructor() {
        this.currentLang = 'es';
        this.template = document.getElementById('projectTemplate');
        this.container = document.getElementById('projectsContainer');
        this.loadingSpinner = document.querySelector('.loading-spinner');
    }

    async initialize() {
        try {
            const response = await fetch('assets/data/projects.json');
            this.data = await response.json();
            this.render();
            this.initializeLanguageSwitch();
            
            // Initialize image panels after rendering projects
            if (window.initializeImagePanels) {
                setTimeout(() => window.initializeImagePanels(), 200);
            }
        } catch (error) {
            console.error('Error loading projects:', error);
            if (this.loadingSpinner) {
                this.loadingSpinner.innerHTML = `<p>Error loading projects: ${error.message}</p>`;
            }
        }
    }

    render() {
        // Remove loading spinner
        if (this.loadingSpinner) {
            this.loadingSpinner.remove();
        }
        
        // Clear container and render projects
        this.container.innerHTML = '';
        this.data.projects.forEach(project => this.renderProject(project));
        
        // Re-initialize image panels after rendering
        if (window.initializeImagePanels) {
            setTimeout(() => window.initializeImagePanels(), 200);
        }
    }

    renderProject(project) {
        const card = this.template.content.cloneNode(true);
        const article = card.querySelector('article');
        
        // Set project ID for potential direct linking
        article.id = project.id;
        
        // Set title and description
        article.querySelector('.project-title').textContent = 
            this.currentLang === 'es' ? project.titleEs : project.titleEn;
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
        // Clear slider first
        slider.innerHTML = '';
        
        // Add images if they exist
        if (project.images && project.images.length > 0) {
            project.images.forEach(src => {
                const img = document.createElement('img');
                img.src = src;
                img.alt = this.currentLang === 'es' ? project.titleEs : project.titleEn;
                img.loading = 'lazy';
                slider.appendChild(img);
            });
        }

        // Add video if exists
        if (project.video) {
            const frame = document.createElement('div');
            frame.className = 'frame';
            frame.innerHTML = `
                <iframe 
                    src="${project.video}" 
                    title="YouTube video" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            `;
            slider.appendChild(frame);
        }
        
        // If no images or video, add a placeholder
        if ((!project.images || project.images.length === 0) && !project.video) {
            const placeholder = document.createElement('img');
            placeholder.src = 'assets/images/placeholder.png';
            placeholder.alt = 'No image available';
            placeholder.loading = 'lazy';
            slider.appendChild(placeholder);
        }
    }

    renderTechnologies(container, technologies) {
        // Clear container first
        container.innerHTML = '';
        
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
        // Clear container first
        container.innerHTML = '';
        
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
        if (btn) {
            btn.addEventListener('click', () => {
                this.currentLang = this.currentLang === 'es' ? 'en' : 'es';
                btn.value = this.currentLang.toUpperCase();
                this.updateLanguage();
            });
        }
    }

    updateLanguage() {
        // Update titles
        const proyectsTitle = document.getElementById('proyectsTitle');
        if (proyectsTitle) {
            proyectsTitle.textContent = 
                this.data.translations[this.currentLang].proyectsTitle;
        }
        
        const contactTitle = document.getElementById('contactTitle');
        if (contactTitle) {
            contactTitle.textContent = 
                this.data.translations[this.currentLang].contactTitle;
        }
        
        // Re-render all projects
        this.render();
    }
}