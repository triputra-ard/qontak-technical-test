export default function (value: String) {
  return value
    .replace(/([a-z])([A-Z])/g, "$1-$2") // Add hyphen between camelCase words
    .replace(/[\s_]+/g, "-") // Replace spaces and underscores with hyphen
    .toLowerCase(); // Convert to lowercase
}
