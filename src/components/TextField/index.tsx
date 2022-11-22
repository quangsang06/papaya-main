import { FormControl, OutlinedInputProps, TextField, Typography } from '@mui/material';
import { InputHTMLAttributes } from 'react';
import { useController } from 'react-hook-form';

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: any;
  label?: string | React.ReactNode;
  multiline?: boolean;
  rows?: number;
  disabled?: boolean;
  type?: string;
  inputLabel?: string;
  inputProps?: Partial<OutlinedInputProps>;
}

export function InputField({
  name,
  control,
  rows,
  multiline,
  disabled,
  label,
  inputProps,
  type,
  inputLabel,
}: InputFieldProps) {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  return (
    <FormControl disabled={disabled} fullWidth variant="outlined" margin="normal" size="small" error={invalid}>
      <Typography sx={{ py: 1 }}>{label}</Typography>
      <TextField
        fullWidth
        type={type}
        size="small"
        multiline={multiline}
        rows={rows}
        label={inputLabel}
        autoComplete="off"
        onChange={onChange}
        value={value}
        onBlur={onBlur}
        variant="outlined"
        inputRef={ref}
        disabled={disabled}
        error={invalid}
        helperText={error?.message}
        InputProps={inputProps}
      />
    </FormControl>
  );
}
