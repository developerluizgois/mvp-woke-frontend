# MVP Woke Front End

Seja bem-vindo ao repositório do front-end MVP do desafio Woke. Aqui você encontrará a estrutura de código da interface feita em React.js e typescript com Docker.

# Sobre a Arquitetura

### Por que estou utilizando Docker?

Docker, ao containerizar um aplicativo React.js, oferece uma estrutura poderosa de garantir que nossa aplicação funcione consistentemente, independentemente de onde ou por quem ele é executado. Isso resulta em ciclos de desenvolvimento mais rápidos, menos problemas de integração, e uma base sólida para escalar e manter a aplicação. Com um simples comando no terminal, a aplicação será iniciada.

### Por que construimos com Next.JS?

Na documentação do React.JS é recomendado utilizar o framework React full-stack Ele é versátil e permite que você crie aplicativos React de qualquer tamanho — de um blog quase estático a um aplicativo dinâmico complexo. A escolha do React vem devido sua popularidade e por ser a tecnologia pedida para realização desse desafio.

## Pré-requisitos

Antes de começar, verifique se você tem instalado em sua máquina:
- [Docker](https://www.docker.com/get-started)
- [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [Git](https://git-scm.com/)

> **Nota:** A aplicação esta utilizando Docker. A escolha foi devido à sua capacidade de criar contêineres portáteis e isolados, garantindo consistência na execução em diferentes ambientes. Isso simplifica a gestão de dependências, melhora a segurança e facilita a escalabilidade, tornando a aplicação robusta e fácil de implantar.

**Inicie o serviço Back-End**
* Acesse o repositório através do link abaixo:
[Repositório Back-End](https://github.com/developerluizgois/mvp-woke-backend)
* Siga o passo a passo no README de Instalação, Ambiente de desenvolvimento e Iniciar o Servidor.
* Após completar os passos, você terá um serviço Back-End Docker sendo executado. Siga os proximos passos nesse repositório para iniciar o serviço front-end.

## Instalação

Passos para instalar o ambiente de desenvolvimento.

**1. Clone o repositório**

```bash
git clone git@github.com:developerluizgois/mvp-woke-frontend.git
```
**2. Acesse a raiz do repositório clonado**
**3. Instale as dependências**
```bash
npm install

ou

yarn install
```

## Iniciar o servidor

**1. Fazer o Build da imagem docker**

No diretório raiz deste repositório abra o terminal do editor de texto que voce estiver utilizando e execulte o comando abaixo:

```bash
docker-compose up --build
```

> **Nota:** Este comando irá construir a imagem Docker de desenvolvimento. No diretório raiz deste repositório, existem dois arquivos docker-compose: um para gerar o container de produção e outro para gerar o container de desenvolvimento. Vamos utilizar o container de desenvolvimento para validar este desafio, com base no Dockerfile especificado, e iniciar todos os serviços definidos no docker-compose.yml.

**2. Visualizando a Aplicação**

Para visualizar a aplicação que está sendo executada no servidor Docker que você acabou de iniciar, siga os passos abaixo:

1. Abra seu navegador web.
2. Cole a URL abaixo na barra de endereços e pressione Enter:

   - [http://localhost:3000/](http://localhost:3000/)

3. Você deverá ver uma interface Home, indicando que o servidor está funcionando corretamente.
