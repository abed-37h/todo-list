/**
 * A small wrapper class around HTMLElement for chaining and convenience.
 * 
 * Note: To wrap an existing element, use `DomElement.from()` or `DomElement.find()`.
 * The constructor only accepts tag names as strings.
 */
export default class DomElement {
    /** @type {HTMLElement} */
    #element;

    /**
     * Class Constructor
     * @param {String} [tagName = 'div'] 
     */
    constructor(tagName = 'div') {
        this.#element = document.createElement(tagName);
    }
    
    // Attribute Methods

    /**
     * Sets given attribute to given value
     * @param {String} attributeName 
     * @param {String} value 
     * @returns {DomElement}
     */
    setAttribute(attributeName, value) {
        this.#element.setAttribute(attributeName, value);
        return this;
    }

    /**
     * Sets multiple attributes
     * @param {Object.<String, String>} attributes 
     * @returns {DomElement}
     */
    setAttributes(attributes) {
        Object.entries(attributes).forEach(([name, value]) => this.setAttribute(name, value));
        return this;
    }

    /**
     * Removes given attribute
     * @param {String} attributeName 
     * @returns {DomElement}
     */
    removeAttribute(attributeName) {
        this.#element.removeAttribute(attributeName);
        return this;
    }

    /**
     * Removes multiple attributes
     * @param {Array.<String>} attributeList 
     * @returns {DomElement}
     */
    removeAttributes(attributeList) {
        attributeList.forEach((name) => this.removeAttribute(name));
        return this;
    }
    
    /**
     * Gets value of given attribute
     * @param {String} attribute 
     * @returns {String | null}
     */
    getAttribute(attribute) {
        return this.#element.getAttribute(attribute);
    }

    /**
     * Checks if element has a given attribute
     * @param {String} attribute 
     * @returns {Boolean}
     */
    hasAttribute(attribute) {
        return this.#element.hasAttribute(attribute);
    }
    
    /**
     * Sets `textContent`
     * @param {String} text 
     * @returns {DomElement}
    */
   setText(text) {
       this.#element.textContent = text;
       return this;
    }

    /**
     * Gets `textContent`
     * @returns {String}
     */
    getText() {
        return this.#element.textContent;
    }
    
    /**
     * Sets `innerHtml`
     * @param {String} html 
     * @returns {DomElement}
    */
   setHtml(html) {
       this.#element.innerHTML = html;
       return this;
    }
    
