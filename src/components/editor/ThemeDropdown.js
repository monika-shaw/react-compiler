import React from "react";
import Select from "react-select";
import monacoThemes from "monaco-themes/themes/themelist";
import { customStyles } from "../constants/customStyles";
import { Grid, MenuItem, TextField } from "@mui/material";

const ThemeDropdown = ({ handleThemeChange, theme }) => {
  return (
    <Grid container item xs={12}>
      <Grid item xs={4}>
        <TextField
          placeholder={`Select Theme`}
          select
          value={theme.value}
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
      </Grid>
      <Grid item xs={8}></Grid>
    </Grid>
  );
};

export default ThemeDropdown;