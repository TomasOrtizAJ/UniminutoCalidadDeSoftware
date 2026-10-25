import { ISecChanges } from "../models/SecChanges";
import { GridColDef } from "@mui/x-data-grid";
import {
  actionsColumn,
  coloredColumns,
  generalColumns,
} from "../../components/controls/customDataGrid/Index";
import { applicationTAMcolors } from "../../components/controls/customFilterChips/Constans";

export const securityChangesOptions = [
  { id: 1, name: "Users" },
  { id: 2, name: "Groups" },
];
export const securityChangesActionsOptions = [
  { id: 1, name: "Add" },
  { id: 2, name: "Modify" },
  { id: 3, name: "Remove" },
];
export type StringKeys<T> = Extract<keyof T, string>;
export const textFields: {
  label: string;
  name: StringKeys<ISecChanges>;
  disabled?: boolean;
  type?: string;
}[] = [
  { label: "Changes Made By", name: "changesMadeBy" },
  { label: "Date", name: "dateTime", type: "date" },
  { label: "Stations", name: "stations" },
  { label: "Access", name: "access" },
  { label: "Ticket Number", name: "ticketNumber" },
  { label: "Notes", name: "notes" },
];
export const getSecChangesColumns = (
  onEdit: (row: ISecChanges) => void,
  onView: (id: number) => void
): GridColDef[] => [
  actionsColumn(onEdit, onView),
  coloredColumns("tamApplicationName", "Application", applicationTAMcolors),
  generalColumns("changesMadeBy", "Changes Made By"),
  generalColumns("dateTime", "Date"),
  generalColumns("securityChangesActionsName", "Actions"),
  generalColumns("stations", "Stations"),
  generalColumns("access", "Access"),
  generalColumns("ticketNumber", "Ticket Number"),
  generalColumns("notes", "Notes"),
];
export const initialFormState: ISecChanges = {
  id: 0,
  securityChangeTypesId: 0,
  secChangesActionsTypesId: 0,
  securityChangesActionsName: "",
  tamApplicationName: "",
  securityChangeTypesName: "",
  changesMadeBy: "",
  tamApplicationId: 0,
  dateTime: "",
  ticketNumber: "",
  stations: "",
  access: "",
  notes: "",
};
