import type { Compilation, Page, GetFrontmatter } from "@greenwood/cli";

const html: string = `
  <h2>About Page</h2>
`;

export default class AboutPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = html;
  }
}