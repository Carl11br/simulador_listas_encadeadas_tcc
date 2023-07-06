export const insereFuncaoSimples = {
  executionOrder: [
    {
      line: 6,
      animation: '',
      description:
        'A função "InsereInicio" recebe o ponteiro para a lista e o valor a ser inserido como parâmetros. Ela retornará a lista com o novo elemento;',
    },
    {
      line: 7,
      animation: 'createNewPointer',
      description:
        'O ponteiro(*) "novo" é declarado e chama a função "CriarElemento" passando o valor recebido como parâmetro.',
    },
    {
      line: 0,
      animation: '',
      description:
        'A função "CriarElemento" recebe um valor e retorna um ponteiro para o novo elemento criado.',
    },
    {
      line: 1,
      animation: 'createNewElement',
      description:
        'O ponteiro(*) "resp" é declarado e recebe o endereço de memória alocado para o novo elemento.',
    },
    {
      line: 2,
      animation: 'attributeValueToNewElement',
      description:
        'Através do ponteiro "resp" é atribuído ao novo elemento o valor recebido.',
    },
    {
      line: 3,
      animation: 'pointNewElementToNull',
      description:
        'Através do ponteiro "resp" é atribuído ao novo elemento o próximo elemento (que até o momento é NULL).',
    },
    {
      line: 4,
      animation: 'pointNewPointerToNewElement',
      description:
        'O ponteiro "resp" (que aponta para o novo elemento) é retornado pela função "CriarElemento".',
    },
    {
      line: 8,
      animation: 'pointNewElementToPosition',
      description:
        'Agora que o ponteiro "novo" recebeu o novo elemento e como estamos inserindo no início da lista, diremos que o próximo elemento após o novo elemento vai ser o atual primeiro elemento da lista.',
    },
    {
      line: 9,
      animation: 'pointAntToNewElement',
      description:
        'Depois disso, diremos que o primeiro elemento da lista vai ser o novo elemento.',
    },
    {
      line: 10,
      animation: '',
      description:
        'Por fim, retornamos a lista já com o novo elemento inserido.',
    },
  ],

  code: [
    'struct elemento *CriaElemento(int numero){',
    '   struct elemento *resp = (struct elemento*) malloc(sizeof(struct elemento));',
    '   resp->valor = numero;',
    '   resp->prox = NULL;',
    '   return resp;',
    '}',
    'struct elemento *InsereInicio(elemento *lista, int numero){',
    '   struct elemento *novo = CriaElemento(numero);',
    '   novo->prox = lista;',
    '   lista = novo;',
    '   return lista;',
    '}',
  ],
};

export const insereFimFuncaoSimples = {
  executionOrder: [
    {
      line: 6,
      animation: '',
      description: 'A função "InsereFim" recebe o ponteiro para a lista e o valor a ser inserido como parâmetros. Ela retornará a lista com o novo elemento;',
    },
    {
      line: 7,
      animation: '',
      description: 'O ponteiro(*) "aux" é declarado',
    },
    {
      line: 8,
      animation: 'createNewPointer',
      description:
        'O ponteiro(*) "novo" é declarado e chama a função "CriarElemento" passando o valor recebido como parâmetro.',
    },
    {
      line: 0,
      animation: '',
      description:
        'A função "CriarElemento" recebe um valor e retorna um ponteiro para o novo elemento criado.',
    },
    {
      line: 1,
      animation: 'createNewElement',
      description:
        'O ponteiro(*) "resp" é declarado e recebe o endereço de memória alocado para o novo elemento.',
    },
    {
      line: 2,
      animation: 'attributeValueToNewElement',
      description:
        'Através do ponteiro "resp" é atribuído ao novo elemento o valor recebido.',
    },
    {
      line: 3,
      animation: 'pointNewElementToNull',
      description:
        'Através do ponteiro "resp" é atribuído ao novo elemento o próximo elemento (que até o momento é NULL).',
    },
    {
      line: 4,
      animation: 'pointNewPointerToNewElement',
      description:
        'O ponteiro "resp" (que aponta para o novo elemento) é retornado pela função "CriarElemento".',
    },
    {
      line: 5,
      animation: '',
      description: '',
    },
    {
      line: 9,
      animation: 'if-verifyEmptyList-12',
      description:
        'Verifica se a lista está vazia, se estiver, o primeiro elemento da lista vai ser o novo elemento.',
    },
    { line: 10, animation: 'pointAntToNewElement', description: '' },
    { line: 11, animation: 'jumpToLine-17', description: '' },
    { line: 12, animation: '', description: '' },
    { line: 13, animation: 'pointAuxToPosition-0', description: '' },
    { line: 14, animation: 'searchIndex', description: 'Busca o último elemento da lista.' },
    { line: 15, animation: 'pointAntToNewElement', description: 'Ao encontrar o último elemento, o próximo elemento dele vai ser o novo elemento.' },
    { line: 16, animation: '', description: '' },
    { line: 17, animation: '', description: 'Retorna a lista com o novo elemento inserido.' },

  ],
  code: [
    'struct elemento *CriaElemento(int numero){',
    '    struct elemento *resp = (struct elemento*) malloc(sizeof(struct elemento));',
    '    resp->valor = numero;',
    '    resp->prox = NULL;',
    '    return resp;',
    '}',
    'struct elemento *InsereFim(struct elemento *lista, int numero){',
    '    struct elemento *aux;',
    '    struct elemento *novo = CriaElemento(numero);',
    '    if (lista == NULL){',
    '       lista = novo;',
    '    }',
    '    else{',
    '        aux = lista;',
    `        while (aux->prox != NULL){
                aux = aux->prox;
            }`,
    '        aux->prox = novo;',
    '    }',
    '    return lista;',
    '}'
  ]
};

