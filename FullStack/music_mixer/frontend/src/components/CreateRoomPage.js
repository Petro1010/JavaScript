import React from "react";
import {Button, Grid, Typography, TextField, FormHelperText, FormControl, Radio, RadioGroup, FormControlLabel, Collapse, Alert} from '@mui/material'
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";

function CreateRoomPage(props){
    //use react state to keep track of forum
    const [guestCanPause, setGuestCanPause] = React.useState(props.guestCanPause)
    const [votesToSkip, setVotesToSkip] = React.useState(props.votesToSkip)
    const [successMessage, setSuccessMessage] = React.useState('')
    const [errorMessage, setErrorMessage] = React.useState('')

    const navigate = useNavigate() // needed for redirect

    function handleVotesChanged(e){
        setVotesToSkip(e.target.value)
    }

    function handlePauseChanged(e){
        setGuestCanPause(e.target.value === 'true' ? true : false) // depends on radiobox value
    }

    function createRoom(){
        // send post request to backend we created
        // must write the inputs properly
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                votes_to_skip: votesToSkip,
                guest_can_pause: guestCanPause
            })
        }

        // send API post request with the options, get the response, put it into json and grab the data
        fetch('/api/createRoom', options)
            .then((res) => res.json())
            .then((data) => navigate(`/room/${data.code}`))  //redirect to the page for the room
    }

    function updateRoom(){
        // update the content
        const options = {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                votes_to_skip: votesToSkip,
                guest_can_pause: guestCanPause,
                code: props.roomCode
            })
        }

        fetch('/api/updateRoom', options)
            .then((res) => {
                if (res.ok){
                    setSuccessMessage("Room Updated Successfully")
                } else {
                    setErrorMessage("Error Updating Room")
                }
            })
    }

    return (
        //Grid aligns things vertically as is (flexbox functionality)
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Collapse in={errorMessage != '' || successMessage != ''}>
                    {/* depending on the message we have show different alert. Upon alert close clear the message */}
                    {successMessage ? (<Alert severity="success" onClose={() => setSuccessMessage('')}>{successMessage}</Alert>) 
                    : (<Alert severity="error" onClose={() => setErrorMessage('')}>{errorMessage}</Alert>)}
                </Collapse>
            </Grid>
            {/* xs tells what the width of the item should be (12 is the max item), also xs means its the smallest possible size*/} 
            <Grid item xs={12} align="center">
                {/* Create a Header */}
                <Typography component='h4' variant='h4'>
                    {props.update ? 'Update ' : 'Create a '} Room
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                {/* Create a Form */}
                <FormControl component='fieldset'>
                    {/* Gives Context for Form */}
                    <FormHelperText>
                        <div align='center'>
                            Guest Control of Playback State
                        </div>
                    </FormHelperText>
                    {/* Defines the radio buttons */}
                    <RadioGroup row defaultValue={props.guestCanPause.toString()} onChange={handlePauseChanged}>
                        <FormControlLabel value='true' control={<Radio color='primary'/>} label='Play/Pause' labelPlacement='bottom'/>
                        <FormControlLabel value='false' control={<Radio color='primary'/>} label='No Control' labelPlacement='bottom'/>
                    </RadioGroup>

                </FormControl>
            </Grid>
            <Grid item xs={12} align='center'>
                <FormControl>
                    <FormHelperText>
                        <div align="center">
                            Votes Required to Skip Song
                        </div>
                    </FormHelperText>
                    {/* Text field to get the number of votes needed to skip from user */}
                    <TextField required={true} type='number' defaultValue={props.votesToSkip} inputProps={{min: 1, style: {textAlign: 'center'}}} onChange={handleVotesChanged}/>
                </FormControl>
            </Grid>
            <Grid item xs={12} align='center'>
                {/* Button to create a room */}
                <Button color='secondary' variant="contained" onClick={props.update ? updateRoom : createRoom}> {props.update ? 'Update ' : 'Create a '} Room </Button>
            </Grid>
            {!props.update ? 
                <Grid item xs={12} align='center'>
                    {/* Button to Go back, linked to a Link element which makes it behave like a link */}
                    <Button color='primary' variant="contained" to='/' component={Link}> Go Back </Button>
                </Grid>
            : <></>}
            
        </Grid>  
    )
}

//default props in the case that no props are passed
CreateRoomPage.defaultProps = {
    votesToSkip: 2,
    guestCanPause: true,
    update: false,
    roomCode: null
  }

export default CreateRoomPage;