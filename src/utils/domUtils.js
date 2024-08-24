
export const applyAttributes = (element, attributes = {}) => {
    Object.entries(attributes).forEach(([key, value]) => {
        if (value === undefined || value === null) {
            return;
        }

        if (key.startsWith('data-')) {
            element.setAttribute(key, value);
        }
        else if (key === 'class') {
            element.className = attributes(key);
        }
        else if (key === 'appends' || key === 'children') {
            element.append(...value);
        }
        else if (typeof element[key] === 'function') {
            console.warn(`Cannot set property '${key}' of <${element.tagName}> which is a member function.`);
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
    return applyAttributes(document.createElement(tagName, options), attributes);
};

export const modifyElement = (selectors, modifications = {}) => {
    const element = document.querySelector(selectors);

    if (element) {
        applyAttributes(element, modifications);
    }

    return element;
};

export const modifyAllElements = (selectors, modifications = {}) => {
    const elements = document.querySelectorAll(selectors);

    if (elements) {
        elements.forEach(element => applyAttributes(element, modifications));
    }

    return elements;
};

