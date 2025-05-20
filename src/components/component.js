export class Component {
    constructor() {
        this.element = null;
    }

    getElement() {
        return this.element;
    }

    render() {
        throw new Error('Render method must be implemented by subclasses.');
    }

    mount(parent) {
        if (!this.element) {
            this.render();
        }
        parent.append(this.element);
        return this;
    }

    unmount() {
        this.element?.remove();
        return this;
    }
}