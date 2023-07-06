import { useContext } from 'react';
import styles from './CodePanel.module.css';
import React from 'react';
import { AppContext } from '../../App';

function CodePanel({ className = '' }) {
  const { codeToRun, currentRunningIndex } = useContext(AppContext);
  return (
    <div className={`${className} ${styles.codePanel}`}>
      <div className={`${styles.container} ${styles.blueBorder}`}>
        <h5>Código</h5>
        <pre className={styles.codebox}>
          {codeToRun.map((item, index) => {
            return (
              <p
                style={{
                  width: '100%',
                  backgroundColor: currentRunningIndex == index ? 'yellow' : '',
                }}
                key={`line-${index}`}
              >
                {item}
              </p>
            );
          })}
        </pre>
      </div>
    </div>
  );
}

export default CodePanel;
