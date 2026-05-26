import PhoneInput, { type Value } from 'react-phone-number-input';

type PhoneInputFieldProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
};

export function PhoneInputField({ id, value, onChange, required }: PhoneInputFieldProps) {
  return (
    <PhoneInput
      id={id}
      international
      defaultCountry="PK"
      countryCallingCodeEditable={false}
      value={value as Value}
      onChange={(val) => onChange(val ?? '')}
      required={required}
      className="phone-input-dark"
      numberInputProps={{
        className: 'PhoneInputInput',
        name: 'phone',
        required,
      }}
    />
  );
}
