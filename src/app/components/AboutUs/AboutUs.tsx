'use client';
import { useRouter } from 'next/navigation';
import { CONSTANTS } from '../../../utils/constants/constants';
import styles from './AboutUs.module.css';

export const AboutUs = ({ page }: { page: string }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/${page}/`);
  };
  return (
    <div className={styles.aboutUsBlock}>
      <h2 className={styles.aboutUsText}>
        The application is designed to demonstrate the React: Routing and Hooks
        task as part of the RSSchool React 2025 Q3 course.
      </h2>
      <a href={CONSTANTS.GITHUb_LINK} className={styles.linkGitHub}>
        My GitHub
      </a>
      <a href={CONSTANTS.RS_LINK} className={styles.linkRSSchool}>
        RS School
      </a>
      <button className={styles.goToPokemonButton} onClick={handleClick}>
        Go to pokemon
      </button>
    </div>
  );
};
