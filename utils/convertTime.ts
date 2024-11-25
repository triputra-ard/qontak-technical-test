import moment from "moment";
export default function (value: String) {
  return moment(value).locale("id-ID").format("DD/mm/yy | hh:mm a");
}
