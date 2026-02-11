# TesteBancario_Front

Este projeto foi gerado usando o [Angular CLI](https://github.com/angular/angular-cli) versão 20.0.1.

## Servidor de desenvolvimento

Para iniciar um servidor de desenvolvimento local, execute:
```bash
ng serve
```

Após o servidor estar em execução, abra seu navegador e acesse `http://localhost:4200/`. O aplicativo será recarregado automaticamente sempre que você modificar qualquer um dos arquivos de origem.

## Estrutura de código

O Angular CLI inclui ferramentas poderosas de geração automática de código. Para gerar um novo componente, execute:

```bash
ng generate component component-name
```

Para obter uma lista completa dos esquemas disponíveis(such as `components`, `directives`, or `pipes`), execute:

```bash
ng generate --help
```

## Building

Para compilar o projeto, execute o seguinte comando:
```bash
ng build
```

Isso compilará seu projeto e armazenará os artefatos de compilação no diretório `dist/`. Por padrão, a compilação de produção otimiza seu aplicativo para desempenho e velocidade.

## Executando testes unitários

Para executar testes unitários com o executor de testes [Karma](https://karma-runner.github.io), use o seguinte comando:

```bash
ng test
```

## Executando testes de ponta a ponta

Para testes de ponta a ponta (e2e), execute:
```bash
ng e2e
```
O Angular CLI não inclui um framework de testes de ponta a ponta por padrão. Você pode escolher um que atenda às suas necessidades.

## Recursos adicionais

Para obter mais informações sobre como usar o Angular CLI, incluindo referências detalhadas de comandos, visite a página [Visão geral e referência de comandos do Angular CLI](https://angular.dev/tools/cli).

# TesteItauFront - Documentação Técnica

## Visão Geral

TesteItauFront é uma aplicação Angular standalone que serve como front-end para uma API de investimentos. Ela permite consultar, visualizar e analisar dados de Ativos, Cotações, Operações, Posições e Usuários, além de realizar consultas específicas como última cotação, preço médio, posição de cliente, financeiro da corretora e rankings Top 10.

## Estrutura do Projeto

```
TesteItauFront/
├── angular.json
├── package.json
├── tsconfig*.json
├── public/
│   └── favicon.ico
└── src/
    ├── index.html
    ├── main.ts
    ├── styles.scss
    └── app/
        ├── app.config.ts
        ├── app.html
        ├── app.routes.ts
        ├── app.scss
        ├── app.spec.ts
        └── app.ts
```

## Principais Funcionalidades

- **Abas de navegação**: Consultas, Ativos, Cotações, Operações, Posições, Usuários
- **Grids dinâmicos**: Exibição dos dados de cada entidade em tabelas
- **Consultas Especiais**:
  - Última cotação de um ativo
  - Preço médio por ativo para um usuário
  - Posição de um cliente
  - Valor financeiro total ganho pela corretora
  - Top 10 clientes por posição e por corretagem

## Integração com Backend

- Todos os dados são consumidos via HTTP a partir de endpoints RESTful, por padrão em `http://localhost:5000/api/`.
- Os endpoints utilizados para cada entidade e consulta especial estão definidos diretamente no componente `App`.
- O tratamento de resposta aceita tanto arrays quanto objetos com propriedade `data`.

## Principais Arquivos

- `src/app/app.ts`: Componente principal, lógica de navegação, integração HTTP, métodos de consulta e manipulação de dados.
- `src/app/app.html`: Template principal, estrutura das abas, formulários de consulta e exibição dos grids.
- `src/app/app.config.ts`: Configuração de providers e módulos standalone.
- `src/app/app.scss`: Estilos globais do componente.

## Como Executar

1. Instale as dependências:
   ```
npm install
   ```
2. Inicie o servidor de desenvolvimento Angular:
   ```
npx ng serve --open
   ```
3. Certifique-se de que o backend está rodando em `http://localhost:5000`.

## Testes

- Testes unitários estão em `src/app/app.spec.ts`.
- Para rodar os testes:
  ```
npx ng test
  ```

## Observações Técnicas

- O projeto utiliza Angular standalone components (sem módulos tradicionais).
- O uso de `FormsModule` permite o binding bidirecional com `[(ngModel)]` nos formulários.
- O pipe `| json` é utilizado para exibir resultados de consultas especiais de forma legível.
- O método `getColumns` filtra apenas colunas primitivas para exibição nos grids.
- O tratamento de erros nas requisições HTTP garante que a interface não quebre caso o backend retorne erro ou lista vazia.

## Endpoints Utilizados

- **Ativos**: `/api/ativos/ObterTodos`
- **Cotações**: `/api/cotacoes/ObterTodos`
- **Operações**: `/api/operacoes/ObterTodos`
- **Posições**: `/api/posicoes/ObterTodos`
- **Usuários**: `/api/usuarios/ObterTodos`
- **Consultas Especiais**:
  - Última Cotação: `/api/ativos/UltimaCotacao/{codigoAtivo}`
  - Preço Médio: `/api/ativos/PrecoMedioPorAtivo/{usuarioId}/{codigoAtivo}`
  - Posição Cliente: `/api/ativos/PosicaoCliente/{usuarioId}`
  - Financeiro Corretora: `/api/ativos/ValorTotalCorretagem`
  - Top 10 Posição: `/api/ativos/Top10ClientesMaiorPosicao`
  - Top 10 Corretagem: `/api/ativos/Top10ClientesMaisCorretagem`

## Dependências Principais

- Angular
- @angular/forms
- @angular/common/http

---


