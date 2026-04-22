import './groupList.css'
import { createList, createListContainer, createListHeader } from './list.js';

export const createGroupItem = (group) => {
    const groupItem = document.createElement('li');
    groupItem.className = 'list-item group-item';
    groupItem.dataset.id = group.id;

    const groupName = document.createElement('a');
    groupName.className = 'item-name group-name';
    groupName.href = `#${group.id}`;
    groupName.textContent = group.name;

    groupItem.append(groupName);

    return groupItem;
};

export const createGroupList = (groups) => {
    const groupList = createList('No projects yet!', groups.length === 0);
    groupList.classList.add('group-list');

    groupList.append(...groups.map(group => createGroupItem(group)));

    return groupList;
};

export const createGroupContainer = (groups, title = 'Projects') => {
    const groupHeader = createListHeader(title, 'h4');
    groupHeader.classList.add('group-header');
    groupHeader.addEventListener('click-add', () => {
        const addProjectEvent = new CustomEvent('project:input');
        document.dispatchEvent(addProjectEvent);
    });

    const groupContainer = createListContainer(
        groupHeader,
        createGroupList(groups),
    );
    groupContainer.classList.add('group-container');

    return groupContainer;
};
