import { css, html, LitElement, nothing, PropertyValues, render } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import "./../calendar/calendar.component.js";
import { formatDate, isValid, parse } from "date-fns";
import { createRef, Ref, ref } from "lit/directives/ref.js";
import { styleMap } from "lit/directives/style-map.js";
import { computePosition } from "@floating-ui/dom";

@customElement("lit-datepicker")
class LitDatepicker extends LitElement {
  static styles = css`
    [popover] {
      border: 1px solid blue;
    }

    [popover]:popover-open {
      position: absolute;
      inset: unset;
    }
  `;

  containerRef: Ref = createRef();

  @state()
  private isOpen: boolean = true;

  @property({ attribute: false })
  selectedDate: Date = new Date();

  @property({ attribute: false })
  onDateChange: Function;

  @property()
  placeholder = "Select a Date";

  @property()
  dateFormat = "dd/MM/yyyy";

  popoverRef: Ref<HTMLElement> = createRef();

  @query("input")
  inputElement: HTMLInputElement;

  calendar = createRef();

  @state()
  popoverPosition: { left: string; top: string };

  private async toggleCalendar() {
    const popoverElement = this.popoverRef.value;
    if (popoverElement) {
      popoverElement.togglePopover();
      const position = await computePosition(
        this.inputElement,
        popoverElement,
        {
          placement: "bottom-start",
        },
      );

      popoverElement.style.left = `${position.x}px`;
      popoverElement.style.top = `${position.y}px`;
    }
  }

  handleInputChange(event: InputEvent) {
    const value = (event.target as HTMLInputElement).value;
    const parsedDate = parse(value, this.dateFormat, new Date());
    if (isValid(parsedDate)) {
      this.selectedDate = parsedDate;
    }
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
          .placeholder="${this.placeholder}"
          @change="${this.handleInputChange}"
          type="text"
          .value="${this.selectedDate
            ? formatDate(this.selectedDate, this.dateFormat)
            : ""}"
        />
        <div popover ${ref(this.popoverRef)}>
          <lit-calendar
            .onDateChange="${this.onDateChange}"
            .selectedDate="${this.selectedDate}"
          ></lit-calendar>
        </div>
      </div>
    `;
  }
}

export default LitDatepicker;
