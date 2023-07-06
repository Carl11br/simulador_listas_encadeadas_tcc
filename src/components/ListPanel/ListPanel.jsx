import React, {
  useState,
  useRef,
  useEffect,
  createRef,
  useContext,
} from 'react';
import styles from './ListPanel.module.css';
import Element from '../Element';
import { v4 as uuidv4 } from 'uuid';
import NullSymbol from '../../NullSymbol.svg';
import CodeBuilderModal from '../CodeBuilderModal';
import SetaVermelha from '../../SetaVermelha.svg';
import SetaAzul from '../../SetaAzul.svg';
import ControlPanel from '../ControlPanel';
import Xarrow, { Xwrapper, useXarrow } from 'react-xarrows';
import { motion, AnimatePresence } from 'framer-motion/dist/framer-motion';
import {
  insereFuncaoSimples,
  insereFimFuncaoSimples,
  buscarPorIndiceSimples,
  buscarPorValorSimples,
  removerPorValorSimples,
  removerPorIndiceSimples,
  insereIndiceFuncaoSimples,
  criaListaSimples,
  destroiListaFuncaoSimples,
} from '../Animations';
import { AppContext } from '../../App';

const ListPanel = ({ className = '', listType = 'simple' }) => {
  const [elementList, setElementList] = useState([]);
  const [renderedList, setRenderedList] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const { setCodeToRun, setCurrentRunningIndex } = useContext(AppContext);
  const [buildMode, setBuildMode] = useState(false);
  const [showBuildMode, setShowBuildMode] = useState(false);
  const [showNaturalLanguageExplanation, setShowNaturalLanguageExplanation] =
    useState(false);
  const [NaturalLanguageExplanation, setNaturalLanguageExplanation] =
    useState('');
  const [functionType, setFunctionType] = useState('insertStart');
  const [modalPromise, setModalPromise] = useState(null);
  const startRef = useRef();
  const nullSymbolRef = useRef();
  const [animationSpeed, setAnimationSpeed] = useState(1500);

  //new element
  const containerRef = useRef(null);
  const elementRef = useRef(null);
  const updateXarrow = useXarrow();

  //----------------- my new states -----------------
  const [currentAuxIndex, setCurrentAuxIndex] = useState(null);
  const [currentAntIndex, setCurrentAntIndex] = useState(null);
  const [renderNewWorkFlow, setRenderNewWorkFlow] = useState({
    elements: [],
    arrows: [],
  });
  const [linkingNewElementStart, setLinkingNewElementStart] = useState(false);
  const [linkingNewElementEnd, setLinkingNewElementEnd] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const element = elementRef.current;

    if (!container || !element) {
      return;
    }

    const containerWidth = container.clientWidth;
    const elementWidth = element.clientWidth;

    if (elementWidth > containerWidth) {
      const scrollAmount = elementWidth - containerWidth;
      container.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    }
  }, []);

  const promisedTimeout = async (timer, callback) => {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, timer);
    });
  };

  const promisedInterval = async (callback) => {
    let interval;
    await new Promise((resolve) => {
      interval = setInterval(() => {
        callback(resolve);
      }, animationSpeed);
    });
    clearInterval(interval);
  };

  const insertElement = (indexToInsert, newElement) => {
    const newList = [...elementList];
    if (
      elementList.length === 0 ||
      (indexToInsert !== 0 && indexToInsert >= elementList.length)
    ) {
      newList.push(newElement);
    } else {
      newList.splice(indexToInsert, 0, newElement);
    }
    setElementList(newList);
    if (indexToInsert === 0) {
      containerRef.current.scrollTo({
        x: 0,
        animated: true,
      });
    } else if (indexToInsert === elementList.length - 1) {
      containerRef.current.scrollLeft = containerRef.current.scrollWidth;
    }
  };

  const removeElement = (indexOrValue, isValue = false) => {
    const newList = [...elementList];
    if (isValue) {
      setElementList(newList.filter((element) => element !== indexOrValue));
    } else {
      newList.splice(indexOrValue, 1);
      setElementList(newList);
    }
  };

  const updateReferenceInElement = (indexToUpdate, newReference) => {
    setElementList((prevState) => {
      prevState[indexToUpdate].pointerFromRef = newReference;
      return prevState;
    });
  };

  const handleAnimation = async (animationList, actionValue, actionIndex) => {
    let stopAnimation = false;
    let auxToPosition = null;
    let antToPosition = null;
    let currentAnimationIndex = 0;
    let nextAnimationIndex = 0;
    const jumpToLine = (line) => {
      nextAnimationIndex = line;
    };

    const getAnimation = async (animation) => {
      nextAnimationIndex = currentAnimationIndex + 1;
      setCurrentRunningIndex(animation.line);
      setNaturalLanguageExplanation(animation.description || '');
      let hasWaited = false;
      let canGetNull = false;
      let useAntPointer = false;
      const formattedAnimation = () => {
        if (stopAnimation) {
          return '';
        }
        if (animation.animation.includes('if-')) {
          let [command, condition, line] = animation.animation.split('-');
          if (condition === 'verifyEmptyList') {
            if (elementList.length > 0) {
              jumpToLine(Number(line));
              return '';
            }
          }
          if (condition === 'indexEqualsStart') {
            if (actionIndex > 0) {
              jumpToLine(Number(line));
              return '';
            }
          }
          if (condition === 'antEqualIndex') {
            if (antToPosition !== actionIndex) {
              jumpToLine(Number(line));
              return '';
            }
          }
          if (condition === 'antEqualElement') {
            if (elementList[antToPosition].value !== actionValue) {
              jumpToLine(Number(line));
              return '';
            }
          }
          if (condition === 'auxNotNull') {
            if (auxToPosition === 'nullElement') {
              jumpToLine(Number(line));
              return '';
            }
          }
        }
        if (animation.animation === 'verifyEmptyList') {
          if (elementList.length <= 0) {
            stopAnimation = true;
          }
          return elementList.length > 0 ? '' : 'pointAntToNewElement';
        }
        if (animation.animation.includes('pointAuxToPosition')) {
          auxToPosition =
            elementList.length > 0
              ? Number(animation.animation.split('-')[1])
              : 'nullElement';
          return 'pointAuxToPosition';
        }
        if (animation.animation.includes('pointAntToPosition')) {
          antToPosition =
            elementList.length > 0
              ? Number(animation.animation.split('-')[1])
              : 'nullElement';
          return 'pointAntToPosition';
        }
        if (animation.animation.includes('searchIndex-')) {
          let [command, nullable, withAnt] = animation.animation.split('-');
          if (nullable === 'nullable') {
            canGetNull = true;
          }
          if (withAnt === 'withAnt') {
            useAntPointer = true;
          }
          return 'searchIndex';
        }
        if (animation.animation.includes('searchValue-')) {
          let [command, nullable, withAnt] = animation.animation.split('-');
          if (nullable === 'nullable') {
            canGetNull = true;
          }
          if (withAnt === 'withAnt') {
            useAntPointer = true;
          }
          return 'searchValue';
        }
        if (animation.animation.includes('jumpToLine-')) {
          let [command, line] = animation.animation.split('-');
          jumpToLine(Number(line));
          return '';
        }
        return animation.animation;
      };
      switch (formattedAnimation()) {
        case 'createList':
          setIsInitialized(true);
          break;
        case 'createNewPointer':
          const newPointerRef = createRef();
          const newPointer = {
            render: (
              <div
                style={{
                  display: 'flex',
                  position: 'absolute',
                  top: startRef.current.getBoundingClientRect().bottom + 100,
                  left: startRef.current.getBoundingClientRect().left,
                }}
                className={styles.listStart}
                ref={newPointerRef}
                key={'newPointer-animation' + uuidv4()}
              >
                *Novo
              </div>
            ),
            ref: newPointerRef,
          };
          setRenderNewWorkFlow((prevState) => ({
            elements: [...prevState.elements, newPointer],
            arrows: [...prevState.arrows],
          }));
          break;
        case 'createNewElement':
          let newElementRef = createRef();
          let respPointerRef = createRef();
          let respPointer = {
            render: (
              <div
                style={{
                  display: 'flex',
                  position: 'absolute',
                  top: startRef.current.getBoundingClientRect().bottom + 250,
                  left: startRef.current.getBoundingClientRect().left + 200,
                }}
                className={styles.listStart}
                ref={respPointerRef}
                key={'respPointer-animation' + uuidv4()}
              >
                *Resp
              </div>
            ),
            ref: respPointerRef,
          };
          let newElement = {
            render: (
              <Element
                style={{
                  position: 'absolute',
                  top: startRef.current.getBoundingClientRect().bottom + 100,
                  left: startRef.current.getBoundingClientRect().left + 200,
                }}
                content=""
                ref={newElementRef}
                key={uuidv4()}
              />
            ),
            ref: newElementRef,
          };
          let arrow1 = {
            render: (
              <Xarrow
                start={respPointer.ref}
                end={newElement.ref}
                color="black"
                path="straight"
                startAnchor="top"
                endAnchor="bottom"
                key={uuidv4()}
              />
            ),
          };
          setRenderNewWorkFlow((prevState) => ({
            elements: [...prevState.elements, respPointer, newElement],
            arrows: [...prevState.arrows, arrow1],
          }));
          break;
        case 'attributeValueToNewElement':
          setRenderNewWorkFlow((prevState) => {
            const newState = { ...prevState };
            newState.elements[2].ref = createRef();
            newState.elements[2].render = (
              <Element
                style={{
                  position: 'absolute',
                  top: startRef.current.getBoundingClientRect().bottom + 100,
                  left: startRef.current.getBoundingClientRect().left + 200,
                }}
                content={actionValue}
                ref={newState.elements[2].ref}
                key={uuidv4()}
              />
            );
            newState.arrows[0].render = (
              <Xarrow
                start={newState.elements[1].ref}
                end={newState.elements[2].ref}
                color="black"
                path="straight"
                startAnchor="top"
                endAnchor="bottom"
                key={uuidv4()}
              />
            );
            return newState;
          });
          break;
        case 'pointNewElementToNull':
          setRenderNewWorkFlow((prevState) => {
            const newState = { ...prevState };
            let newNullElementRef = createRef();
            const newNullElement = {
              render: (
                <img
                  src={NullSymbol}
                  alt="seta"
                  width="100px"
                  style={{
                    position: 'absolute',
                    top: startRef.current.getBoundingClientRect().bottom + 200,
                    left: startRef.current.getBoundingClientRect().left + 350,
                  }}
                  ref={newNullElementRef}
                  key="newNullElement-animation"
                />
              ),
              ref: newNullElementRef,
            };
            let arrow2 = {
              render: (
                <Xarrow
                  start={newState.elements[2].ref}
                  end={newNullElement.ref}
                  color="black"
                  path="grid"
                  showHead={false}
                  strokeWidth={6}
                  startAnchor="right"
                  endAnchor="top"
                  key={uuidv4()}
                />
              ),
            };
            return {
              elements: [...newState.elements, newNullElement],
              arrows: [...newState.arrows, arrow2],
            };
          });
          break;
        case 'pointNewPointerToNewElement':
          setRenderNewWorkFlow((prevState) => {
            const newState = { ...prevState };
            newState.elements.splice(1, 1);
            newState.elements[2].ref = createRef();
            newState.elements[2].render = (
              <>
                <img
                  src={NullSymbol}
                  alt="seta"
                  width="100px"
                  style={{
                    position: 'absolute',
                    top: startRef.current.getBoundingClientRect().bottom + 200,
                    left: startRef.current.getBoundingClientRect().left + 350,
                  }}
                  ref={newState.elements[2].ref}
                  key={'newNullElement-animation' + uuidv4()}
                />
              </>
            );
            newState.arrows[0].render = (
              <Xarrow
                start={newState.elements[0].ref}
                end={newState.elements[1].ref}
                color="black"
                path="straight"
                startAnchor="right"
                endAnchor="left"
                key={uuidv4()}
              />
            );
            newState.arrows[1].render = (
              <Xarrow
                start={newState.elements[1].ref}
                end={newState.elements[2].ref}
                color="black"
                path="grid"
                showHead={false}
                strokeWidth={6}
                startAnchor="right"
                endAnchor="top"
                key={uuidv4()}
              />
            );
            return newState;
          });
          break;
        case 'pointNewElementToPosition':
          setRenderNewWorkFlow((prevState) => {
            const newState = { ...prevState };
            newState.elements.pop();
            const getArrow = () => {
              if (
                elementList.length > 0 &&
                actionIndex <= elementList.length - 1
              ) {
                return (
                  <Xarrow
                    start={newState.elements[1].ref}
                    end={elementList[actionIndex].elementRef}
                    color="black"
                    path="straight"
                    startAnchor="top"
                    endAnchor="bottom"
                    key={uuidv4()}
                  />
                );
              } else {
                return (
                  <Xarrow
                    start={newState.elements[1].ref}
                    end={nullSymbolRef}
                    color="black"
                    path="grid"
                    showHead={false}
                    strokeWidth={6}
                    _cpy1Offset={-100}
                    _cpy2Offset={-100}
                    startAnchor="top"
                    endAnchor="top"
                    key={uuidv4()}
                  />
                );
              }
            };
            newState.arrows[1].render = getArrow();
            return newState;
          });
          break;
        case 'pointAntToNewElement':
          if (actionIndex === 0 || elementList.length <= 0) {
            setLinkingNewElementStart(true);
          } else if (actionIndex >= elementList.length) {
            setLinkingNewElementEnd(true);
          } else {
            updateReferenceInElement(actionIndex, null);
          }
          setRenderNewWorkFlow((prevState) => {
            const newState = { ...prevState };
            let startReference = startRef;
            if (actionIndex > 0) {
              if (actionIndex <= elementList.length) {
                startReference = elementList[actionIndex - 1].elementRef;
              } else {
                startReference = elementList[elementList.length - 1].elementRef;
              }
            }
            let newArrow = {
              render: (
                <Xarrow
                  start={startReference}
                  end={newState.elements[1].ref}
                  color="black"
                  path="straight"
                  startAnchor="bottom"
                  endAnchor="top"
                  key={uuidv4()}
                />
              ),
            };
            newState.arrows.push(newArrow);
            return newState;
          });
          break;
        case 'pointAuxToPosition':
          setCurrentAuxIndex(
            auxToPosition > elementList.length - 1
              ? 'nullElement'
              : auxToPosition
          );
          break;
        case 'pointAntToPosition':
          setCurrentAntIndex(
            antToPosition > elementList.length - 1
              ? 'nullElement'
              : antToPosition
          );
          break;
        case 'pointListToAux':
          setLinkingNewElementStart(true);
          setRenderNewWorkFlow((prevState) => {
            const newState = { ...prevState };
            let newArrow = {
              render:
                elementList.length > 1 ? (
                  <Xarrow
                    start={startRef}
                    end={elementList[auxToPosition].elementRef}
                    color="black"
                    path="straight"
                    startAnchor="right"
                    endAnchor="left"
                    key={uuidv4()}
                  />
                ) : (
                  <Xarrow
                    start={startRef}
                    end={nullSymbolRef}
                    color="black"
                    path="grid"
                    showHead={false}
                    strokeWidth={6}
                    startAnchor="right"
                    endAnchor="top"
                    key={uuidv4()}
                  />
                ),
            };
            newState.arrows.push(newArrow);
            return newState;
          });
          break;
        case 'antElementPointsToAuxProx':
          updateReferenceInElement(auxToPosition, null);
          if (auxToPosition < elementList.length - 1) {
            updateReferenceInElement(
              auxToPosition + 1,
              elementList[antToPosition].elementRef
            );
          } else {
            setLinkingNewElementEnd(true);
            setRenderNewWorkFlow((prevState) => {
              const newState = { ...prevState };
              newState.arrows.push = {
                render: (
                  <Xarrow
                    start={elementList[antToPosition].elementRef}
                    end={nullSymbolRef}
                    color="black"
                    path="grid"
                    showHead={false}
                    strokeWidth={6}
                    startAnchor="right"
                    endAnchor="top"
                    key={uuidv4()}
                  />
                ),
              };
              return newState;
            });
          }
          break;
        case 'searchIndex':
          await promisedInterval((resolve) => {
            if (
              auxToPosition === actionIndex ||
              (!canGetNull &&
                actionIndex === elementList.length &&
                auxToPosition === elementList.length - 1) ||
              (canGetNull && auxToPosition === 'nullElement')
            ) {
              resolve();
            } else {
              if (useAntPointer) {
                antToPosition = auxToPosition;
              }
              auxToPosition =
                auxToPosition + 1 > elementList.length - 1
                  ? 'nullElement'
                  : auxToPosition + 1;
              setCurrentAuxIndex(auxToPosition);
              setCurrentAntIndex(antToPosition);
            }
          });
          hasWaited = true;
          break;
        case 'searchValue':
          await promisedInterval((resolve) => {
            if (
              auxToPosition === 'nullElement' ||
              elementList[auxToPosition].value === actionValue
            ) {
              resolve();
            } else {
              if (useAntPointer) {
                antToPosition = auxToPosition;
              }
              auxToPosition =
                auxToPosition + 1 > elementList.length - 1
                  ? 'nullElement'
                  : auxToPosition + 1;
              setCurrentAuxIndex(auxToPosition);
              setCurrentAntIndex(antToPosition);
            }
          });
          hasWaited = true;
          break;
        case 'freeAux':
          removeElement(auxToPosition);
          setCurrentAuxIndex(null);
          break;
        case 'freeAnt':
          removeElement(antToPosition);
          setCurrentAntIndex(null);
          break;
        case 'destroyList':
          auxToPosition = elementList.length > 0 ? 0 : 'nullElement';
          await promisedInterval((resolve) => {
            if (auxToPosition === 'nullElement') {
              resolve();
            }
            auxToPosition =
              auxToPosition + 1 <= elementList.length - 1
                ? auxToPosition + 1
                : 'nullElement';
            setCurrentAuxIndex(auxToPosition);
            console.log(auxToPosition);
            removeElement(0);
          });
          hasWaited = true;
          break;
        default:
          break;
      }
      if (!hasWaited) {
        await promisedTimeout(animation.timer || animationSpeed);
      }
      currentAnimationIndex = nextAnimationIndex;
    };

    for (
      currentAnimationIndex;
      currentAnimationIndex < animationList.length;

    ) {
      await getAnimation(animationList[currentAnimationIndex]);
    }
  };

  const handleExecution = async ({
    action,
    actionType,
    actionValue,
    actionIndex,
  }) => {
    setCurrentAntIndex(null);
    setCurrentAuxIndex(null);
    try {
      const openModal = async () => {
        setShowBuildMode(true);
        await new Promise((resolve) => {
          setModalPromise(() => resolve);
        });
      };

      if (action === 'initializeList') {
        if (buildMode) {
          setFunctionType('initializeList');
          await openModal();
        }
        setCodeToRun(criaListaSimples.code);
        await handleAnimation(criaListaSimples.executionOrder);
      } else if (!isInitialized) {
        throw new Error('A lista precisa ser inicializada!');
      }

      if (action === 'destroyList') {
        if (buildMode) {
          setFunctionType('destroyList');
          await openModal();
        }
        setCodeToRun(destroiListaFuncaoSimples.code);
        await handleAnimation(destroiListaFuncaoSimples.executionOrder);
        return;
      }

      if (action === 'search') {
        switch (actionType) {
          case 'byValue':
            if (buildMode) {
              setFunctionType('serchValue');
              await openModal();
            }
            setCodeToRun(buscarPorValorSimples.code);
            await handleAnimation(
              buscarPorValorSimples.executionOrder,
              actionValue
            );
            break;
          case 'byIndex':
            if (buildMode) {
              setFunctionType('searchIndex');
              await openModal();
            }
            setCodeToRun(buscarPorIndiceSimples.code);
            await handleAnimation(
              buscarPorIndiceSimples.executionOrder,
              undefined,
              actionIndex
            );
            break;
          default:
            throw new Error('Ocorreu um erro ao buscar o elemento!');
        }
      }

      if (action === 'insert') {
        if (!actionValue) {
          throw new Error('O valor precisa ser informado!');
        }
        let newElement;
        switch (actionType) {
          case 'start':
            if (buildMode) {
              setFunctionType('insertStart');
              await openModal();
            }
            newElement = {
              elementRef: createRef(),
              value: actionValue,
              pointerFromRef: null,
            };
            setCodeToRun(insereFuncaoSimples.code);
            await handleAnimation(
              insereFuncaoSimples.executionOrder,
              newElement.value,
              0
            );
            if (elementList.length > 0) {
              updateReferenceInElement(0, newElement.elementRef);
            }
            insertElement(0, newElement);
            break;
          case 'end':
            if (buildMode) {
              setFunctionType('insertEnd');
              await openModal();
            }
            newElement = {
              elementRef: createRef(),
              value: actionValue,
              pointerFromRef:
                elementList.length > 0
                  ? elementList[elementList.length - 1].elementRef
                  : null,
            };
            setCodeToRun(insereFimFuncaoSimples.code);
            await handleAnimation(
              insereFimFuncaoSimples.executionOrder,
              newElement.value,
              elementList.length
            );
            insertElement(elementList.length, newElement);
            setCurrentAuxIndex(null);

            break;
          case 'onIndex':
            if (elementList.lenght > 0 && !actionIndex) {
              throw new Error('O índice precisa ser informado!');
            }
            if (buildMode) {
              setFunctionType('insertIndex');
              await openModal();
            }

            let pointerFromRef = null;

            if (elementList.length > 0) {
              if (actionIndex > 0)
                if (actionIndex <= elementList.length) {
                  pointerFromRef = elementList[actionIndex - 1].elementRef;
                } else {
                  pointerFromRef =
                    elementList[elementList.length - 1].elementRef;
                }
            }

            newElement = {
              elementRef: createRef(),
              value: actionValue,
              pointerFromRef: pointerFromRef,
            };
            setCodeToRun(insereIndiceFuncaoSimples.code);
            await handleAnimation(
              insereIndiceFuncaoSimples.executionOrder,
              newElement.value,
              actionIndex
            );
            if (
              elementList.length > 0 &&
              actionIndex >= 0 &&
              actionIndex < elementList.length
            ) {
              updateReferenceInElement(actionIndex, newElement.elementRef);
            }
            insertElement(actionIndex, newElement);
            setCurrentAuxIndex(null);
            break;
          default:
            throw new Error('Ocorreu um erro inesperado!');
        }
        setCurrentAntIndex(null);
        setCurrentAuxIndex(null);
      } else if (action === 'remove') {
        switch (actionType) {
          case 'onIndex':
            if (buildMode) {
              setFunctionType('removeIndex');
              await openModal();
            }
            if (!actionIndex) {
              throw new Error('O índice precisa ser informado!');
            }
            setCodeToRun(removerPorIndiceSimples.code);
            await handleAnimation(
              removerPorIndiceSimples.executionOrder,
              null,
              actionIndex
            );
            break;
          case 'onValue':
            if (!actionValue) {
              throw new Error('O valor precisa ser informado!');
            }
            if (buildMode) {
              setFunctionType('removeValue');
              await openModal();
            }
            setCodeToRun(removerPorValorSimples.code);
            await handleAnimation(
              removerPorValorSimples.executionOrder,
              actionValue,
              null
            );
            break;
          default:
            throw new Error('Ocorreu um erro inesperado!');
        }
        setCurrentAntIndex(null);
        setCurrentAuxIndex(null);
      }
    } catch (error) {
      alert(error.message);
    }
    setRenderNewWorkFlow({ elements: [], arrows: [] });
    setLinkingNewElementStart(false);
    setLinkingNewElementEnd(false);
  };

  useEffect(() => {
    const mountList = () => {
      switch (listType) {
        case 'simple':
          return elementList.map((element, mapIndex) => {
            return {
              render: (
                <motion.div
                  layout
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginLeft: 40,
                  }}
                  key={`${element.value}${mapIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                  }}
                  exit={{
                    scale: 0.2,
                    opacity: 0,
                  }}
                  transition={{ type: 'spring' }}
                >
                  <Element
                    content={element.value}
                    ref={element.elementRef}
                    key={'element' + element.value + mapIndex + uuidv4()}
                  />
                  {mapIndex > 0 && element.pointerFromRef !== null && (
                    <Xarrow
                      start={element.pointerFromRef}
                      end={element.elementRef}
                      color="black"
                      path="straight"
                      startAnchor="right"
                      endAnchor="left"
                      key={'arrow' + element.value + mapIndex + uuidv4()}
                    />
                  )}
                </motion.div>
              ),
              elementRef: element.elementRef,
            };
          });
        default:
          throw new Error('Invalid list type');
      }
    };
    setRenderedList(mountList());
  }, [elementList, listType]);

  useEffect(() => {
    updateXarrow();
  }, [elementList]);

  useEffect(() => {
    console.log('updated animation speed');
  }, [animationSpeed]);

  const windowRef = useRef();

  return (
    <div
      className={`${className} ${styles.listPanel}`}
      ref={windowRef}
      style={{ overflowX: 'hidden' }}
    >
      <div className={styles.listView}>
        <h1>Simulador de Listas Encadeadas</h1>
        <Xwrapper>
          <div className={styles.listContainer} onScroll={updateXarrow}>
            <div
              style={{
                display: isInitialized ? 'flex' : 'none',
                minHeight: 250,
                alignItems: 'center',
                overflowX: 'auto', // Add CSS to make the container scrollable horizontally
                whiteSpace: 'nowrap', // Prevent line breaks for the child elements
                overflowY: 'hidden', // Hide the horizontal scrollbar
                paddingTop: 100,
              }}
              ref={containerRef}
            >
              <div
                style={{ display: isInitialized ? 'flex' : 'none' }}
                className={styles.listStart}
                ref={startRef}
              >
                *Lista
              </div>
              <AnimatePresence mode="popLayout">
                {renderedList.map((element, mapIndex) => (
                  <div
                    style={{ position: 'relative' }}
                    key={`ElementAndArrows${mapIndex}`}
                  >
                    {element.render}
                    {currentAuxIndex == mapIndex && (
                      <motion.div
                        style={{
                          position: 'absolute',
                          top: -90,
                          left: 62,
                          zIndex: 100,
                        }}
                        initial={{ y: 0 }}
                        animate={{ y: 10 }}
                        transition={{
                          type: 'tween',
                          duration: 0.8,
                          repeat: Infinity,
                          repeatType: 'reverse',
                        }}
                        key={'aux' + currentAuxIndex + uuidv4()}
                      >
                        <h6 style={{ color: 'red' }}>Aux</h6>
                        <img
                          src={SetaVermelha}
                          alt="ponteiro auxiliar"
                          width={50}
                        />
                      </motion.div>
                    )}
                    {currentAntIndex == mapIndex && (
                      <motion.div
                        style={{
                          position: 'absolute',
                          top: -90,
                          left: 62,
                          zIndex: 100,
                        }}
                        initial={{ y: 0 }}
                        animate={{ y: 10 }}
                        transition={{
                          type: 'tween',
                          duration: 0.8,
                          repeat: Infinity,
                          repeatType: 'reverse',
                        }}
                        key={'ant' + currentAntIndex + uuidv4()}
                      >
                        <h6 style={{ color: 'blue' }}>Ant</h6>
                        <img
                          src={SetaAzul}
                          alt="ponteiro para anterior"
                          width={50}
                        />
                      </motion.div>
                    )}
                    {mapIndex == 0 && !linkingNewElementStart && (
                      <Xarrow
                        start={startRef}
                        end={elementList[0].elementRef}
                        color="black"
                        path="straight"
                        startAnchor="right"
                        endAnchor="left"
                        key={'arrow' + uuidv4()}
                      />
                    )}
                    {mapIndex == elementList.length - 1 &&
                      !linkingNewElementEnd && (
                        <Xarrow
                          start={elementList[mapIndex].elementRef}
                          end={nullSymbolRef}
                          color="black"
                          path="grid"
                          showHead={false}
                          strokeWidth={6}
                          startAnchor="right"
                          endAnchor="top"
                          key={'arrow' + uuidv4()}
                        />
                      )}
                  </div>
                ))}
              </AnimatePresence>
              <div
                style={{
                  position: 'relative',
                  height: 100,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                }}
              >
                {currentAuxIndex === 'nullElement' && (
                  <motion.div
                    style={{
                      position: 'absolute',
                      top: -90,
                      left: 55,
                      zIndex: 100,
                    }}
                    initial={{ y: 0 }}
                    animate={{ y: 10 }}
                    transition={{
                      type: 'tween',
                      duration: 0.8,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                    key={'aux-nullElement'}
                  >
                    <h6 style={{ color: 'red' }}>Aux</h6>
                    <img
                      src={SetaVermelha}
                      alt="ponteiro auxiliar"
                      width={50}
                    />
                  </motion.div>
                )}
                <img
                  src={NullSymbol}
                  alt="seta"
                  width="100px"
                  style={{ marginLeft: 30, alignSelf: 'end' }}
                  hidden={!isInitialized}
                  ref={nullSymbolRef}
                />
              </div>
            </div>
          </div>
          {renderNewWorkFlow.elements.map((element) => element.render)}
          {renderNewWorkFlow.arrows.map((element) => element.render)}
          {isInitialized &&
            elementList.length === 0 &&
            !linkingNewElementStart &&
            !linkingNewElementEnd && (
              <Xarrow
                start={startRef}
                end={nullSymbolRef}
                color="black"
                path="grid"
                showHead={false}
                strokeWidth={6}
                startAnchor="right"
                endAnchor="top"
                key={'arrowStartToNull' + uuidv4()}
              />
            )}
        </Xwrapper>
      </div>
      <div
        style={{
          display: showNaturalLanguageExplanation ? 'block' : 'none',
          height: '50px',
          width: '100%',
          padding: '10px',
          boxSizing: 'border-box',
          backgroundColor: 'yellow',
        }}
      >
        <p>{NaturalLanguageExplanation}</p>
      </div>
      <ControlPanel
        onActionClick={handleExecution}
        initialBuildModeStatus={buildMode}
        changeBuildModeStatus={setBuildMode}
        initialShowNaturalLanguageExplanation={showNaturalLanguageExplanation}
        changeShowNaturalLanguage={setShowNaturalLanguageExplanation}
        initialAnimationSpeed={animationSpeed}
        changeAnimationSpeed={setAnimationSpeed}
      />
      {showBuildMode && (
        <CodeBuilderModal
          isOpen={showBuildMode}
          onClose={() => {
            setShowBuildMode(false);
          }}
          functionType={functionType}
          onExecute={() => {
            modalPromise();
          }}
        />
      )}
    </div>
  );
};

export default ListPanel;
