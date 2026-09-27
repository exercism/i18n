# Boas práticas

## Segue as boas práticas oficiais

As [boas práticas oficiais para Dockerfile](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/) têm muito conteúdo excelente sobre como melhorar os teus Dockerfiles.

## Desempenho

Deves otimizar sobretudo o desempenho (especialmente para test runners).
Isto garante que as tuas ferramentas correm o mais depressa possível e não excedem o tempo limite.

### Mede

Medir o tempo de execução com frequência é uma excelente forma de perceber o desempenho das ferramentas.
Cria o hábito de medir o tempo de execução tanto depois _como_ antes de uma alteração.
Mesmo quando tens a "certeza" de que uma alteração vai melhorar o desempenho, deves continuar a medir o tempo de execução.

#### Scripts

Sempre que possível, cria scripts para medir o desempenho automaticamente (também conhecido como _benchmarking_).
Uma ferramenta de linha de comandos muito útil é o [hyperfine](https://github.com/sharkdp/hyperfine), mas podes usar à vontade o que fizer mais sentido para as tuas ferramentas.

Os repositórios de ferramentas de track mais recentes têm acesso aos dois scripts seguintes:

1. `./bin/benchmark.sh`: mede o desempenho do código das ferramentas de track ([código-fonte](https://github.com/exercism/generic-test-runner/blob/main/bin/benchmark.sh))
2. `./bin/benchmark-in-docker.sh`: mede o desempenho da imagem Docker das ferramentas de track ([código-fonte](https://github.com/exercism/generic-test-runner/blob/main/bin/benchmark-in-docker.sh))

```exercism/note
Se estás a trabalhar num repositório de ferramentas de track sem estes ficheiros, podes copiá-los para o teu repositório através das ligações de código-fonte acima.
```

```exercism/caution
Os scripts de benchmarking podem ajudar a estimar o desempenho das ferramentas.
Tem em conta, no entanto, que o desempenho nos servidores de produção do Exercism é muitas vezes inferior.
```

### Experimenta imagens base diferentes

Tenta experimentar imagens base diferentes (por exemplo, Alpine em vez de Ubuntu) para ver se uma tem um desempenho (significativamente) melhor do que a outra.
Se o desempenho for relativamente igual, escolhe a imagem mais pequena.

### Tenta a rede internal

Verifica se usar a rede `internal` em vez de `none` melhora o desempenho.
Consulta a [documentação sobre redes](/docs/building/tooling/docker#network) para mais informações.

### Prefere comandos em tempo de construção a comandos em tempo de execução

As ferramentas de track executam um contentor Docker pontual e de curta duração, que realiza os seguintes passos.

1. É criado um contentor Docker.
2. O contentor Docker é executado com os argumentos corretos.
3. O contentor Docker é destruído.

Por isso, o código que corre no passo 2 corre em _todas as execuções das ferramentas_, sem exceção.
Por esta razão, reduzir a quantidade de código que corre no passo 2 é uma excelente forma de melhorar o desempenho.
Uma forma de o fazer é passar código de _tempo de execução_ para _tempo de construção_.
Enquanto o código de tempo de execução corre em todas as execuções das ferramentas, o código de tempo de construção só corre uma vez (quando a imagem Docker é construída).

O código de tempo de construção corre uma vez, como parte de um fluxo de trabalho do GitHub Actions.
Por isso, não há problema se o código que corre em tempo de construção for (relativamente) lento.

#### Exemplo: pré-compilar bibliotecas

Ao correr testes no test runner de Haskell, este precisa de compilar algumas bibliotecas base.
Como cada execução de testes acontece num contentor novo, isto significa que essa compilação era feita _em todas as execuções de testes_, sem exceção!
Para contornar isto, o [Dockerfile do test runner de Haskell](https://github.com/exercism/haskell-test-runner/blob/5264c460054649fc672c3d5932c2f3cb082e2405/Dockerfile) tem os dois comandos seguintes:

```dockerfile
COPY pre-compiled/ .
RUN stack build --resolver lts-20.18 --no-terminal --test --no-run-tests
```

Primeiro, o diretório `pre-compiled` é copiado para dentro da imagem.
Este diretório está configurado como um exercício de teste e depende das mesmas bibliotecas base de que o exercício real depende.
Depois, corremos os testes nesse diretório, o que é semelhante à forma como se correm os testes num exercício real.
Correr os testes vai fazer com que a base seja compilada, mas a diferença é que isto acontece em _tempo de construção_.
A imagem Docker resultante vai, assim, ter as suas bibliotecas base já compiladas.
Isto significa que não é preciso compilar em _tempo de execução_, o que resulta numa execução (muito) mais rápida.

#### Exemplo: pré-compilar binários

Algumas linguagens permitem compilar o código ahead-of-time ou just-in-time.
É um compromisso entre o tempo de construção e o tempo de execução e, mais uma vez, por razões de desempenho, preferimos a execução em tempo de construção.

O [Dockerfile do test runner de C#](https://github.com/exercism/csharp-test-runner/blob/b54122ef76cbf86eff0691daa33c8e50bc83979f/Dockerfile) usa esta abordagem, em que o test runner é compilado para um binário ahead-of-time (em tempo de construção), em vez de compilar o código just-in-time (em tempo de execução).
Isto significa que há menos trabalho a fazer em tempo de execução, o que deve ajudar a aumentar o desempenho.

## Tamanho

Deves tentar reduzir o tamanho da imagem, o que significa que ela vai:

- Ser publicada mais depressa
- Reduzir os nossos custos
- Melhorar o tempo de arranque de cada contentor

### Experimenta distribuições diferentes

Diferentes imagens de distribuições têm tamanhos diferentes.
Por exemplo, a imagem `alpine:3.20.2` é **dez vezes** mais pequena do que a imagem `ubuntu:24.10`:

```
REPOSITORY   TAG       SIZE
alpine       3.20.2    8.83MB
ubuntu       24.10     101MB
```

De um modo geral, as imagens baseadas em Alpine estão entre as mais pequenas, por isso muitas imagens de ferramentas são baseadas em Alpine.

### Experimenta imagens reduzidas

Algumas imagens têm variantes "slim" especiais, nas quais algumas funcionalidades foram removidas, o que resulta em imagens mais pequenas.
Por exemplo, a imagem `node:20.16.0-slim` é **cinco vezes** mais pequena do que a imagem `node:20.16.0`:

```
REPOSITORY   TAG            SIZE
node         20.16.0        1.09GB
node         20.16.0-slim   219MB
```

A razão pela qual as variantes "slim" são mais pequenas é que têm menos funcionalidades.
Pode ser que a tua imagem não precise das funcionalidades adicionais; se não precisar, considera usar a variante "slim".

### Remover o que não é preciso

Uma forma óbvia, mas excelente, de reduzir o tamanho da tua imagem é remover tudo o que não precisas.
Pode incluir coisas como:

- Ficheiros de código-fonte que já não são necessários depois de compilar um binário a partir deles
- Ficheiros destinados a arquiteturas diferentes da imagem Docker
- Documentação

#### Remove os ficheiros do gestor de pacotes

A maioria das imagens Docker precisa de instalar pacotes adicionais, o que normalmente é feito através de um gestor de pacotes.
Estes pacotes têm de ser instalados em _tempo de construção_ (uma vez que não há ligação à internet em _tempo de execução_).
Por isso, quaisquer ficheiros de cache ou de registo do gestor de pacotes devem ser removidos depois de instalares os pacotes adicionais.

##### apk

As distribuições que usam o gestor de pacotes `apk` (como o Alpine) devem usar a opção `--no-cache` ao usar `apk add` para instalar pacotes:

```dockerfile
RUN apk add --no-cache curl
```

##### apt-get/apt

As distribuições que usam o gestor de pacotes `apt-get`/`apk` (como o Ubuntu) devem executar os comandos `apt-get autoremove -y` e `rm -rf /var/lib/apt/lists/*` _depois_ de instalarem os pacotes e no mesmo comando `RUN`:

```dockerfile
RUN apt-get update && \
    apt-get install curl -y && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/*
```

### Usa construções em várias etapas

O Docker tem uma funcionalidade chamada [construções em várias etapas](https://docs.docker.com/build/building/multi-stage/).
Estas permitem-te dividir o teu Dockerfile em _etapas_ separadas, e só a última etapa acaba na imagem Docker produzida (o resto existe apenas para ajudar a construir a última etapa).
Podes pensar em cada etapa como um mini Dockerfile próprio; as etapas podem usar imagens base diferentes.

As construções em várias etapas são especialmente úteis quando o teu Dockerfile precisa de instalar pacotes que _só_ são necessários em tempo de construção.
Nesta situação, a estrutura geral do teu Dockerfile é assim:

1. Define uma nova etapa (vamos chamar-lhe a etapa "build").
   Esta etapa será usada _apenas_ em tempo de construção.
2. Instala os pacotes adicionais necessários (na etapa "build").
3. Executa os comandos que precisam dos pacotes adicionais (dentro da etapa "build").
4. Define uma nova etapa (vamos chamar-lhe a etapa "runtime").
   Esta etapa vai compor a imagem Docker resultante e é executada em tempo de execução.
5. Copia o(s) resultado(s) dos comandos executados no passo 3 (na etapa "build") para esta etapa (a etapa "runtime").

Com esta configuração, os pacotes adicionais são instalados _apenas_ na etapa "build" e _não_ na etapa "runtime", o que significa que não vão acabar na imagem Docker produzida.

#### Exemplo: descarregar ficheiros

O test runner de Fortran precisa do `curl` para descarregar alguns ficheiros.
No entanto, a sua imagem de tempo de execução _não_ precisa do `curl`, o que faz disto um caso de uso perfeito para uma construção em várias etapas.

Primeiro, o seu [Dockerfile](https://github.com/exercism/fortran-test-runner/blob/783e228d8449143d2040e68b95128bb791833a27/Dockerfile) define uma etapa (chamada "build") na qual o pacote `curl` é instalado.
Depois, usa o curl para descarregar ficheiros para essa etapa.

```dockerfile
FROM alpine:3.15 AS build

RUN apk add --no-cache curl

WORKDIR /opt/test-runner
COPY bust_cache .

WORKDIR /opt/test-runner/testlib
RUN curl -R -O https://raw.githubusercontent.com/exercism/fortran/main/testlib/CMakeLists.txt
RUN curl -R -O https://raw.githubusercontent.com/exercism/fortran/main/testlib/TesterMain.f90

WORKDIR /opt/test-runner
RUN curl -R -O https://raw.githubusercontent.com/exercism/fortran/main/config/CMakeLists.txt
```

A segunda parte do Dockerfile define uma nova etapa e copia os ficheiros descarregados da etapa "build" para a sua própria etapa, usando o comando `COPY`:

```dockerfile
FROM alpine:3.15

RUN apk add --no-cache coreutils jq gfortran libc-dev cmake make

WORKDIR /opt/test-runner
COPY --from=build /opt/test-runner/ .

COPY . .
ENTRYPOINT ["/opt/test-runner/bin/run.sh"]
```

##### Exemplo: instalar bibliotecas

O test runner de Ruby precisa que os pacotes `git`, `openssh`, `build-base`, `gcc` e `wget` estejam instalados antes de poder instalar as bibliotecas (gems) de que precisa.
O seu [Dockerfile](https://github.com/exercism/ruby-test-runner/blob/e57ed45b553d6c6411faeea55efa3a4754d1cdbf/Dockerfile) começa com uma etapa (com o nome `build`) que instala esses pacotes (através de `apk add`) e depois instala as dependências (através de `bundle install`):

```dockerfile
FROM ruby:3.2.2-alpine3.18 AS build

RUN apk update && apk upgrade && \
    apk add --no-cache git openssh build-base gcc wget git

COPY Gemfile Gemfile.lock .

RUN gem install bundler:2.4.18 && \
    bundle config set without 'development test' && \
    bundle install
```

De seguida, define a etapa que vai formar a imagem Docker resultante.
Esta etapa _não_ instala as dependências que a etapa anterior instalou; em vez disso, usa o comando `COPY` para copiar as bibliotecas instaladas da etapa "build" para a sua própria etapa:

```dockerfile
FROM ruby:3.2.2-alpine3.18

RUN apk add --no-cache bash

WORKDIR /opt/test-runner

COPY --from=build /usr/local/bundle /usr/local/bundle

COPY . .

ENTRYPOINT [ "sh", "/opt/test-runner/bin/run.sh" ]
```

```exercism/note
O [Dockerfile do test runner de C#](https://github.com/exercism/csharp-test-runner/blob/b54122ef76cbf86eff0691daa33c8e50bc83979f/Dockerfile) faz algo semelhante, só que neste caso a etapa de construção pode usar uma imagem Docker existente que já traz pré-instalados os pacotes adicionais necessários para instalar bibliotecas.
```

## Testes

### Usa testes de integração

Os testes unitários podem ser muito úteis, mas recomendamos que te concentres em escrever [testes de integração](https://en.wikipedia.org/wiki/Integration_testing).
A sua principal vantagem é que testam melhor como as ferramentas correm em produção e, por isso, ajudam a aumentar a confiança na implementação das tuas ferramentas.

#### Usa Docker

Para imitar o melhor possível o ambiente de produção, os testes de integração devem executar as ferramentas _como no ambiente de produção_.
Isto significa construir a imagem Docker e depois executar a imagem construída sobre uma solução para verificar a sua saída.

#### Usa testes golden

Os testes de integração devem ser definidos como [testes golden](https://ro-che.info/articles/2017-12-04-golden-tests), que são testes em que a saída esperada é guardada num ficheiro.
Isto é perfeito para testes de integração de ferramentas de track, uma vez que a saída das ferramentas também consiste em ficheiros.

##### Exemplo: test runner

Quando executas o test runner sobre uma solução, a sua saída é um ficheiro `results.json`.
Podemos depois comparar este ficheiro com um ficheiro de saída "conhecido como bom" (isto é, "esperado"), chamado `expected_results.json`, para verificar se o test runner funciona como pretendido.

## Segurança

A segurança é uma das principais razões pelas quais usamos contentores Docker para executar as nossas ferramentas.

### Dá preferência a imagens oficiais

Há muitas imagens Docker no [Docker Hub](https://hub.docker.com/), mas tenta usar as [oficiais](https://hub.docker.com/search?q=&image_filter=official).
Estas imagens são cuidadas e têm (muito) menos probabilidade de serem inseguras.

### Fixa as versões

Para garantir que as construções são estáveis (ou seja, que não se estragam de repente), deves fixar sempre as tuas imagens base em etiquetas específicas.
Isto significa que, em vez de:

```dockerfile
FROM alpine:latest
```

deves usar:

```dockerfile
FROM alpine:3.20.2
```

Com a segunda opção, as construções usam sempre a mesma versão.

### Executa como um utilizador sem privilégios

Por predefinição, muitas imagens são executadas com um utilizador que tem privilégios de root.
Deves considerar executar como um utilizador sem privilégios.

```dockerfile
FROM alpine

RUN groupadd -r myuser && useradd -r -g myuser myuser

# RUN <COMMANDS THAT REQUIRE ROOT USER, E.G. INSTALLING PACKAGES>

USER myuser
```

### Atualiza os repositórios de pacotes para a versão mais recente

É (quase) sempre uma boa ideia instalar as versões mais recentes

```dockerfile
RUN apt-get update && \
    apt-get install curl
```

### Suporta um sistema de ficheiros só de leitura

Encorajamos que os ficheiros Docker sejam escritos a pensar num sistema de ficheiros só de leitura.
Os únicos diretórios que deves assumir como sendo de escrita são:

- O diretório da solução (passado como segundo argumento)
- O diretório de saída (passado como terceiro argumento)
- O diretório `/tmp`

```exercism/caution
O nosso ambiente de produção atualmente _não_ impõe um sistema de ficheiros só de leitura, mas poderá vir a impor no futuro.
Por esta razão, o modelo base para um novo test runner/analyzer/representer começa com um sistema de ficheiros só de leitura.
Se não conseguires que as coisas funcionem num ficheiro só de leitura, podes (por agora) assumir um sistema de ficheiros de escrita.
```
