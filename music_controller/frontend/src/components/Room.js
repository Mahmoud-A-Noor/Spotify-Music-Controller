import React from "react";
import { useParams } from 'react-router-dom'
import { Grid, Typography, Button } from "@material-ui/core";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CreateRoomPage from "./CreateRoomPage";
import MusicPlayer from "./MusicPlayer";

export default function Room(props) {

    const [isHost, setIsHost] = React.useState(false);
    const [guestCanPause, setGuestCanPause] = React.useState(false);
    const [votesToSkip, setVotesToSkip] = React.useState(2);
    const [showSettings, setShowSettings] = React.useState(false);
    const [spotifyAuthenticated, setSpotifyAuthenticated] = React.useState(false);
    const [song, setSong] = React.useState({});
    const roomCode = useParams().roomCode;
    let navigate = useNavigate();

    function getRoomDetails(){
        fetch('/api/get-room' + '?code=' + roomCode)
            .then((response) => {
                if(!response.ok){
                    props.clearRoomCodeInHomePage()
                    navigate('/');
                }
                return response.json()
            })
            .then((data) => {
                setGuestCanPause(data.guest_can_pause);
                setVotesToSkip(data.votes_to_skip);
                setIsHost(data.is_host);
                if (data.is_host){
                    if (!spotifyAuthenticated){
                        authenticateSpotify();
                    }
                }
            }).catch((error) => {
                alert(error);
            });
        }

    React.useEffect(()=>{
        getRoomDetails();
        let interval = setTimeout(getCurrentSong, 1000);

        return ()=>{
            clearTimeout(interval);
        }
    });

    function updateShowSettings(value){
        setShowSettings(value);
    }

    function renderSettingsButton(){
        return (
            <Grid item xs={12} align="center">
                <Button variant="contained" color="primary" onClick={() => updateShowSettings(true)}>
                    Settings
                </Button>
            </Grid>
        );
    }

    function renderSettings(){
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <CreateRoomPage update={true} votesToSkip={votesToSkip} guestCanPause={guestCanPause} roomCode={roomCode} updateCallback={getRoomDetails} />
                </Grid>
                <Grid item xs={12} align="center">
                    <Button variant="contained" color="primary" onClick={() => updateShowSettings(false)}>
                        Close
                    </Button>
                </Grid>
            </Grid>
        );
    }
                    

    function LeaveButtonPressed(){
        axios.post('/api/leave-room')
        .then((response) => {
            props.clearRoomCodeInHomePage()
            navigate('/');
        }).catch((error) => {
            alert(error);
        });
    }

    function authenticateSpotify(){
        axios.get('/spotify/is-authenticated')
        .then((response) => {
            if(response.data.status){
                setSpotifyAuthenticated(true);
                navigate('/room/' + roomCode);
            }else{
                axios.get('/spotify/get-auth-url')
                .then((response) => {
                    window.location.replace(response.data.url);
                }).catch((error) => {
                    alert(error);
                });
            }
        }).catch((error) => {
            alert(error);
        });
    }

    function getCurrentSong(){
        axios.get('/spotify/current-song')
        .then((response) => {
            setSong(response.data);
        }).catch((error) => {
            alert(error);
        });
    }


    if (showSettings){
        return renderSettings();
    }
    return (

        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography variant="h4" component="h4">
                    Code: {roomCode}
                </Typography>
            </Grid>
            <MusicPlayer {...song} />
            <Grid item xs={12} align="center">
                <Typography variant="h6" component="h6">
                        Is Host: {isHost.toString()}
                </Typography>
            </Grid>
            {isHost ? renderSettingsButton() : null}
            <Grid item xs={12} align="center">
                <Button color="secondary" variant='contained' onClick={LeaveButtonPressed} >
                    Leave Room
                </Button>
            </Grid>
                
        </Grid>
    );
}