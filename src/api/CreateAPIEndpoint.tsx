/* eslint-disable @typescript-eslint/no-explicit-any */
import { BASE_URL } from "../modules/environments/utils/Constants";

export const API_URL = BASE_URL;
export const CreateAPIEndpoint = (
  endpoint: string,
  headers: HeadersInit = { "Content-Type": "application/json" },
  apiUrl: string = API_URL
) => {
  const url = `${apiUrl}${endpoint}`;
  return {
    getAll: async () => {
      const res = await fetch(`${url}/GetAll`, { headers });
      if (!res.ok) throw new Error("Error fetching data");
      return res.json();
    },

    getById: async (id: string | number) => {
      const res = await fetch(`${url}/Get/${id}`, { headers });
      if (!res.ok) throw new Error("Error fetching data by ID");
      return res.json();
    },

    add: async (addRecord: any) => {
      const res = await fetch(`${url}/Add`, {
        method: "POST",
        headers,
        body: JSON.stringify(addRecord),
      });
      if (!res.ok) throw new Error("Error adding data");
      return res.json();
    },

    update: async (id: number, updatedRecord: any) => {
      const res = await fetch(`${url}/Update/${id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(updatedRecord),
      });
      if (!res.ok) throw new Error("Error updating data");
      return res.json();
    },

    delete: async (id: string | number) => {
      const res = await fetch(`${url}/Remove/${id}`, {
        method: "DELETE",
        headers,
      });
      if (!res.ok) throw new Error("Error deleting data");
    },
  };
};
