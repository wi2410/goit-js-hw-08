import throttle from 'lodash.throttle'

const STORAGE_KEY = 'feedback-form-state';

const formData = {};

const refs = {
    form: document.querySelector('.feedback-form'),
    textarea: document.querySelector('.feedback-form textarea')
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

    localStorage.removeItem(STORAGE_KEY);
    console.log('Отправляем форму с данными', parsedData)
}

function populateFeedbackForm() {
    if (savedFormData) {
        console.log(savedFormData);

        Object.keys(parsedData).forEach((key) => {elem[key].value = parsedData[key]})
    }
}