import moment from 'moment';

export function checkInPeriod(t: Date, A: Date, B: Date): boolean {
    if (moment(A) < moment(B)) return moment(t) >= moment(A) && moment(t) <= moment(B);
    return moment(t) >= moment(B) && moment(t) <= moment(A);
}
