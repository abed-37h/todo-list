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
