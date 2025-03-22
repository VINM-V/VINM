function loadProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    const loader = document.getElementById('loading');
    
    // Show loader
    loader.style.display = 'block';

    // Load projects directly from the data array
    const projects = [
        {
            "image": "assets/it.jpg",
            "title": "Smart Factory System",
            "description": "Complete IoT solution for manufacturing automation with real-time monitoring and analytics",
            "tech": "IoT | Cloud | Analytics",
            "category": "iot",
            "demoUrl": "#",
            "detailsUrl": "#"
        },
        {
            "image": "assets/it.jpg",
            "title": "Medical Device Firmware",
            "description": "FDA-compliant firmware for advanced medical monitoring devices",
            "tech": "Embedded C | RTOS | Safety Critical",
            "category": "embedded",
            "demoUrl": "#",
            "detailsUrl": "#"
        },
        {
            "image": "assets/it.jpg",
            "title": "Smart Grid Solution",
            "description": "Energy management system for smart cities with ML-powered optimization",
            "tech": "ML | IoT | Power Electronics",
            "category": "iot",
            "demoUrl": "#",
            "detailsUrl": "#"
        },
        {
            "image": "assets/it.jpg",
            "title": "Drone Control System",
            "description": "Advanced flight control system for autonomous drones",
            "tech": "C++ | Real-time Systems | Control Theory",
            "category": "embedded",
            "demoUrl": "#",
            "detailsUrl": "#"
        },
        {
            "image": "assets/it.jpg",
            "title": "Cloud Management Platform",
            "description": "Enterprise cloud resource management and monitoring solution",
            "tech": "React | Node.js | AWS",
            "category": "software",
            "demoUrl": "#",
            "detailsUrl": "#"
        }
    ];

    // Hide loader
    loader.style.display = 'none';
    
    // Render projects
    projectsGrid.innerHTML = projects.map(project => `
        <div class="project-card">
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}" onerror="this.src='assets/placeholder.jpg'">
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <span class="project-tech">${project.tech}</span>
                <div class="project-links">
                    <a href="${project.detailsUrl}" class="cta-button">View Details</a>
                    <a href="${project.demoUrl}" class="cta-button secondary">Live Demo</a>
                </div>
            </div>
        </div>
    `).join('');
}
