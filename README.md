## LabenuSystem:

Você estuda na Labenu_ há tanto tempo que já parecem anos, não é? Então, hoje, vamos pedir para criar um sistema que represente o básico da nossa organização. 

Ele deve possuir, ao menos, as 3 entidades importantes:

1. Estudantes 

    Representa estudantes da nossa instituição. Eles devem possuir: id, nome, email, data de nascimento e os principais hobbies dele. 

2. Docente

    Representa docentes da nossa instituição. Eles devem possuir: id, nome, email, data de nascimento e todas as especialidades dele. Há 7 especialidades: React, Redux, CSS, Testes, Typescript, Programação Orientada a Objetos e Backend

3. Turma

    Toda turma é composta das seguintes características: id, nome, data de início, data de término, lista de professores responsáveis, uma lista de alunos e módulo atual em que a turma está.

    O módulo pode assumir os valores de 1 a 7 ou `undefined`, indicando que as aulas dessa turma ainda não começaram. Para esse exercício, vamos considerar que existam dois tipos de turma: integral ou noturna. Há uma restrição para o nome das turmas noturnas: tem que terminar com `-na-night`.

As funcionalidades básicas são:

→ Criar estudante;

→ Criar docente;

→ Criar turma;

→ Adicionar estudante na turma;

→ Adicionar docente na turma;

→ Pegar a idade de algum estudante a partir do id


## <h1 align="center">📇 LabenuSystem</h1>

## :memo: Descrição
Projeto desenvolvido como didática de back-end para as turmas JBL LABENU com conteúdos que englobam o universo da criação de uma API com a temática de um sistema de gerenciamento básico da organizaçãode labenu.

## :books: Funcionalidades
* <b>Criar Estudantes</b>: Métodos voltados para a criação de usuários que são estudantes.
* <b>Buscar Estudantes</b>: Métodos voltados para a consulta de estudantes cadastradas.
* <b>Mudar Estudantes de Turma</b>: Métodos voltados para a alteração do estudante de turma.
* <b>Criar Docentes</b>: Métodos voltados para a criação de usuários que são pessoas instrutora.
* <b>Buscar Docentes</b>: Métodos voltados para a consulta de pessoas instrutoras cadastradas.
* <b>Mudar Docente de Turma</b>: Métodos voltados para a alteração do docente de turma.
* <b>Criar Turma</b>: Métodos para a criação de turmas.
* <b>Buscar Turma</b>: Métodos que realiza busca em banco das turmas ativas.
* <b>Mudar Turma Módulo</b>: Métodos voltados para a alteração da turma de mód.


## :wrench: Tecnologias utilizadas
* VS Code
* nodeJS
* expressJS
* axios
* cors
* dotenv
* MySQL


## :rocket: Rodando o projeto
Para rodar o repositório é necessário clonar o mesmo, dar o seguinte comando para instalar as dependências:
```
npm install
```
Após instaladas as dependências, configure o arquivo .env:
```
DB_HOST = 
DB_USER = ""
DB_PASS = ""
DB_NAME = ""
```
Após configuração do .env, dê o comando seguinte para rodar o migration:
```
npm run migrations
```
Após o migration, dê o comando seguinte para rodar a aplicação:
```
npm run start
```

Use o Postman ou o Insomnia para realizar as requisições desejadas.

## :dart: Status do projeto
O projeto está em andamento.
