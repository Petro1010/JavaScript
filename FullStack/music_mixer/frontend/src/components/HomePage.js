import React from "react";
import { BrowserRouter as Router, Route ,Link, Routes, useNavigate, Navigate} from "react-router-dom";
import CreateRoomPage from "./CreateRoomPage";
import RoomJoinPage from "./RoomJoinPage";
import RoomPage from "./RoomPage";
import { Grid, Button, ButtonGroup, Typography} from "@mui/material"

function HomePage(){
    const [roomCode, setRoomCode] = React.useState(null)

    //onst navigate = useNavigate()

    // As soon as homepage load we needs to check if they are in a room
    React.useEffect(() => {
        //async func so it is not waited on
        async function autoEnter(){
            fetch('/api/userInRoom')
                .then((res) => res.json())
                .then((data) => {
                    setRoomCode(data.code)
                })
        }
        autoEnter()
    }, [])

    // reset room code to stop redirecting back to a non existent room when leaving a room
    function clearRoomCode(){
        setRoomCode(null)
    }

    return (
        <div>
            <Router>
                <Routes>
                    {/* If we retrieve a roomCode, then redirect to the room, otherwise start at homepage */}
                    <Route exact path="/" element={ roomCode ? <Navigate replace to={`/room/${roomCode}`} /> : (
                        <Grid container spacing={3}>
                            <Grid item xs={12} align="center">
                                <Typography variant="h3" compact="h3"> Music Mixer </Typography>
                            </Grid>
                            <Grid item xs={12} align="center">
                                <ButtonGroup disableElevation variant="contained" color="primary">
                                    <Button color="primary" to='/joinRoom' component={Link}> Join Room </Button>
                                    <Button color="secondary" to='/createRoom' component={Link}> Create Room </Button>
                                </ButtonGroup>
                            </Grid>
                        </Grid>)
                    }/>
                    <Route exact path="/createRoom" element={<CreateRoomPage />} />
                    <Route exact path="/joinRoom" element={<RoomJoinPage />} />
                    <Route exact path='/room/:roomCode' element={<RoomPage leaveRoomCallback={clearRoomCode} />} />
                </Routes>
            </Router>
        </div>
    )
}

export default HomePage;