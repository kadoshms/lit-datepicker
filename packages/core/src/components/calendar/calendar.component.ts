import { customElement, property, state } from "lit/decorators.js";
import { html, LitElement } from "lit";
import { map } from "lit/directives/map.js";
import { range } from "lit/directives/range.js";
import {
  formatDate,
  getDaysInMonth,
  startOfWeek,
  addDays,
  startOfMonth,
  add,
  sub,
  isEqual,
  startOfDay,
} from "date-fns";
import { repeat } from "lit/directives/repeat.js";
import { styleMap } from "lit/directives/style-map.js";
import { spreadProps } from "@open-wc/lit-helpers";

@customElement("lit-calendar")
export class LitCalendar extends LitElement {
  @property({ attribute: false })
  selectedDate: Date = new Date();

  @property({ attribute: false })
  onDateChange: Function;

  @state()
  currentMonth: Date = new Date();

  goToNextMonth() {
    this.currentMonth = add(this.currentMonth, { months: 1 });
  }

  goToPreviousMonth() {
    this.currentMonth = sub(this.currentMonth, { months: 1 });
  }

  // TODO: utils
  getNumberOfFirstDayInMonth() {
    return parseInt(formatDate(startOfMonth(this.currentMonth), "i"), 10);
  }

  getDayRowsToRender() {
    const remainingRows: number[][] = [[]];
    const daysInMonth = getDaysInMonth(this.currentMonth);
    const dayNumOfFirstDayInMonth = this.getNumberOfFirstDayInMonth();
    let currentRow = 0;
    const firstRowDaysNum = 7 - dayNumOfFirstDayInMonth;

    let columnCounter = 0;
    for (let day = firstRowDaysNum; day < daysInMonth; day++) {
      if (columnCounter % 7 === 0) {
        currentRow++;
        remainingRows[currentRow] = [];
      }
      remainingRows[currentRow].push(day);
      columnCounter++;
    }

    return remainingRows;
  }

  handleSelectDate(date: Date) {
    if (this.onDateChange) {
      this.onDateChange(date);
    }
  }

  renderDay(day: number) {
    const dayDateValue = startOfDay(
      addDays(startOfMonth(this.currentMonth), day - 1),
    );
    const isSelected = isEqual(dayDateValue, startOfDay(this.selectedDate));

    const buttonAttributes: Record<string, string> = {};

    if (isSelected) {
      buttonAttributes.ariaCurrent = "date";
    }

    return html`<td
      style="${styleMap({
        border: isEqual(dayDateValue, startOfDay(this.selectedDate))
          ? "1px solid red"
          : null,
      })}"
    >
      <button
        ${spreadProps(buttonAttributes)}
        @click="${() => this.handleSelectDate(dayDateValue)}"
      >
        ${day}
      </button>
    </td>`;
  }

  render() {
    const dayNumOfFirstDayInMonth = parseInt(
      formatDate(startOfMonth(this.currentMonth), "i"),
      10,
    );

    const daysRows: number[][] = this.getDayRowsToRender();

    const firstRowDaysNum = 7 - dayNumOfFirstDayInMonth;

    return html`
      <div
        style="${styleMap({
          border: "1px solid red",
          position: "absolute",
          top: 80,
          left: 40,
        })}"
      >
        <div>
          <button @click="${this.goToPreviousMonth}"><</button>
          <button @click="${this.goToNextMonth}">></button>
        </div>
        <table>
          <thead>
            <tr>
              ${[0, 1, 2, 3, 4, 5, 6].map((dayNum) => {
                const dayOfWeekDate = addDays(
                  startOfWeek(this.currentMonth),
                  dayNum,
                );

                return html` <th>${formatDate(dayOfWeekDate, "EEE")}</th> `;
              })}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="${dayNumOfFirstDayInMonth}">
                ${formatDate(this.currentMonth, "MMM")}
              </td>
              ${map(range(firstRowDaysNum), (day) => this.renderDay(day + 1))}
            </tr>
            ${map(
              daysRows,
              (row) => html`
                <tr>
                  ${repeat(
                    row,
                    (day) => day,
                    (day) => this.renderDay(day + 1),
                  )}
                </tr>
              `,
            )}
          </tbody>
        </table>
      </div>
    `;
  }
}
