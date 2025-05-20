
export const configureElement = (element, attributes = {}) => {
    Object.entries(attributes).forEach(([key, value]) => {
        if (value === undefined || value === null) {
            return;
        }

        if (key.startsWith('data-')) {
            element.setAttribute(key, value);
        }
        else if (key === 'class') {
            element.className = value;
        }
        else if (key === 'children') {
            element.textContent = '';
            element.append(...value);
        }
        else if (typeof element[key] === 'function') {
            if (Array.isArray(value)) {
                element[key](...value);
            }
            else {
                element[key](value);
            }
        }
        else if (key in element && !(key in Object.prototype)) {
            element[key] = value;
        }
        else {
            console.warn(`Attribute '${key}' does not exist on <${element.tagName}>.`);
        }
    });

    return element;
};

export const createElement = (tagName, attributes = {}, options = {}) => {
    return configureElement(document.createElement(tagName, options), attributes);
};

export const modifyElement = (selectors, modifications = {}) => {
    const element = document.querySelector(selectors);

    if (element) {
        configureElement(element, modifications);
    }

    return element;
};

export const modifyAllElements = (selectors, modifications = {}) => {
    const elements = document.querySelectorAll(selectors);

    if (elements) {
        elements.forEach(element => configureElement(element, modifications));
    }

    return elements;
};

export const clearElement = (selectors) => {
    const element = document.querySelector(selectors);

    if (element) {
        element.textContent = '';
    }

    return element;
};

export const deleteElement = (selectors) => {
    const element = document.querySelector(selectors);

    if (element) {
        element.remove();
    }

    return element;
};
