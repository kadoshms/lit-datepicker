import { html, LitElement } from "lit";
import "./datepicker.component.js";
import { customElement, state } from "lit/decorators.js";

@customElement("datepicker-example")
class DatepickerExample extends LitElement {
  @state()
  selectedDate: Date = new Date(2024, 9, 10);

  handleSelectDate(date: Date) {
    this.selectedDate = date;
  }

  render() {
    return html`<lit-datepicker
      .selectedDate="${this.selectedDate}"
      .onDateChange="${(date: Date) => this.handleSelectDate(date)}"
    ></lit-datepicker>`;
  }
}

export default {
  title: "Datepicker",
  tags: ["autodocs"],
  render: () => {
    return html`<datepicker-example></datepicker-example>`;
  },
  argTypes: {},
};

export const Primary = {
  args: {},
};
