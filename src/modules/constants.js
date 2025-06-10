import { createEnum } from "../utils/enumUtils";

/**
 * @typedef {'low' | 'medium' | 'high'} PriorityType
 */

/**
 * @type {{ LOW: 'low', MEDIUM: 'medium', HIGH, 'high', values: () => PriorityType[], isValid: (value: String) => Boolean }}
 */
export const PRIORITY = createEnum({
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
});

/** 
 * @typedef {'pending' | 'in-progress' | 'completed'} StatusType
 */

/**
 * @type {{ PENDING: 'pending', IN_PROGRESS: 'in-progress', COMPLETED: 'completed', values: () => StatusType[], isValid: (value: String) => Boolean }}
 */
export const STATUS = createEnum({
    PENDING: 'pending',
    IN_PROGRESS: 'in-progress',
    COMPLETED: 'completed',
});

/**
 * @typedef {'INVALID_TYPE' | 'INVALID_ID' | 'EMPTY_TEXT' | 'TOO_LONG_TEXT' | 'INVALID_DATE' | 'DATE_IN_PAST' | 'INVALID_PRIORITY' | 'INVALID_STATUS'} ValidationErrorCodesTypes
 */

/**
 * @type {{
 * INVALID_TYPE: 'INVALID_TYPE',
 * INVALID_ID: 'INVALID_ID',
 * EMPTY_TEXT: 'EMPTY_TEXT',
 * TOO_LONG_TEXT: 'TOO_LONG_TEXT',
 * INVALID_DATE: 'INVALID_DATE',
 * DATE_IN_PAST: 'DATE_IN_PAST',
 * INVALID_PRIORITY: 'INVALID_PRIORITY',
 * INVALID_STATUS: 'INVALID_STATUS',
 * values: () => ValidationErrorCodesTypes[],
 * isValid: (value: String) => Boolean
 * }}
 */

export const VALIDATION_ERROR_CODES = createEnum({
    // Generic
    INVALID_TYPE: 'INVALID_TYPE',
    
    // ID
    INVALID_ID: 'INVALID_ID',
    
    // Text
    EMPTY_TEXT: 'EMPTY_TEXT',
    TOO_LONG_TEXT: 'TOO_LONG_TEXT',

    // Due Date
    INVALID_DATE: 'INVALID_DATE',
    DATE_IN_PAST: 'DATE_IN_PAST',

    // Priority
    INVALID_PRIORITY: 'INVALID_PRIORITY',
    
    // Status
    INVALID_STATUS: 'INVALID_STATUS',
});
