# TesteItauFront This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.1. ## Development server To start a local development server, run:
bash
ng serve
Once the server is running, open your browser and navigate to http://localhost:4200/. The application will automatically reload whenever you modify any of the source files. ## Code scaffolding Angular CLI includes powerful code scaffolding tools. To generate a new component, run:
bash
ng generate component component-name
For a complete list of available schematics (such as components, directives, or pipes), run:
bash
ng generate --help
## Building To build the project run:
bash
ng build
This will compile your project and store the build artifacts in the dist/ directory. By default, the production build optimizes your application for performance and speed. ## Running unit tests To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:
bash
ng test
## Running end-to-end tests For end-to-end (e2e) testing, run:
bash
ng e2e
Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs. ## Additional Resources For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page. # TesteItauFront - Documentação Técnica ## Visão Geral TesteItauFront é uma aplicação Angular standalone que serve como front-end para uma API de investimentos. Ela permite consultar, visualizar e analisar dados de Ativos, Cotações, Operações, Posições e Usuários, além de realizar consultas específicas como última cotação, preço médio, posição de cliente, financeiro da corretora e rankings Top 10. ## Estrutura do Projeto
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
## Principais Funcionalidades - **Abas de navegação**: Consultas, Ativos, Cotações, Operações, Posições, Usuários - **Grids dinâmicos**: Exibição dos dados de cada entidade em tabelas - **Consultas Especiais**: - Última cotação de um ativo - Preço médio por ativo para um usuário - Posição de um cliente - Valor financeiro total ganho pela corretora - Top 10 clientes por posição e por corretagem ## Integração com Backend - Todos os dados são consumidos via HTTP a partir de endpoints RESTful, por padrão em http://localhost:5000/api/. - Os endpoints utilizados para cada entidade e consulta especial estão definidos diretamente no componente App. - O tratamento de resposta aceita tanto arrays quanto objetos com propriedade data. ## Principais Arquivos - src/app/app.ts: Componente principal, lógica de navegação, integração HTTP, métodos de consulta e manipulação de dados. - src/app/app.html: Template principal, estrutura das abas, formulários de consulta e exibição dos grids. - src/app/app.config.ts: Configuração de providers e módulos standalone. - src/app/app.scss: Estilos globais do componente. ## Como Executar 1. Instale as dependências:
npm install
2. Inicie o servidor de desenvolvimento Angular:
npx ng serve --open
3. Certifique-se de que o backend está rodando em http://localhost:5000. ## Testes - Testes unitários estão em src/app/app.spec.ts. - Para rodar os testes:
npx ng test
## Observações Técnicas - O projeto utiliza Angular standalone components (sem módulos tradicionais). - O uso de FormsModule permite o binding bidirecional com [(ngModel)] nos formulários. - O pipe | json é utilizado para exibir resultados de consultas especiais de forma legível. - O método getColumns filtra apenas colunas primitivas para exibição nos grids. - O tratamento de erros nas requisições HTTP garante que a interface não quebre caso o backend retorne erro ou lista vazia. ## Endpoints Utilizados - **Ativos**: /api/ativos/ObterTodos - **Cotações**: /api/cotacoes/ObterTodos - **Operações**: /api/operacoes/ObterTodos - **Posições**: /api/posicoes/ObterTodos - **Usuários**: /api/usuarios/ObterTodos - **Consultas Especiais**: - Última Cotação: /api/ativos/UltimaCotacao/{codigoAtivo} - Preço Médio: /api/ativos/PrecoMedioPorAtivo/{usuarioId}/{codigoAtivo} - Posição Cliente: /api/ativos/PosicaoCliente/{usuarioId} - Financeiro Corretora: /api/ativos/ValorTotalCorretagem - Top 10 Posição: /api/ativos/Top10ClientesMaiorPosicao - Top 10 Corretagem: /api/ativos/Top10ClientesMaisCorretagem ## Dependências Principais - Angular - @angular/forms - @angular/common/http --- Para dúvidas técnicas ou sugestões, consulte o código-fonte ou entre em contato com o responsável pelo projeto.