export const insereIndiceFuncaoSimples = {
  executionOrder: [
    {
      line: 6,
      animation: '',
      description: 'A função "InsereIndice" recebe o ponteiro para a lista e o valor a ser inserido como parâmetros. Ela retornará a lista com o novo elemento;',
    },
    {
      line: 7,
      animation: '',
      description: 'O ponteiro(*) "aux" é declarado',
    },
    {
      line: 8,
      animation: 'createNewPointer',
      description:
        'O ponteiro(*) "novo" é declarado e chama a função "CriarElemento" passando o valor recebido como parâmetro.',
    },
    {
      line: 0,
      animation: '',
      description:
        'A função "CriarElemento" recebe um valor e retorna um ponteiro para o novo elemento criado.',
    },
    {
      line: 1,
      animation: 'createNewElement',
      description:
        'O ponteiro(*) "resp" é declarado e recebe o endereço de memória alocado para o novo elemento.',
    },
    {
      line: 2,
      animation: 'attributeValueToNewElement',
      description:
        'Através do ponteiro "resp" é atribuído ao novo elemento o valor recebido.',
    },
    {
      line: 3,
      animation: 'pointNewElementToNull',
      description:
        'Através do ponteiro "resp" é atribuído ao novo elemento o próximo elemento (que até o momento é NULL).',
    },
    {
      line: 4,
      animation: 'pointNewPointerToNewElement',
      description:
        'O ponteiro "resp" (que aponta para o novo elemento) é retornado pela função "CriarElemento".',
    },
    { line: 5, animation: '', description: '' },
    {
      line: 9,
      animation: '',
      description:
        'A variável indiceAtual é criada e inicializada com o valor 1, ou seja, a segunda posição da lista.',
    },
    {
      line: 10,
      animation: 'if-verifyEmptyList-13',
      description:
        'Verifica se a lista está vazia, se estiver, o primeiro elemento da lista vai ser o novo elemento.',
    },
    { line: 11, animation: 'pointAntToNewElement', description: 'Se a lista estiver vazia, insere o elemento na primeira posição.' },
    { line: 12, animation: 'jumpToLine-24', description: '' },
    { line: 13, animation: 'if-indexEqualsStart-17', description: 'Verifica se índice que o elemento deve ser inserido é o começo da lista.' },
    { line: 14, animation: 'pointNewElementToPosition', description: 'Aponta o proxímo elemento do novo elemento como o primeiro elemento da lista.' },
    { line: 15, animation: 'pointAntToNewElement', description: 'Aponta o início da lista para o novo elemento.' },
    { line: 16, animation: 'jumpToLine-24', description: '' },
    { line: 17, animation: '', description: 'Caso contrário, busca o índice a ser inserido na lista.' },
    { line: 18, animation: 'pointAntToPosition-0', description: 'Aponta o ponteiro "ant" para o primeiro elemento da lista.' },
    { line: 19, animation: 'pointAuxToPosition-1', description: 'Aponta o ponteiro "aux" para o segundo elemento da lista.' },
    { line: 20, animation: 'searchIndex-nullable-withAnt', description: 'Enquanto o ponteiro "aux" não for nulo e o índice atual for diferente do índice a ser inserido, o ponteiro "ant" aponta para o elemento que o ponteiro "aux" aponta e o ponteiro "aux" aponta para o próximo elemento.' },
    { line: 21, animation: 'pointAntToNewElement', description: 'Aponta o elemento novo como próximo elemento do índice anterior ao qual ele deve ser inserido' },
    { line: 22, animation: 'pointNewElementToPosition', description: 'Aponta o próximo elemento do novo elemento para o elemento que o ponteiro "aux" aponta.' },
    { line: 23, animation: '', description: '' },
    { line: 24, animation: '', description: 'Retorna a lista com o novo elemento inserido.' },

  ],
  code: [
    'struct elemento *CriaElemento(int numero){',
    '    struct elemento *resp = (struct elemento*) malloc(sizeof(struct elemento));',
    '    resp->valor = numero;',
    '    resp->prox = NULL;',
    '    return resp;',
    '}',
    'struct elemento *InsereIndice(struct elemento *lista, int numero, int indice){',
    ' struct elemento *aux;',
    ' struct elemento *novo = CriaElemento(numero);',
    ' int indiceAtual = 1;',
    ' if (lista == NULL){',
    '   lista = novo;',
    ' }',
    ' else if (indice == 0){',
    '   novo->prox = lista;',
    '   lista = novo;',
    ' }',
    ' else {',
    '   ant = lista;',
    '   aux = lista->prox;',
    `   while (aux != NULL && indiceAtual != indice){
          ant = aux;
          aux = aux->prox;
          indiceAtual++;
        }`,
    '   ant->prox = novo;',
    '   novo->prox = aux;',
    ' }',
    ' return lista;',
    '}'
  ]
};

