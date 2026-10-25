/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActivitiesRepository } from "../../../../infraestructure/repositories/activities/ActivitiesRepository";
import { IActivities } from "../models/Activities";
const serviceRepository = new ActivitiesRepository();

export const ActivitiesServices = {
  async getAll(): Promise<IActivities[]> {
    const data = await serviceRepository.getAll();
    return data.map((d: any) => ({
      ...d,
      TAMapplicationName: d.TAMapplicationName ?? d.tamApplicationName,
      EnvironmentName: d.environmentName ?? d.EnvironmentName,
    }));
  },
  async getById(id: number): Promise<IActivities> {
    return await serviceRepository.getById(id);
  },

  async add(EnvironmentActivity: IActivities): Promise<void> {
    await serviceRepository.add(EnvironmentActivity);
  },
  async update(EnvironmentActivity: IActivities): Promise<void> {
    if (!EnvironmentActivity.id) throw new Error("Missing Id for update");
    await serviceRepository.update(EnvironmentActivity);
  },
  async delete(id: number): Promise<void> {
    await serviceRepository.delete(id);
  },
};
