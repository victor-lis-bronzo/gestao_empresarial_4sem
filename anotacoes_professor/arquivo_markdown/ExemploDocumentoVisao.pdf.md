Sistema de Marcação de Consultas
Documento de Visão
Histórico da Revisão
Data Versão Descrição Autores
02/12/2013 1.0 Início do esboço do projeto Analista 1
Analista 2
Analista 3
1 Introdução
1.1 Escopo
Trata-se de um sistema web para auxiliar médicos e recepcionistas de uma clínica médica no
processo de atendimento e gerenciamento de filas de espera. As agendas dos médicos seriam configuradas
de acordo com os dias e horários de atendimentos de cada um, bem como a quantidade máxima de
consultas permitidas. Já na recepção o sistema auxiliaria os atendentes a identificar a consulta de um
paciente marcada previamente e na inserção de novos pacientes na fila de atendimento sem marcação
prévia de uma consulta.
O sistema seria capaz de exibir para os médicos a sua lista de atendimento do dia, mostrando, de
forma clara, quantos pacientes constam em sua lista e se sua chegada a clinica já foi confirmada, ou não.
Os médicos poderiam visualizar, de qualquer lugar, como esta sua agenda de atendimentos para o dia.
Para iniciar um atendimento, podem chamar o próximo paciente através do clique em um botão do
sistema. Para registrar o atendimento os médicos informaram qual o diagnostico da consulta e o
receituário informado. Apos a confirmação do registro da consulta, estas informações serão enviadas para
o email do paciente.
O sistema também seria capaz de exibir, em um “painel de controle” na sala de espera, um
gráfico intuitivo da situação da fila de atendimento. Tal gráfico seria capaz de mostrar se um determinado
médico está em atendimento ou aguardando o próximo paciente e a ordem de atendimento dos próximos
pacientes, ordenados por classificação de risco, idade e necessidades especiais. Como existem
especialidades que requerem um pré-exame, este painel de controle seria o responsável por indicar ao
paciente, quando chamado, para qual sala/consultório ele deve se dirigir.
O sistema deve permitir que na recepção haja a impressão de segunda via de receituário medico
para o paciente, bem como o histórico de todas as consultas que ele realizou na clinica.
1.2 Resumo
Produzir um sistema web que gerencie, em uma clínica médica, a marcação de consultas, a agenda
dos médicos que atendem nessa clínica, fila de espera de pacientes e prontuário de pacientes.

2 Requisitos
2.1 Requisitos Funcionais
Cod. Nome Descrição Categoria
F01 Cadastro de parametros O usuário poderá cadastrar os parametros de Evidente
de consultório consultório necessários para a operação do sistema,
tais como: especialidades médicas, procedimentos,
planos de saúde e sala/consultórios de atendimento.
F02 Cadastro de Médico O usuário poderá gerenciar o cadastro de Evidente
profissionais médico no sistema.
F03 Cadastro de Paciente O usuário poderá gerenciar o cadastro de pacientes Evidente
no sistema.
F04 Configurar agenda de O usuário poderá configurar a agenda de Evidente
atendimento do médico atendimento de um médico.
F05 Marcar consulta O usuário poderá gerenciar as consultas de um Evidente
paciente com um médico.
F06 Confirmar presença O usuário poderá confirma a chegada de um Evidente
paciente com consulta marcada. Se o exame requer
pré-exame, encaminhar o paciente para realiza-lo.
F07 Confirmar autorização O usuário confirmará que a consulta foi liberada Evidente
do plano de saúde pelo plano de saúde.
F08 Gerenciar fila de O usuário poderá chamar o próximo paciente da Evidente
atendimento fila para iniciar uma consulta.
F09 Registrar consulta O usuário poderá registrar uma consulta no Evidente
sistema.
F10 Enviar notificacao O paciente poderá receber por email uma Evidente
notificacao como lembrete da consulta agendada.
F11 Visualizar agenda do O usuário poderá visualizar a agenda de Evidente
médico atendimento de um médico.
F12 Visualizar prontuário O usuário poderá visualizar o prontuário de um Evidente
paciente.

