import { Grid, Typography } from "@mui/material";
import React from "react";

const OutputWindow = ({ outputDetails }) => {
    const getOutput = () => {
        let statusId = outputDetails?.status?.id;

        if (statusId === 6) {
            return (
                <pre className="px-2 py-1 font-normal text-xs text-red-500">
                    {atob(outputDetails?.compile_output)}
                </pre>
            );
        } else if (statusId === 3) {
            return (
                <pre className="px-2 py-1 font-normal text-xs text-green-500">
                    {atob(outputDetails.stdout) !== null
                        ? `${atob(outputDetails.stdout)}`
                        : null}
                </pre>
            );
        } else if (statusId === 5) {
            return (
                <pre className="px-2 py-1 font-normal text-xs text-red-500">
                    {`Time Limit Exceeded`}
                </pre>
            );
        } else {
            return (
                <pre className="px-2 py-1 font-normal text-xs text-red-500">
                    {atob(outputDetails?.stderr)}
                </pre>
            );
        }
    };
    return (
        <Grid item xs={12}>
            <Grid item xs={12}>
                <Typography style={{fontWeight:'bold', fontSize:'1.5rem'}}>Output Window</Typography>
            </Grid>
            <Grid item xs={12} style={{background:'black', padding:'2rem', margin:'2rem', borderRadius:'0.5rem', color:'white', height:'20vh', display:'flex', justifyContent:'center'}}>
                {outputDetails ? <>{getOutput()}</> : null}
            </Grid>
        </Grid>
    );
};

export default OutputWindow;