import moment from "moment";

export default function formatDate(date: string | Date) {
  const m = moment(date);

  if (m.isSame(moment(), "day")) {
    return `Today, ${m.format("hh:mma")}`;
  } else if (m.isSame(moment().subtract(1, "day"), "day")) {
    return `Yesterday, ${m.format("hh:mma")}`;
  } else {
    return m.format("MMMM Do YYYY, hh:mma");
  }
}
