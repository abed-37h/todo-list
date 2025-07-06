import DomElement from '../core/domElement';
import './actionsMenu.css';
import { Component } from './component';
import MoreActionsIcon from './../assets/icons/more-actions.svg';

/**
 * @type {
 * edit: {
 *     className: 'action-edit',
 *     textContent: 'Edit',
 *     order: -1,
 *     onClick: () => {},
 * },
 * delete: {
 *     className: 'action-delete',
 *     textContent: 'Delete',
 *     order: -1,
 *     onClick: () => {},
 * },
 * }
 */
export const DEFAULT_ACTIONS = {
    edit: {
        className: 'action-edit',
        textContent: 'Edit',
        order: -1,
        onClick: () => {},
    },
    delete: {
        className: 'action-delete danger',
        textContent: 'Delete',
        order: -1,
        onClick: () => {},
    },
};

export class ActionsMenu extends Component {
    /**
     * @type {Object<String, Object>}
     */
    #actions;

    /**
     * Class constructor
     * @param {Object<String, Object>} actions 
     */
    constructor(actions) {
        super();
        this.#actions = actions;
    }

    /**
     * Renders ActionsMenu component
     * @returns {DomElement}
     * @override
     */
    render() {
        const actionsMenu = new DomElement('div')
            .setClass('actions-wrapper')
            .append(
                this.renderButton(),
                this.renderMenu(),
            );

        this._element = actionsMenu;
        this.close();
        return this._element;
    }

    /**
     * Render more actions button
     * @returns {DomElement}
     */
    renderButton() {
        return new DomElement('button')
            .setClass('more-actions')
            .on('click', () => this.toggleOpen())
            .append(
                new DomElement('img')
                    .setAttributes({ src: MoreActionsIcon, alt: 'More actions'}),
            );
    }

    /**
     * Renders actions menu
     * @returns {DomElement}
     */
    renderMenu() {
        return new DomElement('ul')
            .setAttributes({ tabIndex: -1, role: 'menu' })
            .setClass('actions-menu')
            .on('focusout', () => this.close())
            .append(...this.getSortedActions().map(({className, textContent, onClick}) => 
                new DomElement('li')
                .append(
                    new DomElement('button')
                        .setClass(className)
                        .setAttributes({ role: 'menuitem' })
                        .setText(textContent)
                        .on('click', onClick)
                        .on('click', e => {
                            e.stopPropagation();
                            this.close();
                        }),
                )
            ));
    }

    /**
     * Updates actions menu
     */
    updateMenu() {
        const menu = this._element.find('.actions-menu');
        menu.get().replaceWith(this.renderMenu());
    }

    /**
     * Sorts actions by order
     * @returns {Array<Object>}
     */
    getSortedActions() {
        const actions = Object.values(this.#actions);
        return actions.sort((a, b) => {
            const getOrder = o =>
                Number.isFinite(o.order)
                    ? (o.order >= 0 ? o.order : actions.length + o.order)
                    : 0;

            return getOrder(a) - getOrder(b);
        });
    }

    /**
     * Adds new actions
     * @param {Object<String, Object>} newActions 
     * @returns {this}
     */
    add(newActions) {
        this.#actions = { ...this.#actions, ...newActions };
        this.updateMenu();
        return this;
    }

    /**
     * Replaces old action with new one
     * @param {String} key 
     * @param {Object} action 
     * @returns {this}
     */
    replace(key, action) {
        this.#actions[key] = action;
        this.updateMenu();
        return this;
    }

    /**
     * Removes an action
     * @param  {...Array<String>} keys 
     * @returns {this}
     */
    remove(...keys) {
        keys.forEach(k => delete this.#actions[k]);
        this.updateMenu();
        return this;
    }

    /**
     * Clears actions
     * @returns {this}
     */
    clear() {
        this.#actions = {};
        this.updateMenu();
        return this;
    }

    /**
     * Opens the menu
     * @returns {this}
     */
    open() {
        this._element.find('.actions-menu').removeClass('hidden');
        this.setState({ open: true });
        this._element.find('.actions-menu').get().focus();
        return this;
    }

    /**
     * Closes the menu
     * @returns {this}
     */
    close() {
        this._element.find('.actions-menu').addClass('hidden');
        this.setState({ open: false });
        return this;
    }

    /**
     * Toggle the visibility state of the menu
     * @returns {this}
     */
    toggleOpen() {
        if (!this.getState('open')) this.open();
        else this.close();
        return this;
    }
}
