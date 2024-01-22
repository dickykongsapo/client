import { createTheme, GlobalStyles, Theme, ThemeProvider } from "@mui/material"
import { blue, purple } from "@mui/material/colors";
import { Store } from "@reduxjs/toolkit";
import { useEffect, useState } from "react"
import { connect, useStore } from "react-redux";
import { AppState } from "@app/core/core.state";



export const ThemeProviderCustomized = (props) => {
    const { color } = props
    const defaultTheme = createTheme({
        palette: {
            primary: {
                main: color ? color : '#2397c5',
            },
        },
    });
    return <ThemeProvider theme={defaultTheme} />
}



const GlobalStyle = (props) => {
    const { color } = props
    console.log(props)
    return <GlobalStyles
        styles={{
            '.mui-header': { backgroundColor: color ? color : '#2397c5' },
            '.mui-button': {
                backgroundColor: color ? `${color} !important` : '#2397c5 !important',
                // color: 'white !important',
                '&.reset': {
                    backgroundColor: 'transparent !important',
                    color: color ? `${color} !important` : '#2397c5 !important',
                }
            },
            '.mui-list': {
                height: 'inherit !important',
                backgroundColor: color ? `${color} !important` : '#2397c5 !important',
            }
        }} />
}


const mapStateToProps = (state) => {
    return {
        color: state.whiteLabel.whiteLabel.color
    }
}

export default connect(mapStateToProps)(GlobalStyle);