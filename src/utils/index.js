import moment from "moment";

export const COLORS = [
  "#f40552",
  "#B7EDCB",
  "#EF9C88",
  "#1DC6F5",
  "#11F5AA",
  "#14A877",
  "#F5B91D",
];

export function color(index) {
  return COLORS[index];
}

export function parseMoment(date) {
  return date ? moment(date) : null;
}

export function formatMoment(date) {
  return date ? date.format() : null;
}
