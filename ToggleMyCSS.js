class ToggleMyCSS extends HTMLElement {
    constructor() {
        super();
    }

    static get observedAttributes() {
        return ['importcss'];
    }

    connectedCallback() {
        const button = this.shadowRoot.querySelector('button');
        if (button) {
            button.addEventListener('click', this.toggleImportCSSProperty);
        }
        this.showImportCSSProperty();
        this.addAdoptedStyleSheet(this.getAttribute('importcss'));
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'importcss' && oldValue !== newValue) {
            this.showImportCSSProperty();
            this.removeAdoptedStyleSheet(oldValue);
            this.addAdoptedStyleSheet(newValue);
        }
    }

    toggleImportCSSProperty = () => {
        const currentValue = this.getAttribute('importcss');
        const newValue = currentValue === 'solidstyles' ? 'dashedstyles' : 'solidstyles';
        this.setAttribute('importcss', newValue);
    }

    showImportCSSProperty() {
        const cssImportPropertyValue = this.getAttribute('importcss');
        const message = `cssimport=${cssImportPropertyValue}`;
        const paragraph = this.shadowRoot.querySelector('p');
        if (paragraph) {
            paragraph.textContent = message;
        }
    }

    async addAdoptedStyleSheet(specifier) {
        if (!specifier) return;

        const module = await import(specifier, { with: { type: "css" } });
        const stylesheet = module.default;

        if (!this.shadowRoot.adoptedStyleSheets.includes(stylesheet)) {
            this.shadowRoot.adoptedStyleSheets = [...this.shadowRoot.adoptedStyleSheets, stylesheet];
        }
    }

    async removeAdoptedStyleSheet(specifier) {
        if (!specifier) return;

        const module = await import(specifier,  { with: { type: "css" } });
        const stylesheet = module.default;

        if (this.shadowRoot.adoptedStyleSheets.includes(stylesheet)) {
            this.shadowRoot.adoptedStyleSheets = this.shadowRoot.adoptedStyleSheets.filter(
                (sheet) => sheet !== stylesheet
            );
        }
    }
}

customElements.define('toggle-my-css', ToggleMyCSS);