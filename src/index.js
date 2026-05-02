import './style/fonts.css';
import './style/reset.css';
import './style/style.css';

import MenuIcon from './assets/icons/menu.svg';
import Todo from './classes/todo.js';
import Project from './classes/project.js';
import Category from './classes/category.js';
import { createIconButton } from './components/icon.js';
import { createGroupContainer, createGroupList, updateActiveGroup, updateGroupContainer } from './components/groupList.js';
import { createTodoContainer, updateTodoContainer } from './components/todoList.js';
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
let activeGroup = categories[0];

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
    
    const projectContainer = createGroupContainer(projects, 'Projects', true);
    
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
        updateTodoDialog(dialog, 'form');
        dialog.showModal();
    });

    document.addEventListener('todo:edit', e => {
        updateTodoDialog(dialog, 'form', e.detail.todo);
        dialog.showModal();
    });

    document.addEventListener('todo:add', e => {
        const todo = e.detail.todo;
        todoStorage.insert(todo);
        todos = todoStorage.fetch();
        updateTodoContainer(todoContainer, {
            todos: todos.filter(activeGroup.filterFn),
        });
        
        dialog.close();
    });

    document.addEventListener('todo:update', e => {
        const todo = e.detail.todo;
        todoStorage.update(todo);
        todos = todoStorage.fetch();
        updateTodoContainer(todoContainer, {
            todos: todos.filter(activeGroup.filterFn),
        });
        
        dialog.close();
    });
    
    document.addEventListener('todo:delete', e => {
        const todo = e.detail.todo;
        todoStorage.delete(todo.id);
        todos = todoStorage.fetch();
        updateTodoContainer(todoContainer, {
            todos: todos.filter(activeGroup.filterFn),
        });
        
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
    
    document.addEventListener('project:edit', e => {
        updateProjectDialog(dialog, e.detail.project);
        dialog.showModal();
    });

    document.addEventListener('project:add', e => {
        const project = e.detail.project;
        projectStorage.insert(project);
        projects = projectStorage.fetch();
        updateGroupContainer(projectContainer, {
            groups: projects,
        });

        dialog.close();
    });

    document.addEventListener('project:update', e => {
        const project = e.detail.project;
        projectStorage.update(project);
        projects = projectStorage.fetch();
        updateGroupContainer(projectContainer, {
            groups: projects,
        });
        
        dialog.close();
    });

    document.addEventListener('project:delete', e => {
        const project = e.detail.project;
        projectStorage.delete(project.id);
        projects = projectStorage.fetch();
        updateGroupContainer(projectContainer, {
            groups: projects,
        });
        
        dialog.close();
    });
};


const updateContent = () => {
    const  activeGroupId = location.hash.substring(1) || categories[0].id;
    const newActiveGroup = updateActiveGroup([...categories, ...projects], activeGroupId);

    if (!newActiveGroup) {
        return;
    }

    activeGroup = newActiveGroup;

    updateTodoContainer(
        document.querySelector('.todo-container'),
        {
            headerTitle: activeGroup.name,
            todos: todos.filter(activeGroup.filterFn),
        }
    )
};

window.addEventListener('load', () => {
    app();
    updateContent();
});

window.addEventListener('hashchange', updateContent);
