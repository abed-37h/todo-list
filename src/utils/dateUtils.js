import { addWeeks, compareAsc, compareDesc, differenceInCalendarDays, format, formatRelative, getDay, isDate, isExists, isFuture, isThisWeek, isToday, parseJSON } from "date-fns";

/**
 * Default date format
 * @type {String}
 * @constant
 */
const DATE_FORMAT = 'PPPPp';

/**
 * Formats a date as relative if within a week, else uses provided format.
 * @param {Date} date 
 * @param {String} [dateFormat] 
 * @returns {String}
 */
export const formatDate = (date, dateFormat = DATE_FORMAT) => {
    if (!isDate(date)) {
        return null;
    }

    const today = new Date();
    
    return (Math.abs(differenceInCalendarDays(date, today)) < 7) ? formatRelative(date, today) : format(date, dateFormat);
};

/**
 * Checks if date is valid
 * @param {any} date 
 * @returns {Boolean}
 */
export const isValidDate = date => isDate(date) && isExists(date.getFullYear(), date.getMonth(), date.getDate());

/**
 * Checks if date is overdue
 * @param {Date} date 
 * @returns {Boolean}
 */
export const isFutureDate = date => isDate(date) && isFuture(date);

/**
 * Checks if date is today
 * @param {Date} date 
 * @returns {Boolean}
 */
export const isDateToday = date => isDate(date) && isToday(date);

/**
 * Checks if date is within this week
 * @param {Date} date 
 * @returns {Boolean}
 */
export const isWithinThisWeek = date => isDate(date) && isThisWeek(date, { weekStartsOn: getDay(new Date()) });

/**
 * Gets date in next week
 * @returns {Date}
 */
export const getNextWeekDate = () => addWeeks(new Date(), 1);

/**
 * Parses date from JSON
 * @param {String | null} json 
 * @returns {Date}
 */
export const parseDate = json => json && parseJSON(json);

/**
 * Compares dates in ascending order
 * @param {Date} a 
 * @param {Date} b 
 * @returns {Number}
 */
export const compareDatesAsc = (a, b) => {
    if (!isDate(a) && !isDate(b)) return 0;
    if (!isDate(a)) return 1;
    if (!isDate(b)) return -1;
    return compareAsc(a, b);
};

/**
 * Compares dates in descending order
 * @param {Date} a 
 * @param {Date} b 
 * @returns {Number}
 */
export const compareDatesDesc = (a, b) => {
    if (!isDate(a) && !isDate(b)) return 0;
    if (!isDate(a)) return 1;
    if (!isDate(b)) return -1;
    return compareDesc(a, b);
};
