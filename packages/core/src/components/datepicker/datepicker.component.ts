import { html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "./../calendar/calendar.component.js";
import { formatDate } from "date-fns";
import { createRef, Ref, ref } from "lit/directives/ref.js";
import { styleMap } from "lit/directives/style-map.js";

@customElement("lit-datepicker")
class LitDatepicker extends LitElement {
  containerRef: Ref = createRef();

  @state()
  private isOpen: boolean = true;

  @property({ attribute: false })
  selectedDate: Date = new Date();

  @property({ attribute: false })
  onDateChange: Function;

  private toggleCalendar() {
    this.isOpen = !this.isOpen;
  }

  connectedCallback() {
    document.addEventListener("click", (event) => {
      if (
        this.containerRef.value &&
        !event.composedPath().includes(this.containerRef.value)
      ) {
        this.isOpen = false;
      }
    });
    super.connectedCallback();
  }

  render() {
    return html`
      <div
        ${ref(this.containerRef)}
        style="${styleMap({
          display: "inline-block",
        })}"
      >
        <input
          @click="${this.toggleCalendar}"
          type="text"
          .value="${this.selectedDate
            ? formatDate(this.selectedDate, "dd/MM/yyyy")
            : ""}"
        />
        ${this.isOpen
          ? html`<lit-calendar
              .onDateChange="${this.onDateChange}"
              .selectedDate="${this.selectedDate}"
            ></lit-calendar>`
          : nothing}
      </div>
    `;
  }
}

export default LitDatepicker;
