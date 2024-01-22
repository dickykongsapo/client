import { Box, FormLabel, TextField } from '@mui/material';
import './form-input.styles.scss';
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