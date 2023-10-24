import { Label } from "@mui/icons-material";
import { Box, FormControl, FormControlLabel, FormHelperText, FormLabel, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Store } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch, useStore } from "react-redux";
import { ToastContainer } from "react-toastify";
import { sample } from "rxjs";
import { AppState } from "src/app/core/core.state";
import { ActionLoadWhiteLabel } from "src/app/core/white-label/white-label.actions";
import { WhiteLabel } from "src/models/white-label.model";
import { WhiteLabelService } from "src/services/white-label.service";
import ThemedButton from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import * as Yup from 'yup';
import './white-label-form.styles.scss'
import { Formik } from "formik";

const defaultFormFields = {
    title: '',
    logo: '',
    icon: '',
    color: '#2397c5',
    height: 0
};

interface colorSelect {
    name: string;
    color: string;
}

const sampleColors: colorSelect[] = [
    { name: 'Default', color: '#2397c5' },
    { name: 'Fuchsia', color: '#FF00FF' },
    { name: 'Crimson', color: '#DC143C' },
    { name: 'MediumVioletRed', color: '#C71585' },
    { name: 'DeepPink', color: '#FF1493' },
    { name: 'HotPink', color: '#FF69B4' },
    { name: 'PaleVioletRed', color: '#DB7093' },
    { name: 'LightPink', color: '#FFB6C1' },
    { name: 'Pink', color: '#FFC0CB' },
    { name: 'Thistle', color: '#D8BFD8' },
    { name: 'Plum', color: '#DDA0DD' },
    { name: 'Violet', color: '#EE82EE' },
    { name: 'Orchid', color: '#DA70D6' },
    { name: 'MediumOrchid', color: '#BA55D3' },
    { name: 'DarkMagenta', color: '#8B008B' },
    { name: 'DarkViolet', color: '#9400D3' },
    { name: 'DarkOrchid', color: '#9932CC' },
    { name: 'BlueViolet', color: '#8A2BE2' },
    { name: 'MediumPurple', color: '#9370DB' },
    { name: 'MediumSlateBlue', color: '#7B68EE' },
    { name: 'SlateBlue', color: '#6A5ACD' },
    { name: 'LightSteelBlue', color: '#B0C4DE' },
    { name: 'LightBlue', color: '#ADD8E6' },
    { name: 'PowderBlue', color: '#B0E0E6' },
    { name: 'SkyBlue', color: '#87CEEB' },
    { name: 'LightSkyBlue', color: '#87CEFA' },
    { name: 'Turquoise', color: '#40E0D0' },
    { name: 'MediumTurquoise', color: '#48D1CC' },
    { name: 'MediumAquaMarine', color: '#66CDAA' },
    { name: 'CadetBlue', color: '#5F9EA0' },
    { name: 'SlateGray', color: '#708090' },
    { name: 'LightSlateGrey', color: '#778899' },
    { name: 'CornflowerBlue', color: '#6495ED' },
    { name: 'SteelBlue', color: '#4682B4' },
    { name: 'RoyalBlue', color: '#4169E1' },
    { name: 'DodgerBlue', color: '#1E90FF' },
    { name: 'DeepSkyBlue', color: '#00BFFF' },
    { name: 'DarkTurquoise', color: '#00CED1' },
    { name: 'LightSeaGreen', color: '#20B2AA' },
    { name: 'DarkCyan', color: '#008B8B' },
    { name: 'Teal', color: '#008080' },
    { name: 'SeaGreen', color: '#2E8B57' },
    { name: 'MediumSeaGreen', color: '#3CB371' },
    { name: 'LimeGreen', color: '#32CD32' },
    { name: 'ForestGreen', color: '#228B22' },
    { name: 'Green', color: '#008000' },
    { name: 'DarkGreen', color: '#006400' },
    { name: 'DarkOliveGreen', color: '#556B2F' },
    { name: 'OliveDrab', color: '#6B8E23' },
    { name: 'Olive', color: '#808000' },
    { name: 'SaddleBrown', color: '#8B4513' },
    { name: 'Sienna', color: '#A0522D' },
    { name: 'Brown', color: '#A52A2A' },
    { name: 'FireBrick', color: '#B22222' },
    { name: 'DarkRed', color: '#8B0000' },
    { name: 'DimGray', color: '#696969' },
    { name: 'Gray', color: '#808080' },
    { name: 'DarkGoldenRod', color: '#B8860B' },
    { name: 'DarkOrange', color: '#FF8C00' },
    { name: 'Orange', color: '#FFA500' },
    { name: 'GoldenRod', color: '#DAA520' },
    { name: 'Peru', color: '#CD853F' },
    { name: 'Chocolate', color: '#D2691E' },
    { name: 'IndianRed', color: '#CD5C5C' },
    { name: 'RosyBrown', color: '#BC8F8F' },
    { name: 'DarkGrey', color: '#A9A9A9' },
    { name: 'Silver', color: '#C0C0C0' },
    { name: 'PeachPuff', color: '#FFDAB9' },
    { name: 'Red', color: '#FF0000' },
    { name: 'OrangeRed', color: '#FF4500' },
    { name: 'Tomato', color: '#FF6347' },
    { name: 'Coral', color: '#FF7F50' },
    { name: 'Salmon', color: '#FA8072' },
    { name: 'LightCoral', color: '#F08080' },
    { name: 'DarkSalmon', color: '#E9967A' },
    { name: 'LightSalmon', color: '#FFA07A' },
    { name: 'SandyBrown', color: '#F4A460' },
    { name: 'BurlyWood', color: '#DEB887' },
    { name: 'Tan', color: '#D2B48C' },
    { name: 'DarkKhaki', color: '#BDB76B' },
    { name: 'YellowGreen', color: '#9ACD32' },
    { name: 'DarkSeaGreen', color: '#8FBC8F' },
]


