import React, { useImperativeHandle, useState } from 'react';
import { countries } from '../../constantes/countries';

export type CountryRef = {
  getCountry: () => string;
};

type Props = {
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
};

const AutoComplitInput = React.forwardRef<CountryRef, Props>(
  ({ value, onChange, onBlur }, ref) => {
    const [country, setCountry] = useState(value || '');
    const [filteredCountries, setFilteredCountries] = useState(['']);

    const handleCountryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setCountry(value);

      const filtered = countries.filter((country) =>
        country.toLowerCase().startsWith(value.toLowerCase())
      );

      setFilteredCountries(filtered);

      onChange && onChange(value);
    };

    useImperativeHandle(ref, () => ({
      getCountry: () => country,
    }));
    return (
      <>
        <label htmlFor="country">Country</label>
        <input
          id="country"
          type="text"
          value={country}
          onChange={handleCountryChange}
          onBlur={onBlur}
          list="countries"
        />
        <datalist id="countries">
          {filteredCountries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
      </>
    );
  }
);

export default AutoComplitInput;
