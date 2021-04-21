export const enum TimeRoundingUpToValue {
  IN_MINUTES_15 = 15 * 60,
  IN_MINUTES_1 = 1 * 60,
  IN_MINUTES_5 = 5 * 60,
  IN_MINUTES_6 = 6 * 60,
  IN_MINUTES_10 = 10 * 60,
  IN_MINUTES_12 = 12 * 60,
  IN_MINUTES_30 = 30 * 60,
  IN_HOUR_1 = 1 * 60 * 60,
  IN_HOUR_4 = 4 * 60 * 60,
}

export const enum TimeRoundedType {
  ROUND_UP_TO = 'Round up to',
  ROUND_TO_NEAREST = 'Round to nearest',
  ROUND_DOWN_TO = 'Roudn down to',
}

export enum TRACKER_MODE {
  MANUAL,
  TRACK,
}
