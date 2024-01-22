import { createTheme, ThemeProvider } from "@mui/material";
import { red } from "@mui/material/colors";
import { connect, useStore } from "react-redux";

const GlobalTheme = (props) => {
    const { colorMode, whiteLabelColor } = props
    console.log(colorMode)

    return <ThemeProvider
        theme={
            createTheme({
                components: {
                    MuiDrawer: {
                        styleOverrides: {
                            paper: {
                                background: colorMode == 'light' ? (whiteLabelColor ? whiteLabelColor : '#2397c5') : 'dark',
                                color: 'white',

                            }
                        }
                    },
                    MuiTypography: {
                        styleOverrides: {

                            // root: {
                            //     color: colorMode == 'light' ? (whiteLabelColor ? whiteLabelColor : '#2397c5') : 'dark',
                            // },
                        }
                    }

                },

                palette: {
                    mode: colorMode ? colorMode : 'light',

                    primary: {
                        main: whiteLabelColor ? whiteLabelColor : '#2397c5',
                    },

                },
            })
        } >
        {props.children}
    </ThemeProvider>

}
// let defaultTheme = createTheme({
//     palette: {
//         secondary: {
//             main: purple[500],
//         },
//         primary: {
//             main: whiteLabel.color ? whiteLabel.color : blue[500],
//         },
//     },
// });

const mapStateToProps = (state) => {
    return {
        colorMode: state.settings.colorMode,
        whiteLabelColor: state.whiteLabel.whiteLabel.color
    }
}

export default connect(mapStateToProps)(GlobalTheme);