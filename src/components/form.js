import './form.css';

export const createForm = ({
    id,
    method,
    onSubmit,
    elements = [],
}) => {
    const form = document.createElement('form');
    form.id = id;
    form.className = 'form';
    form.method = method;
    form.action = '';
    form.addEventListener('submit', onSubmit);

    form.append(...elements);

    return form;
};

export const createInputSection = (elements) => {
    const inputSection = document.createElement('section');
    inputSection.className = 'input-section';
    inputSection.append(...elements);

    return inputSection;
};

export const createFieldset = (fields) => {
    const inputFieldset = document.createElement('fieldset');
    inputFieldset.append(...fields);

    return inputFieldset;
};

export const createInputContainer = ({
    input,
    label = null,
}) => {
    const inputContainer = document.createElement('div');
    inputContainer.className = 'input-container';

    if (label) {
        const inputLabel = document.createElement('label');
        inputLabel.htmlFor = input.id;
        inputLabel.textContent = label;

        if (input.required) {
            const requiredSpan = document.createElement('span');
            requiredSpan.title = 'required';
            requiredSpan.ariaLabel = 'required';

            inputLabel.append(requiredSpan);
        }

        inputContainer.append(inputLabel);
    }
    
    const errorMessage = document.createElement('small');
    errorMessage.className = 'error-message';

    inputContainer.append(
        input,
        errorMessage,
    );

    return inputContainer;
};

export const createInputTextbox = ({
    type,
    name,
    placeholder = '',
    required = false,
    value = null,
    ...attributes
}) => {
    let inputTextbox = null;

    if (type === 'textarea') {
        inputTextbox = document.createElement('textarea');
    }
    else {
        inputTextbox = document.createElement('input');
        inputTextbox.type = type;
    }

    inputTextbox.className = 'input input-text-box';
    inputTextbox.name = name;
    inputTextbox.placeholder = placeholder;
    inputTextbox.required = required;
    inputTextbox.value = value;

    Object.entries(attributes).forEach(([key, value]) => inputTextbox.setAttribute(key, value));

    return inputTextbox;
};

export const createSelectInput = ({
    name,
    options = [],
    required = false,
    value = null,
    ...attributes
}) => {
    const selectInput = document.createElement('select');
    selectInput.className = 'input';
    selectInput.name = name;
    selectInput.required = required;
    selectInput.append(
        ...options.map(op => {
            const option = document.createElement('option');
            if (typeof op === 'string') {
                option.value = op;
                option.textContent = op[0].toUpperCase() + op.slice(1);
            }
            else {
                option.value = op.value;
                option.textContent = op.text;
            }

            return option;
        }),
    );
    selectInput.value = value;

    Object.entries(attributes).forEach(([key, value]) => selectInput.setAttribute(key, value));

    return selectInput;
};

export const createButton = ({
    className,
    textContent,
    onClick,
    ...attributes
}) => {
    const button = document.createElement('button');
    button.className = className;
    button.textContent = textContent;
    button.addEventListener('click', onClick);

    Object.entries(attributes).forEach(([key, value]) => button.setAttribute(key, value));

    return button;
};
