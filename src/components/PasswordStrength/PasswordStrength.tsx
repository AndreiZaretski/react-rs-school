import { useEffect, useMemo, useState } from 'react';

type PropsPassword = {
  password: string;
};

const PasswordStrength = ({ password }: PropsPassword) => {
  const [message, setMessage] = useState('Enter your password');

  const [color, setColor] = useState('black');

  const hasNumber = useMemo(() => /\d/, []);
  const hasUpper = useMemo(() => /[A-Z\u0410-\u042F]/, []);
  const hasLower = useMemo(() => /[a-z\u0430-\u044F]/, []);
  const hasSpecial = useMemo(() => /[!@#$%^&*]/, []);

  useEffect(() => {
    let count = 0;
    if (hasNumber.test(password)) count++;
    if (hasUpper.test(password)) count++;
    if (hasLower.test(password)) count++;
    if (hasSpecial.test(password)) count++;

    switch (count) {
      case 0:
        setMessage('Enter your password');
        setColor('black');
        break;
      case 1:
        setMessage('Weak password');
        setColor('red');
        break;
      case 2:
      case 3:
        setMessage('Average password');
        setColor('orange');
        break;
      case 4:
        setMessage('Strong password');
        setColor('green');
        break;
      default:
        setMessage('Unknown error');
        setColor('black');
    }
  }, [hasLower, hasNumber, hasSpecial, hasUpper, password]);
  return (
    <div>
      <p style={{ color }}>{message}</p>
    </div>
  );
};

export default PasswordStrength;
