import './checkbox.css';

export const createCheckbox = (checked) => {
    const label = document.createElement('label');
    label.className = 'checkbox-label';

    const hiddenCheckbox = document.createElement('input');
    hiddenCheckbox.className = 'hidden-checkbox';
    hiddenCheckbox.type = 'checkbox';
    hiddenCheckbox.checked = checked;

    const customCheckbox = document.createElement('span');
    customCheckbox.className = 'checkbox';

    label.append(
        hiddenCheckbox,
        customCheckbox,
    );

    hiddenCheckbox.addEventListener('change', () => customCheckbox.classList.toggle('checked'));
    
    return label;
};
