import './todoList.css';
import { createCheckbox } from './checkbox.js';
import { createList, createListContainer, createListHeader } from './list.js';

export const createTodoItem = (todo) => {
    const todoItem = document.createElement('li');
    todoItem.className = 'list-item todo-item';
    todoItem.dataset.id = todo.id;

    const toggleCompletionCheckbox = createCheckbox();
    toggleCompletionCheckbox.className = 'toggle-completion-checkbox';

    toggleCompletionCheckbox.addEventListener('change', () => todoItem.classList.toggle('completed'));

    const todoTitle = document.createElement('a');
    todoTitle.className = 'item-name todo-title';
    todoTitle.href = `#${todo.id}`;
    todoTitle.textContent = todo.title;
    todoTitle.addEventListener('click', () => {
        const showTodoEvent = new CustomEvent('todo:view', {
            detail: { todo }
        });
        document.dispatchEvent(showTodoEvent);
    })

    const todoDueDate = document.createElement('p');
    todoDueDate.className = 'item-date todo-due-date';
    todoDueDate.textContent = todo.dueDate;

    const todoPriority = document.createElement('span');
    todoPriority.className = `todo-priority p-${todo.priority}`;
    todoPriority.textContent = todo.priority;

    todoItem.append(
        toggleCompletionCheckbox,
        todoTitle,
        todoDueDate,
        todoPriority,
    );

    return todoItem;
};

export const createTodoList = (todos) => {
    const todoList = createList("You're all caught up! 🎉", todos.length === 0);
    todoList.classList.add('todo-list');

    todoList.append(...todos.map(todo => createTodoItem(todo)));

    return todoList;
};

export const createTodoContainer = (todos, title = 'Todos') => {
    const todoHeader = createListHeader(title);
    todoHeader.classList.add('todo-header');
    todoHeader.addEventListener('click-add', () => {
        const addTodoEvent = new CustomEvent('todo:input');
        document.dispatchEvent(addTodoEvent);
    });

    const todoContainer = createListContainer(
        todoHeader,
        createTodoList(todos),
    );
    todoContainer.classList.add('todo-container');

    return todoContainer;
};
