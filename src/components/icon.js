import './icon.css';

export const createIcon = ({
    symbolId,
    className = '',
}) => {
    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    icon.setAttribute('class', `icon ${className}`);

    const useEl = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    useEl.setAttributeNS('http://www.w3.org/1999/xlink', 'href', `#${symbolId}`);

    icon.append(useEl);

    return icon;
};

export const createIconButton = ({
    className = '',
    text = null,
    title = null,
    symbolId,
    iconClassName = '',
    textBefore = false,
    onClick = () => {},
}) => {
    const button = document.createElement('button');
    button.className = `icon-button ${className}`;
    button.append(createIcon({
        symbolId,
        className: iconClassName,
    }));
    button.addEventListener('click', onClick);
    
    if (text) {
        button.classList.add('has-text');
        const buttonText = document.createTextNode(text);
        textBefore ? button.prepend(text) : button.append(text);
    }
    else if (title) {
        button.title = title;
    }

    return button;
};
