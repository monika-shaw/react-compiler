import React from "react";
import { Grid } from "@mui/material";

const CustomInput = ({ customInput, setCustomInput }) => {
    return (
        <Grid item xs={12} style={{padding:'0rem 2.5rem 2.5rem 2.5rem'}}>
            {" "}
            <textarea
               style={{width:'100%'}}
                rows="10"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder={`Enter Custom input`}
            ></textarea>
        </Grid>
    );
};

export default CustomInput;