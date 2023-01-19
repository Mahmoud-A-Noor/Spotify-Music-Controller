import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import RoomJoinPage from './RoomJoinPage';
import CreateRoomPage from './CreateRoomPage';
import Room from './Room';
import axios from 'axios';
import RenderHomePage from './RenderHomePage';


export default function HomePage(props) {

    const [roomCode, setRoomCode] = React.useState(null);

    React.useEffect(()=>{
        axios.get('/api/user-in-room')
        .then((response) => {
            setRoomCode(response.data.code);
        }).catch((error) => {
            alert(error);
        });
    }, []);

    function clearRoomCode(){
        setRoomCode(null);
    }


    return (
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={roomCode ? <Navigate to={`/room/${roomCode}`} /> : <RenderHomePage />} />
                <Route path='/join' element={<RoomJoinPage />} />
                <Route path='/create' element={<CreateRoomPage />} />
                <Route path='/room/:roomCode' element={<Room clearRoomCodeInHomePage={clearRoomCode} />} />
            </Routes>
        </BrowserRouter>
    );
}