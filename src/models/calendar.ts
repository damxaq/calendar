export type Day = {
  date: string;
  monthDayNumber: number;
  dayOfWeekName: string;
  dayOfWeekNumber: number;
  isCurrentMonth: boolean;
};

export type Calendar = {
  days: Array<Day>;
  firstDayOfMonth: Day;
};
