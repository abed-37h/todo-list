import './style/fonts.css';
import './style/reset.css';
import './style/style.css';

import MenuIcon from './assets/icons/menu.svg';
import Todo from './classes/todo.js';
import Project from './classes/project.js';
import Category from './classes/category.js';
import { createIconButton } from './components/icon.js';
import { createGroupContainer, createGroupList } from './components/groupList.js';
import { createTodoContainer } from './components/todoList.js';
import { createDialog } from './components/dialog.js';
import { updateTodoDialog } from './components/todoDialog.js';
import { updateProjectDialog } from './components/projectDialog.js';
import StorageInterface from './storage/storage.js';

const projectStorage = new StorageInterface('projects', Project);
const todoStorage = new StorageInterface('todos', Todo);

const categories = [
    new Category({
        id: `cat:${crypto.randomUUID()}`,
        name: 'Inbox',
        description: 'You can find all standalone todo here.',
        filterFn: todo => todo.projectId === null,
    }),
    new Category({
        id: `cat:${crypto.randomUUID()}`,
        name: 'Today',
        description: 'Todo due to today are here.',
        filterFn: todo => todo.dueDate === new Date(),
    }),
    new Category({
        id: `cat:${crypto.randomUUID()}`,
        name: 'Completed',
        description: 'Here are the completed todos',
        filterFn: todo => todo.completed,
    }),
];

const defaultProjects = [
    new Project({
        id: `proj:${crypto.randomUUID()}`,
        name: 'Work',
        description: 'To manage work related tasks',
    }),
];

const defaultTodos = [
    new Todo({
        id: `todo:${crypto.randomUUID()}`,
        title: 'Add my first todo',
        description: 'Go ahead and try the app by adding a new todo.',
    }),
];

let projects = projectStorage.fetch();
let todos = todoStorage.fetch();

if (!projects) {
    projects = defaultProjects;
    projectStorage.insert(...defaultProjects);
}

if (!todos) {
    todos = defaultTodos;
    todoStorage.insert(...defaultTodos);
}

const app = () => {
    const sidebar = document.createElement('aside');
    sidebar.className = 'sidebar';
    
    const toggleSidebarButton = createIconButton({
        className: 'toggle-sidebar-button active',
        symbolId: MenuIcon.id,
        title: 'Toggle sidebar',
        onClick: () => sidebar.classList.toggle('collapsed'),
    });
    
    const categoryList = createGroupList(categories);
    
    const projectContainer = createGroupContainer(projects, 'Projects');
    
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

    document.addEventListener('todo:add', e => {
        const todo = e.detail.todo;
        todoStorage.insert(todo);
        location.reload();
        
        dialog.close();
    });
    
    document.addEventListener('todo:view', e => {
        updateTodoDialog(dialog, 'view', e.detail.todo);
        dialog.showModal();
    });
    
    document.addEventListener('project:input', () => {
        updateProjectDialog(dialog);
        dialog.showModal();
    });

    document.addEventListener('project:add', e => {
        const project = e.detail.project;
        projectStorage.insert(project);
        location.reload();

        dialog.close();
    });
};


const updateActiveGroup = () => {
    const  activeGroupId = location.hash.substring(1) || categories[0].id;
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
