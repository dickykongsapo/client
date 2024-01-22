/*
 * Copyright © 2016-2021 The Thingsboard Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Box, Button, FormControl, FormControlLabel, FormHelperText, FormLabel, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Store } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch, useStore } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { AppState } from "@app/core/core.state";
import { ActionLoadWhiteLabel } from "@app/core/white-label/white-label.actions";
import { WhiteLabel } from "@models/white-label.model";
import { WhiteLabelService } from "@app/core/services/white-label.service";
import FormInput from "@components/form-input/form-input.component";
import * as Yup from 'yup';
import '@components/white-label-form/white-label-form.styles.scss'
import { Formik, Form as FormikForm, Field, useFormik } from "formik";
import ImageInput from "@components/image-input/image-input.component";
import { sampleColors } from "@assets/sample-color";
import { useTranslation } from "react-i18next";

const defaultFormFields = {
    title: '',
    logo: '',
    icon: '',
    color: '#2397c5',
    height: 0
};


const WhiteLabelForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const whiteLabelService = new WhiteLabelService();
    const store: Store<AppState> = useStore();
    const dispatch = useDispatch();
    const authUser = store.getState().auth.authUser
    const whiteLabel = store.getState().whiteLabel.whiteLabel
    const notify = (message: string) => toast.success(message);
    const { t, i18n } = useTranslation();

    useEffect(() => {
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

    }

    const validationSchema = Yup.object().shape({
        title: Yup.string(),
        // icon: Yup.string(),
        // logo: Yup.string(),
        height: Yup.number().nullable()
            .max(64, 'Logo height cannot be larger than 64px.').min(0, 'Logo height cannot be lower than 0px.'),
        color: Yup.string().required('Required')
    })


    const formik = useFormik({
        initialValues: formFields,
        validationSchema: validationSchema,
        enableReinitialize: true,

        onSubmit: async (values) => {
            try {
                const whiteLabel: WhiteLabel = {
                    title: values.title,
                    logo: values.logo,
                    height: values.height,
                    icon: values.icon,
                    color: values.color
                }
                await whiteLabelService.setWhiteLabel(whiteLabel, authUser.tenantId).subscribe((whiteLabel) => {

                    dispatch(ActionLoadWhiteLabel(whiteLabel))
                    setFormFields(values)
                    notify(t('event.success'))

                }
                )
            } catch (error: any) {
                console.log(error)
            }
        },
        // onReset: async (values) => {
        //     console.log(values)
        //     setFormFields(whiteLabel)

        //     // formik.setFieldValue('title', defaultFormFields.title)
        //     // formik.setFieldValue('logo', defaultFormFields.logo)
        //     // formik.setFieldValue('height', defaultFormFields.height)
        //     // formik.setFieldValue('icon', defaultFormFields.icon)
        //     // formik.setFieldValue('color', defaultFormFields.color)

        // }
    });

    const handleClick = (e) => {
        e.preventDefault();
        setFormFields(defaultFormFields)
        formik.setFieldValue('title', defaultFormFields.title)
        formik.setFieldValue('logo', defaultFormFields.logo)
        formik.setFieldValue('height', defaultFormFields.height)
        formik.setFieldValue('icon', defaultFormFields.icon)
        formik.setFieldValue('color', defaultFormFields.color)

    }

    return (
        <div className='white-label-container'>
            <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                <FormInput
                    fullWidth
                    id="title"
                    name="title"
                    label={t('white-labeling.application-title')}
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                />
                <FormInput
                    label={t('white-labeling.logo-height')}
                    type='number'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name='height'
                    value={formik.values.height}
                    placeholder='Enter the logo height, betwwen 0 and 64.'
                    InputProps={{
                        inputProps: {
                            max: 64, min: 0
                        }
                    }}
                    error={Boolean(formik.errors.height)}
                    helperText={formik.errors.height}
                />
                <FormControl
                    sx={{
                        width: '380px'
                    }}>
                    <FormLabel
                        sx={{
                            fontSize: '12px'
                        }}>{t('white-labeling.website-icon')}</FormLabel>

                    <ImageInput setFieldValue={formik.setFieldValue} onBlur={formik.handleBlur}
                        instruction={t('white-labeling.drop-icon-image')}
                        size={256000}
                        name={'icon'} value={formik.values.icon} />
                </FormControl>
                <FormControl
                    sx={{
                        width: '380px'
                    }}>
                    <FormLabel
                        sx={{
                            fontSize: '12px'
                        }}>{t('white-labeling.logo')}</FormLabel>

                    <ImageInput setFieldValue={formik.setFieldValue} onBlur={formik.handleBlur}
                        instruction={t('white-labeling.drop-logo-image')}
                        size={4000000}

                        name={'logo'} value={formik.values.logo} />
                </FormControl>
                <FormControl
                    sx={{
                        width: '380px'
                    }}>
                    <FormLabel
                        sx={{
                            fontSize: '12px'
                        }}>{t('white-labeling.theme-color')}</FormLabel>


                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={formik.values.color}
                        name='color'
                        onChange={formik.handleChange}
                        sx={{
                            backgroundColor: formik.values.color
                        }}
                    >

                        {sampleColors.map((sampleColor, key) =>
                            <MenuItem
                                value={sampleColor.color}
                                key={key}
                                sx={{
                                    backgroundColor: sampleColor.color,
                                    color: 'inherit',
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

                <Button variant="contained" fullWidth type="submit" disabled={!formik.isValid}>
                    {t('action.save')}
                </Button>
                <Button variant="outlined" fullWidth type="reset">
                    {t('action.discard-changes')}
                </Button>
                <Button variant="outlined" fullWidth onClick={handleClick}>
                    {t('action.delete')}
                </Button>
            </form>

            {/*  */}

            {/*  */}
        </div>

    )
}

export default WhiteLabelForm;

