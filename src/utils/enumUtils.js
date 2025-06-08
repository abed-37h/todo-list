
/**
 * Creates an immutable enum-like object with utility methods.
 * @param {Object<String, any>} definitions 
 * @returns {{
 *  [key: String]: String,
 *  values: () => string[],
 *  isValid: (value: String) => Boolean
 * }}
 */
export const createEnum = (definitions) => {
    const values = Object.values(definitions);

    return Object.freeze({
        ...definitions,
        values: () => values,
        isValid: (value) => values.includes(value),
    });
};
