/* eslint-disable @typescript-eslint/no-explicit-any */
import Typography from "@mui/material/Typography";
import "../../styles/Custom-Models.scss";
import ServerDataGridFilters from "./ServerDataGridFilters";
import { Button, SelectChangeEvent } from "@mui/material";
import { ServerServices } from "../services/ServerServices";
import { useEffect, useState } from "react";
import { IServer } from "../models/Server";
import { initialFormState } from "../constants/ServerConst";
import { usePaginationState } from "../../hooks/UsePagination";
import ServerModal from "./ServerModal";
interface Option {
  id: number;
  name: string;
}
const Server: React.FC = () => {
  const [rows, setRows] = useState<IServer[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [formState, setFormState] = useState<IServer>(initialFormState);

  useEffect(() => {
    const fetchData = async () => {
      const data = await ServerServices.getAll();
      setRows(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="container">
        <Typography variant="h3">Server</Typography>
        <ServerDataGridFilters
          rows={rows}
          setRows={setRows}
        />
      </div>
    </>
  );
};
export default Server;
