import Project from '../classes/project.js';
import { setDialogFooterButtons, setDialogHeaderTitle, updateDialogContent } from './dialog.js';
import { createButton, createForm, createInputContainer, createInputSection, createInputTextbox } from './form.js';
import './projectDialog.css';

export const createProjectForm = () => {
    const formInputSection = createInputSection([
        createInputContainer({
            input: createInputTextbox({
                type: 'text',
                name: 'name',
                placeholder: 'Study',
                required: true,
            }),
            label: 'Name',
        }),
        createInputContainer({
            input: createInputTextbox({
                type: 'textarea',
                name: 'description',
                placeholder: 'Add description...',
            }),
            label: 'Description',
        }),
    ]);

    const projectForm = createForm({
        id: 'project-form',
        method: 'post',
        elements: [ formInputSection ],
        onSubmit: e => {
            e.preventDefault();

            const data = new FormData(e.target);

            const name = data.get('name');
            const description = data.get('description');

            const project = new Project({
                id: `proj:${crypto.randomUUID()}`,
                name,
                description,
            });
            
            const submitFormEvent = new CustomEvent('project:add', {
                detail: { project },
            });
            document.dispatchEvent(submitFormEvent);
        },
    });
    projectForm.classList.add('project-form');

    return projectForm;
};

export const updateProjectDialog = (dialog) => {
    const headerTitle = 'Add a project';
    const content = createProjectForm();
    const footerButtons = [
        createButton({
            className: 'form-cancel dialog-close',
            textContent: 'Cancel',
            attributes: { name: 'cancel', type: 'reset'},
        }),
        createButton({
            className: 'form-cta',
            textContent: 'Add',
            attributes: { name: 'add' },
            form: content.id,
        }),
    ];

    setDialogHeaderTitle(dialog, headerTitle);
    updateDialogContent(dialog, content);
    setDialogFooterButtons(dialog, footerButtons);
};
