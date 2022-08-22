import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Grid, Button, Typography} from "@mui/material"
import CreateRoomPage from "./CreateRoomPage";
import MusicPlayer from "./MusicPlayer";

function RoomPage(props){
    const [votesToSkip, setVotesToSkip] = React.useState(2)
    const [guestCanPause, setGuestCanPause] = React.useState(false)
    const [isHost, setIsHost] = React.useState(false)
    const [showSettings, setShowSettings] = React.useState(false)
    const [spotifyAuthenicated, setSpotifyAuthenticated] = React.useState(false)
    const [song, setSong] = React.useState({})

    const { roomCode } = useParams()
    const navigate = useNavigate()

    // send request to back end for information about the room
    React.useEffect(() => {
        fetch(`/api/getRoom?code=${roomCode}`)
            .then(res => {
                // If a bad response is given, instead of trying to render just redirect back to Home page
                if (!res.ok) {
                    props.leaveRoomCallback()
                    navigate('/')
                }
                return res.json()})
            .then(data => {
                setVotesToSkip(data.votes_to_skip)
                setGuestCanPause(data.guest_can_pause)
                setIsHost(data.is_host)

                // authenticate spotify, cant use our state isHost as that is not updated until after using the use effect
                if (data.is_host){
                    authenitcateSpotify()
                }
            })
            
    }, [roomCode, showSettings]) //when settings are closed, get the info from the api

    // upon render, start an interval and pull the song info every 1 s
    React.useEffect(() => {
        let interval = setInterval(getCurrentSong, 1000)
        return () => {
            // componentwillunmount in functional component.
            // Anything in here is fired on component unmount.
            clearInterval(interval)
        }
    }, [])

    function authenitcateSpotify(){
        fetch('/spotify/isAuth')
            .then((res) => res.json())
            .then((data) => {
                setSpotifyAuthenticated(data.status) // get boolean regarding authentication
                // if not authenticated
                if (!data.status){
                    fetch('/spotify/getAuthURL')
                        .then((res) => res.json())
                        .then((data) => {
                            // get the url and allow user to authenticate
                            window.location.replace(data.url)
                        })
                }
            })
    }

    // get the song playing
    function getCurrentSong(){
        console.log("wtf")
        fetch('/spotify/currSong')
            .then(res => {
                if (!res.ok){
                    console.log('something is wrong')
                    return {}
                } else {
                    console.log('things are ight')
                    return res.json()
                }
            }).then(data => {
                console.log(data)
                setSong(data)})
    }

    function leaveRoom(){
        // call endpoint to allow user to leave the room
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        }

        // Once we are disassiciated with the room, we can go back to the home page without being redirected
        fetch('/api/leaveRoom', options)
            .then((_res) => {
                props.leaveRoomCallback()
                navigate(`/`)})
    }

    function toggleSettings(){
        setShowSettings((prev) => !prev)
    }

    return (
        <>
        {showSettings ?
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <CreateRoomPage update={true} votesToSkip={votesToSkip} guestCanPause={guestCanPause} roomCode={roomCode} />
                </Grid>
                <Grid item xs={12} align="center">
                    <Button color='primary' variant="contained" onClick={toggleSettings}> Close </Button>
                </Grid>
            </Grid>
            :
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography variant="h4" component="h4">
                        Code: {roomCode}
                    </Typography>
                </Grid>
                <MusicPlayer {...song} />
                {isHost ? 
                    <Grid item xs={12} align='center'>
                        <Button color="secondary" variant="contained" onClick={toggleSettings}>
                            Settings
                        </Button>
                    </Grid> : <></>}
                <Grid item xs={12} align="center">
                    <Button color='primary' variant="contained" onClick={leaveRoom}> Leave Room </Button>
                </Grid>
                
            </Grid>
        }
        </>
        
    )
}

export default RoomPage;