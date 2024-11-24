export default function (value: String) {
  return value.toLowerCase().replace(/\s+/g, "_").replace(/&/g, "x");
}
