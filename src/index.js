import './style/fonts.css';
import './style/reset.css';
import './style/style.css';

import MenuIconSrc from './assets/icons/menu.svg';
import Todo from './classes/todo.js';
import Project from './classes/project.js';
import Category from './classes/category.js';
import { createGroupContainer, createGroupList } from './components/groupList.js';
import { createTodoContainer } from './components/todoList.js';
import { createDialog } from './components/dialog.js';
import { updateTodoDialog } from './components/todoDialog.js';

const categories = [
    new Category({
        id: 'cat:1',
        name: 'Inbox',
        description: 'You can find all standalone todo here.',
        filterFn: todo => todo.projectId === null,
    }),
    new Category({
        id: 'cat:2',
        name: 'Today',
        description: 'Todo due to today are here.',
        filterFn: todo => todo.dueDate === new Date(),
    }),
    new Category({
        id: 'cat:3',
        name: 'Completed',
        description: 'Here are the completed todos',
        filterFn: todo => todo.completed,
    }),
];

const projects = [
    new Project({
        id: 'proj:1',
        name: 'Work',
        description: 'To manage work related tasks',
    }),
];

const todos = [
    new Todo({
        id: 'todo:1',
        title: 'Add my first todo',
        description: 'Go ahead and try the app by adding a new todo.',
    }),
];

const app = () => {
    const sidebar = document.createElement('aside');
    sidebar.className = 'sidebar';
    
    const toggleSidebarButton = document.createElement('button');
    toggleSidebarButton.className = 'toggle-sidebar-button active';
    toggleSidebarButton.addEventListener('click', () => sidebar.classList.toggle('collapsed'));
    
    const menuIcon = document.createElement('img');
    menuIcon.className = 'icon';
    menuIcon.src = MenuIconSrc;
    menuIcon.alt = 'Toggle sidebar';
    
    const categoryList = createGroupList(categories);
    
    const projectContainer = createGroupContainer(projects, 'Projects');
    
    toggleSidebarButton.append(menuIcon);
    
    sidebar.append(
        toggleSidebarButton,
        categoryList,
        projectContainer,
    );
    
    const main = document.createElement('main');
    main.id = 'main';
    
    const todoContainer = createTodoContainer(todos, 'Inbox');

    const dialog = createDialog();
    
    main.append(
        todoContainer,
        dialog,
    );
    
    document.body.append(
        sidebar,
        main,
    );

    document.addEventListener('todo:input', () => {
        updateTodoDialog(dialog, 'add');
        dialog.showModal();
    });

    document.addEventListener('todo:view', e => {
        updateTodoDialog(dialog, 'view', e.detail.todo);
        dialog.showModal();
    });
};


const updateActiveGroup = () => {
    const  activeGroupId = location.hash.substring(1) || 'cat:1';
    const activeGroup = [...categories, ...projects].find(group => group.id === activeGroupId);

    if (activeGroupId.startsWith('todo')) {
        return;
    }

    document.querySelectorAll('.group-item').forEach(groupItem => {
        if (groupItem.dataset.id === activeGroupId) {
            groupItem.classList.add('active');
        }
        else {
            groupItem.classList.remove('active');
        }
    });

    document.querySelector('.todo-header .header-title').textContent = activeGroup.name;
};

window.addEventListener('load', () => {
    app();
    updateActiveGroup();
});

window.addEventListener('hashchange', updateActiveGroup);
