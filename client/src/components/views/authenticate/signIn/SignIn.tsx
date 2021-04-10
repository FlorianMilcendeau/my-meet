import React, { ReactElement, useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../common/Button/Button';

import InputCustom from '../../../common/InputCustom/InputCustom';

import styles from '../Authenticate.module.css';
import stylesButton from '../../../common/Button/Button.module.css';
import { PropsAuth } from '../../../../redux/store/SignInStore';

interface Form {
  email: string;
  password: string;
}

const SignIn = ({ login }: PropsAuth): ReactElement => {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [form, setForm] = useState<Form>({
    email: '',
    password: '',
  });
  const { email, password } = form;

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    login(form);
  };

  const formatEmail = new RegExp(
    /^([\w-]+)\.?([\w-]+)@([A-Za-z]+)\.([A-Za-z]{2,})$/,
  );

  useEffect(() => {
    if (formatEmail.test(email) && password) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, password]);

  return (
    <form className={styles.formAuth} onSubmit={(e) => handleSubmit(e)}>
      <h2 className={styles.titleForm}>Sign-in</h2>
      <InputCustom
        type="email"
        name="email"
        label="email"
        value={email}
        setValue={(value: string, name: string) =>
          setForm({ ...form, [name]: value })
        }
        pattern={formatEmail}
        messageError="address e-mail incorrect."
      />
      <InputCustom
        type="password"
        name="password"
        label="password"
        value={password}
        setValue={(value: string, name: string) =>
          setForm({ ...form, [name]: value })
        }
      />
      <Button
        submit
        value="Login"
        click={() => null}
        isDisabled={isDisabled}
        style={stylesButton.ButtonPrimary}
      />
      <p className={styles.switchForm}>
        Don&apos;t have an account yet ?&ensp;
        <Link to="/authenticate/sign-up">sign-up</Link>
      </p>
    </form>
  );
};

export default SignIn;
