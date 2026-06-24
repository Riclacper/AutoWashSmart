# AGENTS.md

# AutoWash Smart

Sistema de lava a jato inteligente, automatizado e escalável.

---

## Visão Geral

AutoWash Smart é uma plataforma para gerenciamento de lava a jato automatizado com foco em:

- Lavagem Express Automatizada
- Lavagem Self-Service
- Reconhecimento de Veículos
- Reconhecimento Facial
- Controle de Acesso
- Cobrança Automática
- Loja Autônoma
- Assinaturas Recorrentes
- Dashboard Operacional

Nesta fase o projeto é um MVP de demonstração comercial.

Todas as integrações externas devem ser simuladas.

---

# Objetivos da Primeira Versão

Criar um protótipo navegável que demonstre:

- Experiência do cliente
- Operação do lava jato
- Fluxo de entrada e saída
- Cobrança automatizada
- Loja autônoma
- Painel administrativo

Sem utilização de hardware real.

Sem integrações pagas.

Sem dependência de serviços externos.

---

# Stack Tecnológica

Frontend:

- React
- Vite
- JavaScript
- React Router

Persistência:

- LocalStorage

Estilização:

- CSS Modules ou CSS organizado por componente

Bibliotecas permitidas:

- React Icons
- Recharts
- Framer Motion

Evitar dependências desnecessárias.

---

# Estrutura Inicial

/frontend

/src

/components

/pages

Home

Cliente

Totem

ExpressWash

SelfService

Shop

Dashboard

/services

/hooks

/data

/assets

/styles

---

# Princípios do Projeto

Sempre priorizar:

1. Simplicidade
2. Clareza visual
3. Navegação intuitiva
4. Responsividade
5. Componentização

Não criar complexidade desnecessária.

Não implementar funcionalidades que não estejam sendo utilizadas.

---

# Design

Tema principal:

Azul escuro
Branco
Verde

Visual inspirado em:

- Tesla
- Uber
- Mercado Livre
- Aplicativos de mobilidade

Características:

- Interface limpa
- Pouco texto
- Muitos indicadores visuais
- Cartões modernos
- Animações suaves

---

# Funcionalidades do MVP

## Home

Apresentação do sistema.

Seções:

- Hero
- Como Funciona
- Serviços
- Planos
- Benefícios
- Contato

---

## Cadastro do Cliente

Campos:

- Nome
- CPF
- E-mail
- Telefone

Pessoas autorizadas:

Máximo 3.

Campos:

- Nome
- Parentesco

---

## Cadastro de Veículos

Campos:

- Placa
- Marca
- Modelo
- Cor
- Categoria

Categorias:

- Hatch
- Sedan
- SUV
- Pick-up

---

## Totem de Entrada

Fluxo simulado.

Métodos:

- Placa
- QR Code
- Reconhecimento Facial

Nenhuma validação externa deve ser implementada.

Tudo deve funcionar com dados simulados.

---

## Lavagem Express

Simular:

- Entrada
- Pré-lavagem
- Espuma
- Enxágue
- Secagem
- Finalização

Exibir progresso visual.

---

## Self-Service

Simular:

- Seleção de tempo
- Consumo de água
- Serviços utilizados

Opções:

- 10 minutos
- 20 minutos
- 30 minutos

---

## Mini Shop

Produtos simulados.

Exemplos:

- Shampoo
- Cera
- Silicone
- Aromatizador
- Limpa Vidro
- Microfibra

Fluxo:

Selecionar produto
Simular pagamento
Exibir confirmação

---

## Cobrança

Simulada.

Exibir:

- Serviço
- Valor
- Data
- Horário
- Status aprovado

---

## Dashboard

Indicadores:

- Clientes
- Veículos
- Lavagens
- Receita
- Produtos vendidos

Utilizar gráficos simulados.

---

# Dados Mockados

Todos os dados devem possuir exemplos iniciais.

Criar:

mockCustomers.js

mockVehicles.js

mockSales.js

mockProducts.js

mockWashes.js

Não iniciar sistema vazio.

---

# Boas Práticas

Sempre:

- Componentizar telas
- Evitar duplicação de código
- Utilizar funções reutilizáveis
- Separar regras de negócio da interface

---

# O Que Não Fazer

Não implementar:

- Backend
- Banco de dados
- APIs externas
- Mercado Pago
- Stripe
- OCR real
- Face Recognition real
- ESP32
- Raspberry
- MQTT
- Firebase

Esses recursos serão adicionados futuramente.

---

# Roadmap Futuro

Versão 2

- Backend Node.js
- Express
- MongoDB

Versão 3

- OCR de placas
- QR Code dinâmico
- Mercado Pago
- PIX

Versão 4

- Reconhecimento Facial
- Controle de acesso
- Assinaturas

Versão 5

- IoT
- Sensores
- Controle de água
- Controle de esteira

Versão 6

- Aplicativo Mobile
- React Native

---

# Regras para o Codex

Ao implementar novas funcionalidades:

1. Preservar arquitetura existente.
2. Não remover funcionalidades já concluídas.
3. Não alterar layouts sem necessidade.
4. Priorizar componentes reutilizáveis.
5. Corrigir erros antes de criar novas funcionalidades.
6. Manter código limpo e documentado.
7. Sempre sugerir melhorias de UX quando identificar oportunidades.
8. Informar riscos técnicos antes de realizar mudanças estruturais.

Objetivo final:
Transformar o AutoWash Smart em uma plataforma SaaS para operação e licenciamento de lava jatos inteligentes e autônomos.
