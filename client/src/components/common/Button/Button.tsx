import React, { ReactElement } from 'react';
import styles from './Button.module.css';

interface IProps {
  submit?: boolean;
  value: string;
  click: () => void;
  isDisabled: boolean;
  style: string;
}

const defaultProps = {
  submit: false,
};

const Button = ({
  submit,
  value,
  click,
  isDisabled = false,
  style = '',
}: IProps & typeof defaultProps): ReactElement => (
  <button
    className={`${styles.Button} ${!isDisabled ? style : ''}`}
    type={submit ? 'submit' : 'button'}
    disabled={isDisabled}
    onClick={() => click()}
  >
    {value}
  </button>
);

Button.defaultProps = defaultProps;

export default Button;
