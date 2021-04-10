import React, { ComponentType, ReactElement } from 'react';

import logo from '../../../assets/logos/wribe-black.svg';
import picture1 from '../../../assets/pictures/pexels-artem-podrez-4492134.jpg';

import styles from './HomeLayout.module.css';

interface Props {
  component: ComponentType;
}

const HomeLayout = ({ component: Component }: Props): ReactElement => {
  return (
    <main className={styles.home}>
      <section className={styles.sectionPicture}>
        <img
          className={styles.pictureCaroussel}
          src={picture1}
          alt="caroussel"
        />
      </section>
      <section className={styles.sectionForm}>
        <img className={styles.homeLogo} src={logo} alt="logo Wribe" />
        <Component />
      </section>
    </main>
  );
};

export default HomeLayout;
