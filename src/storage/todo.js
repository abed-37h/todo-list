import Todo from "../modules/todo";
import { clearItems, deleteItem, getItems, saveItem, updateItem } from "./storageUtils";

const STORAGE_KEY = 'todos';

/**
 * Loads todos from storage
 * @returns {Array<Todo>}
 */
export const loadTodos = () => getItems(STORAGE_KEY).map(todo => Todo.fromJSON(todo));

/**
 * Adds new todo to storage
 * @param {Todo} todo 
 */
export const saveTodo = (todo) => saveItem(STORAGE_KEY, todo.toJSON());

/**
 * Deletes todo with specified id
 * @param {String} todoId 
 */
export const deleteTodo = (todoId) => deleteItem(STORAGE_KEY, todoId);

/**
 * Updates specified todo
 * @param {Todo} updatedTodo 
 */
export const updateTodo = (updatedTodo) => updateItem(STORAGE_KEY, updatedTodo.toJSON());

/**
 * Clears todos from storage
 */
export const clearTodos = () => clearItems(STORAGE_KEY);
