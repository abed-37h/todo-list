import { createElement } from "../utils/domUtils";
import { Component } from "./component";
import './footer.css';
import GithubLogo from '../assets/icons/github.svg';

export class Footer extends Component {
    constructor(author, githubUrl) {
        super();
        this.author = author;
        this.githubUrl = githubUrl;
    }

    render() {
        const footer = createElement('footer', {
            append: [
                createElement('p', {
                    className: 'copyright-text',
                    textContent: `\u00A9 ${new Date().getFullYear()} ${this.author}`,
                }),
                
                createElement('a', {
                    href: this.githubUrl,
                    target: '_blank',
                    rel: 'noopener',
                    append: [
                        createElement('img', {
                            className: 'icon github',
                            src: GithubLogo,
                            alt: 'Github',
                        }),
                    ],
                }),
            ],
        });

        this.element = footer;
        return this.element;
    }
}