export const buscarPorValorSimples = {
  executionOrder: [
    {
      line: 0,
      animation: '',
      description: 'A função "BuscaPorValor" recebe o ponteiro para a lista e o valor a ser buscado como parâmetros. Ela retornará o elemento encontrado ou o valor NULL;',
    },
    {
      line: 1,
      animation: 'pointAuxToPosition-0',
      description: 'O ponteiro(*) "aux" é declarado apontando para o primeiro elemento da lista',
    },
    {
      line: 2,
      animation: 'searchValue',
      description: 'Enquanto não chegar ao fim da lista e enquanto o valor não for encontrado, o ponteiro(*) "aux" será atualizado para apontar para o próximo elemento.',
    },
    {
      line: 3,
      animation: '',
      description: 'Retorna o ponteiro(*) "aux", que pode estar apontando para o elemento encontrado ou para NULL, caso o elemento não tenha sido encontrado.',
    },

  ],
  code: [
    'struct elemento *BuscaPorValor(struct elemento *lista, int numero){',
    ' struct elemento *aux = lista;',
    ` while (aux != NULL && aux->valor != numero),
          aux = aux->prox;`,
    ' return aux;',
    '}'
  ]
};

export const buscarPorIndiceSimples = {
  executionOrder: [
    {
      line: 0,
      animation: '',
      description: 'A função "BuscaPorIndice" recebe o ponteiro para a lista e o índice a ser buscado como parâmetros. Ela retornará o elemento encontrado ou o valor NULL;',
    },
    {
      line: 1,
      animation: '',
      description: 'A variável indiceAtual, que armazena em qual indice o ponteiro "aux" está, é inicializada com o valor 0.',
    },
    {
      line: 2,
      animation: 'pointAuxToPosition-0',
      description: 'O ponteiro(*) "aux" é declarado apontando para o primeiro elemento da lista',
    },
    {
      line: 3,
      animation: 'searchIndex-nullable',
      description: 'Enquanto não chegar ao fim da lista e enquanto o índice não for encontrado, o ponteiro(*) "aux" será atualizado para apontar para o próximo elemento e o indiceAtual será incrementado em uma unidade.',
    },
    {
      line: 4,
      animation: '',
      description: 'Retorna o ponteiro(*) "aux", que pode estar apontando para o elemento encontrado ou para NULL, caso o elemento não tenha sido encontrado.',
    },

  ],
  code: [
    'struct elemento *BuscaPorIndice(struct elemento *lista, int indice){',
    '  int indiceAtual = 0;',
    '  struct elemento *aux = lista;',
    `  while (aux != NULL && indiceAtual != indice){
          aux = aux->prox;
          indiceAtual++;`,
    '  return aux;',
    '}'
  ]
};