const WhiteLabelForm = (props) => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { title, logo, height, icon, color } = formFields;
    const whiteLabelService = new WhiteLabelService();
    const store: Store<AppState> = useStore();
    const dispatch = useDispatch();
    const authUser = store.getState().auth.authUser
    const handleChange = (event: any) => {
        const { name, value } = event.target;


        setFormFields({ ...formFields, [name]: value });

    };

    const handleReset = (event: any) => {
        setFormFields(defaultFormFields)
    }

    useEffect(() => {
        const whiteLabel = store.getState().whiteLabel.whiteLabel
        if (whiteLabel) {
            setFormFields({
                title: whiteLabel.title,
                logo: whiteLabel.logo,
                icon: whiteLabel.icon,
                height: whiteLabel.height,
                color: whiteLabel.color
            })
        }
    }, [])

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            const whiteLabel: WhiteLabel = {
                title: title,
                logo: logo,
                height: height,
                icon: icon,
                color: color
            }
            await whiteLabelService.setWhiteLabel(whiteLabel, authUser.tenantId).subscribe((whiteLabel) =>
                dispatch(ActionLoadWhiteLabel(whiteLabel))
            )
        } catch (error: any) {
            console.log(error)
        }

    }

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Required'),
        icon: Yup.string().required('Required'),
        logo: Yup.string().required('Required'),
        height: Yup.number().required('Required'),
        color: Yup.string().required('Required')
    })


    return (
        <div className='white-label-container'>
            {/* <Formik initialValues={defaultFormFields}
                onSubmit={handleSubmit}
                onReset={handleReset}
                validationSchema={validationSchema}
            >
                            </Formik> */}

            <form onSubmit={handleSubmit} onReset={handleReset}>

                {/* <button onClick={notify}>Notify!</button> */}
                <ToastContainer />

                <FormInput
                    label='Application Title'
                    type='title'
                    onChange={handleChange}
                    name='title'
                    value={title}
                />
                <FormInput
                    label='Height'
                    type='number'
                    onChange={handleChange}
                    name='height'
                    value={height}
                    InputProps={{
                        inputProps: {
                            max: 64, min: 0
                        }
                    }}
                    helperText={{}}
                />
                {/* <Box
                    component='span'
                    sx={{
                        '& > :not(style)': { width: '380px', mt: 2, mb: 2 },
                    }}
                >
                    <TextField
                        id={'Height'}
                        label={'Height'}
                        value={height}
                        onChange={handleChange}
                        InputProps={{
                            inputProps: {
                                max: 64, min: 0
                            }
                        }}
                    />
                </Box> */}
                <FormControl
                    sx={{
                        width: '380px'
                    }}>
                    <FormLabel
                        sx={{
                            fontSize: '12px'
                        }}>Color</FormLabel>


                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={color}
                        name='color'
                        onChange={handleChange}
                        sx={{
                            backgroundColor: color
                        }}
                    >

                        {sampleColors.map((sampleColor, key) =>
                            <MenuItem
                                value={sampleColor.color}
                                key={key}
                                sx={{
                                    backgroundColor: sampleColor.color,
                                    "&.MuiMenuItem-root:hover": {
                                        backgroundColor: sampleColor.color
                                    },
                                    '&.Mui-selected': {
                                        backgroundColor: sampleColor.color
                                    },
                                    height: 50
                                }}>
                                {sampleColor.name}
                            </MenuItem>

                        )}
                    </Select>
                </FormControl>
                <div className='buttons-container'>
                    <ThemedButton type='submit' word='Save' />
                    <ThemedButton type='reset' word='Reset' />
                    {/* <Button type='submit'>Sign In</Button> */}
                </div>
            </form>

        </div>

    )
}

