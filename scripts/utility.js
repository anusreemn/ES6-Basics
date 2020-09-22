class Utilities {
    get(url, callback) {
        const xhr = new XMLHttpRequest();
        // Define what happens on successful data submission
        
        // xhr.responseType = "json";

        xhr.addEventListener('load', function(event) {
            if (xhr.status !== 200) {
                alert('Oops! Something went wrong.');
                // callback(false);
            } else {
                callback(JSON.parse(xhr.response));
            }
        });

        // Define what happens in case of error
        xhr.addEventListener(' error', function(event) {
            alert('Oops! Something went wrong.');
        });
        xhr.open('GET', url, true);
        xhr.send();
    }

    post(url, fd, callback) {
        const xhr = new XMLHttpRequest();
        // Define what happens on successful data submission
        xhr.addEventListener('load', function(event) {
            if (xhr.status !== 200) {
                alert('Oops! Something went wrong.');
                // callback(false);
            } else {
                callback(true);
            }
        });

        // Define what happens in case of error
        xhr.addEventListener(' error', function(event) {
            alert('Oops! Something went wrong. Please try again later.');
        });
        xhr.open('POST', url, callback);
        fd ? xhr.send(fd) : xhr.send('');
    }

    createInputEl(btnText) {
        const inputBtn = document.createElement('input')
        inputBtn.setAttribute('type', 'button')
        inputBtn.setAttribute('value', btnText || 'Submit')
        return inputBtn;
    }
    
    createAEl(aText, downloadUrl, inNewTab) {
        const anchorLink = document.createElement('a')
        if (inNewTab) {
            anchorLink.setAttribute('target', '_blank')
        }
        anchorLink.setAttribute('href', downloadUrl || '#');
        if (aText) { anchorLink.innerHTML = aText; }
        return anchorLink;
    }
}

export let utils = new Utilities();