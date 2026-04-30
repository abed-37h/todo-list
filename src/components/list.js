import './list.css';
import AddIcon from './../assets/icons/add-new.svg';
import { createIconButton } from './icon.js';

export const createListHeader = (title, titleEl = 'h3') => {
    const listHeader = document.createElement('div');
    listHeader.className = 'list-header';

    const headerTitle = document.createElement(titleEl);
    headerTitle.className = 'header-title';
    headerTitle.textContent = title;

    const addButton = createIconButton({
        className: 'add-button',
        symbolId: AddIcon.id,
        title: 'Add new',
        onClick: () => {
            const addEvent = new CustomEvent('click-add');
            listHeader.dispatchEvent(addEvent);
        },
    });

    listHeader.append(
        headerTitle,
        addButton,
    );

    return listHeader;
};

export const createList = (textContent, empty = false) => {
    if (empty) {
        const emptyList = document.createElement('p');
        emptyList.className = 'list empty';
        emptyList.textContent = textContent;

        return emptyList;
    }

    const list = document.createElement('ul');
    list.className = 'list';
    
    return list;
};


export const createListContainer = (listHeader, list) => {
    const listContainer = document.createElement('div');
    listContainer.className = 'list-container';

    listContainer.append(
        listHeader,
        list,
    );

    return listContainer;
};

