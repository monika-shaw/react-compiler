import React from "react";
import { customStyles } from "../constants/customStyles";
import { languageOptions } from "../constants/languageOptions";
import { Grid, MenuItem, TextField } from "@mui/material";

const LanguagesDropdown = (props) => {
    const {onSelectChange, language} = props
 
    return (

        <Grid container item xs={12}>
            <Grid item xs={4}>
            <TextField 
         fullWidth
        select
        label="Select Language"
        size="small"
        styles={customStyles}
        value={language}
        onChange={(event) => onSelectChange(event)}
        
        >
        {languageOptions.map((data)=>( 
            <MenuItem value={data.id} key={data.id}>{data.label}</MenuItem>
        ))}
        </TextField>
        </Grid>
            <Grid item xs={8}></Grid>
        </Grid>
    );
};

export default LanguagesDropdown;