# 最佳实践

## 遵循官方最佳实践

官方 [Dockerfile 最佳实践](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)中有很多关于如何改进 Dockerfile 的精彩内容。

## 性能

你应当首先为性能做优化（尤其是对测试运行器而言）。这样能确保你的工具以尽可能快的速度运行，并且不会超时。

### 测量

经常测量执行时间是感受工具性能的好办法。养成习惯，在改动之后和改动之前都测量执行时间。即使你“确信”某项改动会提升性能，也仍然应该测量执行时间。

#### 脚本

只要有可能，就编写脚本来自动测量性能（也叫“基准测试”）。[hyperfine](https://github.com/sharkdp/hyperfine)是一个非常实用的命令行工具，不过你也可以随意选用最适合自己工具的做法。

较新的轨道工具代码仓库会包含下面两个脚本：

1. `./bin/benchmark.sh`：对轨道工具代码做基准测试（[源代码](https://github.com/exercism/generic-test-runner/blob/main/bin/benchmark.sh)）
2. `./bin/benchmark-in-docker.sh`：对轨道工具的 Docker 镜像做基准测试（[源代码](https://github.com/exercism/generic-test-runner/blob/main/bin/benchmark-in-docker.sh)）

```exercism/note
如果你正在处理的轨道工具代码仓库里没有这些文件，可以借助上面的源代码链接把它们复制到你的代码仓库中。
```

```exercism/caution
基准测试脚本可以帮助估算工具的性能。不过要记住，Exercism 生产服务器上的性能往往更低。
```

### 尝试不同的基础镜像

试着尝试不同的基础镜像（比如用 Alpine 代替 Ubuntu），看看其中一个是否（明显）优于另一个。如果性能差不多，就选体积最小的那个镜像。

### 试试 internal 网络

检查一下用 `internal` 网络代替 `none` 是否能提升性能。更多信息参见[网络文档](/docs/building/tooling/docker#network)。

### 优先使用构建期命令，而不是运行期命令

轨道工具会运行一个一次性的、短命的 Docker 容器，它执行以下步骤。

1. 创建一个 Docker 容器。
2. 用正确的参数运行这个 Docker 容器。
3. 销毁这个 Docker 容器。

因此，第 2 步中运行的代码会在每一次工具运行时都运行。正因如此，减少第 2 步中运行的代码量是提升性能的好办法。其中一种做法就是把代码从运行期移到构建期。运行期的代码在每一次工具运行时都会运行，而构建期的代码只运行一次（在构建 Docker 镜像时）。

构建期代码作为 GitHub Actions 工作流的一部分运行一次。因此，即使构建期运行的代码（相对）较慢也没关系。

#### 示例：预编译库

在 Haskell 测试运行器中运行测试时，它需要先编译一些基础库。由于每次测试运行都发生在一个全新的容器里，这就意味着每一次测试运行都要做一遍编译！为了绕开这一点，[Haskell 测试运行器的 Dockerfile](https://github.com/exercism/haskell-test-runner/blob/5264c460054649fc672c3d5932c2f3cb082e2405/Dockerfile)中有下面两条命令：

```dockerfile
COPY pre-compiled/ .
RUN stack build --resolver lts-20.18 --no-terminal --test --no-run-tests
```

首先，把 `pre-compiled` 目录复制到镜像中。这个目录被设置为一个测试练习，并且依赖与实际练习相同的基础库。然后我们在这个目录上运行测试，这和在实际练习上运行测试类似。运行测试会触发基础库的编译，但区别在于这发生在构建期。这样生成的 Docker 镜像中，基础库已经编译好了。这意味着运行期不再需要编译，从而带来（快得多的）执行速度。

#### 示例：预编译二进制文件

有些语言允许把代码提前编译或即时编译。这是构建期与运行期之间的取舍，同样出于性能考虑，我们更倾向于在构建期执行。

[C# 测试运行器的 Dockerfile](https://github.com/exercism/csharp-test-runner/blob/b54122ef76cbf86eff0691daa33c8e50bc83979f/Dockerfile)就采用了这种做法：测试运行器被提前编译成二进制文件（在构建期），而不是在运行期即时编译代码。这意味着运行期要做的工作更少，有助于提升性能。

## 体积

你应该尽量减小镜像的体积，这会带来以下好处：

- 部署更快
- 降低我们这边的成本
- 改善每个容器的启动时间

### 尝试不同的发行版

不同的发行版镜像体积各不相同。比如，`alpine:3.20.2`镜像比`ubuntu:24.10`镜像**小十倍**：

```
REPOSITORY   TAG       SIZE
alpine       3.20.2    8.83MB
ubuntu       24.10     101MB
```

一般来说，基于 Alpine 的镜像属于最小的镜像之列，所以很多工具镜像都以 Alpine 为基础。

### 尝试精简版镜像

有些镜像有特殊的“slim”变体，其中一些功能被移除，从而减小了镜像体积。比如，`node:20.16.0-slim`镜像比`node:20.16.0`镜像**小五倍**：

```
REPOSITORY   TAG            SIZE
node         20.16.0        1.09GB
node         20.16.0-slim   219MB
```

“slim”变体更小的原因是它们的功能更少。你的镜像可能并不需要那些额外的功能，如果确实不需要，就考虑使用“slim”变体。

### 移除不需要的部分

减小镜像体积一个显而易见却非常有效的办法，就是移除所有你不需要的东西。比如：

- 从源码文件构建出二进制文件后，就不再需要的源码文件
- 面向与 Docker 镜像不同架构的文件
- 文档

#### 移除包管理器的文件

大多数 Docker 镜像都需要安装额外的软件包，这通常通过包管理器来完成。这些软件包必须在构建期安装（因为运行期没有可用的网络连接）。因此，安装完额外的软件包后，应当移除包管理器的所有缓存/记录文件。

##### apk

使用`apk`包管理器的发行版（比如 Alpine）在用`apk add`安装软件包时，应该加上`--no-cache`标志：

```dockerfile
RUN apk add --no-cache curl
```

##### apt-get/apt

使用`apt-get`/`apk`包管理器的发行版（比如 Ubuntu）应该在安装软件包之后，并在同一条`RUN`命令中，运行`apt-get autoremove -y`和`rm -rf /var/lib/apt/lists/*`命令：

```dockerfile
RUN apt-get update && \
    apt-get install curl -y && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/*
```

### 使用多阶段构建

Docker 有一项叫[多阶段构建](https://docs.docker.com/build/building/multi-stage/)的功能。它允许你把 Dockerfile 划分成若干个独立的阶段，最终生成的 Docker 镜像中只包含最后一个阶段（其余阶段只是为了支持最后一个阶段的构建）。你可以把每个阶段看作自己的迷你 Dockerfile；各个阶段可以使用不同的基础镜像。

当你的 Dockerfile 需要安装仅在构建期才需要的软件包时，多阶段构建尤其有用。这种情况下，Dockerfile 的整体结构大致如下：

1. 定义一个新阶段（我们称之为“build”阶段）。
   这个阶段仅在构建期使用。
2. 把所需的额外软件包安装进去（装到“build”阶段中）。
3. 运行那些需要额外软件包的命令（在“build”阶段中）。
4. 定义一个新阶段（我们称之为“runtime”阶段）。
   这个阶段将构成最终生成的 Docker 镜像，并在运行期执行。
5. 把第 3 步（在“build”阶段）中运行的命令所产生的结果复制到这个阶段（“runtime”阶段）。

这样设置后，额外的软件包只安装在“build”阶段，而不会安装在“runtime”阶段，也就是说它们不会出现在最终生成的 Docker 镜像中。

#### 示例：下载文件

Fortran 测试运行器需要`curl`来下载一些文件。不过，它在运行期的镜像并不需要`curl`，这让它成为多阶段构建的完美用例。

首先，它的 [Dockerfile](https://github.com/exercism/fortran-test-runner/blob/783e228d8449143d2040e68b95128bb791833a27/Dockerfile)定义了一个阶段（名为“build”），在其中安装`curl`软件包。然后它用 curl 把文件下载到这个阶段里。

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

Dockerfile 的第二部分定义了一个新阶段，并用`COPY`命令把下载好的文件从“build”阶段复制到它自己的阶段：

```dockerfile
FROM alpine:3.15

RUN apk add --no-cache coreutils jq gfortran libc-dev cmake make

WORKDIR /opt/test-runner
COPY --from=build /opt/test-runner/ .

COPY . .
ENTRYPOINT ["/opt/test-runner/bin/run.sh"]
```

##### 示例：安装库

Ruby 测试运行器需要先安装`git`、`openssh`、`build-base`、`gcc`和`wget`这些软件包，然后才能安装它所需的库（gem）。它的 [Dockerfile](https://github.com/exercism/ruby-test-runner/blob/e57ed45b553d6c6411faeea55efa3a4754d1cdbf/Dockerfile)以一个阶段（名为`build`）开头，先安装这些软件包（通过`apk add`），再安装依赖项（通过`bundle install`）：

```dockerfile
FROM ruby:3.2.2-alpine3.18 AS build

RUN apk update && apk upgrade && \
    apk add --no-cache git openssh build-base gcc wget git

COPY Gemfile Gemfile.lock .

RUN gem install bundler:2.4.18 && \
    bundle config set without 'development test' && \
    bundle install
```

接着它定义了将构成最终 Docker 镜像的那个阶段。这个阶段不会安装前一个阶段所安装的依赖项，而是用`COPY`命令把已安装的库从 build 阶段复制到自己的阶段：

```dockerfile
FROM ruby:3.2.2-alpine3.18

RUN apk add --no-cache bash

WORKDIR /opt/test-runner

COPY --from=build /usr/local/bundle /usr/local/bundle

COPY . .

ENTRYPOINT [ "sh", "/opt/test-runner/bin/run.sh" ]
```

```exercism/note
[C# 测试运行器的 Dockerfile](https://github.com/exercism/csharp-test-runner/blob/b54122ef76cbf86eff0691daa33c8e50bc83979f/Dockerfile)做法类似，只是在这种情况下，build 阶段可以使用一个现成的 Docker 镜像，该镜像已经预装了安装库所需的额外软件包。
```

## 测试

### 使用集成测试

单元测试可能非常有用，但我们建议把重点放在编写[集成测试](https://en.wikipedia.org/wiki/Integration_testing)上。它们的主要好处是能更好地测试工具在生产环境中的运行情况，从而有助于增强你对工具实现的信心。

#### 使用 Docker

为了最好地模拟生产环境，集成测试应该像生产环境那样运行工具。这意味着先构建 Docker 镜像，然后在一个解答上运行构建好的镜像，以验证它的输出。

#### 使用黄金测试

集成测试应该定义为[黄金测试](https://ro-che.info/articles/2017-12-04-golden-tests)，也就是把预期输出保存在文件中的测试。这非常适合轨道工具的集成测试，因为工具的输出也是文件。

##### 示例：测试运行器

在一个解答上运行测试运行器时，它的输出是一个`results.json`文件。然后我们可以把这个文件与一个“已知正确”（也就是“预期”）的输出文件（名为`expected_results.json`）作比较，来检查测试运行器是否按预期工作。

## 安全

安全是我们使用 Docker 容器来运行工具的一个主要原因。

### 优先使用官方镜像

[Docker Hub](https://hub.docker.com/)上有很多 Docker 镜像，但尽量使用[官方镜像](https://hub.docker.com/search?q=&image_filter=official)。这些镜像经过筛选，不安全的风险（要）小得多。

### 固定版本

为了确保构建稳定（也就是不会突然出错），你应该始终把基础镜像固定到特定的标签。也就是说，不要这样写：

```dockerfile
FROM alpine:latest
```

而应该这样写：

```dockerfile
FROM alpine:3.20.2
```

用后者的话，每次构建都会使用同一个版本。

### 以非特权用户身份运行

默认情况下，很多镜像会以拥有 root 权限的用户运行。你应该考虑改用非特权用户运行。

```dockerfile
FROM alpine

RUN groupadd -r myuser && useradd -r -g myuser myuser

# RUN <COMMANDS THAT REQUIRE ROOT USER, E.G. INSTALLING PACKAGES>

USER myuser
```

### 把软件包仓库更新到最新版本

安装最新版本（几乎）总是一个好主意

```dockerfile
RUN apt-get update && \
    apt-get install curl
```

### 支持只读文件系统

我们鼓励编写使用只读文件系统的 Dockerfile。你应该假定只有以下目录可写：

- 解答目录（作为第二个参数传入）
- 输出目录（作为第三个参数传入）
- `/tmp`目录

```exercism/caution
我们的生产环境目前并不强制使用只读文件系统，但将来可能会。因此，新的测试运行器/分析器/表示器的基础模板一开始就采用只读文件系统。如果你在只读文件系统上无法让程序正常工作，那么（目前）可以放心地假定文件系统可写。
```
