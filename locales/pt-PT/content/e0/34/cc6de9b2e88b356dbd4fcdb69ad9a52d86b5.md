# Instruções adicionais

## Estrutura do projeto

* `src` contém a tua solução para o exercício
* `spec` contém os testes a executar para o exercício

## Executar os testes

Se estiveres na pasta certa (ou seja, aquela que contém `src` e `spec`), podes executar os testes desse exercício com `crystal spec`:

```bash
$ pwd
/Users/johndoe/Code/exercism/crystal/hello-world

$ ls
GETTING_STARTED.md README.md          spec               src

$ crystal spec
```

Isto vai executar todos os ficheiros de teste na pasta `spec`.

Em cada ficheiro de teste, todos os testes exceto o primeiro estão ignorados.

Assim que conseguires que um teste passe, podes deixar de ignorar o seguinte alterando `pending` para `it`.

## Submeter a tua solução

Certifica-te de que submetes o ficheiro de origem na pasta `src` quando submeteres a tua solução:

```bash
$ exercism submit src/hello_world.cr
```
