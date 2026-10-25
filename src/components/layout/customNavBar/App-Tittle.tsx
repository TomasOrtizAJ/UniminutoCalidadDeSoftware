import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useCallback, useState } from "react";

export const AppTitle = () => {
  const [environmentID, setenvironmentID] = useState("");
  const environments = ["ProdSupport", "UAT", "QA", "DEV"];
  const sendRequest = useCallback(async (event: SelectChangeEvent) => {
    setenvironmentID(event.target.value);
  }, []);
  return (
    <>
      <div>
        <h4>TAM - Traffic Applications Management</h4>
        <FormControl fullWidth>
          <Select
            labelId="site-unit-label"
            id="site-unitr-select"
            value={environmentID}
            label="Env: "
            onChange={sendRequest}
            defaultValue={environmentID}
          >
            {environments.map((environmentItem) => (
              <MenuItem
                key={environmentItem}
                value={environmentItem}
              >
                {environmentItem}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </>
  );
};
export default AppTitle;
