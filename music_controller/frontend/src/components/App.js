import React, { Component } from 'react';
import { createRoot }  from 'react-dom/client';
import HomePage from './HomePage';

export default function App(props){
    
        return (
            <div className='center' >
                <div>
                    <HomePage />
                </div>
            </div>
        );
}

const appDiv = createRoot(document.getElementById('app'));
appDiv.render(<App />);

