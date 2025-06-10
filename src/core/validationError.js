
export class ValidationError extends Error {
    /**
     * Class constructor
     * @param {String} message 
     * @param {Object} details 
     */
    constructor(message, details = {}) {
        super(message);
        this.name = 'ValidationError';
        Object.assign(this, details);
    }
}
