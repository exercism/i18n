# Boas práticas

## Siga as boas práticas oficiais

As [boas práticas oficiais de Dockerfile](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/) têm muito conteúdo ótimo sobre como melhorar os seus Dockerfiles.

## Desempenho

Você deve otimizar principalmente o desempenho (especialmente para test runners).
Isso garante que as suas ferramentas executem o mais rápido possível e não atinjam o tempo limite.

### Meça

Medir o tempo de execução com frequência é uma ótima maneira de ter uma noção do desempenho das ferramentas.
Crie o hábito de medir o tempo de execução tanto depois _quanto_ antes de uma mudança.
Mesmo quando você tiver "certeza" de que uma mudança vai melhorar o desempenho, ainda assim meça o tempo de execução.

#### Scripts

Quando possível, crie scripts para medir o desempenho automaticamente (também conhecido como _benchmarking_).
Uma ferramenta de linha de comando muito útil é o [hyperfine](https://github.com/sharkdp/hyperfine), mas fique à vontade para usar o que fizer mais sentido para as suas ferramentas.

Repositórios mais recentes de ferramentas da track têm acesso aos dois scripts a seguir:

1. `./bin/benchmark.sh`: mede o desempenho do código das ferramentas da track ([código-fonte](https://github.com/exercism/generic-test-runner/blob/main/bin/benchmark.sh))
2. `./bin/benchmark-in-docker.sh`: mede o desempenho da imagem Docker das ferramentas da track ([código-fonte](https://github.com/exercism/generic-test-runner/blob/main/bin/benchmark-in-docker.sh))

```exercism/note
Se você estiver trabalhando em um repositório de ferramentas da track sem esses arquivos, fique à vontade para copiá-los para o seu repositório usando os links de código-fonte acima.
```

```exercism/caution
Scripts de benchmark podem ajudar a estimar o desempenho das ferramentas.
Lembre-se, porém, de que o desempenho nos servidores de produção do Exercism costuma ser menor.
```

### Experimente diferentes imagens base

Experimente diferentes imagens base (por exemplo, Alpine em vez de Ubuntu) para ver se uma tem um desempenho (significativamente) melhor que a outra.
Se o desempenho for relativamente igual, fique com a imagem menor.

### Experimente a rede interna

Verifique se usar a rede `internal` em vez de `none` melhora o desempenho.
Consulte a [documentação de rede](/docs/building/tooling/docker#network) para mais informações.

### Prefira comandos de tempo de build a comandos de tempo de execução

As ferramentas da track executam um contêiner Docker usado uma única vez e de curta duração, que executa os seguintes passos.

1. Um contêiner Docker é criado.
2. O contêiner Docker é executado com os argumentos corretos.
3. O contêiner Docker é destruído.

Por isso, o código que executa no passo 2 executa a _cada execução das ferramentas_.
Por esse motivo, reduzir a quantidade de código que executa no passo 2 é uma ótima forma de melhorar o desempenho.
Uma forma de fazer isso é mover código do _tempo de execução_ para o _tempo de build_.
Enquanto o código de tempo de execução executa a cada execução das ferramentas, o código de tempo de build executa apenas uma vez (quando a imagem Docker é construída).

O código de tempo de build executa uma vez como parte de um fluxo de trabalho do GitHub Actions.
Por isso, não tem problema se o código que executa no tempo de build for (relativamente) lento.

#### Exemplo: pré-compilar bibliotecas

Ao executar testes no test runner de Haskell, é preciso compilar algumas bibliotecas base.
Como cada execução de testes acontece em um contêiner novo, isso significa que essa compilação era feita _a cada execução de testes_!
Para contornar isso, o [Dockerfile do test runner de Haskell](https://github.com/exercism/haskell-test-runner/blob/5264c460054649fc672c3d5932c2f3cb082e2405/Dockerfile) tem os dois comandos a seguir:

```dockerfile
COPY pre-compiled/ .
RUN stack build --resolver lts-20.18 --no-terminal --test --no-run-tests
```

Primeiro, o diretório `pre-compiled` é copiado para a imagem.
Esse diretório é configurado como um exercício de teste e depende das mesmas bibliotecas base das quais o exercício real depende.
Em seguida, executamos os testes nesse diretório, de forma parecida com a execução dos testes de um exercício real.
Executar os testes faz com que a base seja compilada, mas a diferença é que isso acontece no _tempo de build_.
A imagem Docker resultante, assim, já terá as suas bibliotecas base compiladas.
Isso significa que não é preciso compilar no _tempo de execução_, o que resulta em uma execução (muito) mais rápida.

#### Exemplo: pré-compilar binários

Algumas linguagens permitem que o código seja compilado ahead-of-time ou just-in-time.
É um trade-off entre tempo de build e tempo de execução e, novamente, favorecemos a execução no tempo de build por questões de desempenho.

O [Dockerfile do test runner de C#](https://github.com/exercism/csharp-test-runner/blob/b54122ef76cbf86eff0691daa33c8e50bc83979f/Dockerfile) usa essa abordagem: o test runner é compilado para um binário ahead-of-time (no tempo de build) em vez de compilar o código just-in-time (no tempo de execução).
Isso significa que há menos trabalho a fazer no tempo de execução, o que deve ajudar a aumentar o desempenho.

## Tamanho

Você deve tentar reduzir o tamanho da imagem, o que significa que ela vai:

- Ser publicada mais rapidamente
- Reduzir os custos para nós
- Melhorar o tempo de inicialização de cada contêiner

### Experimente diferentes distribuições

Imagens de distribuições diferentes terão tamanhos diferentes.
Por exemplo, a imagem `alpine:3.20.2` é **dez vezes** menor que a imagem `ubuntu:24.10`:

```
REPOSITORY   TAG       SIZE
alpine       3.20.2    8.83MB
ubuntu       24.10     101MB
```

Em geral, as imagens baseadas em Alpine estão entre as menores imagens, por isso muitas imagens de ferramentas são baseadas em Alpine.

### Experimente imagens enxutas

Algumas imagens têm variantes "slim" especiais, nas quais alguns recursos foram removidos, o que resulta em tamanhos de imagem menores.
Por exemplo, a imagem `node:20.16.0-slim` é **cinco vezes** menor que a imagem `node:20.16.0`:

```
REPOSITORY   TAG            SIZE
node         20.16.0        1.09GB
node         20.16.0-slim   219MB
```

As variantes "slim" são menores porque têm menos recursos.
Pode ser que a sua imagem não precise dos recursos adicionais e, se não precisar, considere usar a variante "slim".

### Remover partes desnecessárias

Uma forma óbvia, mas ótima, de reduzir o tamanho da sua imagem é remover tudo o que você não precisa.
Isso pode incluir coisas como:

- Arquivos-fonte que não são mais necessários depois de compilar um binário a partir deles
- Arquivos destinados a arquiteturas diferentes da imagem Docker
- Documentação

#### Remova arquivos do gerenciador de pacotes

A maioria das imagens Docker precisa instalar pacotes adicionais, o que geralmente é feito por meio de um gerenciador de pacotes.
Esses pacotes precisam ser instalados no _tempo de build_ (já que não há conexão com a internet no _tempo de execução_).
Portanto, qualquer arquivo de cache ou de controle do gerenciador de pacotes deve ser removido depois de instalar os pacotes adicionais.

##### apk

Distribuições que usam o gerenciador de pacotes `apk` (como o Alpine) devem usar a flag `--no-cache` ao usar `apk add` para instalar pacotes:

```dockerfile
RUN apk add --no-cache curl
```

##### apt-get/apt

Distribuições que usam o gerenciador de pacotes `apt-get`/`apk` (como o Ubuntu) devem executar os comandos `apt-get autoremove -y` e `rm -rf /var/lib/apt/lists/*` _depois_ de instalar os pacotes e no mesmo comando `RUN`:

```dockerfile
RUN apt-get update && \
    apt-get install curl -y && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/*
```

### Use builds com múltiplos estágios

O Docker tem um recurso chamado [builds com múltiplos estágios](https://docs.docker.com/build/building/multi-stage/).
Eles permitem dividir o seu Dockerfile em _estágios_ separados, e apenas o último estágio acaba na imagem Docker produzida (o restante existe só para dar suporte à construção do último estágio).
Você pode pensar em cada estágio como um mini Dockerfile próprio; os estágios podem usar imagens base diferentes.

Builds com múltiplos estágios são especialmente úteis quando o seu Dockerfile exige a instalação de pacotes que são necessários _apenas_ no tempo de build.
Nessa situação, a estrutura geral do seu Dockerfile fica assim:

1. Defina um novo estágio (vamos chamá-lo de estágio "build").
   Esse estágio será usado _apenas_ no tempo de build.
2. Instale os pacotes adicionais necessários (no estágio "build").
3. Execute os comandos que precisam dos pacotes adicionais (dentro do estágio "build").
4. Defina um novo estágio (vamos chamá-lo de estágio "runtime").
   Esse estágio vai compor a imagem Docker resultante e será executado no tempo de execução.
5. Copie o(s) resultado(s) dos comandos executados no passo 3 (no estágio "build") para este estágio (o estágio "runtime").

Com essa configuração, os pacotes adicionais são instalados _apenas_ no estágio "build" e _não_ no estágio "runtime", o que significa que eles não vão acabar na imagem Docker produzida.

#### Exemplo: baixar arquivos

O test runner de Fortran precisa do `curl` para baixar alguns arquivos.
No entanto, a sua imagem de tempo de execução _não_ precisa do `curl`, o que faz disso um caso de uso perfeito para um build com múltiplos estágios.

Primeiro, o seu [Dockerfile](https://github.com/exercism/fortran-test-runner/blob/783e228d8449143d2040e68b95128bb791833a27/Dockerfile) define um estágio (chamado "build") no qual o pacote `curl` é instalado.
Em seguida, usa o curl para baixar arquivos para esse estágio.

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

A segunda parte do Dockerfile define um novo estágio e copia os arquivos baixados do estágio "build" para o seu próprio estágio usando o comando `COPY`:

```dockerfile
FROM alpine:3.15

RUN apk add --no-cache coreutils jq gfortran libc-dev cmake make

WORKDIR /opt/test-runner
COPY --from=build /opt/test-runner/ .

COPY . .
ENTRYPOINT ["/opt/test-runner/bin/run.sh"]
```

##### Exemplo: instalar bibliotecas

O test runner de Ruby precisa que os pacotes `git`, `openssh`, `build-base`, `gcc` e `wget` sejam instalados antes que as suas bibliotecas necessárias (gems) possam ser instaladas.
O seu [Dockerfile](https://github.com/exercism/ruby-test-runner/blob/e57ed45b553d6c6411faeea55efa3a4754d1cdbf/Dockerfile) começa com um estágio (com o nome `build`) que instala esses pacotes (via `apk add`) e depois instala as dependências (via `bundle install`):

```dockerfile
FROM ruby:3.2.2-alpine3.18 AS build

RUN apk update && apk upgrade && \
    apk add --no-cache git openssh build-base gcc wget git

COPY Gemfile Gemfile.lock .

RUN gem install bundler:2.4.18 && \
    bundle config set without 'development test' && \
    bundle install
```

Em seguida, ele define o estágio que vai compor a imagem Docker resultante.
Esse estágio _não_ instala as dependências que o estágio anterior instalou; em vez disso, usa o comando `COPY` para copiar as bibliotecas instaladas do estágio de build para o seu próprio estágio:

```dockerfile
FROM ruby:3.2.2-alpine3.18

RUN apk add --no-cache bash

WORKDIR /opt/test-runner

COPY --from=build /usr/local/bundle /usr/local/bundle

COPY . .

ENTRYPOINT [ "sh", "/opt/test-runner/bin/run.sh" ]
```

```exercism/note
O [Dockerfile do test runner de C#](https://github.com/exercism/csharp-test-runner/blob/b54122ef76cbf86eff0691daa33c8e50bc83979f/Dockerfile) faz algo parecido, só que neste caso o estágio de build pode usar uma imagem Docker existente que já tem pré-instalados os pacotes adicionais necessários para instalar bibliotecas.
```

## Testes

### Use testes de integração

Testes unitários podem ser muito úteis, mas recomendamos focar em escrever [testes de integração](https://en.wikipedia.org/wiki/Integration_testing).
O principal benefício deles é que testam melhor como as ferramentas se comportam em produção e, assim, ajudam a aumentar a confiança na implementação das suas ferramentas.

#### Use o Docker

Para imitar o ambiente de produção o melhor possível, os testes de integração devem executar as ferramentas _como no ambiente de produção_.
Isso significa construir a imagem Docker e depois executar a imagem construída em cima de uma solução para verificar a sua saída.

#### Use testes golden

Os testes de integração devem ser definidos como [testes golden](https://ro-che.info/articles/2017-12-04-golden-tests), que são testes nos quais a saída esperada é armazenada em um arquivo.
Isso é perfeito para testes de integração das ferramentas da track, já que a saída das ferramentas também são arquivos.

##### Exemplo: test runner

Ao executar o test runner em uma solução, a sua saída é um arquivo `results.json`.
Podemos então comparar esse arquivo com um arquivo de saída "conhecidamente correto" (ou seja, "esperado") (chamado `expected_results.json`) para verificar se o test runner funciona como esperado.

## Segurança

A segurança é um dos principais motivos pelos quais usamos contêineres Docker para executar as nossas ferramentas.

### Prefira imagens oficiais

Há muitas imagens Docker no [Docker Hub](https://hub.docker.com/), mas procure usar as [oficiais](https://hub.docker.com/search?q=&image_filter=official).
Essas imagens são curadas e têm uma chance (muito) menor de serem inseguras.

### Fixe as versões

Para garantir que os builds sejam estáveis (ou seja, que não quebrem de repente), você deve sempre fixar as suas imagens base em tags específicas.
Ou seja, em vez de:

```dockerfile
FROM alpine:latest
```

use:

```dockerfile
FROM alpine:3.20.2
```

Com a segunda opção, os builds sempre usarão a mesma versão.

### Execute como um usuário sem privilégios

Por padrão, muitas imagens executam com um usuário que tem privilégios de root.
Considere executar como um usuário sem privilégios.

```dockerfile
FROM alpine

RUN groupadd -r myuser && useradd -r -g myuser myuser

# RUN <COMMANDS THAT REQUIRE ROOT USER, E.G. INSTALLING PACKAGES>

USER myuser
```

### Atualize os repositórios de pacotes para a versão mais recente

É (quase) sempre uma boa ideia instalar as versões mais recentes

```dockerfile
RUN apt-get update && \
    apt-get install curl
```

### Dê suporte a sistema de arquivos somente leitura

Incentivamos que os arquivos Docker sejam escritos usando um sistema de arquivos somente leitura.
Os únicos diretórios que você deve considerar graváveis são:

- O diretório da solução (passado como o segundo argumento)
- O diretório de saída (passado como o terceiro argumento)
- O diretório `/tmp`

```exercism/caution
Nosso ambiente de produção atualmente _não_ impõe um sistema de arquivos somente leitura, mas podemos impor no futuro.
Por isso, o template base de um novo test runner/analyzer/representer já começa com um sistema de arquivos somente leitura.
Se você não conseguir fazer as coisas funcionarem em um arquivo somente leitura, fique à vontade para (por enquanto) considerar um sistema de arquivos gravável.
```