    /**
     * Apply multiple CSS styles
     * @param {Partial<CSSStyleDeclaration>} style 
     * @returns {DomElement}
    */
   setStyle(style) {
       Object.assign(this.#element.style, style);
       return this;
    }

    /**
     * Sets element id
     * @param {String} id 
     * @returns {DomElement}
     */
    setId(id) {
        this.#element.id = id;
        return this;
    }

    /**
     * Gets element id
     * @returns {String}
     */
    getId() {
        return this.#element.id;
    }
    
    /**
     * Sets `className`
     * @param {String} className 
     * @returns {DomElement}
    */
   setClass(className) {
       this.#element.className = className;
       return this;
    }
    
    /**
     * Adds a class
     * @param {String} className 
     * @returns {DomElement}
    */
   addClass(className) {
       this.#element.classList.add(className);
       return this;
    }
    
    /**
     * Removes a class
     * @param {String} className 
     * @returns {DomElement}
    */
   removeClass(className) {
       this.#element.classList.remove(className);
       return this;
    }
    
    /**
     * Toggles class
     * @param {String} className 
     * @returns {DomElement}
    */
   toggleClass(className) {
       this.#element.classList.toggle(className);
       return this;
    }
    
    /**
     * Checks if element has a given class
     * @param {String} className 
     * @returns {Boolean}
    */
   hasClass(className) {
       return this.#element.classList.contains(className);
    }

    /**
     * Sets `data-` attribute
     * @param {String | Number} key 
     * @param {any} value 
     * @returns {DomElement}
     */
    setData(key, value) {
        this.#element.dataset[key] = value;
        return this;
    }

    /**
     * Removes a `data-` attribute
     * @param {String | Number} key 
     * @returns {DomElement}
     */
    removeData(key) {
        this.removeAttribute(`data-${key}`);
        return this;
    }

    /**
     * Checks if given `data-` attribute is set
     * @param {String | Number} key 
     * @returns {Boolean}
     */
    hasData(key) {
        return (key in this.#element.dataset);
    }

    /**
     * Gets a given `data-` value
     * @param {String | Number} key 
     * @returns {any}
     */
    getData(key) {
        return this.#element.dataset[key];
    }

    /**
     * Sets element value
     * @param {any} value 
     * @returns {DomElement}
     */
    setValue(value) {
        if ('value' in this.#element) this.#element.value = value;
        return this;
    }

    /**
     * Gets element value
     * @returns {any}
     */
    getValue() {
        return this.#element?.value;
    }

    // DOM Manipulation

    /**
     * Appends multiple children
     * @param  {...DomElement} children 
     * @returns {DomElement}
     */
    append(...children) {
        this.#element.append(...children.map(child => child.get()));
        return this;
    }

    /**
     * Prepends multiple elements
     * @param  {...DomElement} children 
     * @returns {DomElement}
     */
    prepend(...children) {
        this.#element.prepend(...children.map(child => child.get()));
        return this;
    }

    /**
     * Replaces element content
     * @param  {...DomElement} children 
     * @returns {DomElement}
     */
    replaceChildren(...children) {
        this.#element.replaceChildren(...children.map(child => child.get()));
        return this;
    }

    /**
     * Clears element content
     * @returns {DomElement}
     */
    clear() {
        this.#element.textContent = '';
        return this;
    }

    /**
     * Removes element from DOM
     * @returns {DomElement}
     */
    remove() {
        this.#element.remove();
        return this;
    }

    /**
     * Clones the element
     * @param {Boolean} [deep = false] Whether to perform deep clone 
     * @returns {DomElement}
     */
    clone(deep = false) {
        return DomElement.from(this.#element.cloneNode(deep));
    }
    
    /**
     * Query inside this element
     * @param {String} selector 
     * @returns {DomElement | null}
     */
    find(selector) {
        return DomElement.from(this.#element.querySelector(selector));
    }

    /**
     * Query all inside this element
     * @param {String} selector 
     * @returns {DomElement}
     */
    findAll(selector) {
        return Array.from(this.#element.querySelectorAll(selector)).map(el => DomElement.from(el));
    }

    // Events

    /**
     * Adds event listener
     * @param {String} event 
     * @param {CallableFunction} handler 
     * @returns {DomElement}
     */
    on(event, handler) {
        this.#element.addEventListener(event, handler);
        return this;
    }

    /**
     * Removes event listener
     * @param {String} event 
     * @param {CallableFunction} handler 
     * @returns {DomElement}
     */
    off(event, handler) {
        this.#element.removeEventListener(event, handler);
        return this;
    }

    /**
     * Dispatches a custom event
     * @param {String} eventName 
     * @param {Object} [detail] Optional custom data
     * @returns {DomElement}
     */
    trigger(eventName, detail = {}) {
        const event = new CustomEvent(eventName, { detail });
        this.#element.dispatchEvent(event);
        return this;
    }

    // Accessors
    
    /**
     * Checks if element is visible or not
     * @returns {Boolean}
     */
    isVisible() {
        const style = getComputedStyle(this.#element);
        return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
    }

    /**
     * Shows this element in DOM
     * @returns {DomElement}
     */
    show() {
        this.#element.style.visibility = 'visible';
        return this;
    }

    /**
     * Hides this element from DOM
     * @returns {DomElement}
     */
    hide() {
        this.#element.style.visibility = 'hidden';
        return this;
    }

    /**
     * @returns {HTMLElement}
     */
    get() {
        return this.#element;
    }

    /**
     * Creates DomElement from an existing HTMLElement
     * @param {HTMLElement} element 
     * @returns {DomElement}
     * @static
     */
    static from(element) {
        const instance = new DomElement();
        instance.#element = element;
        return instance;
    }
}
