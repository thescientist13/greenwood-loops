import { type Page } from "@greenwood/cli";

const html: string = `
  <h2>About Page</h2>
`;

const pages: Page[] = [];

console.log({ pages });

export default class AboutPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = html;
  }
}