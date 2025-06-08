
export default class Project {
    /** @type {String} */
    #id;
    /** @type {String} */
    #name;
    /** @type {String | null} */
    #description;
    
    /**
     * Class constructor
     * @param {String} id 
     * @param {String} name 
     * @param {String | null} description 
     */
    constructor(id, name, description = null) {
        this.#id = id || crypto.randomUUID();
        this.name = name;
        this.description = description
    }

    /**
     * @returns {String} id
     */
    get id() {
        return this.#id;
    }


    /**
     * @returns {String} name
     */
    get name() {
        return this.#name;
    }

    /**
     * @param {String} value 
     */
    set name(value) {
        this.#name = value.trim();
    }

    /**
     * @returns {String} description
     */
    get description() {
        return this.#description;
    }

    /**
     * @param {String | null} value 
     */
    set description(value) {
        this.#description = value?.trim() || null;
    }

    /**
     * Serializes Project into a plain object
     * @returns {{id: String, name: String, description: String | null}}
     */
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
        };
    }

    /**
     * Creates a Project instance from JSON data
     * @param {{id: String, name: String, description?: String}} json 
     * @returns {Project}
     */
    static fromJSON({ id, name, description }) {
        return new Project(id, name, description);
    }
}
