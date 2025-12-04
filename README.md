# ✈️ Aerocode – Sistema de Gerenciamento de Aeronaves  
### AV3 – Desenvolvimento Web • FATEC São José dos Campos


O **Aerocode** é um sistema web completo que integra frontend, backend e banco de dados
para gerenciar aeronaves, peças, etapas e testes e funcionários. Inclui autenticação por cargos,
permissões de acesso e relatórios.
Este projeto compõe a avaliação **AV3** e inclui:

- Backend em **Node.js + Express**  
- Frontend em **React + Vite**  
- Banco de dados **MySQL** usando Prisma ORM  
- Autenticação JWT  
- Controle de permissões por cargo  
- Testes de carga com **k6**  
- Relatório técnico da AV3 formatado em ABNT  

---

# 📌 Tecnologias Utilizadas

## Frontend (React + Vite)
- React.js  
- Vite  
- React Router  
- Context API (auth & roles)  
- CSS puro (`styles.css`)  
- Axios  

## Backend (Node.js + Express)
- Express  
- Prisma ORM  
- JWT  
- Bcrypt  
- Middlewares de autenticação e permissões  
- Controllers REST  

## Banco de Dados
- MySQL  
- Prisma Migrate  
- Seeds automáticas  

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-61dafb?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646cff?style=for-the-badge&logo=vite&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![k6](https://img.shields.io/badge/k6-7D64FF?style=for-the-badge&logo=k6&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)


## Testes
- k6 (1, 5 e 10 usuários simultâneos)  

---

# 🚀 Como Rodar o Projeto

## 1) Requisitos do Sistema

Para executar o projeto Aerocode corretamente, é necessário ter instalado:

- Node.js (versão 16 ou superior)  
- NPM  
- MySQL (5.7+ ou 8+)  
- Git  
- Ambiente operacional Windows ou Linux

Esses componentes garantem a execução do backend, do frontend e da camada de banco de dados.

---


## 2) Clonar o Repositório

    git clone https://github.com/gutibrk74/AV3.git
    cd aerocode_gustavo_prototype

---

## 3) Configurar o Banco de Dados

Criar o banco:

    CREATE DATABASE aerocode_db;

---

### 🔧 Configuração do MySQL (Workbench / Terminal)

Para que o backend consiga conectar ao banco de dados, utilize os seguintes dados no MySQL:

- **Host:** localhost  
- **Porta:** 3306  
- **Usuário:** root  
- **Senha:** root  
- **Nome do Banco:** aerocode_db  

Essas credenciais devem corresponder ao valor utilizado no arquivo `.env`:

    DATABASE_URL="mysql://root:root@localhost:3306/aerocode_db"

Se utilizar outro usuário ou senha no MySQL Workbench, lembre-se de atualizar o `.env` para refletir essas mudanças.

---

## 4) Rodar o Backend

Entrar na pasta:

    cd Backend-Aerocode
    npm install

Criar arquivo `.env`:

    DATABASE_URL="mysql://root:root@localhost:3306/aerocode_db"
    PORT=3001
    JWT_SECRET=segredo-muito-seguro-123
    JWT_EXPIRES_IN=8h

Rodar migrations:

    npx prisma migrate dev

Rodar seeds:

    npx prisma db seed

Iniciar servidor:

    npm run dev

➡ API rodando em: http://localhost:3001

---

## 5) Rodar o Frontend

Entrar na pasta:

    cd Frontend-Aerocode
    npm install
    npm run dev

➡ Frontend rodando em: http://localhost:5173

---

# 🔐 Usuários Criados Automaticamente (Seed)

| Cargo             | Usuário  | Senha      |
|-------------------|----------|------------|
| Administrador     | admin    | admin123   |
| Engenheiro Chefe  | eng      | eng123     |
| Operador          | operador | op123      |

---

# 🛡️ Perfis do Sistema e Níveis de Acesso

O sistema utiliza controle de permissões baseado no papel do usuário. Cada perfil possui acesso diferenciado:

### **ADMIN**
- Possui acesso completo a todas as funções do sistema  
- Pode cadastrar, editar e excluir todos os tipos de registros  
- Pode gerenciar funcionários e usuários

### **ENGENHEIRO**
- Pode visualizar aeronaves, detalhes das aeronaves, peças, etapas e testes  
- Pode registrar novas etapas de produção e testes técnicos
- pode editar peças existentes, etapas de produção e testes técnicos
- Pode excluir peças quando necessário
- Não pode administrar usuários

### **OPERADOR**
- Tem acesso para consultas a aeronaves, detalhes das aeronaves, etapas e testes  
- Apenas consegue realizar testes em conjunto com os Engenheiros

Esse modelo garante segurança e organização interna, mantendo cada papel atuando somente nas funções que lhe competem.

---

# 🧪 Como Validar o Funcionamento (Checklist de Teste)

Para verificar o comportamento do sistema conforme os diferentes perfis:

1. Acessar o sistema com o usuário **admin**
2. Criar novos usuários com os perfis **ENGENHEIRO** e **OPERADOR**
3. Entrar novamente usando cada perfil criado  
4. Confirmar:
    - Quais telas aparecem para cada tipo de usuário  
    - O que cada perfil pode criar, editar ou remover  
    - Se os blocos e botões aparecem ou ficam ocultos  
5. Verificar a exibição dos dados cadastrados e o funcionamento das rotas protegidas  
6. Testar a listagem por aeronave (peças, etapas e testes associados)

Esses passos garantem que todas as restrições e permissões estão funcionando corretamente.

---

# 📊 Testes de Carga (k6)

Scripts de teste ficam em:

    Backend-Aerocode/tests/

Rodar teste de 1 usuário:

    k6 run tests/load_1_user.js

Rodar teste de 5 usuários:

    k6 run tests/load_5_users.js

Rodar teste de 10 usuários:

    k6 run tests/load_10_users.js

Os três cenários foram usados para gerar o relatório técnico.

---

# 📁 Estrutura do Projeto

    aerocode_gustavo_prototype/
     ├── Backend-Aerocode/
     │   ├── prisma/
     │   │   ├── migrations/
     │   │   ├── schema.prisma
     │   │   └── seed.js
     │   ├── src/
     │   │   ├── config/
     │   │   ├── controllers/
     │   │   ├── middleware/
     │   │   ├── routes/
     │   │   ├── app.js
     │   │   └── server.js
     │   ├── tests/
     │   ├── package.json
     │   └── .env
     └── Frontend-Aerocode/
         ├── src/
         │   ├── assets/
         │   ├── components/
         │   ├── context/
         │   ├── hooks/
         │   ├── pages/
         │   ├── services/
         │   ├── App.jsx
         │   ├── main.jsx
         │   └── styles.css
         ├── index.html
         ├── vite.config.js
         └── package.json

---

# 📝 Relatório da AV3

O relatório ABNT completo está incluído no repositório com toda a explicação técnica utilizada para avaliação, incluindo detalhes de desempenho e gráficos obtidos nos testes com k6:

    Relatorio_AV3_Aerocode.pdf

Ele contém:

- Introdução  
- Metodologia  
- Métricas (latência, resposta, processamento)  
- Testes com 1, 5 e 10 usuários  
- Gráficos  
- Tabelas  
- .env + seeds  
- Conclusão técnica  
- Capa ABNT  

---


# 🧰 Funcionalidades Principais do Sistema

O Aerocode oferece um conjunto amplo de recursos:

- Cadastro e gerenciamento de aeronaves  
- Controle de peças associadas a cada aeronave  
- Registro de etapas e procedimentos de manutenção  
- Inclusão de testes técnicos com resultados e observações  
- Sistema de permissões por usuário  
- Interface reativa e rápida com React + Vite  
- Geração e consulta de dados para relatórios  
- Controle visual: botões e rotas ocultadas de acordo com o perfil  
- Testes de carga demonstrando a performance da API

---

# ✔️ Conclusão

O sistema **Aerocode** foi desenvolvido com foco em modularidade, segurança e desempenho.  
Após testes de carga e validações, o backend demonstrou excelente estabilidade mesmo sob carga elevada, provando sua robustez.

---

# 👨‍💻 Desenvolvedor

**Gustavo Felipe Morais**  
Análise e Desenvolvimento de Sistemas – FATEC São José dos Campos
