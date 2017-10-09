import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Layout from './Views/Layout'

export default class App extends React.Component {
    render() {
        return (
            <BrowserRouter basename="/fantasy-layers/docs">
                <Layout/>
            </BrowserRouter>
        )
    }
}
