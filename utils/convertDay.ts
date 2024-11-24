import moment from "moment";
export default function (value: String) {
  return moment().diff(moment(value).format("YYYY-MM-DD"), "days");
}
