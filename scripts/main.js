import { blogPosts } from './blogs.js';
import { contactForm } from './contact.js';
import { vacanciesTable } from './services.js';

window.addEventListener('load', function(evt) {
    blogPosts.loadDynamicBlogPosts();

    if (location.pathname.includes('services')) {
    
        vacanciesTable.initialize();

    } else if (location.pathname.includes('contact')) {
        
        contactForm.initialize();
    
    }
});