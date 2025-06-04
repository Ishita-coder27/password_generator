import React, { useState } from 'react';
import './App.css';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Minimum 4 characters')
    .max(16, 'Maximum 16 characters')
    .required('Password length is required'),
});

function App() {
  const [password, setPassword] = useState('');
  const [isPassGenerated, setIsPassGenerated] = useState(false);
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const generatePasswordString = (passwordLength) => {
    let characterList = '';
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const digitChars = '0123456789';
    const specialChars = '!@#$%^&*()_+';

    if (upperCase) characterList += upperCaseChars;
    if (lowerCase) characterList += lowerCaseChars;
    if (numbers) characterList += digitChars;
    if (symbols) characterList += specialChars;

    if (characterList.length === 0) {
      alert('Please select at least one character set');
      return;
    }

    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.floor(Math.random() * characterList.length);
      result += characterList.charAt(characterIndex);
    }

    setPassword(result);
    setIsPassGenerated(true);
  };

  const resetForm = () => {
    setPassword('');
    setIsPassGenerated(false);
    setLowerCase(true);
    setUpperCase(false);
    setNumbers(false);
    setSymbols(false);
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: { passwordLength: '' },
    validationSchema: PasswordSchema,
    onSubmit: (values) => {
      generatePasswordString(+values.passwordLength);
    },
  });

  return (
    <div className="container">
      <h1>Password Generator</h1>
      <p className="caption">This is Ishita's Password Generator🎀</p>
      <form onSubmit={formik.handleSubmit}>
        <div className="input-group">
          <label>Password Length:</label>
          <input
            type="number"
            name="passwordLength"
            onChange={formik.handleChange}
            value={formik.values.passwordLength}
            placeholder="e.g. 8"
          />
          {formik.touched.passwordLength && formik.errors.passwordLength && (
            <div className="error">{formik.errors.passwordLength}</div>
          )}
        </div>

        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={lowerCase}
              onChange={() => setLowerCase(!lowerCase)}
            />
            Include Lowercase
          </label>
          <label>
            <input
              type="checkbox"
              checked={upperCase}
              onChange={() => setUpperCase(!upperCase)}
            />
            Include Uppercase
          </label>
          <label>
            <input
              type="checkbox"
              checked={numbers}
              onChange={() => setNumbers(!numbers)}
            />
            Include Numbers
          </label>
          <label>
            <input
              type="checkbox"
              checked={symbols}
              onChange={() => setSymbols(!symbols)}
            />
            Include Symbols
          </label>
        </div>

        <div className="button-group">
          <button type="submit" disabled={!formik.isValid}>Generate Password</button>
          <button type="button" onClick={resetForm}>Reset</button>
        </div>
      </form>

      {isPassGenerated && (
        <div className="result-box">
          <h2>Generated Password:</h2>
          <p style={{ fontFamily: 'monospace' }}>{password}</p>
        </div>
      )}
    </div>
  );
}

export default App;
