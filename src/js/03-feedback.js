import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';



const refs = {
    form: document.querySelector('.feedback-form'),
    textarea: document.querySelector('.feedback-form textarea'),
    input: document.querySelector('.feedback-form input'),
}
const savedFormData = localStorage.getItem(STORAGE_KEY);
const elem = refs.form.elements;
const parsedData = JSON.parse(savedFormData);

const formData = parsedData || {
    email:'',
    message: '',
};

refs.form.addEventListener('submit', onFormSubmit)
refs.form.addEventListener('input', throttle(onFormInput, 500))



populateFeedbackForm();

function onFormInput(ev) {
    formData[ev.target.name] = ev.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(ev) {
    ev.preventDefault();

    if (refs.textarea.value === '' || refs.input.value === '') {
        return alert('Всі поля мають бути заповнені!')
    }
    

    ev.currentTarget.reset();

    const getStorage = localStorage.getItem(STORAGE_KEY);
    const getStorageParsed = JSON.parse(getStorage);

    localStorage.removeItem(STORAGE_KEY);

    console.log('Відправляємо дані', getStorageParsed);
}

function populateFeedbackForm() {
    if (savedFormData) {

        Object.keys(parsedData).forEach((key) => {elem[key].value = parsedData[key]})
    }
}
