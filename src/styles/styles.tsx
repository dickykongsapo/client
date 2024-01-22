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

import { createTheme, GlobalStyles, ThemeProvider } from "@mui/material"
import { connect } from "react-redux";



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