import { useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  handleCategoryChange,
  handleDifficultyChange,
  handleTypeChange,
} from "../store/actions";

const SelectField = ({ label, options }) => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const value = e.target.value;
    setValue(value);

    switch (label) {
      case "Category":
        dispatch(handleCategoryChange(value));
        break;
      case "Difficulty":
        dispatch(handleDifficultyChange(value));
        break;
      case "Type":
        dispatch(handleTypeChange(value));
        break;
      default:
        return;
    }
  };

  return (
    <div>
      <Box mt={3} width="100%">
        <FormControl size="small" fullWidth>
          <InputLabel>{label}</InputLabel>
          <Select value={value} label={label} onChange={handleChange}>
            {options.map(({ id, name }) => (
              <MenuItem value={id} key={id}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};

export default SelectField;
