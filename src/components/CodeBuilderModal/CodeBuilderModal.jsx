import React from 'react';
import { useRef } from 'react';
import Modal from '../Modal/Modal';
import {
  BUSCA_FUNCAO_SIMPLES,
  BUSCA_FUNCAO_SIMPLES_INDICE,
  CRIA_ELEMENTO_FUNCAO_SIMPLES,
  CRIA_LISTA_FUNCAO_SIMPLES,
  CRIA_LISTA_USO_SIMPLES,
  DESTROI_LISTA_FUNCAO_SIMPLES,
  INSERE_FIM_FUNCAO_SIMPLES,
  INSERE_INDICE_FUNCAO_SIMPLES,
  INSERE_INICIO_FUNCAO_SIMPLES,
  REMOVE_FUNCAO_SIMPLES,
  REMOVE_FUNCAO_SIMPLES_INDICE,
  STRUCT_SIMPLES,
} from '../Codes';

import CodeWithGaps from '../CodeWithGaps/CodeWithGaps';
const CodeBuilderModal = ({
  isOpen,
  onClose,
  functionType = 'insertStart',
  listType = 'simple',
  onExecute,
}) => {
  const constraintsRef = useRef(null);
  const finalCode = useRef(null);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  const functionOptions = {
    initializeList: {
      simple: {
        code:
          STRUCT_SIMPLES +
          '\n' +
          CRIA_LISTA_FUNCAO_SIMPLES +
          '\n' +
          CRIA_LISTA_USO_SIMPLES,
        gaps: ['malloc', `novo->valor`, 'sizeof', 'realloc', 'lista'],
      },
    },
    destroyList: {
      simple: {
        code: DESTROI_LISTA_FUNCAO_SIMPLES,
        gaps: ['malloc', `novo->valor`, 'sizeof', 'realloc', 'lista'],
      },
    },
    searchElement: {
      simple: {
        code: BUSCA_FUNCAO_SIMPLES,
        gaps: ['malloc', `novo->valor`, 'sizeof', 'realloc', 'lista'],
      },
    },
    searchIndex: {
      simple: {
        code: BUSCA_FUNCAO_SIMPLES_INDICE,
        gaps: ['malloc', `novo->valor`, 'sizeof', 'realloc', 'lista'],
      },
    },
    insertStart: {
      simple: {
        code:
          CRIA_ELEMENTO_FUNCAO_SIMPLES + '\n' + INSERE_INICIO_FUNCAO_SIMPLES,
        gaps: ['malloc', `novo->valor`, 'sizeof', 'realloc', 'lista'],
      },
    },
    insertEnd: {
      simple: {
        code: CRIA_ELEMENTO_FUNCAO_SIMPLES + '\n' + INSERE_FIM_FUNCAO_SIMPLES,
        gaps: ['malloc', `novo->valor`, 'sizeof', 'realloc', 'lista'],
      },
    },
    insertIndex: {
      simple: {
        code:
          CRIA_ELEMENTO_FUNCAO_SIMPLES + '\n' + INSERE_INDICE_FUNCAO_SIMPLES,
        gaps: ['malloc', `novo->valor`, 'sizeof', 'realloc', 'lista'],
      },
    },
    removeValue: {
      simple: {
        code: REMOVE_FUNCAO_SIMPLES,
        gaps: ['malloc', `novo->valor`, 'sizeof', 'realloc', 'lista'],
      },
    },
    removeIndex: {
      simple: {
        code: REMOVE_FUNCAO_SIMPLES_INDICE,
        gaps: ['malloc', `novo->valor`, 'sizeof', 'realloc', 'lista'],
      },
    },
  };

  const verifyCode = () => {
    finalCode.current.forEach((code) => {
      if (code.currentCode !== code.correctCode) {
        throw new Error('Código incorreto!');
      }
    });
  };

  const handleExecution = () => {
    try {
      verifyCode();
      onExecute();
      onClose();
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      width="80%"
      height="80%"
      title={'Preencha as lacunas!'}
    >
      <div className="container h-100">
        <div className="row h-100" ref={constraintsRef}>
          <div className="col-12 h-100">
            <CodeWithGaps
              code={functionOptions[functionType][listType].code}
              gaps={shuffleArray(functionOptions[functionType][listType].gaps)}
              finalCode={finalCode}
            />
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12 text-end">
            <button className="btn btn-success" onClick={handleExecution}>
              Executar
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CodeBuilderModal;