export const removerPorValorSimples = {
  executionOrder: [
    {
      line: 0,
      animation: '',
      description: 'A função "RemovePorValor" recebe o ponteiro para a lista e o valor do elemento a ser revomido como parâmetros. Ela retornará a lista sem o elemento;',
    },
    {
      line: 1,
      animation: 'if-verifyEmptyList-4',
      description: 'Verifica se a lista está vazia e, caso esteja, não terá elemento a ser removido.',
    },
    {
      line: 2,
      animation: 'jumpToLine-20',
      description: 'Retorna a própria lista, já que não há elemento a ser removido.',
    },
    {
      line: 3,
      animation: '',
      description: '',
    },
    {
      line: 4,
      animation: 'pointAntToPosition-0',
      description: 'O ponteiro(*) "ant" é declarado apontando para o primeiro elemento da lista',
    },
    {
      line: 5,
      animation: 'pointAuxToPosition-1',
      description: 'O ponteiro(*) "aux" é declarado apontando para o segundo elemento da lista',
    }, {
      line: 6,
      animation: 'if-antEqualElement-10',
      description: 'Verifica se o primeiro elemento (apontado por "ant") é o elemento a ser removido. Caso seja, o ponteiro "ant" apontará para o segundo elemento da lista e o primeiro elemento será removido.',
    }, {
      line: 7,
      animation: 'pointListToAux',
      description: 'Já que o primeiro elemento da lista é o elemento a ser removido, aponta o inicio da lista para o segundo elemento.',
    }, {
      line: 8,
      animation: 'freeAnt',
      description: 'O comando "free" libera o espaço de memória alocado para o elemento apontado por "ant", removendo o elemento da lista.',
    }, {
      line: 9,
      animation: 'jumpToLine-18',
      description: '',
    }, {
      line: 10,
      animation: '',
      description: 'Caso o primeiro elemento não seja o elemento a ser removido, o elemento deve ser procurado na lista.',
    }, {
      line: 11,
      animation: 'searchValue-nullable-withAnt',
      description: 'Enquanto não chegarmos ao fim da lista ou encontrarmos o elemento, avaçamos cada ponteiro(*) para o respectivo próximo elemento.',
    }, {
      line: 12,
      animation: 'if-auxNotNull-18',
      description: 'Se saírmos da busca e "aux" for diferente de NULL, significa que o elemento foi encontrado.',
    }, {
      line: 13,
      animation: 'antElementPointsToAuxProx',
      description: 'Ligamos o elemento anterior ao elemento que será excluído, com o elemento posterior ao elemento que será excluído. Desvinculando esse elemento da lista.',
    }, {
      line: 14,
      animation: 'freeAux',
      description: 'O comando "free" libera o espaço de memória alocado para o elemento apontado por "aux", removendo o elemento da lista.',
    }, {
      line: 15,
      animation: '',
      description: '',
    }, {
      line: 16,
      animation: '',
      description: '',
    }, {
      line: 17,
      animation: '',
      description: '',
    }, {
      line: 18,
      animation: '',
      description: 'Retorna retorna a lista sem o elemento removido.',
    },

  ],
  code: [
    'struct elemento *RemovePorValor(struct elemento *lista, int numero){',
    ' if (lista == NULL){',
    '  return NULL; ',
    ' }',
    ' struct elemento *ant = lista;',
    ' struct elemento *aux = ant->prox;',
    ' if (ant->valor == numero){',
    '   lista = aux;',
    '   free(ant);',
    ' }',
    ' else{',
    `   while (aux != NULL && aux->valor != numero){
          ant = aux;
          aux = aux->prox;
        }`,
    '   if (aux != NULL){',
    '     ant->prox = aux->prox;',
    '     free(aux);',
    '   }',
    ' }',
    ' return lista;',
    '}'
  ]
};

