import { CreateAPIEndpoint } from "../../../api/CreateAPIEndpoint";
import { ISecChanges } from "../../../modules/environments/securityChanges/models/SecChanges";
import { toast } from "react-toastify";
export interface ISecChangesRepository {
  getAll(): Promise<ISecChanges[]>;
  add(secChanges: ISecChanges): Promise<void>;
  update(secChanges: ISecChanges): Promise<void>;
  delete(id: number): Promise<void>;
}
const fecth = CreateAPIEndpoint("SecChanges");
export class SecChangesRepository implements ISecChangesRepository {
  async getAll(): Promise<ISecChanges[]> {
    return await fecth.getAll();
  }
  async getById(id: number): Promise<ISecChanges> {
    return await fecth.getById(id);
  }

  async add(data: ISecChanges): Promise<void> {
    try {
      await fecth.add(data);
      toast.success("Record added successfully");
    } catch (error) {
      console.error("Error adding data: ", error);
      toast.error("Error adding data");
    }
  }

  async update(security: ISecChanges): Promise<void> {
    if (!security.id) throw new Error("Missing Id for update");
    try {
      await fecth.update(security.id, security);
      toast.success("Registration updated successfully");
    } catch (error) {
      console.error("Error updating data: ", error);
      toast.error("Error updating data");
    }
  }

  async delete(id: number): Promise<void> {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      await fecth.delete(id);
      toast.success("Record successfully deleted");
    } catch (error) {
      console.error("Error deleting data: ", error);
      toast.error("Error deleting data");
    }
  }
}
