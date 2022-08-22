import React from "react";
import {Grid, Typography, Card, IconButton, LinearProgress} from '@mui/material'
import { PlayArrow, SkipNext, Pause } from '@mui/icons-material'

function MusicPlayer(props){
    const songProgress = (props.time / props.duration) * 100

    function pauseSong(){
        const options = {
            method: 'PUT',
            headers: {"Content-Type" : "application/json"}
        }
        fetch("/spotify/pause", options)
    }

    function playSong(){
        const options = {
            method: 'PUT',
            headers: {"Content-Type" : "application/json"}
        }
        fetch("/spotify/play", options)
    }
    return(
        <Card>
            <Grid container alignItems="center">
                {/* 4 means it will take up 4/12, 8 means it will take up 8/12 */}
                <Grid item align='center' xs={4}>
                    <img src={props.img_url} height="100%" width="100%"/>
                </Grid>
                <Grid item align='center' xs={8}>
                    <Typography component='h5' variant='h5'>
                        {props.title}
                    </Typography>
                    <Typography color='textSecondary' variant='subtitle1'>
                        {props.artist}
                    </Typography>
                    <div>
                        <IconButton onClick={props.is_playing ? pauseSong : playSong}>
                            {props.is_playing ? <Pause /> : <PlayArrow />}
                        </IconButton>
                        <IconButton>
                            <SkipNext />
                        </IconButton>
                    </div>
                </Grid>
            </Grid>
            <LinearProgress variant="determinate" value={songProgress} />
        </Card>
    )
}

export default MusicPlayer;