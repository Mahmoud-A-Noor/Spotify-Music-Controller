import React from 'react';
import {TextField, Typography, Grid, Button} from '@material-ui/core/'
import {Link} from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function HomePage(props) {

    const [roomCode, setRoomCode] = React.useState('');
    const [error, setError] = React.useState('');
    let navigate = useNavigate();

    function handleTextFieldChange(e) {
        setRoomCode(e.target.value);
    }

    function handleButtonPressed(){
        axios.post('/api/join-room', {
            code: roomCode,
        }).then((response) => {
            if(response.status === 200){
                navigate('/room/' + roomCode);
            }else{
                setError(response.data.message);
            }
        }).catch((error) => {
            setError(response.data.message);
            alert(error);
        });
    }

    return (
        <Grid container spacing={1} >
            <Grid item xs={12} align="center">
                <Typography component="h4" variant="h4"> Join A Room </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <TextField label="Code" placeholder="Enter A Room Code" variant="outlined" value={roomCode} helperText={error} onChange={handleTextFieldChange} ></TextField>
            </Grid>
            <Grid item xs={12} align="center">
                <Button variant='contained' color="secondary" onClick={handleButtonPressed}>Enter Room</Button>
            </Grid>
            <Grid item xs={12} align="center">
                <Button color="primary" variant='contained' to='/' component={Link}>Back</Button>
            </Grid>
        </Grid>
    );
}