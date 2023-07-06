//Trechos de códigos extraídos das apresentações de slides do profressor André Renato
export const STRUCT_SIMPLES = `
struct elemento{
    int valor;
    struct elemento *prox;
};`

export const INICIA_LISTA_SIMPLES = `
int main(void){
    struct elemento *inicio;
    inicio = CriaLista();
    return 0;
}
`

export const CRIA_LISTA_FUNCAO_SIMPLES = `
struct elemento *CriaLista(){
    return NULL;
}`

export const CRIA_LISTA_USO_SIMPLES = `struct elemento *inicio;
inicio = CriaLista();`

export const CRIA_ELEMENTO_FUNCAO_SIMPLES = `
struct elemento *CriaElemento(int numero){
    struct elemento *resp = (struct elemento*) malloc(sizeof(struct elemento));
    resp->valor = numero;
    resp->prox = NULL;
    return resp;
}`

export const INSERE_INICIO_FUNCAO_SIMPLES = `
struct elemento *InsereInicio(elemento *lista, int numero){
    struct elemento *novo = CriaElemento(numero);
    novo->prox = lista;
    lista = novo;
    return lista;
}`

export const INSERE_FIM_FUNCAO_SIMPLES = `
struct elemento *InsereFim(struct elemento *lista, int numero){
    struct elemento *aux;
    struct elemento *novo = CriaElemento(numero);
    if (lista == NULL){
        lista = novo;
    }
    else{
        aux = lista;
        while (aux->prox != NULL){
            aux = aux->prox;
        }
        aux->prox = novo;
    }
    return lista;
}`

export const INSERE_INDICE_FUNCAO_SIMPLES = `
struct elemento *InsereIndice(struct elemento *lista, int numero, int indice){
    struct elemento *aux;
    struct elemento *novo = CriaElemento(numero);
    int indiceAtual = 1;
    if (lista == NULL) 
    {
      lista = novo;
    } 
    else if (indice == 0) 
    {
      novo->prox = lista;
      lista = novo;
    } 
    else {
      aux = lista->prox;
      ant = lista;
      while (aux != NULL && indiceAtual != indice) 
      {
        ant = aux;
        aux = aux->prox;
        indiceAtual++;
      }
      if (indiceAtual == indice) 
      {
        ant->prox = novo;
        novo->prox = aux;
      }
    }
    return lista;
}`

export const BUSCA_FUNCAO_SIMPLES = `
struct elemento *BuscaPorValor(struct elemento *lista, int numero){
    struct elemento *aux = lista;
    while (aux != NULL && aux->valor != numero)
        aux = aux->prox;
    return aux;
}`

export const BUSCA_FUNCAO_SIMPLES_INDICE = `
struct elemento *BuscaPorIndice(struct elemento *lista, int indice){
    int indiceAtual = 0;
    struct elemento *aux = lista;
    while (aux != NULL && indiceAtual != indice){
        aux = aux->prox;
        indiceAtual++;
    return aux;
}`

export const REMOVE_FUNCAO_SIMPLES = `
struct elemento *RemovePorValor(struct elemento *lista, int numero){
    if (lista == NULL) return NULL;
    struct elemento *ant = lista;
    struct elemento *aux = ant->prox;
    if (ant->valor == numero){
        lista = aux;
        free(ant);
    }
    else{
        while (aux != NULL && aux->valor != numero){
            ant = aux;
            aux = aux->prox;
        }
        if (aux != NULL){
            ant->prox = aux->prox;
            free(aux);
        }
    }
    return lista;
}`

export const REMOVE_FUNCAO_SIMPLES_INDICE = `
struct elemento *RemovePorIndice(struct elemento *lista, int indice){
    if (lista == NULL) return NULL;
    int indiceAtual = 1;
    struct elemento *ant = lista;
    struct elemento *aux = ant->prox;
    if (indice == 0){
        lista = aux;
        free(ant);
    }
    else{
        while (aux != NULL && indiceAtual != indice){
            ant = aux;
            aux = aux->prox;
            indiceAtual++;
        }
        if (aux != NULL){
            ant->prox = aux->prox;
            free(aux);
        }
    }
    return lista;
}`

export const DESTROI_LISTA_FUNCAO_SIMPLES = `
struct elemento *DestroiLista(struct elemento *lista){
    struct elemento *aux;
    while (lista != NULL){
        aux = lista->prox;
        free(lista);
        lista = aux;
    }
    return NULL;
}`

