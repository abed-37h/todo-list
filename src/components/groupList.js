import Project from '../classes/project.js';
import { createActionList, DEFAULT_ACTIONS } from './actionList.js';
import './groupList.css'
import { createIconButton } from './icon.js';
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

    if (group instanceof Project) {
        const actionList = createActionList(
            Object.values(DEFAULT_ACTIONS).map(action => createIconButton(action)),
        );
        actionList.addEventListener('action:edit', () => {
            const editTodoEvent = new CustomEvent('project:edit', {
                detail: { project: group },
            });
            document.dispatchEvent(editTodoEvent);
        });
        actionList.addEventListener('action:delete', () => {
            const deleteTodoEvent = new CustomEvent('project:delete', {
                detail: { project: group },
            });
            document.dispatchEvent(deleteTodoEvent);
        });
        
        groupItem.append(actionList);
    }

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

export const updateGroupList = (groupList, groups) => {
    groupList.replaceWith(createGroupList(groups));
};

export const updateGroupContainer = (groupContainer, {
    headerTitle = null,
    groups = null
}) => {
    if (headerTitle) {
        groupContainer.querySelector('.header-title').textContent = headerTitle;
    }

    if (groups) {
        updateGroupList(
            groupContainer.querySelector('.group-list'),
            groups,
        );
    }
};

export const updateActiveGroup = (groups, activeGroupId) => {
    const activeGroup = groups.find(group => group.id === activeGroupId);

    if (!activeGroup) {
        return null;
    }

    document.querySelectorAll('.group-item').forEach(groupItem => {
        if (groupItem.dataset.id === activeGroupId) {
            groupItem.classList.add('active');
        }
        else {
            groupItem.classList.remove('active');
        }
    });

    return activeGroup;
};
