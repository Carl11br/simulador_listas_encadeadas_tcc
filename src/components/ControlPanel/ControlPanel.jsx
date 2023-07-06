import React, { useState } from 'react';
import styles from './ControlPanel.module.css';
import Modal from '../Modal';

const ControlPanel = ({
  onActionClick,
  initialBuildModeStatus,
  changeBuildModeStatus,
  initialShowNaturalLanguageExplanation,
  changeShowNaturalLanguage,
  initialAnimationSpeed,
  changeAnimationSpeed,
}) => {
  const [value, setValue] = useState('');
  const [index, setIndex] = useState('');
  const [showProjectInfo, setShowProjectInfo] = useState(false);
  const onlyThreeNumbers = new RegExp(/^\d{0,3}$/);
  const onlyNumbers = new RegExp(/^\d+$/);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    if (onlyThreeNumbers.test(newValue)) {
      setValue(newValue);
    }
  };

  const handleIndexChange = (e) => {
    const newValue = e.target.value;
    if (onlyThreeNumbers.test(newValue)) {
      setIndex(newValue);
    }
  };

  const handleAnimationSpeedChange = (e) => {
    const newValue = e.target.value;
    if (onlyNumbers.test(newValue)) {
      changeAnimationSpeed(newValue);
    }
  };

  const handleClick = (actionObj) => {
    actionObj.actionIndex = actionObj.actionIndex
      ? Number(actionObj.actionIndex)
      : undefined;
    onActionClick(actionObj);
  };

  return (
    <div className={`${styles.controlPanel} text-dark`}>
      <div className="row h-100 align-items-center justify-content-center">
        <div className={`col-12 col-md-3`}>
          <div className="row justify-content-center align-content-center">
            <div className="col-2">
              <input
                style={{ width: 20 }}
                type="checkbox"
                name="buildMode"
                id="buildMode"
                checked={initialBuildModeStatus}
                onChange={() => changeBuildModeStatus(!initialBuildModeStatus)}
              />
            </div>
            <div className="col-10 justify-content-start">
              <p
                style={{
                  textAlign: 'start',
                }}
              >
                Modo completar lacunas
              </p>
            </div>
          </div>
          <div className="row justify-content-center align-content-center">
            <div className="col-2">
              <input
                style={{ width: 20 }}
                type="checkbox"
                name="naturalLanguage"
                id="naturalLanguage"
                value={initialShowNaturalLanguageExplanation}
                onChange={() =>
                  changeShowNaturalLanguage(
                    !initialShowNaturalLanguageExplanation
                  )
                }
              />
            </div>
            <div className="col-10 justify-content-start">
              <p
                style={{
                  textAlign: 'start',
                }}
              >
                Exibir explicação em linguagem natural
              </p>
            </div>
          </div>
          <div className="row justify-content-center align-content-center">
            <div className="col-12">
              <button
                className={`${styles.actionButton}`}
                onClick={() => setShowProjectInfo(true)}
              >
                Sobre o projeto
              </button>
            </div>
          </div>
        </div>
        <div className={`col-12 col-md-6`}>
          <div className="row mb-3 justify-content-center align-content-center">
            <div className="col-4">
              <button
                className={`${styles.actionButton}`}
                onClick={() => handleClick({ action: 'initializeList' })}
              >
                {' '}
                Iniciar lista
              </button>
            </div>
            <div className="col-4">
              <button
                className={`${styles.actionButton}`}
                onClick={() => handleClick({ action: 'destroyList' })}
              >
                {' '}
                Destruir lista
              </button>
            </div>
            <div className="col-4">
              <button
                className={`${styles.actionButton}`}
                onClick={() =>
                  handleClick({
                    action: 'search',
                    actionType: 'byIndex',
                    actionIndex: index,
                  })
                }
              >
                {' '}
                Buscar por índice
              </button>
            </div>
          </div>
          <div className="row mb-3 justify-content-center align-content-center">
            <div className="col-4">
              <button
                className={`${styles.actionButton}`}
                onClick={() =>
                  handleClick({
                    action: 'insert',
                    actionType: 'start',
                    actionValue: value,
                  })
                }
              >
                {' '}
                Inserir no início
              </button>
            </div>
            <div className="col-4">
              <button
                className={`${styles.actionButton}`}
                onClick={() =>
                  handleClick({
                    action: 'insert',
                    actionType: 'end',
                    actionValue: value,
                  })
                }
              >
                {' '}
                Inserir no fim
              </button>
            </div>
            <div className="col-4">
              <button
                className={`${styles.actionButton}`}
                onClick={() =>
                  handleClick({
                    action: 'insert',
                    actionType: 'onIndex',
                    actionValue: value,
                    actionIndex: index,
                  })
                }
              >
                {' '}
                Inserir no índice
              </button>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-4">
              <button
                className={`${styles.actionButton}`}
                onClick={() =>
                  handleClick({
                    action: 'remove',
                    actionType: 'onValue',
                    actionValue: value,
                  })
                }
              >
                {' '}
                Remover por valor
              </button>
            </div>
            <div className="col-4 ">
              <button
                className={`${styles.actionButton}`}
                onClick={() =>
                  handleClick({
                    action: 'remove',
                    actionType: 'onIndex',
                    actionIndex: index,
                  })
                }
              >
                {' '}
                Remover por índice
              </button>
            </div>
            <div className="col-4">
              <button
                className={`${styles.actionButton}`}
                onClick={() =>
                  handleClick({
                    action: 'search',
                    actionType: 'byValue',
                    actionValue: value,
                  })
                }
              >
                {' '}
                Buscar por valor
              </button>
            </div>
          </div>
        </div>
        <div className={`col-3`}>
          <div className="row mb-3">
            <div className="col-12 col-md-3 text-start">
              <label htmlFor="">Valor: </label>
            </div>
            <div className="col-12 col-md-8">
              <input
                type="text"
                placeholder="Insira o valor"
                onChange={handleInputChange}
                value={value}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12 col-md-3 text-start">
              <label htmlFor="">Índice: </label>
            </div>
            <div className="col-12 col-md-8">
              <input
                type="text"
                placeholder="Insira o índice"
                onChange={handleIndexChange}
                value={index}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-3 text-start">
              <label className = "small" htmlFor="">Intervalo das animações(ms): </label>
            </div>
            <div className="col-12 col-md-8">
              <input
                type="text"
                placeholder="Intervalo da animação(ms)"
                onChange={handleAnimationSpeedChange}
                value={initialAnimationSpeed}
              />
            </div>
          </div>
        </div>
      </div>
      {showProjectInfo && (
        <Modal
          isOpen={showProjectInfo}
          title="Informações do projeto"
          onClose={() => setShowProjectInfo(false)}
        >
          <p>
            Projeto criado por Carlos Linhares Machado e Pablo Montel de Oliveira sob a orientação do professor e doutor André Renato Vilella da Silva.
          </p>
          <p>UNIVERSIDADE FEDERAL FLUMINENSE - UFF</p>
          <p>INSTITUTO DE CIÊNCIA E TECNOLOGIA</p>
          <p>BACHARELADO EM CIÊNCIA DA COMPUTAÇÃO<p/>
          </p>
        </Modal>
      )}
    </div>
  );
};

export default ControlPanel;
