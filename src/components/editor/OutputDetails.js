import { Grid, Typography } from "@mui/material";
import React from "react";

const OutputDetails = ({ outputDetails }) => {
    return (

        <Grid item xs={12} style={{padding:'2rem'}}>
            <Grid container item xs={12}>
                <Grid item xs={2}  style={{textAlign:'start'}}><Typography>Status : </Typography></Grid>
                <Grid item xs={10} style={{textAlign:'start'}}><Typography style={{fontWeight:'bold'}}> {outputDetails?.status?.description}</Typography></Grid>
            </Grid>

            <Grid container item xs={12}>
                <Grid item xs={2}  style={{textAlign:'start'}}><Typography>Memory : </Typography></Grid>
                <Grid item xs={10} style={{textAlign:'start'}}><Typography style={{fontWeight:'bold'}}> {outputDetails?.memory}</Typography></Grid>
            </Grid>

            <Grid container item xs={12}>
                <Grid item xs={2} style={{textAlign:'start'}}><Typography>Time : </Typography></Grid>
                <Grid item xs={10} style={{textAlign:'start'}}><Typography style={{fontWeight:'bold'}}>{outputDetails?.time}</Typography></Grid>
            </Grid>
        </Grid>

    );
};

export default OutputDetails;