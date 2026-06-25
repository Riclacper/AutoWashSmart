# AutoWash Smart

MVP demonstrativo de uma plataforma para lava a jato inteligente, automatizado e escalavel.

O projeto foi criado para apresentacao comercial. Todas as integracoes externas sao simuladas, sem hardware real, sem pagamentos reais e sem dependencia de backend.

## Estado Atual

- Tela demonstrativa publica para interessados.
- Acesso simulado com dois perfis: cliente e administrador.
- Plataforma operacional com dados demo em `localStorage`.
- Fluxo de totem, lavagem express, self-service, mini shop e dashboard.
- Dados demo restauraveis no painel administrativo.
- Repositorio GitHub privado: `Riclacper/AutoWashSmart`.

## Stack

- React
- Vite
- JavaScript
- React Router
- CSS organizado em `src/styles.css`
- LocalStorage para persistencia simulada
- Lucide React para icones

## Como Rodar

Instalar dependencias:

```bash
npm install
```

Rodar em desenvolvimento:

```bash
npm run dev
```

Gerar build de producao:

```bash
npm run build
```

Previsualizar build:

```bash
npm run preview
```

## Rotas Principais

- `/`: tela demonstrativa publica.
- `/app`: selecao de perfil simulado.
- `/app/cliente/portal`: portal do cliente.
- `/app/cliente/dados`: dados do cliente logado.
- `/app/cliente/shop`: compras no mini shop.
- `/app/admin`: home operacional do administrador.
- `/app/admin/clientes`: cadastro e historico de clientes.
- `/app/admin/totem`: totem de entrada.
- `/app/admin/lavagem`: lavagem express automatizada.
- `/app/admin/self-service`: box self-service.
- `/app/admin/shop`: mini shop.
- `/app/admin/dashboard`: dashboard administrativo com metricas, graficos interativos, detalhamento expandido e atividades recentes.

## Perfil Cliente

O modo cliente mostra uma experiencia limitada ao proprio usuario:

- Resumo do cliente.
- Plano ativo.
- Veiculo principal.
- QR Code demonstrativo de acesso.
- Ultimas lavagens.
- Compras recentes.
- Pagamentos simulados.
- Dados cadastrais em modo visual.

O cliente nao acessa indicadores gerais, lista completa de clientes ou operacao administrativa.

## Perfil Administrador

O modo administrador mostra a operacao completa:

- Cadastro de clientes, veiculos e autorizados.
- Totem com placa, QR Code e facial simulados.
- Lavagem express com progresso visual.
- Self-service com controle de tempo e consumo.
- Mini shop com venda simulada.
- Dashboard com clientes, veiculos, lavagens, receita e produtos vendidos.
- Graficos com totais, rotulos por dia/produto, valores exibidos nas barras e painel expandido ao selecionar.
- Restauracao dos dados demo.

## Dados Demo

Os dados iniciais ficam em `src/data/catalog.js`.

A persistencia local fica em `src/services/storage.js`.

Se o navegador estiver sem dados ou com dados vazios, o app carrega automaticamente os dados demo. No dashboard administrativo existe um botao para restaurar os dados demo.

Placa recomendada para demonstracao no totem:

```text
AWS2026
```

## Estrutura

```text
src/
  assets/
  components/
  data/
  pages/
  services/
  App.jsx
  main.jsx
  styles.css
```

## Historico de Evolucao

- MVP inicial com telas de Home, Cliente, Totem, Lavagem, Self-service, Shop e Admin.
- Refatoracao para React Router e componentes/paginas separadas.
- Publicacao em repositorio privado no GitHub.
- Melhorias de confiabilidade no fluxo de lavagem e busca por placa demo.
- Refinamento visual da identidade.
- Dados demo e dashboard baseado nos dados locais.
- Landing demonstrativa publica antes da plataforma.
- Perfis simulados de cliente e administrador.
- Dashboard administrativo com graficos informativos, rotulados e expansivel por clique/toque.

## Diretriz de Manutencao

Atualizar este README sempre que uma mudanca alterar:

- rotas;
- fluxo de demonstracao;
- perfis ou permissoes;
- stack ou dependencias;
- comandos de execucao;
- estrutura de pastas;
- comportamento dos dados demo;
- integracoes futuras, como Supabase.
