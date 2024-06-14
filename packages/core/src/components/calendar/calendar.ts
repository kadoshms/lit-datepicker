import LitCalendar from './calendar.component.js';

export * from './calendar.component.js';

export default LitCalendar;

declare global {
    interface HTMLElementTagNameMap {
        'lit-calendar': LitCalendar;
    }
}
