import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import CustomModal from "../../components/controls/customModal/Modal";
import {
  applicationTAMoptions,
  environmentOptions,
} from "../../components/controls/customFilterChips/Constans";
import { initialFormState, textFields } from "../constants/ServerConst";
import { IServer } from "../models/Server";

interface ServerModalProps {
  open: boolean;
  isEditMode: boolean;
  formState: typeof initialFormState;
  setFormState: React.Dispatch<React.SetStateAction<typeof initialFormState>>;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSelectChange: (
    e: SelectChangeEvent,
    fieldName: keyof IServer,
    options: { id: number; name: string }[]
  ) => void;
  handleClose: () => void;
  onAdd?: () => Promise<void>;
  onUpdate?: () => Promise<void>;
}
const ServerModal: React.FC<ServerModalProps> = ({
  open,
  isEditMode,
  formState,
  handleInputChange,
  handleSelectChange,
  handleClose,
  onAdd,
  onUpdate,
}) => {
  return (
    <>
      <CustomModal
        open={open}
        onClose={handleClose}
        title={isEditMode ? "Edit" : "Add"}
        onConfirm={isEditMode ? onUpdate : onAdd}
        confirmText={isEditMode ? "Edit" : "Add"}
      >
        <Stack spacing={2}>
          <FormControl fullWidth>
            <InputLabel id="select-label">Environment</InputLabel>
            <Select
              labelId="select-label"
              id="environment-select"
              value={formState.environmentId?.toString() || ""}
              label="Environment Name"
              onChange={(e) =>
                handleSelectChange(e, "environmentId", environmentOptions)
              }
            >
              {environmentOptions.map((env) => (
                <MenuItem
                  key={env.id}
                  value={env.id.toString()}
                >
                  {env.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="app-label">Application</InputLabel>
            <Select
              labelId="app-label"
              id="application-select"
              value={formState.tamApplicationId?.toString() || ""}
              label="Application"
              onChange={(e) =>
                handleSelectChange(e, "tamApplicationId", applicationTAMoptions)
              }
            >
              {applicationTAMoptions.map((app) => (
                <MenuItem
                  key={app.id}
                  value={app.id.toString()}
                >
                  {app.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {textFields.map((field) => (
            <TextField
              key={field.name}
              label={field.label}
              fullWidth
              name={field.name}
              value={formState[field.name as keyof IServer] || ""}
              onChange={handleInputChange}
              slotProps={{ inputLabel: { shrink: true } }}
            />
          ))}
        </Stack>
      </CustomModal>
    </>
  );
};
export default ServerModal;