2.2 Requisitos Não Funcionais
| Cod.  | Nome  |     |     | Descrição  |     | Categoria  |
| ----- | ----- | --- | --- | ---------- | --- | ---------- |
NF01  Multiplataforma  Possibilidade do Sistema Rodar em qualquer  Desejável
plataforma
NF02  Interface Simples  Interface simples e fácil de usar.  Desejável

2.3 Tabela de Referência - Requisitos
  F01  F02  F03  F04  F05  F06  F07  F08  F09  F10  F11  F12
| NF01  | X  X  | X  X  | X   | X  X  X  | X  X  | X  X  |
| ----- | ----- | ----- | --- | -------- | ----- | ----- |
| NF02  | X  X  | X  X  | X   | X  X  X  | X     | X  X  |

2.4 Diagrama Geral de Casos de Uso

2.5 Casos de Uso
| Cod.               | Caso de uso  |                                         | Descrição  | Classificação  |
| ------------------ | ------------ | --------------------------------------- | ---------- | -------------- |
| UC01  Cadastro de  |              | O Gestor informará os dados cadastrais  |            |                |
Especialidade médica  solicitados para incluir/atualizar um novo
registro. Para excluir, deverá selecionar um
registro ja existente.
| UC02  Cadastro de  |     | O Gestor informará os dados cadastrais        |     |     |
| ------------------ | --- | --------------------------------------------- | --- | --- |
| Procedimento       |     | solicitados para incluir/atualizar um novo    |     |     |
|                    |     | registro. Para excluir, deverá selecionar um  |     |     |
registro ja existente.
UC03  Cadastro de Médico  O Gestor informará os dados cadastrais
solicitados para incluir/atualizar um novo
registro. Para excluir, deve selecionar um
registro ja existente.
UC04  Cadastro de Paciente  O recepcionista informará os dados cadastrais
solicitados para incluir/atualizar um novo
registro. Para excluir, deve selecionar um

registro ja existente.
UC05 Cadastro de Plano de O Gestor informará os dados cadastrais
Saúde solicitados para incluir/atualizar um novo
registro. Para excluir, deve selecionar um
registro ja existente.
UC06 Cadastro de O Gestor informará os dados cadastrais
Sala/Consultório solicitados para incluir/atualizar um novo
registro. Para excluir, deve selecionar um
registro ja existente.
UC07 Configurar agenda de O Gestor informará qual a especialidade,
atendimento do médico consultorio, dias e horarios, e quantidade
maxima de atendimento de cada medico.
UC08 Marcar consulta O recepcionista informará o paciente, medico,
dia, horario e o procedimento desejado.
UC09 Cancelar consulta O recepcionista poderá cancelar uma consulta
anteriormente agendada.
UC10 Confirmar presença O recepcionista confirmará a chegada do
paciente para a realização da consulta.
UC11 Encaminhar para pré- O recepcionista, quando requerido pelo
exame procedimento agendado, poderá encaminhar o
paciente para a realização de exames
preliminares.
UC12 Confirmar autorização O recepcionista confirmará que a consulta foi
do plano de saúde liberada pelo plano de saúde. Esta condição é
necessaria para que o médico registre o
atendimento do paciente.
UC13 Chamar paciente 1 - O recepcionista poderá chamar o paciente,
dentre os agendados e que confirmaram
presença, para confirmacao da autorização de
plano.
2 - O medico poderá chamar o paciente, dentre
os agendados e que confirmaram autorização
do plano, para realização da consulta.
UC14 Registrar consulta O médico poderá registrar o diagnostico da
consulta bem como o receituario prescrito para

