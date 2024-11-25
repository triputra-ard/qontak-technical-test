declare global {
  interface InfQueryParams {
    [key: string]: any;
    docname?: string;
    filters?: string;
    fields?: string;
    page?: string | number;
    limit?: string | number;
  }
  interface InfMessage {
    id: number;
    content: string;
    userId: string | number;
    username: string;
    timestamp: string;
    type: string;
    attachment?: InfMessageAttachment;
  }
  interface InfMessageAttachment {
    url: string;
    filename: string;
    type: string;
  }
}

export {};
