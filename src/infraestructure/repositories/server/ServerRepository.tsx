import { toast } from "react-toastify";
import { CreateAPIEndpoint } from "../../../api/CreateAPIEndpoint";
import { IServer } from "../../../modules/environments/server/models/Server";

export interface IServerRepository {
  getAll(): Promise<IServer[]>;
  add(server: IServer): Promise<void>;
  update(server: IServer): Promise<void>;
  delete(id: number): Promise<void>;
}
const fecth = CreateAPIEndpoint("Server");
export class ServerRepository implements IServerRepository {
  async getAll(): Promise<IServer[]> {
    return await fecth.getAll();
  }
  async getById(id: number): Promise<IServer> {
    return await fecth.getById(id);
  }

  async add(data: IServer): Promise<void> {
    try {
      await fecth.add(data);
      toast.success("Record added successfully");
    } catch (error) {
      console.error("Error adding data: ", error);
      toast.error("Error adding data");
    }
  }

  async update(server: IServer): Promise<void> {
    if (!server.id) throw new Error("Missing Id for update");
    try {
      await fecth.update(server.id, server);
      toast.success("Registration updated successfully");
    } catch (error) {
      console.error("Error updating data: ", error);
      toast.error("Error updating data");
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await fecth.delete(id);
      toast.success("Record successfully deleted");
    } catch (error) {
      console.error("Error deleting data: ", error);
      toast.error("Error deleting data");
    }
  }
}
