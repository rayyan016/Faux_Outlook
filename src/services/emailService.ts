import axios from "axios";
import { Email, EmailBody } from "../types";

const API_BASE = "https://flipkart-email-mock.now.sh/"; 

export const getEmails = async (page = 1): Promise<Email[]> => {
  const { data } = await axios.get(`${API_BASE}?page=${page}`);
  return data.list;
};

export const getEmailBody = async (id: string): Promise<EmailBody> => {
  const { data } = await axios.get(`${API_BASE}?id=${id}`);
  return data;
};
