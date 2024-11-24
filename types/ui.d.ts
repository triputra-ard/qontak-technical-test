declare global {
  interface InfQueryParams {
    [key: string]: any;
    docname?: string;
    filters?: string;
    fields?: string;
    page?: string | number;
    limit?: string | number;
  }
}

export {};
