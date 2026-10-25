/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import { ISecChanges } from "../models/SecChanges";
import CustomModal from "../../components/controls/customModal/Modal";
import {
  initialFormState,
  securityChangesActionsOptions,
  securityChangesOptions,
  textFields,
} from "../constants/SecChangesConst";
import { applicationTAMoptions } from "../../components/controls/customFilterChips/Constans";
interface SecChangesModalProps {
  open: boolean;
  isEditMode: boolean;
  formState: typeof initialFormState;
  setFormState: React.Dispatch<React.SetStateAction<typeof initialFormState>>;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSelectChange: (
    e: SelectChangeEvent,
    fieldName: keyof ISecChanges,
    options: { id: number; name: string }[]
  ) => void;
  handleClose: () => void;
  onAdd?: () => Promise<void>;
  onUpdate?: () => Promise<void>;
}

const SecChangesModal: React.FC<SecChangesModalProps> = ({
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
        confirmText={isEditMode ? "Update" : "Add"}
      >
        <Stack spacing={2}>
          <FormControl fullWidth>
            <InputLabel id="select-label">Security Changes Type</InputLabel>
            <Select
              labelId="select-label"
              id="securityChanges-select"
              value={formState.securityChangeTypesId?.toString() || ""}
              label="Security Changes Type"
              onChange={(e) =>
                handleSelectChange(
                  e,
                  "securityChangeTypesId",
                  securityChangesOptions
                )
              }
            >
              {securityChangesOptions.map((app) => (
                <MenuItem
                  key={app.id}
                  value={app.id.toString()}
                >
                  {app.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="select-label">Application Name</InputLabel>
            <Select
              labelId="select-label"
              id="application-select"
              value={formState.tamApplicationId?.toString() || ""}
              label="Application Name"
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
          <FormControl fullWidth>
            <InputLabel id="select-label">Action's Type</InputLabel>
            <Select
              name="actions"
              labelId="select-label"
              id="actions-select"
              value={formState.secChangesActionsTypesId?.toString() || ""}
              label="Action's Type"
              onChange={(e) =>
                handleSelectChange(
                  e,
                  "secChangesActionsTypesId",
                  securityChangesActionsOptions
                )
              }
            >
              {securityChangesActionsOptions.map((app) => (
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
              type={field.type || "text"}
              value={(formState[field.name] as string) || ""}
              onChange={handleInputChange}
              disabled={field.disabled}
              slotProps={{ inputLabel: { shrink: true } }}
            />
          ))}
        </Stack>
      </CustomModal>
    </>
  );
};
export default SecChangesModal;
