/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { usePaginationState } from "../../hooks/UsePagination";
import { IActivities } from "../models/Activities";
import ActivitiesDataGrid from "./ActivitiesDataGrid";
import FiltersChips from "../../components/controls/customFilterChips/FilterChips";
import {
  applicationTAMabbreviations,
  applicationTAMcolors,
  applicationTAMoptions,
  environmentAbbreviations,
  environmentColors,
  environmentOptions,
} from "../../components/controls/customFilterChips/Constans";
import { initialFormState } from "../constants/ActivitiesConst";
import { Button, SelectChangeEvent, TextField } from "@mui/material";
import { CSVLink } from "react-csv";
import ActivitiesModal from "./ActivitiesModal";
import { ActivitiesServices } from "../services/ActivitiesServices";
import { CalculateDuration } from "../../utils/CalculateDuration";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";
import DateRangeFilter from "../../components/controls/customDataGrid/DateRangeFilter";
import { toast } from "react-toastify";
interface ActivitiesDataGridFiltersProps {
  rows: IActivities[];
  setRows: (rows: IActivities[]) => void;
}
interface Option {
  id: number;
  name: string;
}

const ActivitiesDataGridFilters: React.FC<ActivitiesDataGridFiltersProps> = ({
  rows,
  setRows,
}) => {
  const [selectedEnv, setSelectedEnv] = useState<string | null>(null);
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [formState, setFormState] = useState<IActivities>(initialFormState);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [search, setSearch] = useState("");
  const { pageSize, setPageSize, pageNumber, setPageNumber, resetPagination } =
    usePaginationState(10, 0);
  const filteredRows = rows.filter((row) => {
    const filteredEnv = selectedEnv
      ? row.environmentName === selectedEnv
      : true;
    const filteredApp = selectedApp
      ? row.tamApplicationName === selectedApp
      : true;
    const rowDate = new Date(row.startDate);

    const filteredDate =
      (!startDate || rowDate >= startDate) && (!endDate || rowDate <= endDate);
    const filteredDescription = search
      ? row.description.toLowerCase().includes(search.toLowerCase()) ||
        row.changesMadeBy.toLowerCase().includes(search.toLowerCase())
      : true;
    return filteredApp && filteredEnv && filteredDate && filteredDescription;
  });
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updated = {
      ...formState,
      [name]: value,
    };
    if (name === "DateTime") {
      return setFormState(updated);
    }
    if (
      (name === "startDate" || name === "endDate") &&
      updated.startDate &&
      updated.endDate
    ) {
      updated.durationTime = CalculateDuration(
        updated.startDate,
        updated.endDate
      );
    }
    return setFormState(updated);
  };
  const handleSelectChange = (
    e: SelectChangeEvent,
    key: keyof IActivities,
    options: Option[]
  ) => {
    const selectedId = parseInt(e.target.value);
    const selectedOption = options.find((opt) => opt.id === selectedId);

    if (selectedOption) {
      setFormState((prev) => ({
        ...prev,
        [key]: selectedOption.id as any,
      }));
    }
  };
  function handleOpenAdd(event: React.MouseEvent<HTMLButtonElement>): void {
    setIsEditMode(false);
    setFormState(initialFormState);
    setOpenModal(true);
    console.log(event);
  }
  function handleClose(): void {
    setIsEditMode(false);
    setOpenModal(false);
  }
  const Add = async () => {
    await ActivitiesServices.add(formState);
    const updatedData = await ActivitiesServices.getAll();
    setRows(updatedData);
    resetPagination();
    handleClose();
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("TAM Tables Completed", 20, 10);
    autoTable(doc, {
      head: [
        [
          "Application",
          "Environment",
          "Description",
          "Ticket Number",
          "Is Data Changed",
          "Is Citrix Server Changed",
          "Is Application Server Changed",
          "Is Database Servers Changed",
          "Changes Made By",
          "Start Date",
          "End Date",
          "Duration Time",
          "Is Communication At Start",
          "Is Communication At End",
          "Special Case",
        ],
      ],
      body: rows.map((row) => [
        row.tamApplicationName,
        row.environmentName,
        row.description,
        row.ticketNumber,
        row.isDataChanged,
        row.isCitrixServerChanged,
        row.isApplicationServerChanged,
        row.isDatabaseServersChanged,
        row.changesMadeBy,
        row.startDate,
        row.endDate,
        row.durationTime,
        row.isCommunicationAtStart,
        row.isCommunicationAtEnd,
        row.specialCase,
      ]),
      styles: {
        fontSize: 4,
        cellPadding: 1,
      },
      headStyles: {
        fontSize: 6,
      },
    });
    doc.save("EnvironmentsActivitiesTableCompleted.pdf");
    toast.info("Successfully exported in PDF format");
  };
  const downloadCSV = () => {
    toast.info("Successfully exported in CSV format");
  };
  const EmptyFilters = () => {
    setSelectedEnv(null);
    setSelectedApp(null);
    setSearch("");
    setStartDate(null);
    setEndDate(null);
  };
  const exportData = rows.map((row) => ({
    Application: row.tamApplicationName,
    Environment: row.environmentName,
    Description: row.description,
    IsDataChanged: row.isDataChanged,
    IsCitrixServerChanged: row.isCitrixServerChanged,
    IsApplicationServerChanged: row.isApplicationServerChanged,
    IsDatabaseServersChanged: row.isDatabaseServersChanged,
    ChangesMadeBy: row.changesMadeBy,
    StartDate: row.startDate,
    EndDate: row.endDate,
    TicketNumber: row.ticketNumber,
    DurationTime: row.durationTime,
    IsCommunicationAtStartDate: row.isCommunicationAtStart,
    IsCommunicationAtEnd: row.isCommunicationAtEnd,
    SpecialCase: row.specialCase,
  }));
  return (
    <>
      <FiltersChips
        items={applicationTAMoptions.map((opt) => opt.name)}
        selectedItem={selectedApp}
        onSelect={(app) => setSelectedApp(app)}
        onClear={EmptyFilters}
        colors={applicationTAMcolors}
        abbreviations={applicationTAMabbreviations}
      />
      <FiltersChips
        items={environmentOptions.map((opt) => opt.name)}
        selectedItem={selectedEnv}
        onSelect={(env) => setSelectedEnv(env)}
        onClear={() => setSelectedEnv(null)}
        colors={environmentColors}
        abbreviations={environmentAbbreviations}
      />

      <ActivitiesModal
        open={openModal}
        isEditMode={isEditMode}
        handleInputChange={handleInputChange}
        handleSelectChange={handleSelectChange}
        formState={formState}
        setFormState={setFormState}
        handleClose={handleClose}
        onAdd={Add}
      />
      <div className="custom-filters-datagrid">
        <div className="filters-container">
          <TextField
            label="Search Filter"
            variant="outlined"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <DateRangeFilter
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
          <div className="buttons-container">
            {(selectedEnv ||
              selectedApp ||
              search ||
              (startDate && endDate)) && (
              <Button
                className="clear-filters-button"
                variant="outlined"
                size="small"
                onClick={EmptyFilters}
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>
        <div className="buttons-container">
          <Button
            className="add-button"
            onClick={handleOpenAdd}
          >
            Add
          </Button>
          <CSVLink
            className="export-csv-button"
            data={exportData}
            filename={"TableCompleted.csv"}
            onClick={downloadCSV}
          >
            Export to CSV
          </CSVLink>
          <Button
            className="export-pdf-button"
            onClick={downloadPDF}
          >
            Export to PDF
          </Button>
        </div>
      </div>
      <ActivitiesDataGrid
        rows={filteredRows}
        setRows={setRows}
        pageSize={pageSize}
        setPageSize={setPageSize}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />
    </>
  );
};
export default ActivitiesDataGridFilters;
