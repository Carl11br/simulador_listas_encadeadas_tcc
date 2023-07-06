import styles from './Element.module.css';
import React, { forwardRef } from 'react';

const Element = forwardRef(({ content, style = {}, className = {} }, ref) => (
  <div style={style} className={`${className} ${styles.container}`} ref={ref}>
    <div className={styles.content}>{content}</div>
  </div>
));

export default Element;
