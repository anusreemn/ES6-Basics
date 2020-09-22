import { utils } from './utility.js';

class ContactForm {

    #form = document.getElementById('contactForm');
    #subscribeBtn = document.getElementById('subscribeBtn');

    initialize() {
        this.#subscribeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (this._formIsValid()) {
                this._subscribe();
            } else {
                alert('Please re-check your submission, and try again!')
            }
        }.bind(this));
    }

    get _formData() {
        return new FormData(this.#form)
    }

    _getFormValue(key) {
        return new FormData(this.#form).get(key);
    }

    _formIsValid() {
        let formIsValid = true;
        if (!this._getFormValue('email')) {
            formIsValid = false;
        }
        return formIsValid;
    }

    _subscribe() {
        let subscribe = confirm('You will receive all updates regarding our product, and will also receive our newsletters. Are you sure to proceed?')
        if (subscribe) {
            utils.post(this.#form.getAttribute('action'), this._formData, function(response) {
                if (response) {
                    alert('Successfully subscribed!');
                    this.#form.reset();
                } else {
                    // post api is error
                }
            })
        }
    }
}

export let contactForm = new ContactForm();