import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("lit-calendar")
class LitCalendar extends LitElement {
  render() {
    return html`hello-calendar`;
  }
}

export default LitCalendar;
