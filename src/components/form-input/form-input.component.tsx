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
import { Box, FormLabel, TextField } from '@mui/material';
import '@components/form-input/form-input.styles.scss';
type FormInputProps = {
    label: string;
    [key: string]: any;
};
function FormInput(props: FormInputProps) {
    const { label, ...otherProps } = props
    return (

        <Box
            component='span'
            sx={{
                '& > :not(style)': { width: '380px', mt: 2, mb: 2 },
            }}
        >
            <TextField id={label} label={label} variant="standard" {...otherProps} />

        </Box>

    );
};

export default FormInput;