export const removerPorIndiceSimples = {
  executionOrder: [
    {
      line: 0,
      animation: '',
      description: 'A função "RemovePorIndice" recebe o ponteiro para a lista e o índice do elemento a ser revomido como parâmetros. Ela retornará a lista sem o elemento;',
    }, {
      line: 1,
      animation: 'if-verifyEmptyList-4',
      description: 'Verifica se a lista está vazia e, caso esteja, não terá elemento a ser removido.',
    }, {
      line: 2,
      animation: 'jumpToLine-20',
      description: 'Retorna a própria lista, já que não há elemento a ser removido.',
    }, {
      line: 3,
      animation: '',
      description: '',
    }, {
      line: 4,
      animation: '',
      description: 'Seta o índice inicial para o segundo elemento da lista.',
    }, {
      line: 5,
      animation: 'pointAntToPosition-0',
      description: 'O ponteiro(*) "ant" é declarado apontando para o primeiro elemento da lista',
    },
    {
      line: 6,
      animation: 'pointAuxToPosition-1',
      description: 'O ponteiro(*) "aux" é declarado apontando para o segundo elemento da lista',
    }, {
      line: 7,
      animation: 'if-antEqualIndex-11',
      description: 'Verifica se o primeiro elemento (apontado por "ant") está no índice a ser removido. Caso esteja, o ponteiro "lista"(início da lista) apontará para o segundo elemento da lista e o primeiro elemento será removido.',
    }, {
      line: 8,
      animation: 'pointListToAux',
      description: 'Já que o primeiro elemento da lista é o elemento a ser removido, aponta o inicio da lista para o segundo elemento.',
    }, {
      line: 9,
      animation: 'freeAnt',
      description: 'O comando "free" libera o espaço de memória alocado para o elemento apontado por "ant", removendo o elemento da lista.',
    }, {
      line: 10,
      animation: 'jumpToLine-18',
      description: '',
    }, {
      line: 11,
      animation: '',
      description: 'Caso o primeiro elemento não seja o elemento a ser removido, o índice deve ser procurado na lista.',
    }, {
      line: 12,
      animation: 'searchIndex-nullable-withAnt',
      description: 'Enquanto não chegarmos ao fim da lista ou encontrarmos o índice, avaçamos cada ponteiro(*) para o respectivo próximo elemento.',
    }, {
      line: 13,
      animation: 'if-auxNotNull-18',
      description: 'Se saírmos da busca e "aux" for diferente de NULL, significa que o índice foi encontrado.',
    }, {
      line: 14,
      animation: 'antElementPointsToAuxProx',
      description: 'Ligamos o elemento anterior ao elemento que será excluído, com o elemento posterior ao elemento que será excluído. Desvinculando esse elemento da lista.',
    }, {
      line: 15,
      animation: 'freeAux',
      description: 'O comando "free" libera o espaço de memória alocado para o elemento apontado por "aux", removendo o elemento da lista.',
    }, {
      line: 16,
      animation: '',
      description: '',
    }, {
      line: 17,
      animation: '',
      description: '',
    }, {
      line: 18,
      animation: '',
      description: 'Retorna retorna a lista sem o elemento removido.',
    },
  ],
  code: [
    'struct elemento * RemovePorIndice(struct elemento * lista, int indice){',
    ' if(lista == NULL){',
    '   return NULL;',
    ' }',
    ' int indiceAtual = 1;',
    ' struct elemento *ant = lista;',
    ' struct elemento *aux = ant-> prox;',
    ' if (indice == 0) {',
    '    lista = aux;',
    '    free(ant);',
    '  }',
    '  else {',
    `    while (aux != NULL && indiceAtual != indice) {
          ant = aux;
          aux = aux -> prox;
          indiceAtual++;
        }`,
    '   if (aux != NULL) {',
    '      ant->prox = aux->prox;',
    '      free(aux);',
    '    }',
    '  }',
    '  return lista;',
    '}',
  ]
}

export const criaListaSimples = {
  executionOrder: [
    { line: 0, animation: '', description: 'A função "CriaLista" não recebe parâmetros. Ela retornará a lista vazia.' },
    { line: 1, animation: 'createList', description: 'Declaração do ponteiro para o início da lista.' },
    { line: 2, animation: '', description: 'Retorna a lista vazia.' },
  ],
  code: [
    'struct elemento * CriaLista(){',
    ' struct elemento *lista = NULL;',
    ' return lista;',
    '}'
  ],
};

export const destroiListaFuncaoSimples = {
  executionOrder: [
    { line: 0, animation: '', description: 'A função "DestroiLista" recebe o ponteiro para a lista como parâmetro. Ela retornará a lista vazia.' },
    { line: 1, animation: '', description: 'Declaração do ponteiro auxiliar.' },
    { line: 2, animation: 'destroyList', description: 'Verifica se a lista está vazia e, caso esteja, não terá elemento a ser removido. Senão, percorre a lista removendo os elementos.' },
    { line: 3, animation: '', description: 'retorna a lista vazia.' },
  ],
  code: [
    'struct elemento * DestroiLista(struct elemento * lista){',
    ' struct elemento *aux;',
    ` while(lista != NULL) {
        aux = lista -> prox;
        free(lista);
        lista = aux;
      }`,
    ' return NULL;',
    '}',
  ]
}
