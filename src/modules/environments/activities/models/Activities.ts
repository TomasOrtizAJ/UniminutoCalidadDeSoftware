export interface IActivities {
  id: number;
  tamApplicationId: number;
  tamApplicationName: string;
  environmentId: number;
  environmentName: string;
  description: string;
  ticketNumber: string;
  isDataChanged: boolean;
  isCitrixServerChanged: boolean;
  isApplicationServerChanged: boolean;
  isDatabaseServersChanged: boolean;
  changesMadeBy: string;
  startDate: string;
  endDate: string;
  durationTime: string;
  isCommunicationAtStart: boolean;
  isCommunicationAtEnd: boolean;
  specialCase: string;
}
