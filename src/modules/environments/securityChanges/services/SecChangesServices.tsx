/* eslint-disable @typescript-eslint/no-explicit-any */
import { SecChangesRepository } from "../../../../infraestructure/repositories/secChanges/SecChangesRepository";
import { ISecChanges } from "../models/SecChanges";
const serviceRepository = new SecChangesRepository();

export const SecChangesServices = {
  async getAll(): Promise<ISecChanges[]> {
    const data = await serviceRepository.getAll();
    return data.map((d: any) => ({
      ...d,
      TAMapplicationName: d.TAMapplicationName ?? d.tamApplicationName,
    }));
  },
  async getById(id: number): Promise<ISecChanges> {
    return await serviceRepository.getById(id);
  },

  async add(secChan: ISecChanges): Promise<void> {
    await serviceRepository.add(secChan);
  },
  async update(secChan: ISecChanges): Promise<void> {
    if (!secChan.id) throw new Error("Missing Id for update");
    await serviceRepository.update(secChan);
  },
  async delete(id: number): Promise<void> {
    await serviceRepository.delete(id);
  },
};
