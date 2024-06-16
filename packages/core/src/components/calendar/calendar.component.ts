import { customElement, state } from "lit/decorators.js";
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
} from "date-fns";

@customElement("lit-calendar")
export class LitCalendar extends LitElement {
  @state()
  currentMonth: Date = new Date();

  goToNextMonth() {
    this.currentMonth = add(this.currentMonth, { months: 1 });
  }

  goToPreviousMonth() {
    this.currentMonth = sub(this.currentMonth, { months: 1 });
  }

  render() {
    const daysInMonth = getDaysInMonth(this.currentMonth);

    const dayNumOfFirstDayInMonth = parseInt(
      formatDate(startOfMonth(this.currentMonth), "i"),
      10,
    );

    let currentRow = 0;
    const remainingRows: number[][] = [[]];

    const firstRowDaysNum = 7 - dayNumOfFirstDayInMonth;

    let j = 0;
    for (let i = firstRowDaysNum; i < daysInMonth; i++) {
      if (j % 7 === 0) {
        currentRow++;
        remainingRows[currentRow] = [];
      }

      remainingRows[currentRow].push(i);
      j++;
    }

    return html`
      <div>
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
              ${map(range(firstRowDaysNum), (i) => html`<td>${i + 1}</td>`)}
            </tr>
            ${map(
              remainingRows,
              (row) => html`
                <tr>
                  ${map(row, (day) => html` <td>${day + 1}</td> `)}
                </tr>
              `,
            )}
          </tbody>
        </table>
      </div>
    `;
  }
}
