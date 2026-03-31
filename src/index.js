import './style/fonts.css';
import './style/reset.css';
import './style/style.css';

import MenuIconSrc from './assets/icons/menu.svg';
import AddIconSrc from './assets/icons/add-new.svg';
import Todo from './classes/todo.js';
import Project from './classes/project.js';
import Category from './classes/category.js';

let activeContainer = 'cat:1';

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

const sidebar = document.createElement('aside');
sidebar.className = 'sidebar';

const toggleSidebarButton = document.createElement('button');
toggleSidebarButton.className = 'toggle-sidebar-button active';
toggleSidebarButton.addEventListener('click', () => sidebar.classList.toggle('collapsed'));

const menuIcon = document.createElement('img');
menuIcon.className = 'icon';
menuIcon.src = MenuIconSrc;
menuIcon.alt = 'Toggle sidebar';

const categoryList = document.createElement('ul');
categoryList.className = 'list category-list';

const projectContainer = document.createElement('div');
projectContainer.className = 'list-container project-container';

const projectHeader = document.createElement('div');
projectHeader.className = 'list-header project-header';

const projectTitle = document.createElement('h4');
projectTitle.className = 'list-title project-title';
projectTitle.textContent = 'Projects';

const addProjectButton = document.createElement('button');
addProjectButton.className = 'add-button';

const addProjectIcon = document.createElement('img');
addProjectIcon.className = 'icon';
addProjectIcon.src = AddIconSrc;
addProjectIcon.alt = 'Add new';

addProjectButton.append(addProjectIcon);

const projectList = document.createElement('ul');
projectList.className = 'list project-list';

projectHeader.append(
    projectTitle,
    addProjectButton,
);

projectContainer.append(
    projectHeader,
    projectList,
);

toggleSidebarButton.append(menuIcon);

sidebar.append(
    toggleSidebarButton,
    categoryList,
    projectContainer,
);

const main = document.createElement('main');
main.id = 'main';

const todoContainer = document.createElement('div');
todoContainer.className = 'list-container todo-container';

const todoHeader = document.createElement('div');
todoHeader.className = 'list-header todo-header';

const todoTitle = document.createElement('h3');
todoTitle.className = 'list-title todo-title';
todoTitle.textContent = 'Inbox';

const addTodoButton = document.createElement('button');
addTodoButton.className = 'add-button';

const addTodoIcon = document.createElement('img');
addTodoIcon.className = 'icon';
addTodoIcon.src = AddIconSrc;
addTodoIcon.alt = 'Add new';

addTodoButton.append(addTodoIcon);

todoHeader.append(
    todoTitle,
    addTodoButton,
);

const todoList = document.createElement('ul');
todoList.className = 'list todo-list';

todoContainer.append(
    todoHeader,
    todoList,
);

main.append(todoContainer);

document.body.append(
    sidebar,
    main,
);

categories.forEach(category => {
    const categoryItem = document.createElement('li');
    categoryItem.className = 'list-item category-item';

    if (category.id === activeContainer) {
        categoryItem.classList.add('active');
    }

    const categoryName = document.createElement('a');
    categoryName.className = 'item-name';
    categoryName.href = '';
    categoryName.textContent = category.name;

    categoryItem.append(categoryName);

    categoryList.append(categoryItem);
});

if (projects.length === 0) {
    const emptyListText = document.createElement('p');
    emptyListText.className = 'list project-list empty';
    emptyListText.textContent = 'No projects yet!';

    projectList.append(emptyListText);
}
else {
    projects.forEach(project => {
        const projectItem = document.createElement('li');
        projectItem.className = 'project-item';

        if (project.id === activeContainer) {
            projectItem.classList.add('active');
        }
    
        const projectName = document.createElement('a');
        projectName.className = 'list-item item-name';
        projectName.href = '';
        projectName.textContent = project.name;
    
        projectItem.append(projectName);
    
        projectList.append(projectItem);
    });
}

if (todos.length === 0) {
    const emptyListText = document.createElement('p');
    emptyListText.className = 'list todo-list empty';
    emptyListText.textContent = "You're all caught up! 🎉";

    todoList.append(emptyListText);
}
else {
    todos.forEach(todo => {
        const todoItem = document.createElement('li');
        todoItem.className = 'list-item todo-item';

        if (todo.completed) {
            todoItem.classList.add('completed');
        }

        const toggleCompletionLabel = document.createElement('label');
        toggleCompletionLabel.className = 'toggle-completion-label';

        const hiddenCheckbox = document.createElement('input');
        hiddenCheckbox.className = 'hidden-checkbox';
        hiddenCheckbox.type = 'checkbox';
        hiddenCheckbox.name = 'todo-completed';

        const toggleCompletionCheckbox = document.createElement('span');
        toggleCompletionCheckbox.className = 'toggle-completion-checkbox';
        
        toggleCompletionLabel.append(
            hiddenCheckbox,
            toggleCompletionCheckbox,
        );
        
        toggleCompletionLabel.addEventListener('change', () => {
            todo.toggleComplete(),
            todoItem.classList.toggle('completed')
        });
    
        const todoTitle = document.createElement('a');
        todoTitle.className = 'item-name';
        todoTitle.href = '';
        todoTitle.textContent = todo.title;
    
        const todoDueDate = document.createElement('p');
        todoDueDate.className = 'item-date';
        todoDueDate.textContent = todo.dueDate;
    
        const todoPriority = document.createElement('span');
        todoPriority.className = `priority p-${todo.priority}`;
        todoPriority.textContent = todo.priority;
    
        todoItem.append(
            toggleCompletionLabel,
            todoTitle,
            todoDueDate,
            todoPriority,
        );
    
        todoList.append(todoItem);
    });
}
