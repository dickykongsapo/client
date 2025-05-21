///
/// Copyright © 2016-2021 The Thingsboard Authors
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///     http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
///


import { createTheme, ThemeProvider } from "@mui/material";
import { connect } from "react-redux";

const GlobalTheme = (props) => {
    const { colorMode, whiteLabelColor } = props
    console.log(colorMode)
    console.log(whiteLabelColor)
    return <ThemeProvider
        theme={
            createTheme({
                components: {
                    MuiDrawer: {
                        styleOverrides: {
                            paper: {
                                background: colorMode == 'light' ? (whiteLabelColor ? whiteLabelColor : '#2397c5') : 'dark',
                                // color: 'inherit',

                            }
                        }
                    },
                    MuiTypography: {
                        styleOverrides: {

                            root: {
                                color: colorMode == 'light' ? 'inheirt' : 'white',
                            },
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