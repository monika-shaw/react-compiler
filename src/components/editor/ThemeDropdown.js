import React from "react";
import Select from "react-select";
import monacoThemes from "monaco-themes/themes/themelist";
import { customStyles } from "../constants/customStyles";
import { MenuItem, TextField } from "@mui/material";

const ThemeDropdown = ({ handleThemeChange, theme }) => {
  return (
    <TextField
      placeholder={`Select Theme`}
      select
      value={theme.themeId}
      SelectProps={{ styles: customStyles }}
      onChange={handleThemeChange}
      fullWidth
      size="small"
    >
      {Object.entries(monacoThemes).map(([themeId, themeName]) => (
        <MenuItem key={themeId} value={themeId}>
          {themeName}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default ThemeDropdown;