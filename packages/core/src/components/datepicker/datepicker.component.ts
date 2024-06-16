import { html, LitElement, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import "./../calendar/calendar.component.js";

@customElement("lit-datepicker")
class LitDatepicker extends LitElement {
  @state()
  private isOpen: boolean = true;

  private toggleCalendar() {
    this.isOpen = !this.isOpen;
  }

  render() {
    return html`
      <div>
        <input @click="${this.toggleCalendar}" type="text" />
        ${this.isOpen ? html`<lit-calendar></lit-calendar>` : nothing}
      </div>
    `;
  }
}

export default LitDatepicker;
