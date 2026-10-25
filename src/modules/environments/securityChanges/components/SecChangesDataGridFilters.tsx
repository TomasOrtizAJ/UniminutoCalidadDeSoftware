/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { ISecChanges } from "../models/SecChanges";
import { usePaginationState } from "../../hooks/UsePagination";
import {
  applicationTAMabbreviations,
  applicationTAMcolors,
  applicationTAMoptions,
} from "../../components/controls/customFilterChips/Constans";
import FiltersChips from "../../components/controls/customFilterChips/FilterChips";
import SecChangesDataGrid from "./SecChangesDataGrid";
import { initialFormState } from "../constants/SecChangesConst";
import { Button, SelectChangeEvent, TextField } from "@mui/material";
import { SecChangesServices } from "../services/SecChangesServices";
import { CSVLink } from "react-csv";
import SecChangesModal from "./SecChangesModal";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import DateRangeFilter from "../../components/controls/customDataGrid/DateRangeFilter";
import { toast } from "react-toastify";
interface SecChangesDataGridFiltersProps {
  rows: ISecChanges[];
  setRows: (rows: ISecChanges[]) => void;
}
interface Option {
  id: number;
  name: string;
}

const SecChangesDataGridFilters: React.FC<SecChangesDataGridFiltersProps> = ({
  rows,
  setRows,
}) => {
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [formState, setFormState] = useState<ISecChanges>(initialFormState);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const { pageSize, setPageSize, pageNumber, setPageNumber, resetPagination } =
    usePaginationState(10, 0);
  const filteredRows = rows.filter((row) => {
    const filteredApp = selectedApp
      ? row.tamApplicationName === selectedApp
      : true;
    const filteredDescription = search
      ? row.notes.toLowerCase().includes(search.toLowerCase()) ||
        row.changesMadeBy.toLowerCase().includes(search.toLowerCase()) ||
        row.ticketNumber.toLowerCase().includes(search.toLowerCase())
      : true;
    const rowDate = new Date(row.dateTime);

    const filteredDate =
      (!startDate || rowDate >= startDate) && (!endDate || rowDate <= endDate);
    return filteredApp && filteredDescription && filteredDate;
  });
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
  const handleSelectChange = (
    e: SelectChangeEvent,
    key: keyof ISecChanges,
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
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updated = {
      ...formState,
      [name]: value,
    };
    return setFormState(updated);
  };
  const Add = async () => {
    await SecChangesServices.add(formState);
    const updatedData = await SecChangesServices.getAll();
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
          "Security Changes Type",
          "Action",
          "Changes Made By",
          "Date",
          "Ticket Number",
          "Stations",
          "Acces",
          "Notes",
        ],
      ],
      body: rows.map((row) => [
        row.tamApplicationName,
        row.securityChangeTypesName,
        row.securityChangesActionsName,
        row.changesMadeBy,
        row.dateTime,
        row.ticketNumber,
        row.stations,
        row.access,
        row.notes,
      ]),
      styles: {
        fontSize: 4,
        cellPadding: 1,
      },
      headStyles: {
        fontSize: 6,
      },
    });
    doc.save("SecurityChangesTableCompleted.pdf");
    toast.info("Successfully exported in PDF format");
  };
  const downloadCSV = () => {
    toast.info("Successfully exported in CSV format");
  };
  const EmptyFilters = () => {
    setSelectedApp(null);
    setStartDate(null);
    setEndDate(null);
    setSearch("");
  };
  const exportData = rows.map((row) => ({
    Application: row.tamApplicationName,
    SecurityChangesType: row.securityChangeTypesName,
    SecurityChangesTypeAction: row.securityChangesActionsName,
    Action: row.securityChangesActionsName,
    ChangesMadeBy: row.changesMadeBy,
    Date: row.dateTime,
    TicketNumber: row.ticketNumber,
    Stations: row.stations,
    Acces: row.access,
    Notes: row.notes,
  }));
  return (
    <>
      <FiltersChips
        items={applicationTAMoptions.map((opt) => opt.name)}
        selectedItem={selectedApp}
        onSelect={(app) => setSelectedApp(app)}
        colors={applicationTAMcolors}
        abbreviations={applicationTAMabbreviations}
      />
      <SecChangesModal
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
            {(selectedApp || search || (startDate && endDate)) && (
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
      <SecChangesDataGrid
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
export default SecChangesDataGridFilters;
