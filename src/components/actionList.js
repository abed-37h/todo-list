import './actionList.css';
import DeleteIcon from './../assets/icons/trash-can-outline.svg';
import EditIcon from './../assets/icons/square-edit-outline.svg';

export const DEFAULT_ACTIONS = {
    edit: {
        className: 'action-edit',
        title: 'Edit',
        symbolId: EditIcon.id,
        onClick: e => {
            const deleteEvent = new CustomEvent('action:edit', { bubbles: true });
            e.target.dispatchEvent(deleteEvent);
        },
    },
    delete: {
        className: 'action-delete',
        title: 'Delete',
        symbolId: DeleteIcon.id,
        iconClassName: 'danger',
        onClick: e => {
            const editEvent = new CustomEvent('action:delete', { bubbles: true });
            e.target.dispatchEvent(editEvent);
        },
    },
};

export const createActionList = (elements) => {
    const actionList = document.createElement('div');
    actionList.className = 'action-list';
    elements.forEach(element => element.classList.add('action-button'));
    actionList.append(...elements);

    return actionList;
};
