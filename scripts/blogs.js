import { utils } from './utility.js';

class BlogPosts {

    loadDynamicBlogPosts() {
        utils.get('./apis/blog-posts.json', function(response) {
            const blogPosts = response.posts;
            if (blogPosts.length) {
                let ulElm = document.createElement('ul')
                ulElm.setAttribute('id', 'blogPosts')
                
                for (let i=0; i<blogPosts.length; i++) {
                    const postAnchor = utils.createAEl(null, blogPosts[i].blogUrl);
                    const postImg = postAnchor.appendChild(document.createElement('img'));
                    postImg.setAttribute('src', blogPosts[i].image);

                    ulElm.appendChild(document.createElement('li')).appendChild(postAnchor)
                }
                
                document.getElementById('blogPostsSection').appendChild(ulElm);
            }
        })
    }
}

export let blogPosts = new BlogPosts();