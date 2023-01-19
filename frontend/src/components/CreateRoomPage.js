import React from 'react';
import {Link} from 'react-router-dom';
import {FormControlLabel, RadioGroup, Radio, FormControl, FormHelperText, TextField, Typography, Grid, Button, Collapse} from '@material-ui/core/'
import { Alert } from '@material-ui/lab';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';


export default function HomePage(props) {

    const [guestCanPause, setGuestCanPause] = React.useState(true);
    const [votesToSkip, setVotesToSkip] = React.useState(2);
    const [successMsg, setSuccessMsg] = React.useState('');
    const [errorMsg, setErrorMsg] = React.useState('');
    let navigate = useNavigate();

    React.useEffect(()=>{
        if(props.update){
            setGuestCanPause(props.guestCanPause.toString());
            setVotesToSkip(props.votesToSkip);
        }
    },[]);

    function handleVoteChange(e) {
        setVotesToSkip(e.target.value);
    }

    function handleGuestCanPauseChange(e) {
        setGuestCanPause(e.target.value === 'true' ? true : false);
    }

    function handleRoomButtonPressed() {
        if(props.update){
            axios.patch('/api/update-room', {
                code: props.roomCode,
                guest_can_pause: guestCanPause,
                votes_to_skip: votesToSkip,
            }).then((response) => {
                if(response.status === 200){
                    console.log(response);
                    setSuccessMsg('Room updated successfully!');
                    props.updateCallback();
                }else{
                    console.log(response);
                    setErrorMsg('Error updating room...');
                }
            })
        }else{
            axios.post('/api/create-room', {
                guest_can_pause: guestCanPause,
                votes_to_skip: votesToSkip,
            }).then((response) => {
                navigate('/room/' + response.data.code);
            }).catch((error) => {
                alert(error);
            });
        }
        // const requestOptions = {
        //     method: 'POST',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify({
        //         guest_can_pause: guestCanPause,
        //         votes_to_skip: votesToSkip,
        //     }),
        // };
        // fetch('/api/create-room', requestOptions)
        //     .then((response) => response.json())
        //     .then((data) => console.log(data));
    }

    const title = props.update ? "Update Room" : "Create a Room";


    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Collapse in={successMsg != "" || errorMsg != ""}>
                    {
                    successMsg != "" ? <Alert severity="success" onClose={() => {setSuccessMsg('')}}>{successMsg}</Alert>
                     : <Alert severity="error" onClose={() => {setErrorMsg('')}}>{errorMsg}</Alert>
                    }
                </Collapse>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography component="h4" variant="h4"> {title} </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl>
                    <FormHelperText>
                        Guest Control of Playback State
                    </FormHelperText>
                    <RadioGroup row defaultValue={props.update ? props.guestCanPause.toString() : guestCanPause.toString()} onChange={handleGuestCanPauseChange}>
                        <FormControlLabel value="true" control={<Radio color="primary" />} label="Play/Pause" labelPlacement='bottom' />
                        <FormControlLabel value="false" control={<Radio color="secondary" />} label="No Control" labelPlacement='bottom' />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl>
                    <TextField defaultValue={props.update ? props.votesToSkip : votesToSkip} required={true} type="number" inputProps={{ min: 1, style: {textAlign: "center"} }} onChange={handleVoteChange} />
                    <FormHelperText>
                        Votes Required To Skip Song
                    </FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                {
                props.update ? <Button variant="contained" color="secondary" onClick={handleRoomButtonPressed}>Update Room</Button> 
                : <Button variant="contained" color="secondary" onClick={handleRoomButtonPressed}>Create A Room</Button>
                }
            </Grid>
            {
            props.update ? null : <Grid item xs={12} align="center">
                <Button color="primary" variant='contained' to='/' component={Link}>Back</Button>
            </Grid>
            }
        </Grid>
    );
}