o paciente.
UC15  Enviar notificacao  O sistema poderá enviar por email uma
notificacao como lembrete das consultas
agendadas.
UC16  Visualizar agenda  O medico poderá visualizar sua a agenda de
|     | pessoal  | atendimento.  |     |     |     |     |     |
| --- | -------- | ------------- | --- | --- | --- | --- | --- |
UC17  Visualizar agenda dos  O recepcionista poderá visualizar a agenda de
|     | médicos  | atendimento de qualquer médico  |     |     |     |     |     |
| --- | -------- | ------------------------------- | --- | --- | --- | --- | --- |
UC18  Visualizar prontuário  O Gestor ou o médico poderá visualizar o
prontuário de um paciente.
UC19  Mostrar fila de  O recepcionista poderá visualizar a fila de
|     | atendimento  | atendimento e mostra-lá para os pacientes que  |     |     |     |     |     |
| --- | ------------ | ---------------------------------------------- | --- | --- | --- | --- | --- |
estao aguardando atraves de uma tela
secundaria. Exemplo: Um monitor ou televisão.

2.6 Tabela de Referência - Casos de uso & Requisitos
  NF01  NF02  F01  F02  F03  F04  F05  F06  F07  F08  F09  F10  F11  F12
| UC01  | X  X  | X    |     |     |     |     |     |
| ----- | ----- | ---- | --- | --- | --- | --- | --- |
| UC02  | X  X  | X    |     |     |     |     |     |
UC03
|     | X  X  |   X  |     |     |     |     |     |
| --- | ----- | ---- | --- | --- | --- | --- | --- |
UC04
|       | X  X  |      | X    |     |     |     |     |
| ----- | ----- | ---- | ---- | --- | --- | --- | --- |
| UC05  | X  X  | X    |      |     |     |     |     |
| UC06  | X  X  | X    |      |     |     |     |     |
| UC07  | X  X  |      |   X  |     |     |     |     |
UC08
|     | X  X  |     |     | X    |     |     |     |
| --- | ----- | --- | --- | ---- | --- | --- | --- |
UC09
|     | X  X  |     |     | X    |     |     |     |
| --- | ----- | --- | --- | ---- | --- | --- | --- |

| UC10  | X  X  |     |     |   X  |      |     |     |
| ----- | ----- | --- | --- | ---- | ---- | --- | --- |
| UC11  | X  X  |     |     |   X  |      |     |     |
| UC12  | X  X  |     |     |      | X    |     |     |
UC13
|     | X  X  |     |     |     |   X  |     |     |
| --- | ----- | --- | --- | --- | ---- | --- | --- |
UC14
|       | X     |     |     |     |     | X    |      |
| ----- | ----- | --- | --- | --- | --- | ---- | ---- |
| UC15  | X  X  |     |     |     |     |   X  |      |
| UC16  | X  X  |     |     |     |     |      | X    |
| UC17  | X  X  |     |     |     |     |      | X    |
UC18
|     | X  X  |     |     |     |     |     |   X  |
| --- | ----- | --- | --- | --- | --- | --- | ---- |
UC19
|     | X    |     |     |     |   X  |     |     |
| --- | ---- | --- | --- | --- | ---- | --- | --- |

2.7 Atores
|          | Ator  |                                                     |     | Descrição  |     |     |     |
| -------- | ----- | --------------------------------------------------- | --- | ---------- | --- | --- | --- |
| Gestor   |       | Usuário responsável pela parametrização do sistema  |     |            |     |     |     |
Recepção  Profissional responsável pela recepção dos pacientes
Médico  Profissional responsável por efetuar consultas médicas
| Tempo  |     | O sistema possui rotinas automaticas  |     |     |     |     |     |
| ------ | --- | ------------------------------------- | --- | --- | --- | --- | --- |

3 Clientes
O cliente do projeto é um Hospital.....
Nesta seção haverá uma descrição dos clientes/usuários....

4 Protótipos de Tela
Nesta seção serão inseridos os protótipos de tela...