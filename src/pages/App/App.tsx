import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Game from '../Game/Game'
import Home from '../Home/Home'

export interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = (props) => {
    return (<BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/game" element={<Game/>}></Route>
        </Routes>
    </BrowserRouter> )
}

export default App