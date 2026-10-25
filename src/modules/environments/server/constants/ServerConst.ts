import { GridColDef } from "@mui/x-data-grid";
import {
  applicationTAMcolors,
  environmentColors,
} from "../../components/controls/customFilterChips/Constans";
import {
  actionsColumn,
  coloredColumns,
  generalColumns,
} from "../../components/controls/customDataGrid/Index";
import { IServer } from "../models/Server";

export type StringKeys<T> = Extract<keyof T, string>;
export const textFields: {
  label: string;
  name: StringKeys<IServer>;
  disabled?: boolean;
  type?: string;
}[] = [
  { label: "Server", name: "serverName" },
  { label: "Descriptions", name: "descriptions" },
  { label: "Ip Address", name: "ipAddress" },
  { label: "Db Instance Domain IP", name: "dbInstanceDomainIP" },
  { label: "Db Name Or Citrix Name", name: "dbNameOrCitrixname" },
  { label: "Citrix Server", name: "citrixServer" },
  { label: "Locations", name: "locations" },
  { label: "Type Server", name: "typeServer" },
  { label: "Model", name: "model" },
  { label: "Os Or SQL", name: "osOrSQL" },
  { label: "Platforms", name: "platforms" },
  { label: "RAM GB", name: "ramgb" },
  { label: "Processors", name: "processors" },
  { label: "Storage", name: "storage" },
  { label: "Placer Services", name: "placerServices" },
  { label: "Integration", name: "integration" },
  { label: "Path To DB Backup", name: "pathtoDBbackup" },
];

export const getServerColumns = (
  onEdit: (row: IServer) => void,
  onDelete: (id: number) => void
): GridColDef[] => [
  actionsColumn(onEdit, onDelete),
  coloredColumns("environmentName", "Environment", environmentColors),
  coloredColumns("tamApplicationName", "Application", applicationTAMcolors),
  generalColumns("serverName", "Server"),
  generalColumns("descriptions", "Descriptions"),
  generalColumns("ipAddress", "IP Address"),
  generalColumns("dbInstanceDomainIP", "DB Instance Domain IP"),
  generalColumns("dbNameOrCitrixname", "DB / Citrix"),
  generalColumns("citrixServer", "Citrix Server"),
  generalColumns("locations", "Locations"),
  generalColumns("typeServer", "Type Server"),
  generalColumns("model", "Model"),
  generalColumns("osOrSQL", "OS Or SQL"),
  generalColumns("platforms", "Platforms"),
  generalColumns("ramgb", "RAM GB"),
  generalColumns("processors", "Processors"),
  generalColumns("storage", "Storage"),
  generalColumns("placerServices", "Placer Services"),
  generalColumns("integration", "Integration"),
  generalColumns("pathtoDBbackup", "Path to DB Backup"),
];
export const initialFormState: IServer = {
  id: 0,
  environmentId: 0,
  environmentName: "",
  tamApplicationId: 0,
  tamApplicationName: "",
  serverName: "",
  descriptions: "",
  ipAddress: "",
  dbInstanceDomainIP: "",
  dbNameOrCitrixname: "",
  citrixServer: "",
  locations: "",
  typeServer: "",
  model: "",
  osOrSQL: "",
  platforms: "",
  ramgb: "",
  processors: "",
  storage: "",
  placerServices: "",
  integration: "",
  pathtoDBbackup: "",
};
