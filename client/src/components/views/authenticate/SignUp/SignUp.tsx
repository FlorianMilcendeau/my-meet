import React, { ReactElement, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/** Components */
import InputCustom from '../../../common/InputCustom/InputCustom';
import Button from '../../../common/Button/Button';

/** Styles */
import styles from '../Authenticate.module.css';
import stylesButton from '../../../common/Button/Button.module.css';

import { PropsAuth } from '../../../../redux/store/SignUpStore';

interface Form {
  name: string;
  email: string;
  password: string;
}

const SignUp = ({ register }: PropsAuth): ReactElement => {
  const [checkPassword, setCheckPassword] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [form, setForm] = useState<Form>({
    name: '',
    email: '',
    password: '',
  });
  const { name, email, password } = form;

  const formatEmail = new RegExp(
    /^([\w-]+)\.?([\w-]+)@([A-Za-z]+)\.([A-Za-z]{2,})$/,
  );

  const formatPassword = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
  );

  /** Check if the fields are been fill */
  useEffect(() => {
    if (
      formatEmail.test(email) &&
      formatPassword.test(password) &&
      checkPassword === password
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [name, email, password, checkPassword]);

  return (
    <form className={styles.formAuth}>
      <h2 className={styles.titleForm}>
        Join thousands of learners from around the world
      </h2>
      <InputCustom
        type="text"
        name="name"
        label="Name"
        value={name}
        setValue={(value: string, target: string) =>
          setForm({ ...form, [target]: value })
        }
        maxCount={50}
      />
      <InputCustom
        type="email"
        name="email"
        label="Email"
        value={email}
        setValue={(value: string, target: string) =>
          setForm({ ...form, [target]: value })
        }
        pattern={formatEmail}
        messageError="address e-mail incorrect."
      />
      <InputCustom
        type="password"
        name="password"
        label="Password"
        value={password}
        setValue={(value: string, target: string): void =>
          setForm({ ...form, [target]: value })
        }
        pattern={formatPassword}
        messageError="The password must contain at least 8 characters including 1 uppercase, 1 lowercase, 1 numeric and 1 special character."
      />
      <InputCustom
        type="password"
        name="password-check"
        label="Password check"
        value={checkPassword}
        setValue={(value: string) => setCheckPassword(value)}
        checkValue={password}
      />
      <Button
        submit
        value="Register"
        click={() => register(form)}
        isDisabled={isDisabled}
        style={stylesButton.ButtonPrimary}
      />
      <p className={styles.switchForm}>
        Already a member ?&ensp;
        <Link to="/authenticate/sign-in">sign-in</Link>
      </p>
    </form>
  );
};

export default SignUp;
