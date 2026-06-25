# AutoWash Smart

MVP demonstrativo de uma plataforma para lava a jato inteligente, automatizado e escalável.

O projeto foi criado para apresentação comercial. Todas as integrações externas são simuladas, sem hardware real, sem pagamentos reais e sem dependência de backend.

## Estado Atual

- Tela demonstrativa pública para interessados.
- Acesso simulado com dois perfis: cliente e administrador.
- Plataforma operacional com dados demo em `localStorage`.
- Fluxo de totem, lavagem express, self-service, mini shop e dashboard.
- Dados demo restauráveis no painel administrativo.
- Repositório GitHub privado: `Riclacper/AutoWashSmart`.

## Stack

- React
- Vite
- JavaScript
- React Router
- CSS organizado em `src/styles.css`
- LocalStorage para persistência simulada
- Lucide React para ícones

## Como Rodar

Instalar dependências:

```bash
npm install
```

Rodar em desenvolvimento:

```bash
npm run dev
```

Gerar build de produção:

```bash
npm run build
```

Previsualizar build:

```bash
npm run preview
```

## Rotas Principais

- `/`: tela demonstrativa pública.
- `/app`: seleção de perfil simulado.
- `/app/cliente/portal`: portal do cliente.
- `/app/cliente/dados`: dados do cliente logado.
- `/app/cliente/shop`: compras no mini shop.
- `/app/admin`: home operacional do administrador.
- `/app/admin/clientes`: cadastro e histórico de clientes.
- `/app/admin/totem`: totem de entrada.
- `/app/admin/lavagem`: lavagem express automatizada.
- `/app/admin/self-service`: box self-service.
- `/app/admin/shop`: mini shop.
- `/app/admin/dashboard`: dashboard administrativo com métricas, gráficos interativos, detalhamento expandido e feed de atividades recentes.

## Perfil Cliente

O modo cliente mostra uma experiência limitada ao próprio usuário:

- Resumo do cliente.
- Plano ativo.
- Veículo principal.
- QR Code demonstrativo de acesso.
- Últimas lavagens.
- Compras recentes.
- Pagamentos simulados.
- Dados cadastrais em modo visual.

O cliente não acessa indicadores gerais, lista completa de clientes ou operação administrativa.

O botão `Trocar perfil` na sidebar retorna para a tela demonstrativa pública.

## Perfil Administrador

O modo administrador mostra a operação completa:

- Cadastro de clientes, veículos e autorizados.
- Totem com placa, QR Code e facial simulados.
- Lavagem express com progresso visual.
- Self-service com controle de tempo e consumo.
- Mini shop com venda simulada.
- Dashboard com clientes, veículos, lavagens, receita e produtos vendidos.
- Gráficos com totais, rótulos por dia/produto, valores exibidos nas barras e painel expandido ao selecionar.
- Feed de atividades recentes com tipo, origem, dia e valor.
- Restauração dos dados demo.

## Dados Demo

Os dados iniciais ficam em `src/data/catalog.js`.

A persistência local fica em `src/services/storage.js`.

Se o navegador estiver sem dados ou com dados vazios, o app carrega automaticamente os dados demo. No dashboard administrativo existe um botão para restaurar os dados demo.

Placa recomendada para demonstração no totem:

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

## Histórico de Evolução

- MVP inicial com telas de Home, Cliente, Totem, Lavagem, Self-service, Shop e Admin.
- Refatoração para React Router e componentes/páginas separadas.
- Publicação em repositório privado no GitHub.
- Melhorias de confiabilidade no fluxo de lavagem e busca por placa demo.
- Refinamento visual da identidade.
- Dados demo e dashboard baseado nos dados locais.
- Landing demonstrativa pública antes da plataforma.
- Perfis simulados de cliente e administrador.
- Dashboard administrativo com gráficos informativos, rotulados e expansível por clique/toque.
- Mini shop com imagens locais para os produtos automotivos.
- Refinamento visual do roteiro sugerido e CTA da landing demonstrativa.

## Diretriz de Manutenção

Atualizar este README sempre que uma mudança alterar:

- rotas;
- fluxo de demonstração;
- perfis ou permissões;
- stack ou dependências;
- comandos de execução;
- estrutura de pastas;
- comportamento dos dados demo;
- integrações futuras, como Supabase.
