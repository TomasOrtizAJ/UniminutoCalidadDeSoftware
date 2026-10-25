import { GridColDef } from "@mui/x-data-grid";
import { IActivities } from "../models/Activities";
import {
  actionsColumn,
  coloredColumns,
  generalColumns,
} from "../../components/controls/customDataGrid/Index";
import {
  applicationTAMcolors,
  environmentColors,
} from "../../components/controls/customFilterChips/Constans";

export type StringKeys<T> = Extract<keyof T, string>;
export const textFields: {
  label: string;
  name: StringKeys<IActivities>;
  disabled?: boolean;
  type?: string;
}[] = [
  { label: "Description", name: "description" },
  { label: "Changes Made By", name: "changesMadeBy" },
  { label: "Start Date", name: "startDate", type: "datetime-local" },
  { label: "End Date", name: "endDate", type: "datetime-local" },
  { label: "Duration Time", name: "durationTime", disabled: true },
  { label: "Ticket Number", name: "ticketNumber" },
  { label: "Special Case", name: "specialCase" },
];
export const checkboxes: {
  label: string;
  name: StringKeys<IActivities>;
}[] = [
  { label: "¿Is Data Changed?", name: "isDataChanged" },
  { label: "¿Is Citrix Server Changed?", name: "isCitrixServerChanged" },
  {
    label: "¿Is Application Server Changed?",
    name: "isApplicationServerChanged",
  },
  { label: "¿Is Database Servers Changed?", name: "isDatabaseServersChanged" },
  { label: "¿Is Communication At Start?", name: "isCommunicationAtStart" },
  { label: "¿Is Communication At End?", name: "isCommunicationAtEnd" },
];
export const getActivitiesColumns = (
  onEdit: (row: IActivities) => void,
  onView: (id: number) => void,
): GridColDef[] => [
  actionsColumn(onEdit, onView),
  coloredColumns("tamApplicationName", "Application", applicationTAMcolors),
  coloredColumns("environmentName", "Environment", environmentColors),
  generalColumns("description", "Description"),
  generalColumns("ticketNumber", "Ticket Number"),
  generalColumns("isDataChanged", "Is Data Changed"),
  generalColumns("isCitrixServerChanged", "Is Citrix Server Changed"),
  generalColumns("isApplicationServerChanged", "Is Application Server Changed"),
  generalColumns("isDatabaseServersChanged", "Is Database Servers Changed"),
  generalColumns("changesMadeBy", "Changes Made By"),
  generalColumns("startDate", "Start Date"),
  generalColumns("endDate", "End Date"),
  generalColumns("durationTime", "Duration Time"),
  generalColumns("isCommunicationAtStart", "Is Communication At Start"),
  generalColumns("isCommunicationAtEnd", "Is Communication At End"),
  generalColumns("specialCase", "Special Case"),
];
export const initialFormState: IActivities = {
  id: 0,
  tamApplicationId: 0,
  tamApplicationName: "",
  environmentId: 0,
  environmentName: "",
  description: "",
  ticketNumber: "",
  isDataChanged: false,
  isCitrixServerChanged: false,
  isApplicationServerChanged: false,
  isDatabaseServersChanged: false,
  changesMadeBy: "",
  startDate: "",
  endDate: "",
  durationTime: "",
  isCommunicationAtStart: false,
  isCommunicationAtEnd: false,
  specialCase: "",
};
