import { useRef } from 'react';
import { useInView } from 'framer-motion';
import styles from '../css/FadeInSection.module.css';

const FadeInSection = ({ children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div
      ref={ref}
      className={`${styles.fadeInSection} ${isInView ? styles.visible : ''}`}
    >
      {children}
    </div>
  );
};

export default FadeInSection;
