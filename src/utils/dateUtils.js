import { addWeeks, compareAsc, differenceInCalendarDays, format, formatRelative, getDay, isDate, isExists, isFuture, isThisWeek, isToday, parseJSON } from "date-fns";

export const DATE_FORMAT = 'PPPPp';

export const isValidDate = date => isDate(date) && isExists(date.getFullYear(), date.getMonth(), date.getDate());

export const isFutureDate = date => isValidDate(date) && isFuture(date);

export const isDateToday = date => isValidDate(date) && isToday(date);

export const isWithinAWeek = date => isValidDate(date) && isThisWeek(date, { weekStartsOn: getDay(new Date()) });

export const getNextWeekDate = () => addWeeks(new Date(), 1);

export const formatFullDate = (date, {
    dateFormat = DATE_FORMAT,
    relative = false
} = {}) => {
    if (!isValidDate(date)) {
        return null;
    }

    const today = new Date();

    return (
        Math.abs(differenceInCalendarDays(date, today)) < 2 && relative ?
            formatRelative(date, today) :
            format(date, dateFormat)
    );
};

export const parseDate = jsonDate => {
    if (!jsonDate || !isValidDate(parseJSON(jsonDate))) {
        return null;
    }

    return parseJSON(jsonDate);
};

export const compareDateAsc = (a, b) => {
    if (!isValidDate(a) && isValidDate(b)) return 0;
    if (!isValidDate(a)) return 1;
    if (!isValidDate(b)) return -1;
    return compareAsc(a, b);
};

export const compareDateDesc = (a, b) => {
    if (!isValidDate(a) && isValidDate(b)) return 0;
    if (!isValidDate(a)) return 1;
    if (!isValidDate(b)) return -1;
    return compareDesc(a, b);
};
