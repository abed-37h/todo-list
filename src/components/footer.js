import DomElement from "../core/domElement";
import { Component } from "./component";
import './footer.css';
import GithubLogo from '../assets/icons/github.svg';

/**
 * A UI component representing the footer section of the application.
 * Displays author's name and a GitHub link.
 * 
 * @extends Component
 */
export class Footer extends Component {
    /**
     * @type {string}
     */
    #author;
    /**
     * @type {string}
     */
    #githubUrl;

    /**
     * Class constructor
     * @param {String} author 
     * @param {String} githubUrl 
     */
    constructor(author, githubUrl) {
        super();
        this.#author = author;
        this.#githubUrl = githubUrl;
    }

    /**
     * Renders the component
     * @returns {DomElement}
     * @override
     */
    render() {
        const footer = new DomElement('footer')
            .append(
                new DomElement('p')
                    .setClass('copyright-text')
                    .setText(`\u00A9 ${new Date().getFullYear()} ${this.#author}`),
                new DomElement('a')
                    .setAttributes({ href: this.#githubUrl, target: '_blank', rel: 'noopener' })
                    .append(
                        new DomElement('img')
                            .setClass('icon github')
                            .setAttributes({ src: GithubLogo, alt: 'Github' })
                    ),
            );

        this._element = footer;
        return this._element;
    }
}