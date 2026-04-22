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

    const projectForm = createForm('post', [ formInputSection ]);
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
            attributes: { name: 'add'},
        }),
    ];

    setDialogHeaderTitle(dialog, headerTitle);
    updateDialogContent(dialog, content);
    setDialogFooterButtons(dialog, footerButtons);
};
