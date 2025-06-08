import { DomElement } from "../core/domElement";

/**
 * Base UI component class providing core lifecycle methods,
 * state management, DOM mounting, event handling, and cloning.
 * Intended to be extended by subclasses to implement specific UI components.
 */
export class Component {
    /**
     * @type {Object}
     */
    #state;
    /**
     * @type {DomElement | null}
     * @protected
     */
    _element;

    /**
     * Class constructor
     */
    constructor() {
        this._element = null;
        this.resetState();
    }
    
    /**
     * Gets DOM element
     * @return {DomElement | null}
    */
   get element() {
       return this._element;
    }

    // Core Lifecycle

    /**
     * Renders the component
     * Should be overridden by subclasses.
     * @throws {Error}
     * @virtual
     */
    render() {
        throw new Error('Render method must be implemented by subclasses.');
    }

    /**
     * Mount component to DOM
     * @param {DomElement} parent - Parent node that includes this component
     * @returns {this}
     */
    mount(parent) {
        if (!this._element) {
            this.render();
        }
        parent.append(this._element);
        return this;
    }

    /**
     * Unmount component from DOM
     * @returns {this}
     */
    unmount() {
        this._element?.remove();
        return this;
    }

    /**
     * Teardown, remove listeners, cleanup
     * @returns {this}
     */
    destroy() {
        this.unmount();
        this._element = null;
        this.resetState();
        return this;
    }

    // DOM Access

    /**
     * Deep clones this component
     * @returns {this}
     */
    clone() {
        if (!this._element) return;
        const cloned = new this.constructor();
        cloned._element = this._element.clone(true);
        return cloned;
    }

    /**
     * Check if the component is mounted
     * @returns {Boolean}
     */
    isMounted() {
        return !!(this._element && document.body.contains(this._element.get()));
    }

    // State Handling

    /**
     * Sets one or multiple states
     * @param {Object} state 
     * @returns {this}
     */
    setState(state) {
        this.#state = {...this.#state, ...state};
        this.emit({event: 'set-state', detail: { state }});
        return this;
    }

    /**
     * Reset state object
     * @returns {this}
     */
    resetState() {
        this.#state = {};
        return this;
    }

    /**
     * Gets a certain state
     * @param {String} key 
     * @returns {any}
     */
    getState(key) {
        return this.#state[key];
    }

    // Eventing

    /**
     * @param {Object} options
     * @param {string} [options.selector] - Optional selector for child elements
     * @param {string} options.event - Event name
     * @param {Function} options.handler - Event handler
     * @returns {this}
     */
    on({selector, event, handler}) {
        const target = selector ? this._element.findAll(selector) : this._element;
        target?.on(event, handler);
        return this;
    }

    /**
     * @param {Object} options
     * @param {string} [options.selector] - Optional selector for child elements
     * @param {string} options.event - Event name
     * @param {Function} options.handler - Event handler
     * @returns {this}
     */
    off({selector, event, handler}) {
        const target = selector ? this._element.findAll(selector) : this._element;
        target?.off(event, handler);
        return this;
    }

    /**
     * @param {Object} options
     * @param {string} [options.selector] - Optional selector for child elements
     * @param {string} options.event - Event name
     * @param {Object} [options.detail={}] - Additional event details
     * @returns {this}
     */
    emit({selector, event, detail = {}}) {
        const target = selector ? this._element.findAll(selector) : this._element;
        target?.trigger(event, detail);
        return this;
    }

    /**
     * Optional method to attach DOM event listeners.
     * Should be overridden by subclasses if needed.
     * @virtual
     */
    bindEvents() {}

    /**
     * Optional method to detach DOM event listeners.
     * Should be overridden by subclasses if needed.
     * @virtual
     */
    unbindEvents() {}
}
