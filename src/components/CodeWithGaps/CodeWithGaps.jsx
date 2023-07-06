import React, { useEffect, useRef, useState } from 'react';
import styles from './CodeWithGaps.module.css';

const CodeWithGaps = ({ code, gaps, finalCode }) => {
  const [draggedGap, setDraggedGap] = useState('');
  const [codeWithGaps, setCodeWithGaps] = useState('');
  const gapRefs = useRef([]);

  const replaceStrings = (code, gaps) => {
    let result = code;
    let counter = 0;
    finalCode.current = [];
    gaps.forEach((gap) => {
      while (result.includes(gap)) {
        const gapPlaceholder = `{{${counter}}}`;
        finalCode.current[counter] = {
          currentCode: '',
          correctCode: gap,
        };
        counter++;
        result = result.replace(gap, gapPlaceholder);
      }
    });
    return result;
  };

  useEffect(() => {
    setCodeWithGaps(replaceStrings(code, gaps));
  }, []);

  const handleDragStart = (event, gap) => {
    event.dataTransfer.setData('text/plain', gap);
    setDraggedGap(gap);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, gapIndex) => {
    event.preventDefault();
    const gapElement = gapRefs.current[gapIndex];
    const selectionStart = gapElement.selectionStart;
    const selectionEnd = gapElement.selectionEnd;

    const currentValue = gapElement.value;
    const beforeSelection = currentValue.substring(0, selectionStart);
    const afterSelection = currentValue.substring(selectionEnd);

    const newValue = beforeSelection + draggedGap + afterSelection;
    gapElement.value = newValue;
    gapElement.setSelectionRange(
      selectionStart,
      selectionStart + draggedGap.length
    );

    finalCode.current[gapIndex].currentCode = newValue;
    gapElement.dispatchEvent(new Event('input', { bubbles: true }));
    setDraggedGap('');
  };

  return (
    <div className={`${styles.codeWithGapsContainer} container h-100`}>
      <div className="row h-100">
        <pre className={`col-8 col-md-10 ${styles.codeContainer} h-100`}>
          <code>
            {/* ...existing code... */}
            {codeWithGaps.split('{{').map((line, index) => {
              if (line.includes('}}')) {
                const [gapIndex, remaining] = line.split('}}');
                return (
                  <React.Fragment key={index}>
                    <input
                      ref={(el) => (gapRefs.current[parseInt(gapIndex)] = el)}
                      type="text"
                      draggable="false"
                      readOnly
                      defaultValue=""
                      onDragOver={handleDragOver} // Add onDragOver event handler
                      onDrop={(e) => handleDrop(e, parseInt(gapIndex))} // Add onDrop event handler
                    />
                    {remaining}
                  </React.Fragment>
                );
              }
              return line;
            })}
          </code>
        </pre>
        <div className={`col-4 col-md-2 ${styles.elementsContainer} h-100`}>
          {gaps.map((gap, index) => (
            <div
              key={index}
              draggable="true"
              onDragStart={(e) => handleDragStart(e, gap)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              className={`${styles.fillBlankElement}`}
            >
              {gap}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CodeWithGaps;
