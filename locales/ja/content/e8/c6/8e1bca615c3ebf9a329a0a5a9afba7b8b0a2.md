# ベストプラクティス

## 公式のベストプラクティスに従いましょう

公式の[Dockerfileのベストプラクティス](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)には、Dockerfileを改善する方法について優れた内容がたくさんあります。

## パフォーマンス

まず最適化すべきなのはパフォーマンスです（特にテストランナーでは）。そうすれば、ツールができるだけ速く動き、タイムアウトしなくなります。

### 計測しましょう

実行時間を頻繁に計測することは、ツールのパフォーマンスを体感するのにとても良い方法です。変更の_後_だけでなく_前_にも実行時間を計測する習慣をつけましょう。その変更がパフォーマンスを改善すると「確信」していても、やはり実行時間を計測しましょう。

#### スクリプト

可能であれば、パフォーマンスを自動で計測するスクリプトを作りましょう（_ベンチマーク_とも呼ばれます）。とても便利なコマンドラインツールに[hyperfine](https://github.com/sharkdp/hyperfine)がありますが、ツールにとって最も適したものを自由に使ってください。

新しいトラックツールのリポジトリでは、次の2つのスクリプトを利用できます：

1. `./bin/benchmark.sh`：トラックツールのコードをベンチマークします（[ソースコード](https://github.com/exercism/generic-test-runner/blob/main/bin/benchmark.sh)）
2. `./bin/benchmark-in-docker.sh`：トラックツールのDockerイメージをベンチマークします（[ソースコード](https://github.com/exercism/generic-test-runner/blob/main/bin/benchmark-in-docker.sh)）

```exercism/note
これらのファイルがないトラックツールのリポジトリで作業している場合は、上のソースリンクを使って自分のリポジトリにコピーしてかまいません。
```

```exercism/caution
ベンチマークスクリプトは、ツールのパフォーマンスを見積もるのに役立ちます。ただし、Exercismの本番サーバーでのパフォーマンスはそれより低いことが多い点に注意してください。
```

### さまざまなベースイメージを試しましょう

さまざまなベースイメージ（例：Ubuntuの代わりにAlpine）を試して、一方がもう一方より（大幅に）優れた性能を発揮するかどうかを確かめましょう。パフォーマンスがほぼ同じなら、より小さいイメージを選びましょう。

### `internal`ネットワークを試しましょう

`none`の代わりに`internal`ネットワークを使うとパフォーマンスが向上するかどうかを確認しましょう。詳しくは[ネットワークのドキュメント](/docs/building/tooling/docker#network)を参照してください。

### 実行時コマンドよりビルド時コマンドを優先しましょう

トラックツールは、一度だけ実行される短命のDockerコンテナを動かし、その中で次の手順を実行します。

1. Dockerコンテナが作成されます。
2. そのDockerコンテナが正しい引数で実行されます。
3. そのDockerコンテナは破棄されます。

したがって、手順2で実行されるコードは、_ツールが実行されるたびに毎回_動きます。そのため、手順2で動くコードの量を減らすことは、パフォーマンスを改善するための優れた方法です。その方法の一つは、コードを_実行時_から_ビルド時_に移すことです。実行時のコードはツールが動くたびに毎回実行されますが、ビルド時のコードは一度だけ（Dockerイメージをビルドするときに）実行されます。

ビルド時のコードは、GitHub Actionsのワークフローの一部として一度だけ実行されます。そのため、ビルド時に動くコードが（比較的）遅くても問題ありません。

#### 例：ライブラリを事前コンパイルする

Haskellのテストランナーでテストを実行するときには、いくつかのベースライブラリをコンパイルする必要があります。テストは毎回新しいコンテナで実行されるため、このコンパイルは_テストを実行するたびに毎回_行われていたことになります！　これを回避するために、[HaskellテストランナーのDockerfile](https://github.com/exercism/haskell-test-runner/blob/5264c460054649fc672c3d5932c2f3cb082e2405/Dockerfile)には次の2つのコマンドがあります：

```dockerfile
COPY pre-compiled/ .
RUN stack build --resolver lts-20.18 --no-terminal --test --no-run-tests
```

まず、`pre-compiled`ディレクトリがイメージにコピーされます。このディレクトリはテスト用の演習として構成されており、実際の演習が依存するのと同じベースライブラリに依存しています。次に、そのディレクトリでテストを実行します。これは実際の演習でテストを実行する方法と似ています。テストを実行するとベースライブラリがコンパイルされますが、違うのは、これが_ビルド時_に起こるという点です。その結果できあがるDockerイメージでは、ベースライブラリがあらかじめコンパイル済みになります。つまり、_実行時_にはコンパイルが不要になり、（はるかに）速く実行できます。

#### 例：バイナリを事前コンパイルする

言語によっては、コードを事前にコンパイルすることも、ジャストインタイムでコンパイルすることもできます。これはビルド時と実行時のトレードオフであり、ここでもパフォーマンス上の理由からビルド時の実行を優先します。

[C#テストランナーのDockerfile](https://github.com/exercism/csharp-test-runner/blob/b54122ef76cbf86eff0691daa33c8e50bc83979f/Dockerfile)はこのアプローチを採用しており、テストランナーはコードを（実行時に）ジャストインタイムでコンパイルするのではなく、（ビルド時に）事前にバイナリへコンパイルされます。つまり実行時にやることが減り、パフォーマンスの向上につながります。

## サイズ

イメージのサイズを小さくするようにしましょう。そうすると：

- デプロイが速くなる
- Exercismのコストを削減できる
- 各コンテナの起動時間が短くなる

### さまざまなディストリビューションを試しましょう

ディストリビューションのイメージが違えば、サイズも異なります。たとえば、`alpine:3.20.2`イメージは`ubuntu:24.10`イメージより**10倍**小さいです：

```
REPOSITORY   TAG       SIZE
alpine       3.20.2    8.83MB
ubuntu       24.10     101MB
```

一般に、Alpineベースのイメージは最も小さい部類に入るため、多くのツールのイメージはAlpineをベースにしています。

### スリム化されたイメージを試しましょう

イメージによっては特別な「slim」バリアントがあり、一部の機能が取り除かれてイメージサイズが小さくなっています。たとえば、`node:20.16.0-slim`イメージは`node:20.16.0`イメージより**5倍**小さいです：

```
REPOSITORY   TAG            SIZE
node         20.16.0        1.09GB
node         20.16.0-slim   219MB
```

「slim」バリアントが小さいのは、機能が少ないからです。イメージに追加の機能が必要ないこともあります。その場合は「slim」バリアントの使用を検討しましょう。

### 不要なものを取り除く

イメージのサイズを小さくする明白で効果的な方法は、不要なものを取り除くことです。たとえば、次のようなものが含まれます：

- バイナリをビルドしたあとにもう必要ないソースファイル
- Dockerイメージとは異なるアーキテクチャ向けのファイル
- ドキュメント

#### パッケージマネージャーのファイルを削除する

ほとんどのDockerイメージでは追加のパッケージをインストールする必要があり、通常はパッケージマネージャーを通じて行います。これらのパッケージは_ビルド時_にインストールする必要があります（_実行時_にはインターネット接続が利用できないからです）。そのため、追加のパッケージをインストールしたあとは、パッケージマネージャーのキャッシュや管理用のファイルを削除するようにしましょう。

##### apk

`apk`パッケージマネージャーを使うディストリビューション（Alpineなど）では、パッケージをインストールする`apk add`を使うときに`--no-cache`フラグを使いましょう：

```dockerfile
RUN apk add --no-cache curl
```

##### apt-get/apt

`apt-get`/`apk`パッケージマネージャーを使うディストリビューション（Ubuntuなど）では、パッケージをインストールした_あとに_、同じ`RUN`コマンドの中で`apt-get autoremove -y`と`rm -rf /var/lib/apt/lists/*`コマンドを実行しましょう：

```dockerfile
RUN apt-get update && \
    apt-get install curl -y && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/*
```

### マルチステージビルドを使う

Dockerには[マルチステージビルド](https://docs.docker.com/build/building/multi-stage/)という機能があります。これを使うと、Dockerfileを個別の_ステージ_に分割でき、できあがるDockerイメージには最後のステージだけが含まれます（残りは最後のステージのビルドを支えるためだけに存在します）。各ステージは、それぞれ小さなDockerfileのようなものだと考えてください。ステージごとに異なるベースイメージを使えます。

マルチステージビルドは、Dockerfileで_ビルド時にだけ_必要なパッケージをインストールする必要があるときに特に役立ちます。この場合、Dockerfileの全体的な構成は次のようになります：

1. 新しいステージを定義します（これを「build」ステージと呼ぶことにします）。このステージは_ビルド時にだけ_使われます。
2. 必要な追加パッケージを（「build」ステージに）インストールします。
3. 追加パッケージを必要とするコマンドを（「build」ステージ内で）実行します。
4. 新しいステージを定義します（これを「runtime」ステージと呼ぶことにします）。このステージができあがるDockerイメージを構成し、実行時に実行されます。
5. 手順3で（「build」ステージで）実行したコマンドの結果を、このステージ（「runtime」ステージ）にコピーします。

この構成では、追加パッケージは「build」ステージに_だけ_インストールされ、「runtime」ステージには_インストールされません_。つまり、できあがるDockerイメージには含まれません。

#### 例：ファイルをダウンロードする

Fortranのテストランナーは、いくつかのファイルをダウンロードするために`curl`を必要とします。しかし、その実行時のイメージには`curl`は_不要_なので、これはマルチステージビルドの絶好のユースケースです。

まず、その[Dockerfile](https://github.com/exercism/fortran-test-runner/blob/783e228d8449143d2040e68b95128bb791833a27/Dockerfile)が（「build」という名前の）ステージを定義し、そこで`curl`パッケージをインストールします。次に、curlを使ってそのステージにファイルをダウンロードします。

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

Dockerfileの2番目の部分では、新しいステージを定義し、`COPY`コマンドを使ってダウンロードしたファイルを「build」ステージから自分のステージにコピーします：

```dockerfile
FROM alpine:3.15

RUN apk add --no-cache coreutils jq gfortran libc-dev cmake make

WORKDIR /opt/test-runner
COPY --from=build /opt/test-runner/ .

COPY . .
ENTRYPOINT ["/opt/test-runner/bin/run.sh"]
```

##### 例：ライブラリをインストールする

Rubyのテストランナーは、必要なライブラリ（gem）をインストールする前に、`git`、`openssh`、`build-base`、`gcc`、`wget`パッケージをインストールしておく必要があります。その[Dockerfile](https://github.com/exercism/ruby-test-runner/blob/e57ed45b553d6c6411faeea55efa3a4754d1cdbf/Dockerfile)は、（`build`という名前の）ステージから始まり、そこでこれらのパッケージを（`apk add`で）インストールし、続いて依存関係を（`bundle install`で）インストールします：

```dockerfile
FROM ruby:3.2.2-alpine3.18 AS build

RUN apk update && apk upgrade && \
    apk add --no-cache git openssh build-base gcc wget git

COPY Gemfile Gemfile.lock .

RUN gem install bundler:2.4.18 && \
    bundle config set without 'development test' && \
    bundle install
```

続いて、できあがるDockerイメージを構成するステージを定義します。このステージでは、前のステージがインストールした依存関係を_インストールしません_。代わりに、`COPY`コマンドを使って、インストール済みのライブラリをbuildステージから自分のステージにコピーします：

```dockerfile
FROM ruby:3.2.2-alpine3.18

RUN apk add --no-cache bash

WORKDIR /opt/test-runner

COPY --from=build /usr/local/bundle /usr/local/bundle

COPY . .

ENTRYPOINT [ "sh", "/opt/test-runner/bin/run.sh" ]
```

```exercism/note
[C#テストランナーのDockerfile](https://github.com/exercism/csharp-test-runner/blob/b54122ef76cbf86eff0691daa33c8e50bc83979f/Dockerfile)も似たことをしていますが、この場合はbuildステージで、ライブラリのインストールに必要な追加パッケージがあらかじめインストールされた既存のDockerイメージを利用できます。
```

## テスト

### 統合テストを使う

単体テストはとても役立ちますが、[統合テスト](https://en.wikipedia.org/wiki/Integration_testing)の作成に重点を置くことをおすすめします。その主な利点は、ツールが本番でどう動くかをよりよくテストできることで、ツールの実装への信頼を高めるのに役立ちます。

#### Dockerを使う

本番環境を最もよく再現するには、統合テストは_本番環境と同じように_ツールを実行するべきです。つまり、Dockerイメージをビルドし、ビルドしたイメージを解答に対して実行して、その出力を検証します。

#### ゴールデンテストを使う

統合テストは[ゴールデンテスト](https://ro-che.info/articles/2017-12-04-golden-tests)として定義するべきです。ゴールデンテストとは、期待される出力をファイルに保存しておくテストのことです。ツールの出力もファイルなので、これはトラックツールの統合テストにぴったりです。

##### 例：テストランナー

テストランナーを解答に対して実行すると、その出力は`results.json`ファイルです。そして、このファイルを「既知の正しい」（つまり「期待される」）出力ファイル（`expected_results.json`という名前）と比較して、テストランナーが意図どおりに動作するかを確認できます。

## 安全性

安全性は、ツールの実行にDockerコンテナを使っている主な理由です。

### 公式イメージを優先する

[Docker Hub](https://hub.docker.com/)にはたくさんのDockerイメージがありますが、[公式のもの](https://hub.docker.com/search?q=&image_filter=official)を使うようにしましょう。これらのイメージは厳選されており、安全でない可能性が（はるかに）低くなっています。

### バージョンを固定する

ビルドが安定する（つまり突然壊れない）ようにするには、ベースイメージを常に特定のタグに固定しましょう。つまり、次のように書く代わりに：

```dockerfile
FROM alpine:latest
```

次のようにします：

```dockerfile
FROM alpine:3.20.2
```

後者なら、ビルドは常に同じバージョンを使います。

### 非特権ユーザーとして実行する

デフォルトでは、多くのイメージはroot権限を持つユーザーで実行されます。非特権ユーザーとして実行することを検討しましょう。

```dockerfile
FROM alpine

RUN groupadd -r myuser && useradd -r -g myuser myuser

# RUN <COMMANDS THAT REQUIRE ROOT USER, E.G. INSTALLING PACKAGES>

USER myuser
```

### パッケージリポジトリを最新バージョンに更新する

最新バージョンをインストールするのは、（ほぼ）常に良い考えです

```dockerfile
RUN apt-get update && \
    apt-get install curl
```

### 読み取り専用ファイルシステムに対応する

Dockerfileは読み取り専用ファイルシステムを前提に書くことをおすすめします。書き込み可能だと想定してよいディレクトリは次のものだけです：

- 解答のディレクトリ（第2引数として渡されます）
- 出力ディレクトリ（第3引数として渡されます）
- `/tmp`ディレクトリ

```exercism/caution
現在の本番環境では読み取り専用ファイルシステムを_強制していません_が、将来は強制するかもしれません。そのため、新しいテストランナー・アナライザー・リプレゼンターのベーステンプレートは、読み取り専用ファイルシステムで始まります。読み取り専用ファイルではうまく動かせない場合は、（今のところは）書き込み可能なファイルシステムを想定してかまいません。
```
