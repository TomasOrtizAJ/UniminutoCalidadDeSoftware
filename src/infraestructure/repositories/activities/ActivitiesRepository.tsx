import { CreateAPIEndpoint } from "../../../api/CreateAPIEndpoint";
import { IActivities } from "../../../modules/environments/activities/models/Activities";
import { toast } from "react-toastify";

export interface IActivitiesRepository {
  getAll(): Promise<IActivities[]>;
  add(environmentActivity: IActivities): Promise<void>;
  update(activities: IActivities): Promise<void>;
  delete(id: number): Promise<void>;
}
const fecth = CreateAPIEndpoint("Activities");
export class ActivitiesRepository implements IActivitiesRepository {
  async getAll(): Promise<IActivities[]> {
    return await fecth.getAll();
  }
  async getById(id: number): Promise<IActivities> {
    return await fecth.getById(id);
  }

  async add(data: IActivities): Promise<void> {
    try {
      await fecth.add(data);
      toast.success("Record added successfully");
    } catch (error) {
      console.error("Error adding data: ", error);
      toast.error("Error adding data");
    }
  }
  async update(activities: IActivities): Promise<void> {
    if (!activities.id) throw new Error("Missing Id for update");
    try {
      await fecth.update(activities.id, activities);
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
