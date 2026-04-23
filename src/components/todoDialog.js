import './todoDialog.css';
import Todo from '../classes/todo.js';
import { createButton, createForm, createInputContainer, createInputSection, createInputTextbox, createSelectInput } from './form.js';
import { setDialogFooterButtons, setDialogHeaderTitle, updateDialogContent } from './dialog.js';
import { createDetailedView, createField } from './detailedView.js';

export const createTodoForm = () => {
    const formInputSection = createInputSection([
        createInputContainer({
            input: createInputTextbox({
                type: 'text',
                name: 'title',
                placeholder: 'Finish my assignments',
                required: true,
            }),
            label: 'Title',
        }),
        createInputContainer({
            input: createInputTextbox({
                type: 'textarea',
                name: 'description',
                placeholder: 'Add description...',
            }),
            label: 'Description',
        }),
        createInputContainer({
            input: createInputTextbox({
                type: 'datetime-local',
                name: 'dueDate',
            }),
            label: 'Due Date',
        }),
        createInputContainer({
            input: createSelectInput({
                name: 'priority',
                options: Object.values(Todo.PRIORITIES),
            }),
            label: 'Priority',
        }),
    ]);
    
    const todoForm = createForm({
        id: 'todo-form',
        method: 'post',
        elements: [ formInputSection ],
        onSubmit: e => {
            e.preventDefault();

            const data = new FormData(e.target);

            const title = data.get('title');
            const description = data.get('description');
            const dueDate = data.get('dueDate');
            const priority = data.get('priority');

            const todo = new Todo({
                id: `todo:${crypto.randomUUID()}`,
                title,
                description,
                dueDate,
                priority,
            });
            
            const submitFormEvent = new CustomEvent('todo:add', {
                detail: { todo },
            });
            document.dispatchEvent(submitFormEvent);
        },
    });
    todoForm.classList.add('todo-form');

    return todoForm;
};

export const createTodoView = (todo) => {
    console.log(todo.isComplete())
    const todoView = createDetailedView([
        createField({
            label: 'Title',
            value: todo.title,
            className: 'title',
        }),
        createField({
            label: 'Description',
            value: todo.description,
            className: 'description long-text',
        }),
        createField({
            label: 'Due Date',
            value: todo.dueDate,
            className: 'due-date',
        }),
        createField({
            label: 'Priority',
            value: todo.priority,
            className: 'priority',
        }),
        createField({
            label: 'Status',
            value: todo.completed ? 'Completed' : 'Not completed yet',
            className: 'status',
        }),
    ]);
    todoView.classList.add('todo-detailed-view', 'todo-container');

    return todoView;
};

export const updateTodoDialog = (dialog, mode, todo = null) => {
    let headerTitle = '';
    let content = document.createElement('div');
    let footerButtons = [];

    if (mode === 'add') {
        headerTitle = 'Add a todo';
        content = createTodoForm();
        footerButtons = [
            createButton({
                className: 'form-cancel dialog-close',
                textContent: 'Cancel',
                attributes: { name: 'cancel', type: 'reset' },
            }),
            createButton({
                className: 'form-cta',
                textContent: 'Add',
                attributes: { name: 'add' },
                form: content.id,
            }),
        ];
    }
    else {
        headerTitle = todo.title;
        content = createTodoView(todo);
        footerButtons = [];
    }

    setDialogHeaderTitle(dialog, headerTitle);
    updateDialogContent(dialog, content);
    setDialogFooterButtons(dialog, footerButtons);
};
