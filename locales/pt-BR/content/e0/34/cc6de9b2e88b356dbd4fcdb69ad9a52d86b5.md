# Instruções adicionais

## Estrutura do projeto

* `src` contém a sua solução do exercício
* `spec` contém os testes que serão rodados no exercício

## Rodando os testes

Se você estiver no diretório certo (ou seja, o que contém `src` e `spec`), você pode rodar os testes desse exercício com `crystal spec`:

```bash
$ pwd
/Users/johndoe/Code/exercism/crystal/hello-world

$ ls
GETTING_STARTED.md README.md          spec               src

$ crystal spec
```

Isso vai rodar todos os arquivos de teste do diretório `spec`.

Em cada arquivo de teste, todos os testes, menos o primeiro, foram pulados.

Assim que um teste passar, você pode desbloquear o próximo trocando `pending` por `it`.

## Enviando a sua solução

Não se esqueça de enviar o arquivo-fonte do diretório `src` na hora de enviar a sua solução:

```bash
$ exercism submit src/hello_world.cr
```
