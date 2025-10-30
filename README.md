# agendamento-transferencias-ui
Sistema completo para agendamento de transferências financeiras com cálculo automático de taxas.
---
## Tecnologias e Versões
### Front-end (Web)
- **Vue.js:** 3.3.4
- **Node.js:** 20+
- **Bootstrap:** 5.3.0
- **Axios:** 1.5.0
- **Porta:** 5173

##  Como Executar
### Pré-requisitos
Certifique-se de ter instalado:
- Node.js 20+
- NPM ou Yarn

### Front-end (Vue.js)

```bash
# 1. Entre na pasta do front-end
cd agendamento-transferencias-app && cd agendamento-transferencias-ui

# 2. Instale as dependências
npm install

# 3. Execute em modo desenvolvimento
npm run dev
```

Aplicação estará em: **http://localhost:5173**

---

## Funcionalidades

### Tela de Agendamento
- Formulário de nova transferência
- Validação de campos em tempo real
- Cálculo automático de taxa
- Feedback de sucesso/erro

### Tela de Extrato
- Listagem paginada (10 registros por página)
- Navegação entre páginas
- Formatação de valores e datas
- Ordenação por data de agendamento

---

### Front-end
```
src/
├── components/        # Componentes Vue
├── views/             # Páginas/Telas
├── services/          # Serviços de API
├── router/            # Rotas da aplicação
└── App.vue            # Componente raiz
```

---

## Testar a Aplicação

### 1. Inicie o back-end primeiro
```bash
cd agendamento-transferencias
mvn spring-boot:run
```

Aguarde até ver: `Started AgendamentoTransferenciasApplication`

### 2. Em outro terminal, inicie o front-end seguindo os passos acima "Front-end (Vue.js)"

Aguarde até ver: `Local: http://localhost:5173/agendamentos`

### 3. Acesse no navegador
http://localhost:5173/agendamentos

### 4. Crie um agendamento
- Preencha o formulário
- Clique em "Agendar Transferência"
- Veja o sucesso e vá para "Extrato"

---

