import React from 'react';
import {Typography, Grid, Button, ButtonGroup} from '@material-ui/core/'
import { Link } from 'react-router-dom';

export default function RenderHomePage(){
    return (
        <Grid container spacing={3} >
            <Grid item xs={12} align="center">
                <Typography component="h3" variant="h3"> House Party </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <ButtonGroup disableElevation variant="contained" color="primary">
                    <Button color="primary" variant='contained' to='/join' component={Link}>Join A Room</Button>
                    <Button color="secondary" variant='contained' to='/create' component={Link}>Create A Room</Button>
                </ButtonGroup>
            </Grid>
        </Grid>
    );
}