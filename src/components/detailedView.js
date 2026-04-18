import './detailedView.css';

export const createDetailedView = (elements) => {
    const detailedView = document.createElement('div');
    detailedView.className = 'detailed-view';
    detailedView.append(...elements);

    return detailedView;
};

export const createField = ({
    label,
    value,
    className,
}) => {
    const field = document.createElement('div');
    field.className = `detailed-view-field ${className}`;

    const fieldLabel = document.createElement('strong');
    fieldLabel.className = 'field-label';
    fieldLabel.textContent = label;

    const fieldValue = document.createElement('p');
    fieldValue.className = 'field-value';
    fieldValue.textContent = value;

    field.append(
        fieldLabel,
        fieldValue,
    );

    return field;
};
