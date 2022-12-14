import React from 'react';
import { Grid, Card, Typography, IconButton, LinearProgress } from '@material-ui/core';
import {PlayArrowRounded, SkipNextRounded, PauseRounded} from '@material-ui/icons';
import axios from 'axios';


export default function MusicPlayer(props) {
    const songProgress = (props.time / props.duration) * 100;

    function pauseSong(){
        axios.put('/spotify/pause');
    }

    function playSong(){
        axios.put('/spotify/play');
    }

    function skipSong(){
        axios.post('/spotify/skip');
    }

    return (
        <Card>
            <Grid container alignItems="center" >
                <Grid item align="center" xs={4}>
                    <img src={props.image_url} height="100%" width="100%" />
                </Grid>
                <Grid item align="center" xs={8}>
                    <Typography component="h5" variant="h5">
                        {props.title}
                    </Typography>
                    <Typography color="textSecondary" variant="subtitle1">
                        {props.artist}
                    </Typography>
                    <div>
                        <IconButton onClick={props.is_playing ? pauseSong : playSong}>
                            {props.is_playing ? <PauseRounded /> : <PlayArrowRounded />}
                        </IconButton>
                        <IconButton onClick={skipSong}>
                            <SkipNextRounded /> {props.votes} / {props.votes_required}
                        </IconButton>
                    </div>

                </Grid>
            </Grid>
            <LinearProgress variant="determinate" value={songProgress} />
        </Card>
    )
}