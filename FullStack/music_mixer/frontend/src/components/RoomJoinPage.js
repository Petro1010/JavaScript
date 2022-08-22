import React from "react";
import { TextField, Button, Grid, Typography} from "@mui/material"
import { Link, useNavigate } from "react-router-dom"

function RoomJoinPage(props){
    const [roomCode, setRoomCode] = React.useState("")
    const [error, setError] = React.useState("")

    const navigate = useNavigate()

    function handleTextFieldChange(e) {
        setRoomCode(e.target.value)
    }

    function handleJoinRequest() {
        //first check if room exists, send the code to the backend
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                code: roomCode
            })
        }

        // send request to API we built and see if room is there
        fetch('/api/joinRoom', options)
            .then((res) => {
                // check if response is okay
                if (res.ok) {
                    navigate(`/room/${roomCode}`)
                } else {
                    // if not set an error
                    setError("Room Not Found")
                }
            }).catch((err) => console.log(err))
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography variant="h4" component='h4'> Join a Room </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <TextField error={error} onChange={handleTextFieldChange} label="Code" placeholder="Enter a Room Code" helperText={error} variant="outlined"/>
            </Grid>
            <Grid item xs={12} align="center">
                <Button variant="contained" color="secondary" onClick={handleJoinRequest}> Join Room </Button>
            </Grid>
            <Grid item xs={12} align="center">
                <Button variant="contained" color="primary" to="/" component={Link}> Go Back </Button>
            </Grid>
        </Grid>
    )
}

export default RoomJoinPage;