import React from "react";
import { customStyles } from "../constants/customStyles";
import { languageOptions } from "../constants/languageOptions";
import { Select } from "@mui/material";

const LanguagesDropdown = (props) => {
    const {onSelectChange} = props
    return (
        <Select
            placeholder={`Filter By Category`}
            options={languageOptions}
            styles={customStyles}
            defaultValue={languageOptions[0]}
            onChange={(selectedOption) => onSelectChange(selectedOption)}
        />
    );
};

export default LanguagesDropdown;