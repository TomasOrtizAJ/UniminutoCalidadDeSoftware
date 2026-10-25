import React from "react";
import { Chip, Stack } from "@mui/material";

interface FilterChipsProps {
  items: string[];
  selectedItem: string | null;
  abbreviations?: Record<string, string>;
  colors?: Record<string, string>;
  onSelect: (env: string) => void;
  onClear?: () => void;
  getChipStyles?: (Name: string) => React.CSSProperties;
}

const FiltersChips: React.FC<FilterChipsProps> = ({
  items,
  selectedItem,
  abbreviations = {},
  colors = {},
  onSelect,
  getChipStyles,
}) => {
  return (
    <div className="chip-container">
      <Stack
        direction="row"
        spacing={1}
        sx={{ my: 2, flexWrap: "wrap" }}
      >
        {items.length === 0 ? (
          <Chip
            label="No items found"
            disabled
          />
        ) : (
          items.map((Name) => (
            <Chip
              key={Name}
              label={abbreviations[Name] || Name}
              style={
                getChipStyles
                  ? getChipStyles(Name)
                  : {
                      backgroundColor:
                        selectedItem === Name
                          ? colors[Name] || "#e0e0e0"
                          : "#ffffff",
                      border: `2px solid ${colors[Name] || "#9e9e9e"}`,
                      color:
                        selectedItem === Name ? "#fff" : colors[Name] || "#000",
                    }
              }
              variant={selectedItem === Name ? "filled" : "outlined"}
              onClick={() => onSelect(Name)}
            />
          ))
        )}
        {/* {selectedItem && (
          <Chip
            label="Clear Filter"
            onClick={onClear}
            color="primary"
            variant="outlined"
          />
        )} */}
      </Stack>
    </div>
  );
};

export default FiltersChips;
