import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const formData = {
    email: '',
    message: '',
};

const refs = {
    form: document.querySelector('.feedback-form'),
    
}

refs.form.addEventListener('submit', onFormSubmit)
refs.form.addEventListener('input', throttle(onFormInput, 500))

const savedFormData = localStorage.getItem(STORAGE_KEY);
const elem = refs.form.elements;
const parsedData = JSON.parse(savedFormData);

populateFeedbackForm();

function onFormInput(ev) {
    formData[ev.target.name] = ev.target.value;
    console.log(formData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(ev) {
    ev.preventDefault();

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
