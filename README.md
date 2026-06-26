# AutoWash Smart — MVP demonstrativo v0.1

MVP demonstrativo de uma plataforma para lava a jato inteligente, automatizado e escalável.

O projeto foi criado para apresentação comercial. Todas as integrações externas são simuladas, sem hardware real, sem pagamentos reais e sem dependência de backend.

## Desenvolvedor

Projeto desenvolvido por [Ricardo Lacerda Pereira](https://www.linkedin.com/in/ricardo-lacerda-pereira/).

## Estado Atual

- Tela demonstrativa pública para interessados.
- Acesso simulado com dois perfis: cliente e administrador.
- Plataforma operacional com dados demo em `localStorage`.
- Fluxo de identificação, lavagem express, self-service, mini shop e dashboard.
- Lavagens e sessões self-service vinculadas ao cliente e ao veículo.
- Lavagem e self-service bloqueados quando não existe identificação válida no totem.
- Cadastro com validação de CPF/CNPJ, telefone, e-mail e placa.
- Prevenção de duplicidade por documento, e-mail e placa.
- Cadastro de até cinco veículos por cliente.
- Simulação de QR Code e reconhecimento facial por perfil selecionado.
- Mensagens de confirmação e erro nos fluxos principais.
- Testes unitários para validadores e regras operacionais.
- Dados demo restauráveis no painel administrativo.
- Repositório GitHub: `Riclacper/AutoWashSmart`.

## Stack

- React
- Vite
- JavaScript
- React Router
- CSS organizado em `src/styles.css`
- LocalStorage para persistência simulada
- Lucide React para ícones
- Vitest para testes
- ESLint e Prettier para qualidade e padronização

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

Executar testes:

```bash
npm run test:run
```

Validar o código:

```bash
npm run lint
npm run format:check
```

## Rotas Principais

- `/`: tela demonstrativa pública.
- `/app`: seleção de perfil simulado.
- `/app/cliente/portal`: portal do cliente.
- `/app/cliente/dados`: dados do cliente logado.
- `/app/cliente/shop`: compras no mini shop.
- `/app/admin`: home operacional do administrador.
- `/app/admin/clientes`: cadastro e histórico de clientes.
- `/app/admin/totem`: identificação por placa, QR Code ou facial.
- `/app/admin/lavagem`: lavagem express automatizada.
- `/app/admin/self-service`: box self-service.
- `/app/admin/shop`: mini shop.
- `/app/admin/dashboard`: dashboard administrativo com métricas e atividades recentes.

## Fluxo Operacional da Fase 1

1. O cliente e um ou mais veículos são cadastrados.
2. O totem identifica um veículo por placa ou por uma simulação específica de QR Code/facial.
3. A identificação libera a lavagem automática ou o box self-service.
4. A operação registra cliente, veículo, método de identificação, preço e situação.
5. O dashboard soma lavagens, self-service e vendas na receita simulada.
6. Ao concluir uma operação, uma nova identificação é exigida.

## Perfil Cliente

O modo cliente mostra uma experiência limitada ao próprio usuário:

- Resumo do cliente.
- Plano ativo.
- Veículo principal.
- QR Code demonstrativo individual.
- Últimas lavagens vinculadas.
- Compras recentes vinculadas.
- Pagamentos simulados.
- Dados cadastrais em modo visual.

O cliente não acessa indicadores gerais, lista completa de clientes ou operação administrativa.

## Perfil Administrador

O modo administrador mostra a operação completa:

- Cadastro validado de clientes, veículos e autorizados.
- Totem com placa, QR Code e facial simulados.
- Lavagem express com progresso visual e vínculo operacional.
- Self-service com controle de tempo, preço, consumo e registro.
- Mini shop com venda simulada vinculada ao cliente.
- Dashboard com clientes, veículos, lavagens, self-service, receita e produtos vendidos.
- Feed de atividades recentes.
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
  utils/
  App.jsx
  main.jsx
  styles.css
tests/
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
- Ajuste responsivo do menu da plataforma em smartphones.

## Roadmap de evolução

O AutoWash Smart está sendo desenvolvido de forma incremental. A versão atual representa um MVP demonstrativo para apresentação comercial e validação da proposta.

### Fase 1 — MVP demonstrativo

- [x] Vincular lavagem ao cliente e ao veículo.
- [x] Impedir lavagem sem identificação.
- [x] Registrar o uso do self-service.
- [x] Validar CPF/CNPJ, telefone, e-mail e placa.
- [x] Impedir cadastros duplicados.
- [x] Permitir vários veículos por cliente.
- [x] Melhorar a simulação de QR Code e reconhecimento facial.
- [x] Adicionar mensagens de erro e confirmação.
- [x] Criar testes básicos.
- [x] Adicionar ESLint e Prettier.

A Fase 1 utiliza dados demonstrativos e persistência local no navegador. Não existem pagamentos, reconhecimento biométrico ou equipamentos físicos integrados.

### Fase 2 — Protótipo conectado

- [ ] Criar banco de dados no Supabase.
- [ ] Implementar autenticação.
- [ ] Separar efetivamente os acessos de cliente e administrador.
- [ ] Persistir clientes, veículos, lavagens e vendas.
- [ ] Criar histórico individual do cliente e dos veículos.
- [ ] Atualizar o dashboard com dados reais do banco.
- [ ] Implementar controle de estoque do mini shop.
- [ ] Registrar caixas, equipamentos e boxes self-service.
- [ ] Implementar regras de acesso e segurança dos dados.
- [ ] Preparar políticas de privacidade e adequação à LGPD.

### Fase 3 — Integrações operacionais reais

- [ ] Integrar leitura automática de placas.
- [ ] Gerar QR Code individual por cliente ou veículo.
- [ ] Integrar reconhecimento facial com consentimento e proteção de dados.
- [ ] Integrar gateway de pagamento.
- [ ] Integrar controle da esteira de lavagem.
- [ ] Integrar sensores de entrada e saída.
- [ ] Monitorar disponibilidade e falhas dos equipamentos.
- [ ] Gerar notas fiscais, recibos e comprovantes.
- [ ] Criar aplicativo ou PWA para o cliente.
- [ ] Implementar notificações e acompanhamento da lavagem.

## Estado do projeto

A versão atual é um protótipo demonstrativo. As funcionalidades relacionadas a hardware, pagamentos, biometria e automação física são simuladas e não devem ser utilizadas em uma operação real sem a implementação das fases seguintes.

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
