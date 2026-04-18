import './dialog.css';
import CloseIconSrc from '../assets/icons/window-close.svg';

export const createDialog = () => {
    const dialog = document.createElement('dialog');
    dialog.className = 'dialog';

    const dialogHeader = document.createElement('div');
    dialogHeader.className = 'dialog-header';

    const headerTitle = document.createElement('h3');
    headerTitle.className = 'header-title';

    const closeButton = document.createElement('button');
    closeButton.className = 'close-button';
    closeButton.addEventListener('click', () => dialog.close());

    const closeIcon = document.createElement('img');
    closeIcon.className = 'icon';
    closeIcon.src = CloseIconSrc;
    closeIcon.alt = 'Close';

    closeButton.append(closeIcon);

    dialogHeader.append(
        headerTitle,
        closeButton,
    );

    const dialogContent = document.createElement('div');
    dialogContent.className = 'dialog-content';

    const dialogFooter = document.createElement('div');
    dialogFooter.className = 'dialog-footer';

    dialog.append(
        dialogHeader,
        dialogContent,
        dialogFooter,
    );

    return dialog;
};

export const setDialogHeaderTitle = (dialog, title) => {
    dialog.querySelector('.header-title').textContent = title;
};

export const updateDialogContent = (dialog, content) => {
    const dialogContent = dialog.querySelector('.dialog-content');
    dialogContent.textContent = '';
    dialogContent.append(content);
};

export const setDialogFooterButtons = (dialog, buttons) => {
    const dialogFooter = dialog.querySelector('.dialog-footer');
    dialogFooter.textContent = '';
    dialogFooter.append(...buttons);
};