export default WhiteLabelForm;


// <form onSubmit={handleSubmit} onReset={handleReset}>

// {/* <button onClick={notify}>Notify!</button> */}
// <ToastContainer />

// <FormInput
//     label='Application Title'
//     type='title'
//     onChange={handleChange}
//     name='title'
//     value={title}
// />
// <FormInput
//     label='Height'
//     type='number'
//     onChange={handleChange}
//     name='height'
//     value={height}
//     InputProps={{
//         inputProps: {
//             max: 64, min: 0
//         }
//     }}
//     helperText={{}}
// />
// {/* <Box
//     component='span'
//     sx={{
//         '& > :not(style)': { width: '380px', mt: 2, mb: 2 },
//     }}
// >
//     <TextField
//         id={'Height'}
//         label={'Height'}
//         value={height}
//         onChange={handleChange}
//         InputProps={{
//             inputProps: {
//                 max: 64, min: 0
//             }
//         }}
//     />
// </Box> */}
// <FormControl
//     sx={{
//         width: '380px'
//     }}>
//     <FormLabel
//         sx={{
//             fontSize: '12px'
//         }}>Color</FormLabel>


//     <Select
//         labelId="demo-simple-select-helper-label"
//         id="demo-simple-select-helper"
//         value={color}
//         name='color'
//         onChange={handleChange}
//         sx={{
//             backgroundColor: color
//         }}
//     >

//         {sampleColors.map((sampleColor, key) =>
//             <MenuItem
//                 value={sampleColor.color}
//                 key={key}
//                 sx={{
//                     backgroundColor: sampleColor.color,
//                     "&.MuiMenuItem-root:hover": {
//                         backgroundColor: sampleColor.color
//                     },
//                     '&.Mui-selected': {
//                         backgroundColor: sampleColor.color
//                     },
//                     height: 50
//                 }}>
//                 {sampleColor.name}
//             </MenuItem>

//         )}
//     </Select>
// </FormControl>
// <div className='buttons-container'>
//     <ThemedButton type='submit' word='Save' />
//     <ThemedButton type='reset' word='Reset' />
//     {/* <Button type='submit'>Sign In</Button> */}
// </div>
// </form>