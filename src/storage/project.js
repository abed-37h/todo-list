import Project from "../modules/project";
import { clearItems, deleteItem, getItems, saveItem, updateItem } from "./storageUtils";

const STORAGE_KEY = 'projects';

/**
 * Loads projects from storage
 * @returns {Array<Project>}
 */
export const loadProjects = () => getItems(STORAGE_KEY).map(project => Project.fromJSON(project));

/**
 * Adds new project to storage
 * @param {Project} project 
 */
export const saveProject = (project) => saveItem(STORAGE_KEY, project.toJSON());

/**
 * Deletes project with specified id
 * @param {String} projectId 
 */
export const deleteProject = (projectId) => deleteItem(STORAGE_KEY, projectId);

/**
 * Updates specified project
 * @param {Project} updatedProject 
 */
export const updateProject = (updatedProject) => updateItem(STORAGE_KEY, updatedProject.toJSON());

/**
 * Clears projects from storage
 */
export const clearProjects = () => clearItems(STORAGE_KEY);
