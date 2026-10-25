/* eslint-disable @typescript-eslint/no-explicit-any */
import { ServerRepository } from "../../../../infraestructure/repositories/server/ServerRepository";
import { IServer } from "../models/Server";

const serviceRepository = new ServerRepository();

export const ServerServices = {
  async getAll(): Promise<IServer[]> {
    const data = await serviceRepository.getAll();
    return data.map((d: any) => ({
      ...d,
      EnvironmentName: d.environmentName ?? d.EnvironmentName,
    }));
  },
  async getById(id: number): Promise<IServer> {
    return await serviceRepository.getById(id);
  },

  async add(server: IServer): Promise<void> {
    await serviceRepository.add(server);
  },
  async update(server: IServer): Promise<void> {
    if (!server.id) throw new Error("Missing Id for update");
    await serviceRepository.update(server);
  },
  async delete(id: number): Promise<void> {
    await serviceRepository.delete(id);
  },
};
