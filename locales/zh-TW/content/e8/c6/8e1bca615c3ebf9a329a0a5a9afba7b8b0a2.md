# 最佳做法

## 遵循官方最佳做法

官方的 [Dockerfile 最佳做法](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/) 裡面有大量很棒的內容，說明如何改進你的 Dockerfile。

## 效能

你應該以效能為優先來最佳化（尤其是測試執行器）。
這能確保你的工具跑得盡可能快，而且不會逾時。

### 測量

測量執行時間通常是感受工具效能的好方法。
養成在變更_前_和變更_後_都測量執行時間的習慣。
即使你覺得自己「很確定」某項變更會提升效能，還是應該測量執行時間。

#### 指令碼

情況允許的話，建立指令碼來自動測量效能（也就是所謂的_基準測試_）。
[hyperfine](https://github.com/sharkdp/hyperfine) 是非常好用的命令列工具，不過你也能自由選用最適合你工具的做法。

較新的軌道工具儲存庫可以使用以下兩個指令碼：

1. `./bin/benchmark.sh`：對軌道工具的程式碼做基準測試（[原始碼](https://github.com/exercism/generic-test-runner/blob/main/bin/benchmark.sh)）
2. `./bin/benchmark-in-docker.sh`：對軌道工具的 Docker 映像檔做基準測試（[原始碼](https://github.com/exercism/generic-test-runner/blob/main/bin/benchmark-in-docker.sh)）

```exercism/note
如果你正在處理的軌道工具儲存庫沒有這些檔案，歡迎用上面的原始碼連結把它們複製到你的儲存庫。
```

```exercism/caution
基準測試指令碼可以協助估算工具的效能。
不過請記住，在 Exercism 正式伺服器上的效能通常會比較低。
```

### 嘗試不同的基礎映像檔

試著嘗試不同的基礎映像檔（例如用 Alpine 取代 Ubuntu），看看其中一個是否（明顯）優於另一個。
如果效能差不多，就選最小的那個映像檔。

### 試試 internal 網路

檢查使用`internal`網路而非`none`是否能提升效能。
詳情請參閱[網路文件](/docs/building/tooling/docker#network)。

### 優先採用建置期指令，而非執行期指令

軌道工具會執行一個一次性、短命的 Docker 容器，這個容器會執行以下步驟。

1. 建立 Docker 容器。
2. 以正確的引數執行 Docker 容器。
3. 銷毀 Docker 容器。

因此，第 2 步執行的程式碼會_每一次工具執行_都跑一遍。
基於這個原因，減少第 2 步執行的程式碼量是提升效能的好方法。
其中一種做法是把程式碼從_執行期_移到_建置期_。
執行期的程式碼每次工具執行都會跑，而建置期的程式碼只會執行一次（在建置 Docker 映像檔時）。

建置期的程式碼是 GitHub Actions 工作流的一部分，只會執行一次。
因此，即使建置期執行的程式碼（相對）很慢也沒關係。

#### 範例：預先編譯函式庫

在 Haskell 測試執行器中執行測試時，需要先編譯一些基礎函式庫。
由於每次測試都在全新的容器裡執行，這表示_每一次測試執行_都要做一次這樣的編譯！
為了避開這點，[Haskell 測試執行器的 Dockerfile](https://github.com/exercism/haskell-test-runner/blob/5264c460054649fc672c3d5932c2f3cb082e2405/Dockerfile) 有下面這兩道指令：

```dockerfile
COPY pre-compiled/ .
RUN stack build --resolver lts-20.18 --no-terminal --test --no-run-tests
```

首先，`pre-compiled` 目錄會被複製到映像檔裡。
這個目錄被設定成一份測試練習，並且相依於和實際練習相同的基礎函式庫。
接著我們對那個目錄執行測試，這和實際練習執行測試的方式類似。
執行測試會讓基礎函式庫被編譯，但差別在於這發生在_建置期_。
因此產生的 Docker 映像檔裡，基礎函式庫已經編譯好了。
這表示_執行期_不需要再編譯，執行速度因此（大幅）提升。

#### 範例：預先編譯執行檔

有些語言允許程式碼提前編譯或即時編譯。
這是建置期與執行期之間的取捨，同樣基於效能考量，我們偏好建置期執行。

[C# 測試執行器的 Dockerfile](https://github.com/exercism/csharp-test-runner/blob/b54122ef76cbf86eff0691daa33c8e50bc83979f/Dockerfile) 就採用這個做法：測試執行器在建置期提前編譯成執行檔，而不是在執行期即時編譯程式碼。
這表示執行期要做的事更少，有助於提升效能。

## 大小

你應該試著縮小映像檔的大小，這表示它會：

- 部署得更快
- 降低我們的成本
- 改善每個容器的啟動時間

### 試試不同的發行版

不同的發行版映像檔大小各不相同。
舉例來說，`alpine:3.20.2` 映像檔比 `ubuntu:24.10` 映像檔**小十倍**：

```
REPOSITORY   TAG       SIZE
alpine       3.20.2    8.83MB
ubuntu       24.10     101MB
```

一般來說，以 Alpine 為基礎的映像檔是最小的映像檔之一，所以很多工具映像檔都採用 Alpine。

### 試試精簡版的映像檔

有些映像檔有特別的「slim」變體，其中移除了一些功能，因此映像檔更小。
舉例來說，`node:20.16.0-slim` 映像檔比 `node:20.16.0` 映像檔**小五倍**：

```
REPOSITORY   TAG            SIZE
node         20.16.0        1.09GB
node         20.16.0-slim   219MB
```

「slim」變體之所以比較小，是因為功能比較少。
你的映像檔可能不需要那些額外功能，如果不需要，就考慮使用「slim」變體。

### 移除不需要的部分

減少映像檔大小一個顯而易見但很有效的方法，就是移除任何你不需要的東西。
這些可能包括：

- 從原始碼建置成執行檔之後就不再需要的原始檔
- 針對與 Docker 映像檔不同架構的檔案
- 文件

#### 移除套件管理員的檔案

大多數 Docker 映像檔都需要安裝額外的套件，這通常是透過套件管理員完成。
這些套件必須在_建置期_安裝（因為_執行期_沒有網路連線）。
因此，安裝完額外套件後，應該移除套件管理員的快取與記錄檔案。

##### apk

使用`apk`套件管理員的發行版（例如 Alpine）在使用`apk add`安裝套件時，應該加上`--no-cache`旗標：

```dockerfile
RUN apk add --no-cache curl
```

##### apt-get/apt

使用`apt-get`/`apk`套件管理員的發行版（例如 Ubuntu）應該在安裝套件_之後_，於同一個`RUN`指令中執行`apt-get autoremove -y`和`rm -rf /var/lib/apt/lists/*`：

```dockerfile
RUN apt-get update && \
    apt-get install curl -y && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/*
```

### 使用多階段建置

Docker 有一項功能叫做[多階段建置](https://docs.docker.com/build/building/multi-stage/)。
它可以讓你把自己的 Dockerfile 分成幾個不同的_階段_，只有最後一個階段會留在產生的 Docker 映像檔中（其餘階段只是為了支援建置最後一個階段）。
你可以把每個階段想成一個小型的 Dockerfile；不同階段可以使用不同的基礎映像檔。

當你的 Dockerfile 需要安裝_只有_建置期才需要的套件時，多階段建置特別有用。
這種情況下，Dockerfile 的一般結構會長這樣：

1. 定義一個新階段（我們稱它為「build」階段）。
   這個階段_只_會在建置期使用。
2. （在「build」階段中）安裝所需的額外套件。
3. （在「build」階段中）執行需要使用那些額外套件的指令。
4. 定義一個新階段（我們稱它為「runtime」階段）。
   這個階段會組成產生的 Docker 映像檔，並在執行期執行。
5. 把第 3 步（在「build」階段）執行指令產生的結果複製到這個階段（「runtime」階段）。

有了這樣的設定，額外套件_只_會安裝在「build」階段，_不會_安裝在「runtime」階段，也就是說它們不會出現在產生的 Docker 映像檔裡。

#### 範例：下載檔案

Fortran 測試執行器需要`curl`來下載一些檔案。
不過它的執行期映像檔_不需要_`curl`，這讓它成為多階段建置的完美案例。

首先，它的 [Dockerfile](https://github.com/exercism/fortran-test-runner/blob/783e228d8449143d2040e68b95128bb791833a27/Dockerfile) 定義了一個階段（命名為「build」），在其中安裝`curl`套件。
接著它用 curl 把檔案下載到那個階段。

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

Dockerfile 的第二個部分定義了一個新階段，並使用`COPY`指令把下載的檔案從「build」階段複製到自己的階段：

```dockerfile
FROM alpine:3.15

RUN apk add --no-cache coreutils jq gfortran libc-dev cmake make

WORKDIR /opt/test-runner
COPY --from=build /opt/test-runner/ .

COPY . .
ENTRYPOINT ["/opt/test-runner/bin/run.sh"]
```

##### 範例：安裝函式庫

Ruby 測試執行器需要先安裝`git`、`openssh`、`build-base`、`gcc`和`wget`這些套件，才能安裝它所需的函式庫（gem）。
它的 [Dockerfile](https://github.com/exercism/ruby-test-runner/blob/e57ed45b553d6c6411faeea55efa3a4754d1cdbf/Dockerfile) 開頭是一個階段（命名為`build`），該階段安裝這些套件（透過`apk add`），然後安裝相依套件（透過`bundle install`）：

```dockerfile
FROM ruby:3.2.2-alpine3.18 AS build

RUN apk update && apk upgrade && \
    apk add --no-cache git openssh build-base gcc wget git

COPY Gemfile Gemfile.lock .

RUN gem install bundler:2.4.18 && \
    bundle config set without 'development test' && \
    bundle install
```

接著它定義了會組成產生 Docker 映像檔的階段。
這個階段_不會_安裝前一個階段安裝的相依套件，而是使用`COPY`指令把已安裝的函式庫從 build 階段複製到自己的階段：

```dockerfile
FROM ruby:3.2.2-alpine3.18

RUN apk add --no-cache bash

WORKDIR /opt/test-runner

COPY --from=build /usr/local/bundle /usr/local/bundle

COPY . .

ENTRYPOINT [ "sh", "/opt/test-runner/bin/run.sh" ]
```

```exercism/note
[C# 測試執行器的 Dockerfile](https://github.com/exercism/csharp-test-runner/blob/b54122ef76cbf86eff0691daa33c8e50bc83979f/Dockerfile) 也做了類似的事，只是在這個例子裡，build 階段可以使用一個現有的 Docker 映像檔，裡面已經預先安裝了安裝函式庫所需的額外套件。
```

## 測試

### 使用整合測試

單元測試可能非常有用，但我們建議把重點放在撰寫[整合測試](https://en.wikipedia.org/wiki/Integration_testing)上。
整合測試的主要好處是，它們更能測試工具在正式環境中執行的情況，因此有助於提升你對工具實作的信心。

#### 使用 Docker

為了最忠實地模擬正式環境，整合測試應該_像正式環境一樣_執行工具。
這表示要建置 Docker 映像檔，然後在建置好的映像檔上執行一份解答，以驗證它的輸出。

#### 使用黃金測試

整合測試應該定義成[黃金測試](https://ro-che.info/articles/2017-12-04-golden-tests)，也就是把預期輸出存在檔案裡的測試。
這非常適合軌道工具的整合測試，因為工具的輸出本身也是檔案。

##### 範例：測試執行器

在解答上執行測試執行器時，它的輸出是一個`results.json`檔案。
我們可以把這個檔案和一份「已知正確」（也就是「預期」）的輸出檔（命名為`expected_results.json`）相比較，檢查測試執行器是否如預期運作。

## 安全性

安全性是我們使用 Docker 容器來執行工具的主要原因。

### 優先使用官方映像檔

[Docker Hub](https://hub.docker.com/) 上有很多 Docker 映像檔，但請盡量使用[官方映像檔](https://hub.docker.com/search?q=&image_filter=official)。
這些映像檔經過篩選，不安全的机会（遠）低得多。

### 固定版本

為了確保建置穩定（也就是不會突然壞掉），你應該一律把基礎映像檔固定到特定標籤。
也就是說，不要用：

```dockerfile
FROM alpine:latest
```

而要用：

```dockerfile
FROM alpine:3.20.2
```

用後者的話，建置永遠會使用同一個版本。

### 以非特權使用者身分執行

預設情況下，很多映像檔會以具有 root 權限的使用者身分執行。
你應該考慮以非特權使用者身分執行。

```dockerfile
FROM alpine

RUN groupadd -r myuser && useradd -r -g myuser myuser

# RUN <COMMANDS THAT REQUIRE ROOT USER, E.G. INSTALLING PACKAGES>

USER myuser
```

### 將套件庫更新到最新版本

安裝最新版本（幾乎）永遠是個好主意

```dockerfile
RUN apt-get update && \
    apt-get install curl
```

### 支援唯讀檔案系統

我們鼓勵 Dockerfile 以唯讀檔案系統的方式撰寫。
你唯一可以假設可寫入的目錄是：

- 解答目錄（作為第二個引數傳入）
- 輸出目錄（作為第三個引數傳入）
- `/tmp` 目錄

```exercism/caution
我們的正式環境目前_不會_強制使用唯讀檔案系統，但未來可能會。
因此，新的測試執行器／分析器／表示器的基礎範本一開始就是唯讀檔案系統。
如果你在唯讀檔案系統上沒辦法讓東西運作，目前可以自行假設檔案系統是可寫入的。
```
