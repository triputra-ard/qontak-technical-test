export default function (url: string, queryParams: InfQueryParams) {
  const query = new URLSearchParams();
  if (queryParams)
    Object.keys(queryParams).forEach((name) => {
      query.set(name, queryParams[name]);
    });
  return `${url}?${query}`;
}
