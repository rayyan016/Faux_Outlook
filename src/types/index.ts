export interface Email {
  id: string;
  from: {
    email: string;
    name: string;
  };
  date: number;
  subject: string;
  short_description: string;
  read?: boolean;
  favorite?: boolean;
}

export interface EmailApiResponse {
    list: Email[];
    total: number;
}

export interface EmailBody {
  id: string;
  body: string;
}
