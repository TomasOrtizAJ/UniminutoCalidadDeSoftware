export interface IServer {
  id: number;
  environmentId: number;
  environmentName: string;
  tamApplicationId: number;
  tamApplicationName: string;
  serverName: string;
  descriptions: string;
  ipAddress: string;
  dbInstanceDomainIP: string;
  dbNameOrCitrixname: string;
  citrixServer: string;
  locations: string;
  typeServer: string;
  model: string;
  osOrSQL: string;
  platforms: string;
  ramgb: string;
  processors: string;
  storage: string;
  placerServices: string;
  integration: string;
  pathtoDBbackup: string;
}
