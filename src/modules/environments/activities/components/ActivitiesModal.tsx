import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import { IActivities } from "../models/Activities";
import CustomModal from "../../components/controls/customModal/Modal";
import {
  checkboxes,
  initialFormState,
  textFields,
} from "../constants/ActivitiesConst";
import {
  applicationTAMoptions,
  environmentOptions,
} from "../../components/controls/customFilterChips/Constans";
interface ActivitiesModalProps {
  open: boolean;
  isEditMode: boolean;
  formState: typeof initialFormState;
  setFormState: React.Dispatch<React.SetStateAction<typeof initialFormState>>;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSelectChange: (
    e: SelectChangeEvent,
    fieldName: keyof IActivities,
    options: { id: number; name: string }[]
  ) => void;
  handleClose: () => void;
  onAdd?: () => Promise<void>;
  onUpdate?: () => Promise<void>;
}

const ActivitiesModal: React.FC<ActivitiesModalProps> = ({
  open,
  isEditMode,
  formState,
  setFormState,
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
          <FormControl fullWidth>
            <InputLabel id="env-label">Environment</InputLabel>
            <Select
              labelId="env-label"
              id="environment-select"
              value={formState.environmentId?.toString() || ""}
              label="Environment"
              onChange={(e) =>
                handleSelectChange(e, "environmentId", environmentOptions)
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
            <InputLabel id="env-label">Environment</InputLabel>
            <Select
              labelId="env-label"
              id="environment-select"
              value={formState.environmentId?.toString() || ""}
              label="Environment"
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
          {textFields.map((field) => (
            <FormControl
              fullWidth
              key={field.name}
            >
              <TextField
                label={field.label}
                fullWidth
                name={field.name}
                value={(formState[field.name] as string) || ""}
                onChange={handleInputChange}
                type={field.type || "text"}
                disabled={field.disabled}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </FormControl>
          ))}
          {checkboxes.map((cb) => (
            <FormControlLabel
              key={cb.name}
              control={
                <Checkbox
                  checked={Boolean(formState[cb.name])}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      [cb.name]: e.target.checked,
                    })
                  }
                />
              }
              label={cb.label}
            />
          ))}
        </Stack>
      </CustomModal>
    </>
  );
};
export default ActivitiesModal;
