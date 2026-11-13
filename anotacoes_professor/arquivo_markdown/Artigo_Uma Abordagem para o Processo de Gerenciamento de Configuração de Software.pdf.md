Uma Abordagem para o Processo de
Gerenciamento de Configuração de Software
João Ronaldo Del-Ducca Cunha, Antonio Francisco do Prado, Antonio Carlos dos Santos,
Raphael Marcílio de Souza Neto
Departamento de Computação, Universidade Federal de São Carlos, Rodovia Washington Luiz km 235, São
Carlos, SP, Brasil
{jronaldo, prado, santos, raphael}@dc.ufscar.br
Resumo - O Gerenciamento de Configuração de Software (GCS) é um processo que provê recursos para
identificação, controle da evolução e auditagem dos artefatos de software criados durante o
desenvolvimento do projeto de software. No entanto, a sua aplicação em empresas de software é complexa,
exigindo gastos que muitas vezes a inviabilizam. Uma forma de reduzir os custos envolvidos nesta
aplicação está na definição de uma abordagem para o processo de GCS que englobe aspectos deste
processo de tal forma a atender as necessidades específicas da empresa. Apresenta-se, neste artigo, uma
abordagem para o processo de GCS, definindo atividades que buscam atender a área de processo de
Gerenciamento de Configuração do modelo CMMI. Esta abordagem está sob o contexto de uma estratégia
de implantação do processo de GCS e possui uma ferramenta de GCS para sua implementação.
Palavras-chave: Gerenciamento de Configuração de Software, Melhoria de Processos de Software.
Abstract - The Software Configuration Management (SCM) is a process that provides resources for
identification, control of evolution and audit of the software’s artifacts during the software’s project
development. However, it is complex to adopt the SCM process in software companies, because it demands
investments that, in some cases, unable it. An option to reduce the costs involved in its deployment is the
use of an approach of SCM process that includes in its activities aspects that answer the specific needs of a
company. This article presents a SCM process approach where its phases answer the critical needs of the
CMMI’s (Capability Maturity Model Integration) Configuration Management process. This approach is part of
a SCM implementation strategy and is bringing among its results an application tool to implement a SCM
process.
Key-words: Software Configuration Management, Software Process Improvement.
Introdução CMMi (Capability Maturity Model Integration) [2]
definido pela SEI (Software Engineering Institute).
Muitos esforços foram realizados, por Com base nestas pesquisas, os processos
meio de estudos e pesquisas que visam contribuir existentes foram aprimorados e novos foram
para a evolução da Engenharia de Software e de elaborados de tal forma a serem aplicados em
suas áreas de conhecimento através da definição empresas de software.
de processos de software. Dentre os processos No entanto, ainda é notória a dificuldade
de software, cita-se o de Gerenciamento de das organizações em adotar conceitos e práticas
Configuração de Software (GCS) que está relacionadas ao processo de GCS. Esta
relacionado à Gestão da Qualidade [1], dificuldade muitas vezes reside no fato de que a
contribuindo para a qualidade do projeto de implantação deste processo é uma atividade
software através do suporte às suas atividades complexa que envolve definir uma abordagem
relacionadas tanto aos aspectos gerenciais adequada para o processo de GCS e a seleção
quanto técnicos. de ferramentas de apoio a esta abordagem. Por
Além disso, outras pesquisas foram e este motivo, implantar o GCS exige investimentos
estão sendo realizadas para definir modelos, tanto em recursos financeiros como humanos que
normas e padrões para qualidade de processos são escassos principalmente para pequenas
de software como, por exemplo, o GCS, com o organizações, o que acarreta muitas vezes num
objetivo de direcionar os esforços realizados por impedimento à adoção dessas práticas que
organizações, como as de tecnologia da poderiam contribuir para o seu crescimento e
informação, para melhorar a qualidade no sobrevivência.
desenvolvimento de software e, por Este artigo apresenta uma abordagem
conseqüência, aumentar o grau de sucesso dos para o processo de GCS, definida sob o contexto
projetos de software. Cita-se, como exemplo, o de uma estratégia para implantação deste

processo, cujo objetivo é contribuir para com a  relacionada à geração de relatórios com base nas
melhoria da qualidade dos projetos de software e,  informações da configuração do software.
| conseqüentemente, com o sucesso das empresas  |     |     |     |     |     |     |     |     |     |     |     |     |     |     |
| --------------------------------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
de  software  frente  o  mercado  de  informática,  Já  a  Auditagem  da  Configuração  está
facilitando a aplicação deste processo.  relacionada às auditorias realizadas sobre CIs e
|     |     |     |     |     |     |     |     | baselines, buscando verificar se há conformidade  |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | ------------------------------------------------- | --- | --- | --- | --- | --- | --- |
Processo de GCS  entre  características  físicas  e  funcionais  do
|     |     |     |     |     |     |     |     | software  | representadas  |     | pela  documentação  |     |     | do  |
| --- | --- | --- | --- | --- | --- | --- | --- | --------- | -------------- | --- | ------------------- | --- | --- | --- |
A  finalidade  do  GCS  é  estabelecer  e  projeto e pelo produto de software.
| manter a integridade dos produtos do projeto de  |     |     |     |     |     |     |     |     |     |     |     |     |     |     |
| ------------------------------------------------ | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
software ao longo do seu ciclo de vida. O GCS  Implantação de GCS
| envolve [3]:  |     |     |     |     |     |     |     |     |     |     |     |     |     |     |
| ------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
•  Identificar  a  configuração  de  software  O  sucesso  do  projeto  de  software  está
(artefatos  de  software  selecionados  e  sua  muitas  vezes  associado  com  a  adoção  de
descrição) em um dado momento;  processos de software como o de GCS. Porém, a
•  Controlar sistematicamente as mudanças na  adoção desses processos é uma tarefa complexa
|     |                |     |     |     |     |     |     | que  muitas  | vezes  | acaba  | por  | inviabilizar  |     | as  |
| --- | -------------- | --- | --- | --- | --- | --- | --- | ------------ | ------ | ------ | ---- | ------------- | --- | --- |
|     | configuração;  |     |     |     |     |     |     |              |        |        |      |               |     |     |
•  Manter, através da gerência, a integridade e  empresas  em  sair  do  diagnóstico,  onde  se
rastreabilidade da configuração ao longo do  observa a necessidade em implantar o processo,
|     |     |     |     |     |     |     |     | para  chegar  | no  | operacional,  |     | onde  | se  tem  | a   |
| --- | --- | --- | --- | --- | --- | --- | --- | ------------- | --- | ------------- | --- | ----- | -------- | --- |
ciclo de vida do software;
|     |                                          |     |              |     |     |            |     | execução   | destes  | processos  |     | nos  projetos  |     | de  |
| --- | ---------------------------------------- | --- | ------------ | --- | --- | ---------- | --- | ---------- | ------- | ---------- | --- | -------------- | --- | --- |
| •   | Controlar                                | a   | integridade  |     | de  | artefatos  |     |            |         |            |     |                |     |     |
|     | compostos, levando em conta a versão de  |     |              |     |     |            |     | software.  |         |            |     |                |     |     |
Isto se deve muitas vezes ao fato de se
cada um dos componentes, ou seja, controlar
|     |     |     |     |     |     |     |     | acreditar  | que  a  | implantação  |     | de  processos  |     | de  |
| --- | --- | --- | --- | --- | --- | --- | --- | ---------- | ------- | ------------ | --- | -------------- | --- | --- |
a configuração do artefato composto; e
•  Registrar e relatar o estado do processo de  software em uma empresa de software, como o
caso da implantação do processo de GCS, ocorre
alteração.
|     |     |     |     |     |     |     |     | simplesmente  | pela  | adoção  | de  | ferramentas.  |     | No  |
| --- | --- | --- | --- | --- | --- | --- | --- | ------------- | ----- | ------- | --- | ------------- | --- | --- |

Os artefatos controlados que fazem parte  entanto,  a  maior  parte  dos  custos  envolvidos
nesta implantação relacionam-se a gastos com
da configuração do software são tidos como Itens
|     |     |     |     |     |     |     |     | recursos  | humanos  |     | e  na  | estruturação  |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --------- | -------- | --- | ------ | ------------- | --- | --- |
de Configuração (Configuration Itens – CIs) e só
organizacional.
podem ser alterados segundo os procedimentos
definidos pelo processo de GCS. Estes Itens de  O  processo  de  GCS  apóia  os  demais
processos de desenvolvimento de software e está
Configuração formam linhas de base (baselines)
|      |           |     |           |             |     |     |        | relacionado  | a  diversas  |     | atividades  |     | realizadas  |     |
| ---- | --------- | --- | --------- | ----------- | --- | --- | ------ | ------------ | ------------ | --- | ----------- | --- | ----------- | --- |
| que  | norteiam  | as  | próximas  | atividades  |     | a   | serem  |              |              |     |             |     |             |     |
executadas no desenvolvimento do projeto.  durante  o  desenvolvimento  de  um  projeto  de
software. Portanto, implantá-lo implica em afetar
Com base nestes conceitos, o GCS define
|     |     |     |     |     |     |     |     | vários  | setores  da  | organização.  |     | Além  | disso,  | os  |
| --- | --- | --- | --- | --- | --- | --- | --- | ------- | ------------ | ------------- | --- | ----- | ------- | --- |
atividades cuja realização elevam a confiança e a
qualidade do software provendo [4]:  processos de GCS, no período de implantação,
podem acarretar uma maior lentidão do processo
•  Uma estrutura para identificação e controle
|     |            |                |     |     |          |              |     | de  desenvolvimento  |     | de  | software,  | incorporando  |     |     |
| --- | ---------- | -------------- | --- | --- | -------- | ------------ | --- | -------------------- | --- | --- | ---------- | ------------- | --- | --- |
|     | dos  CIs:  | documentação,  |     |     | código,  | interfaces,  |     |                      |     |     |            |               |     |     |
práticas muitas vezes vistas como burocráticas.
bancos de dados, entre outros; e
Assim, seu sucesso acaba dependendo mais de
•  Informações de gerenciamento do projeto e
aspectos culturais do que dos técnicos, gerenciais
do produto preocupando-se com o controle
e organizacionais. Os seguintes aspectos estão
das baselines, das mudanças, dos testes, das
envolvidos na implantação de GCS [6]:
|     | distribuições,  |     | das  auditorias,  |     |     | entre  | outras  |              |              |     |       |     |           |     |
| --- | --------------- | --- | ----------------- | --- | --- | ------ | ------- | ------------ | ------------ | --- | ----- | --- | --------- | --- |
|     |                 |     |                   |     |     |        |         | •  Aspectos  | Gerenciais:  |     | Como  |     | planejar  | o   |
atividades de desenvolvimento de um projeto
|     |     |     |     |     |     |     |     | processo,  | acompanhar  |     | as  | modificações,  |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | ---------- | ----------- | --- | --- | -------------- | --- | --- |
de software.
|     |        |             |     |     |      |      |       | estabelecer prioridades e cronogramas;  |                   |     |     |                  |     |     |
| --- | ------ | ----------- | --- | --- | ---- | ---- | ----- | --------------------------------------- | ----------------- | --- | --- | ---------------- | --- | --- |
|     |        |             |     |     |      |      |       | •  Aspectos                             | Organizacionais:  |     |     | Infra-estrutura  |     |     |
|     | Essas  | atividades  |     | de  | GCS  | são  | [5]:  |                                         |                   |     |     |                  |     |     |
da empresa, autoridades e responsabilidades
| Identificação  |     | da  | Configuração  |     | (Configuration  |     |     |     |     |     |     |     |     |     |
| -------------- | --- | --- | ------------- | --- | --------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
Identification);  Controle  da  Configuração  necessárias para a execução do processo;
•  Aspectos Culturais: Como as pessoas lidam
(Configuration Control); Administração de Estado
com a qualidade de software, qual a cultura
| (Status  |     | Accounting);  |     | e   | Auditagem  |     | da  |     |     |     |     |     |     |     |
| -------- | --- | ------------- | --- | --- | ---------- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
Configuração (Configuration Audit).  existente na empresa e qual a maneira mais
|     |                   |     |     |               |     |        |     | adequada  | de  | se  fazer  | mudanças  |     | em  | tal  |
| --- | ----------------- | --- | --- | ------------- | --- | ------ | --- | --------- | --- | ---------- | --------- | --- | --- | ---- |
|     | A  Identificação  |     | da  | Configuração  |     | provê  | a   |           |     |            |           |     |     |      |
cultura; e
infra-estrutura para as demais atividades do GCS
e envolve, por exemplo, a aquisição de CIs e o  •  Aspectos Técnicos: Qual ferramenta adotar,
estabelecimento  de  baselines.  O  Controle  de  como configurá-la, entre outros.

| Configuração  |     | define  |     | atividades  |     | a   | serem  |     |     |     |     |     |     |     |
| ------------- | --- | ------- | --- | ----------- | --- | --- | ------ | --- | --- | --- | --- | --- | --- | --- |
executadas para realizar modificações sobre os  Devido  a  estes  aspectos  e  aos  custos,
CIs do projeto. A Administração de Estado está  muitas empresas, a maioria de pequeno porte,

acabam  por  não  conseguir  implantar  o  GCS.  realizado o aperfeiçoamento da solução com
Como  o  GCS  é  um  processo  que  auxilia  na  base no que foi aprendido nos testes-piloto, e
qualidade do projeto, isso acaba prejudicando a  a de Implantação Completa, onde a solução é
economia  relacionada  ao  desenvolvimento  de  transferida para o restante dos projetos da
| software,  | pois  | muitas  | destas  | empresas  |     | não  | empresa; e  |     |     |     |     |     |     |
| ---------- | ----- | ------- | ------- | --------- | --- | ---- | ----------- | --- | --- | --- | --- | --- | --- |
conseguem se firmar no mercado de informática.  •  Lição  (Leveraging):  Aprender  com  a
Neste contexto, para facilitar a implantação  experiência. Para tanto, têm-se as atividades
do processo de GCS, a empresa deve planejar as  como a de Análise e Validação, onde são
atividades  a  serem  realizadas  durante  a  feitas  coletas,  análises,  checagens  e
implantação.  Dentre  os  estudos  e  pesquisas  documentação das lições aprendidas, e a de
| relacionados  |     | com  implantação  |     | e   | melhoria  | de  |             |     |     |        |           |       |      |
| ------------- | --- | ----------------- | --- | --- | --------- | --- | ----------- | --- | --- | ------ | --------- | ----- | ---- |
|               |     |                   |     |     |           |     | Proposição  |     | de  | Ações  | Futuras,  | onde  | são  |
processos,  cita-se  o  modelo  IDEAL  (acrônimo  desenvolvidas  recomendações  para  o
formado  pelas  iniciais  das  fases  definidas  no  próximo ciclo de melhoria de processos. A
modelo)  [7],  definido  pela  SEI,  instituto  que  tradução Lição para a palavra Leveraging foi
estabeleceu  o  SW-CMM  (Capability  Maturity  utilizada para que a letra inicial de casa fase,
Model  for  Software)  [3]  e  o  CMMi  (Capability  cujo  nome  foi  traduzido  para  o  Português,
Maturity Model Integration) [2]. O IDEAL é um  forme também o mesmo acrônimo que, em
modelo de programas de melhoria que pode ser  Inglês, dá nome ao modelo.
| utilizado  | como  | mecanismo  |     | para      | realizar  | a     |     |     |     |     |     |     |     |
| ---------- | ----- | ---------- | --- | --------- | --------- | ----- | --- | --- | --- | --- | --- | --- | --- |
| melhoria   | dos   | processos  | de  | software  | [1].      | Este  |     |     |     |     |     |     |     |
modelo propõe que a melhoria nos processos de
| software  | ocorre  | através  | de  | ciclos  | de  | melhoria  |     |     |     |     |     |     |     |
| --------- | ------- | -------- | --- | ------- | --- | --------- | --- | --- | --- | --- | --- | --- | --- |
onde, em cada ciclo, é executado um conjunto de
| atividades  | conforme  | mostra     |     | a  Figura   | 1.     | Estas  |     |     |     |     |     |     |     |
| ----------- | --------- | ---------- | --- | ----------- | ------ | ------ | --- | --- | --- | --- | --- | --- | --- |
| atividades  | são       | agrupadas  |     | nas  cinco  | fases  | do     |     |     |     |     |     |     |     |
modelo [1]:
•  Inicio (Initiating): Lançar as bases para a
realização bem sucedida do ciclo. Para tanto,
têm-se as atividades como a da Motivação,
onde a empresa é levada a querer realizar a
melhoria, a de Patrocínio, onde se obtém o
apoio de pessoas de dentro da empresa, e a

| de  | Infra-Estrutura,  |     |     | onde  | se  | tem,  |     |     |     |     |     |     |     |
| --- | ----------------- | --- | --- | ----- | --- | ----- | --- | --- | --- | --- | --- | --- | --- |

principalmente, a seleção das pessoas que
Figura 1 – Modelo IDEAL [8]
executarão as demais atividades do ciclo de

melhoria do modelo IDEAL;
Com base no modelo IDEAL, em estudos
•  Diagnóstico  (Diagnosting):  Determinar  referentes  à  implantação  de  GCS,  como  por
onde se está e aonde se quer chegar. Para
|         |         |     |             |     |       |        | exemplo,  | [9,10],    |     | e  focando  | a   | realidade        | das  |
| ------- | ------- | --- | ----------- | --- | ----- | ------ | --------- | ---------- | --- | ----------- | --- | ---------------- | ---- |
| tanto,  | têm-se  | as  | atividades  |     | como  | a  de  |           |            |     |             |     |                  |      |
|         |         |     |             |     |       |        | pequenas  | empresas,  |     | definimos   |     | uma  estratégia  |      |
Aferição, onde é caracterizado tanto o estágio
|                                              |     |     |     |     |     |     | para             | implantação  |     | desse  | processo  |     | cujas  |
| -------------------------------------------- | --- | --- | --- | --- | --- | --- | ---------------- | ------------ | --- | ------ | --------- | --- | ------ |
| atual como o estágio onde se quer chegar, e  |     |     |     |     |     |     | atividades são:  |              |     |        |           |     |        |
a de Recomendações para resolver possíveis
1. Busca de Patrocínio.
problemas detectados durante a aferição;
|                                                 |     |     |     |     |     |     | 2.  Levantamento  |     |     | de  | Informações  |     | sobre  a  |
| ----------------------------------------------- | --- | --- | --- | --- | --- | --- | ----------------- | --- | --- | --- | ------------ | --- | --------- |
| •  Estabelecimento (Establishing): Planejar os  |     |     |     |     |     |     | Empresa.          |     |     |     |              |     |           |
detalhes de como chegar ao destino. Para
|         |         |     |             |     |       |        | 3.  Levantamento  |     |     | de  | Informações  |     | sobre  o  |
| ------- | ------- | --- | ----------- | --- | ----- | ------ | ----------------- | --- | --- | --- | ------------ | --- | --------- |
| tanto,  | têm-se  | as  | atividades  |     | como  | a  de  |                   |     |     |     |              |     |           |
processo de GCS.
Priorização, onde se prioriza os esforços da  4. Estabelecimento  de Objetivos e Metas.
| melhoria  |     | considerando  |     | a   | realidade  | da  |     |     |     |     |     |     |     |
| --------- | --- | ------------- | --- | --- | ---------- | --- | --- | --- | --- | --- | --- | --- | --- |
5. Definição de uma Abordagem para o Processo
| empresa,  |     | a  de  | Abordagem,  |     | onde  | são  |     |     |     |     |     |     |     |
| --------- | --- | ------ | ----------- | --- | ----- | ---- | --- | --- | --- | --- | --- | --- | --- |
de GCS.
definidos  os  passos  para  realização  da  6. Seleção de Ferramentas de GCS.
melhoria, e a de Planejamento que envolve a  7. Escolha de um Projeto-Piloto.
| elaboração  |     | de  um  | plano  |     | detalhado  | de  |     |     |     |     |     |     |     |
| ----------- | --- | ------- | ------ | --- | ---------- | --- | --- | --- | --- | --- | --- | --- | --- |
8. Definição do Plano de GCS.
| realização  |     | considerando  |     | prazos,  |     | custos,  |     |     |     |     |     |     |     |
| ----------- | --- | ------------- | --- | -------- | --- | -------- | --- | --- | --- | --- | --- | --- | --- |
9. Implantação do Plano de GCS.
riscos, pontos de controle responsabilidades  10. Acompanhamento da Execução do Plano de
e outros elementos;
GCS.
•  Ação (Acting): Executar o plano. Para tanto,
|     |     |     |     |     |     |     | 11.  Avaliação  |     | dos  | Resultados  |     | Obtidos  | na  |
| --- | --- | --- | --- | --- | --- | --- | --------------- | --- | ---- | ----------- | --- | -------- | --- |
têm-se as atividades como a de Criação da  Implantação do GCS.
Solução, onde se reúnem os elementos da
12. Extensão do GCS para os demais Projetos da
solução como padrões, modelos, ferramentas
Empresa.
| e treinamento, a de Testes-Piloto para testar  |           |        |               |     |     |          |     |     |     |     |     |     |     |
| ---------------------------------------------- | --------- | ------ | ------------- | --- | --- | -------- | --- | --- | --- | --- | --- | --- | --- |
| a                                              | solução,  | a  de  | Refinamento,  |     |     | onde  é  |     |     |     |     |     |     |     |

Dentre  estas  atividades,  cita-se:  a  descrevem  como,  por  exemplo,  classes,
“Definição de uma Abordagem para o Processo  documento de especificação de requisitos, entre
de  GCS”  que  atenda  as  necessidades  da  outros.  Além  da  descrição,  cada  tipo  também
organização  onde  o  processo  está  sendo  possui um critério de aprovação a ser adotado
implantado;  e  a  “Seleção  de  Ferramentas  de  nas atividades da abordagem proposta.
GCS” que dêem suporte a esta abordagem.   Tanto  os  artefatos  quanto  os  CIs  são
|     |     |     |     |     |     | armazenados  |     |     | numa  estrutura  | própria  | para  | o   |
| --- | --- | --- | --- | --- | --- | ------------ | --- | --- | ---------------- | -------- | ----- | --- |
Conceitos da Abordagem de GCS Proposta  projeto  chamada  de  biblioteca  de  software
|     |     |     |     |     |     | (Software  |     | Library)  | do  projeto.  | Assim,  | define-se  |     |
| --- | --- | --- | --- | --- | --- | ---------- | --- | --------- | ------------- | ------- | ---------- | --- |
A abordagem baseia-se nos conceitos de  biblioteca de software como sendo uma coleção
GCS que o definem como sendo um processo  controlada  de  software  e  documentos
gerencial de software, integrante do processo de  relacionados que auxilia o desenvolvimento, uso
Gerenciamento  da  Qualidade,  cujo  objetivo  é  e manutenção do software [12], sendo também
estabelecer e manter a integridade dos resultados  um instrumento utilizado para realizar atividades
de um projeto de software, tanto intermediários  de  distribuição  e  entrega  do  software  [5].  As
como finais, ao longo do seu ciclo de vida. Este  técnicas e métodos usados pelo GCS geralmente
processo oferece suporte e auxilio as atividades  estão centrados no controle dessas bibliotecas
executadas no decorrer do projeto contribuindo  [14] que podem ser categorizadas de acordo com
para  o  seu  desenvolvimento  e  posterior  o  grau  de  maturidade  e  significado  dos  seus
manutenção.  elementos  [5].  Dentre  os  possíveis  tipos  de
Segundo  os  conceitos  definidos  na  biblioteca,  existem:  as  de  desenvolvimento
abordagem, um projeto (Project) é uma unidade  (Development)  que  estão  diretamente
de  gestão  na  qual  se  realiza  algo  único,  que  relacionados com os módulos do projeto e onde
possui uma data de início e término [11], e que  são armazenados os artefatos que fazem parte
representa a execução de processos de software.  do desenvolvimento do projeto e que ainda não
Este  projeto  pode  ser  dividido  em  módulos  são controlados; e as de produção (Master) onde
(Modules), para facilitar o seu gerenciamento, e  são armazenados os CIs.
possui  uma  configuração  de  software  que  Os CIs compõem, em pontos de controle
representa o conjunto de características físicas e  definidos  durante  o  ciclo  de  vida  do  projeto,
funcionais do software conforme estabelecido em  baselines  que  determinam  uma  versão  do
algum documento técnico ou realizado por um  software  desenvolvido  no  projeto  [12]  naquele
produto desenvolvido no projeto [12].   momento. Esta baseline tem como objetivo servir
Esta configuração é composta por artefatos  de  referência  para  as  próximas  atividades  do
(Artifacts) e CIs. Ambos são informações criadas  desenvolvimento do projeto sendo, no entanto,
durante  o  desenvolvimento  de  um  produto  de  apenas um conceito lógico composto pelos CIs do
software,  ou  que  sejam  necessários  para  seu  projeto.  Toda  baseline  está  associada  a  um
desenvolvimento [13]. Além disso, um CI é um  critério  de  aprovação  (Baseline  Acquisition
| artefato:      |     |              |     |          |             | Criterion)                                |     | a   | ser  adotado  | na  | atividade  | de  |
| -------------- | --- | ------------ | --- | -------- | ----------- | ----------------------------------------- | --- | --- | ------------- | --- | ---------- | --- |
| •  Concluído;  |     |              |     |          |             | “Aquisição da Baselines”, da abordagem.   |     |     |               |     |            |     |
| •  Entregue    |     | e  avaliado  |     | segundo  | atividades  |                                           |     |     |               |     |            |     |
Agentes de Negócio da Abordagem de GCS
| definidas    |     | pelo  GCS  |     | para  compor  | uma  |           |           |     |            |        |              |     |
| ------------ | --- | ---------- | --- | ------------- | ---- | --------- | --------- | --- | ---------- | ------ | ------------ | --- |
| determinada  |     | versão     | da  | configuração  | do   | Proposta  |           |     |            |        |              |     |
| projeto; e   |     |            |     |               |      |           |           |     |            |        |              |     |
|              |     |            |     |               |      | O         | processo  | de  | GCS,  por  | estar  | relacionado  | a   |
•  Controlado, pois só poderá ser alterado após
uma aprovação prévia definida por atividades  diversos ambientes de desenvolvimento dentro de
do processo de GCS.  um  projeto  de  software,  apresenta  agentes  de
negócio já existentes dentro de uma empresa.

Além  disso,  a  abordagem  estende  o  Segue os agentes de negócio definidos para esta
| conceito de CI e artefatos. Assim, um artefato  |     |     |     |     |     | abordagem:  |     |     |     |     |     |     |
| ----------------------------------------------- | --- | --- | --- | --- | --- | ----------- | --- | --- | --- | --- | --- | --- |
•  Gerente do Projeto (Project Manager): É
| pode  ser  | definido  | como  |     | sendo:  um  | Produto  |     |     |     |     |     |     |     |
| ---------- | --------- | ----- | --- | ----------- | -------- | --- | --- | --- | --- | --- | --- | --- |
(Product)  que  corresponde  a  um  arquivo  do  aquele que definiu o projeto e que coordena
projeto;  um  Item  Interno  (Internal  Item)  que  as atividades relacionadas com as áreas de
corresponde a itens internos do artefato; ou um  conhecimento de gestão de projetos como,
|     |     |     |     |     |     |     | por  | exemplo,  | a  definição  |     | da  equipe,  | o   |
| --- | --- | --- | --- | --- | --- | --- | ---- | --------- | ------------- | --- | ------------ | --- |
Relacionamento (Relationship) que corresponde a
um  relacionamento  entre  artefatos  produto,  planejamento  e  controle  de  tarefas  e
artefatos item interno ou entre artefatos produto e  atividades do projeto;
item interno. Este conceito permite um controle  •  Engenheiro  de  Software  (Software
dos artefatos em diferentes níveis de abstração.   Engineer):  É  quem  realiza  as
Neste  contexto,  a  cada  categoria  de  implementações e manutenções dos artefatos
|           |            |     |       |          |     |     | do  projeto.  |     | Pode  | vir  a  | desempenhar  |     |
| --------- | ---------- | --- | ----- | -------- | --- | --- | ------------- | --- | ----- | ------- | ------------ | --- |
| artefato  | (Produto,  |     | Item  | Interno  | ou  |     |               |     |       |         |              |     |
Relacionamento)  são  associados  tipos  que  o  diferentes  papéis  de  acordo  com  o  que  é
|     |     |     |     |     |     |     | estabelecido  |     | na  organização,  |     | como  | por  |
| --- | --- | --- | --- | --- | --- | --- | ------------- | --- | ----------------- | --- | ----- | ---- |

exemplo, analista de sistemas, programador, • Identificação de Baselines (Baseline
integrador, entre outros; Identification): O Gerente do Projeto define,
• Comitê de Controle de Configuração com base em informações gerenciais do
(Configuration Control Board - CCB): É um projeto, quais baselines serão estabelecidas
comitê que dependendo da complexidade do durante o desenvolvimento do projeto. A
projeto pode ser formado por uma ou várias partir destas baselines, o QAB define os
pessoas. Normalmente é formado pelo critérios de aprovação (Baseline Acquisition
Gerente do Projeto e os lideres de cada um Criterion) que deverão ser aplicados para
dos módulos desenvolvidos no projeto; cada baseline.
• Bibliotecário (Librarian): É quem tem sob • Identificação de Tipos de CIs (CI Types
custódia e controle a biblioteca de software Identification): O PEB define os tipos de CI
do projeto e os artefatos nela armazenados; desenvolvidos na organização e que estarão
• Responsável pelo Gerenciamento de disponíveis para a realização da atividade de
Configuração (Configuration Management Identificação de CIs. Conforme o conceito de
Officer - CMO): É quem executa as CI adotado nesta abordagem, nesta atividade
atividades operacionais do GCS como, por devem ser definidos os tipos de CIs Produto,
exemplo, o controle dos formulários criados Item Interno e Relacionamento que serão
durante as atividades. Dependendo do controlados. Para cada tipo definido pelo
tamanho do projeto, é imprescindível o apoio PEB, o QAB deve definir critérios para
de ferramentas para auxiliar o CMO em suas aprovação (CI Acquisition Criterion) das
responsabilidades. Inclusive as atividades, informações que correspondem a estes tipos.
sob responsabilidade deste papel, podem • Identificação de CIs (CI Identification): O
estar sendo automatizadas parcialmente ou CCB define quais tipos de informações do
completamente através do uso de uma projeto serão controladas e irão compor as
ferramenta de GCS; baselines do projeto com base na lista de
• Comitê de Engenharia de Processo tipos de CIs definidos na atividade de
(Process Engineer Board – PEB): É um Identificação de Tipos de CIs.
comitê que define e controla o processo de • Identificação da Estrutura (Structure
desenvolvimento, evoluindo-o de acordo com Identification): o Gerente do Projeto define
as necessidades organizacionais; os módulos do projeto, e o Bibliotecário
• Auditor (Auditor): É quem está relacionado define a estrutura da biblioteca de
à qualidade de software e que possui desenvolvimento associada a cada módulo
responsabilidades definidas para as áreas de definido.
Qualidade adotadas na organização. • Aquisição de CIs (CI Acquisition): Os
Portanto, segue critérios de qualidade Engenheiros de Software realizam a entrega
definidos para avaliar o que é realizado das informações dos projetos para que estas
dentro do projeto; e se constituam em CIs. Estas informações são
• Comitê de Garantia de Qualidade (Quality avaliadas pelo auditor com base nos critérios
Assurance Board - QAB): É um comitê que de aprovação de CIs (CI Acquisition Criterion)
define os critérios de aprovação associados definidos na atividade de Identificação de
aos CIs e baselines. Tipos de CIs.
• Aquisição de Baselines (Baseline
Cada um destes agentes de negócio Acquisition): O Gerente do Projeto solicita a
possui responsabilidades definidas com base nas aquisição da baseline que é avaliada por um
atividades de GCS apresentadas a seguir. Auditor com base nos critérios de aprovação
Dependendo da quantidade de recursos (Baseline Acquisition Criterion) definidos na
presentes na organização, pode ocorrer que atividade de Identificação de Baselines. Além
membros da equipe desempenhem o papel de disso, o Gerente do Projeto pode abrir uma
mais de um agente. nova baseline ou concluir o projeto.
Atividades da Abordagem de GCS Proposta Controle da Configuração: Conforme mostra a
Figura 3 as atividades de Controle de
A abordagem de GCS proposta define um Configuração compreendem:
conjunto de atividades relacionadas com a • Requisição de Mudança (Request
Identificação, Controle, Auditagem e Change): O Engenheiro de Software relata
Administração de Estado da Configuração do um problema detectado ou uma melhoria
projeto de software. requerida em uma dada baseline do projeto
de software, preenchendo um formulário para
Identificação da Configuração: Conforme requisição de mudanças (Change Request
mostra a Figura 2 as atividades de Identificação Form – CRF).
de Configuração compreendem:

Figura 3 – Atividades de Controle da
Configuração
atuação de vários profissionais que irão avaliar a
|     |     |     |     |     |     |     | configuração  | do  | projeto.  |     | Elas  podem  |     | ser  |
| --- | --- | --- | --- | --- | --- | --- | ------------- | --- | --------- | --- | ------------ | --- | ---- |
realizadas, portanto, em diferentes momentos do
|                                            |     |     |     |     |     |     | desenvolvimento  |                  | e  envolvem  |            | o  trabalho  |         | do     |
| ------------------------------------------ | --- | --- | --- | --- | --- | --- | ---------------- | ---------------- | ------------ | ---------- | ------------ | ------- | ------ |
|                                            |     |     |     |     |     |     | auditor,         | profissional     | não          | envolvido  |              | com     | o      |
|                                            |     |     |     |     |     |     | desenvolvimento  |                  | do  projeto  |            | mas  que     | avalia  | a      |
|                                            |     |     |     |     |     |     | qualidade        | e  conformidade  |              | do         | que          | está    | sendo  |
| Figura 2 – Atividades de Identificação da  |     |     |     |     |     |     | construído.      |                  |              |            |              |         |        |
Configuração

|     |     |     |     |     |     |     | Administração  |     | de  Estado  |     | da  Configuração:  |     |     |
| --- | --- | --- | --- | --- | --- | --- | -------------- | --- | ----------- | --- | ------------------ | --- | --- |
•  Solicitação  de  Modificação  (Solicit  Por fim, a atividade de administração de estado
Change): O CCB avalia as requisições de  gera  uma  série  de  relatórios  sobre  as  demais
mudança quanto a sua pertinência, seleciona
atividades da abordagem e sobre a configuração
aquelas similares para que possam compor
do projeto. Dentre os relatórios, destacam-se:
uma solicitação de modificação e preenche
•  Relatório sobre Tipos (Types Report - TR):
um formulário para realizar esta solicitação
Lista todos os tipos de CI da empresa. Além
| (Change  |     | Solicitation  | Form  | –   | CSF).  | Além  |     |     |     |     |     |     |     |
| -------- | --- | ------------- | ----- | --- | ------ | ----- | --- | --- | --- | --- | --- | --- | --- |
disso, apresenta uma lista de tipos de CIs de
disso,  o  CCB  define  uma  equipe  de  cada um dos projetos.
| manutenção,  |     | formada  | por  | Engenheiros  |     | de  |     |     |     |     |     |     |     |
| ------------ | --- | -------- | ---- | ------------ | --- | --- | --- | --- | --- | --- | --- | --- | --- |
•  Relatório sobre Artefatos (Artifacts Report
Software, que irá ser responsável por planejar
- AR): Lista de todos os artefatos, com suas
e realizar a modificação.  respectivas  versões  (indicando  quais  deles
| •  Planejamento  |     | da  | Modificação  |     |             | (Plan  |      |          |        |                 |     |     |      |
| ---------------- | --- | --- | ------------ | --- | ----------- | ------ | ---- | -------- | ------ | --------------- | --- | --- | ---- |
|                  |     |     |              |     |             |        | são  | CIs)  e  | todas  | as  aquisições  |     | de  | CIs  |
| Modification):   |     | A   | equipe       | de  | manutenção  |        |      |          |        |                 |     |     |      |
realizadas sobre eles.
planeja  a  modificação,  preenchendo  um  •  Relatório de Mudanças (Changes Report -
| Plano  | de  | Modificação  |     | (Modification  |     | Plan  –  |     |     |     |     |     |     |     |
| ------ | --- | ------------ | --- | -------------- | --- | -------- | --- | --- | --- | --- | --- | --- | --- |
CR): Lista todas as requisições de mudança,
MP) com base na solicitação de modificação
|     |     |     |     |     |     |     | além  | das  solicitações  |     | e   | planejamentos  |     | de  |
| --- | --- | --- | --- | --- | --- | --- | ----- | ------------------ | --- | --- | -------------- | --- | --- |
e, neste planejamento, selecionam os CIs da  modificação gerados para um dado projeto.
| baseline  | a   | serem  | alterados.  | Para  | tanto,  | o   |     |     |     |     |     |     |     |
| --------- | --- | ------ | ----------- | ----- | ------- | --- | --- | --- | --- | --- | --- | --- | --- |
•  Relatório de Baselines (Baselines Report -
| CMO  | realiza  | a   | análise  | de  | impacto  | das  |     |     |     |     |     |     |     |
| ---- | -------- | --- | -------- | --- | -------- | ---- | --- | --- | --- | --- | --- | --- | --- |
BR): Lista todas as baselines de um dado
mudanças e o Bibliotecário disponibiliza os
|     |     |     |     |     |     |     | projeto,  | assim  | como  |     | os  CIs  | que  | os  |
| --- | --- | --- | --- | --- | --- | --- | --------- | ------ | ----- | --- | -------- | ---- | --- |
CIs da biblioteca Master do projeto.
constituem.
| •  Implementação  |     | de  | Mudanças  |     | (Implement  |     |               |     |      |       |         |     |        |
| ----------------- | --- | --- | --------- | --- | ----------- | --- | ------------- | --- | ---- | ----- | ------- | --- | ------ |
|                   |     |     |           |     |             |     | •  Relatório  | de  | CIs  | (CIs  | Report  | -   | CIR):  |
Changes): a equipe de manutenção realiza
Apresenta informações sobre: a evolução de
| as  mudanças  |     | necessárias  |     | sobre  | os  | CIs,  |     |     |     |     |     |     |     |
| ------------- | --- | ------------ | --- | ------ | --- | ----- | --- | --- | --- | --- | --- | --- | --- |
todos os CIs,  mostrando o seu histórico; as
| denominados  |     | artefatos  |     | em  | manutenção,  |     |     |     |     |     |     |     |     |
| ------------ | --- | ---------- | --- | --- | ------------ | --- | --- | --- | --- | --- | --- | --- | --- |
atividades de Aquisição de CIs realizadas; os
| presentes  |     | no  Plano  | de  | Modificação.  |     | No  |     |     |     |     |     |     |     |
| ---------- | --- | ---------- | --- | ------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
planos de modificação relacionados a eles; e
| momento  |     | em  que  | a   | implementação  |     | é   |     |     |     |     |     |     |     |
| -------- | --- | -------- | --- | -------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
outros projetos que os utilizam.
concluída, o Auditor avalia os artefatos em
•  Relatório de Auditagens de Configuração
| manutenção  |     | segundo  |     | os  | critérios  | de  |                 |     |        |     |         |     |        |
| ----------- | --- | -------- | --- | --- | ---------- | --- | --------------- | --- | ------ | --- | ------- | --- | ------ |
|             |     |          |     |     |            |     | (Configuration  |     | Audit  |     | Report  | -   | CAR):  |
aprovação (CI Acquisition Criterion). Uma vez
|     |     |     |     |     |     |     | Apresenta  |     | informações  |     | das  | auditagens  |     |
| --- | --- | --- | --- | --- | --- | --- | ---------- | --- | ------------ | --- | ---- | ----------- | --- |
aprovados, estes CIs passam novamente a
realizadas na configuração do projeto, os CIs
compor a baseline do projeto.
|     |     |     |     |     |     |     | e  baselines  |     | envolvidos,  |     | além  do  | resultado  |     |
| --- | --- | --- | --- | --- | --- | --- | ------------- | --- | ------------ | --- | --------- | ---------- | --- |

|     |     |     |     |     |     |     | associado  | a   | cada  | um  deles  | (aprovado  |     | ou  |
| --- | --- | --- | --- | --- | --- | --- | ---------- | --- | ----- | ---------- | ---------- | --- | --- |
Auditagem da Configuração: As auditagens da
reprovado).
configuração são muitas vezes dependentes do
|     |     |     |     |     |     |     | •  Relatório  | de  | Projetos  | (Projects  |     | Report  | -   |
| --- | --- | --- | --- | --- | --- | --- | ------------- | --- | --------- | ---------- | --- | ------- | --- |
contrato que rege o projeto e devem ser bem
|             |     |            |          |     |             |     | PR):  | apresenta  | informações  |     | relacionadas  |     | à   |
| ----------- | --- | ---------- | -------- | --- | ----------- | --- | ----- | ---------- | ------------ | --- | ------------- | --- | --- |
| planejadas  | e   | definidas  | podendo  |     | requisitar  | a   |       |            |              |     |               |     |     |

configuração do projeto específico, com todas  Uma  das  PAs  do  nível  gerenciado  do
as suas baselines, CIs e distribuições.  CMMI  é  a  de  Gerenciamento  de  Configuração
|     |     |     |     |     |     |     | que  define  | práticas  | a  serem  | atendidas  | pelas  |
| --- | --- | --- | --- | --- | --- | --- | ------------ | --------- | --------- | ---------- | ------ |
Aderência ao modelo CMMI  abordagens para os processos de GCS. Esta PA
|     |     |     |     |     |     |     | define três metas específicas e cada uma dessas  |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | ------------------------------------------------ | --- | --- | --- | --- |
O CMMI é um modelo de maturidade e  metas  prevê  práticas  que  descrevem  a  infra-
capacitação que tem como objetivo a melhoria  estrutura necessária e as atividades que deverão
contínua dos processos de software. Para tanto,  ser  desempenhadas  pela  organização  para
este modelo define áreas de processo (Process  atender a PA de GCS. A Tabela 2 mostra as
Areas - PAs) utilizadas para aferir a qualidade dos  atividades da abordagem proposta relacionadas
processos organizacionais, e definir a maturidade  às práticas de cada uma das metas da PA de
das  organizações  de  software  em  desenvolver  GCS do CMMI.
projetos de software.
A  maturidade  organizacional  é  dividida,  Metas  Práticas da PA  Atividades  da
| segundo este modelo, em cinco níveis seguindo  |     |     |     |     |     |     |     |     |     | Abordagem  |     |
| ---------------------------------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | ---------- | --- |
uma arquitetura em estágios [2]: Inicial (Initial),
Gerenciado  (Managed),  Definido  (Defined),  Estabelecer  Identificar CIs  Identificação  de
Gerenciado  Quantitativamente  (Quantitatively  Baselines  CIs; e
Managed) e Otimizado (Optimizing).
|     | No caso do nível gerenciado, ele indica  |     |     |     |     |     |     |     |     | Aquisição  | de  |
| --- | ---------------------------------------- | --- | --- | --- | --- | --- | --- | --- | --- | ---------- | --- |
que a organização já possui alguma maturidade
CIs.
| no  | desenvolvimento  |     | de  | projetos  | de  | software.  |     |     |     |     |     |
| --- | ---------------- | --- | --- | --------- | --- | ---------- | --- | --- | --- | --- | --- |
Existem  políticas  e  regras  definidas  para  o  Estabelecer  Definição  da
projeto, além de abordagens de implantação para
|     |     |     |     |     |     |     |     | um Sistema de  |     | Estrutura  | do  |
| --- | --- | --- | --- | --- | --- | --- | --- | -------------- | --- | ---------- | --- |
cada um dos processos utilizados. Além disso, o
planejamento e gerenciamento de projetos nestas  Gerenciamento  Projeto; e
organizações se baseiam no sucesso de outros
|     |     |     |     |     |     |     |     | de  |     | Definição  | de  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | ---------- | --- |
projetos já desenvolvidos. Portanto, os projetos
|     |     |     |     |     |     |     |     | Configuração  |     | nomes  |     |
| --- | --- | --- | --- | --- | --- | --- | --- | ------------- | --- | ------ | --- |
de organizações deste nível são gerenciados e os
| processos  |     | são  | planejados,  |     | realizados  | e   |     |        |     |                |     |
| ---------- | --- | ---- | ------------ | --- | ----------- | --- | --- | ------ | --- | -------------- | --- |
|            |     |      |              |     |             |     |     | Criar  | ou  | Identificação  | de  |
controlados.
|     |     |     |     |     |     |     |     | distribuir  |     | Baselines; e  |     |
| --- | --- | --- | --- | --- | --- | --- | --- | ----------- | --- | ------------- | --- |
Para que uma organização atinja maiores
| níveis  | de  | maturidade,  |     | o  CMMI  | estabelece  | que  |     |            |     |                  |     |
| ------- | --- | ------------ | --- | -------- | ----------- | ---- | --- | ---------- | --- | ---------------- | --- |
|         |     |              |     |          |             |      |     | Baselines  |     | Estabelecimento  |     |
esta deve atender PAs as quais definem metas a
de Baselines.
serem cumpridas.
Com exceção do nível inicial, todos os
|     |     |     |     |     |     |     | Rastrear  | e  Rastrear  | as  | Requisição  | de  |
| --- | --- | --- | --- | --- | --- | --- | --------- | ------------ | --- | ----------- | --- |
demais níveis apresentam vários PAs. A Tabela 1
|     |     |     |     |     |     |     | Controlar  | Requisições de  |     | Mudança; e  |     |
| --- | --- | --- | --- | --- | --- | --- | ---------- | --------------- | --- | ----------- | --- |
mostra as do nível gerenciado do modelo CMMI.

|     |     |     |     |     |     |     | Mudanças  | Mudança  |     | Planejamento  |     |
| --- | --- | --- | --- | --- | --- | --- | --------- | -------- | --- | ------------- | --- |
Process Area
de Modificação.
Requirements Management
|     |     |     |     |     |     |     |     | Controlar  | os  | Implementação  |     |
| --- | --- | --- | --- | --- | --- | --- | --- | ---------- | --- | -------------- | --- |
Project Planning
|     |     |     |     |     |     |     |     | CIs  |     | da Mudança.  |     |
| --- | --- | --- | --- | --- | --- | --- | --- | ---- | --- | ------------ | --- |
Project Monitoring and Control
|     |     |     |     |     |     |     | Estabelecer  | Estabelecer  |     | Aquisição  | de  |
| --- | --- | --- | --- | --- | --- | --- | ------------ | ------------ | --- | ---------- | --- |
Supplier Agreement Management
|     |     |     |     |     |     |     | Integridade  | Registros  | do  | CIs;  |     |
| --- | --- | --- | --- | --- | --- | --- | ------------ | ---------- | --- | ----- | --- |
Measurement and Analysis
|     |     |     |     |     |     |     |     | Gerenciamento  |     | Identificação  | de  |
| --- | --- | --- | --- | --- | --- | --- | --- | -------------- | --- | -------------- | --- |
Project and Product Quality Assurance
|     |     |     |     |     |     |     |     | de  |     | Baselines; e  |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | ------------- | --- |
Configuration Management
|     |     |     |     |     |     |     |     | Configuração  |     | Administração  |     |
| --- | --- | --- | --- | --- | --- | --- | --- | ------------- | --- | -------------- | --- |
Tabela 1 – PÁS do nível Gerenciado
de Estado.

|              |       |         |      |          |          |         |     | Realizar    |     | Auditagem      | da  |
| ------------ | ----- | ------- | ---- | -------- | -------- | ------- | --- | ----------- | --- | -------------- | --- |
|              | Para  | que     | uma  | empresa  | possa    | ser     |     |             |     |                |     |
| considerada  |       | madura  |      | segundo  | um  dos  | níveis  |     |             |     |                |     |
|              |       |         |      |          |          |         |     | Auditorias  |     | Configuração.  |     |
apresentados no CMMI, esta deve cumprir todas
|     |     |     |     |     |     |     |     | sobre  |     | a   |     |
| --- | --- | --- | --- | --- | --- | --- | --- | ------ | --- | --- | --- |
as metas definidas pelas PA daquele nível e dos
anteriores. Estas metas prevêem uma série de
Configuração
| práticas  |     | para  nortear  |     | os  esforços  | para  | a  sua  |     |     |     |     |     |
| --------- | --- | -------------- | --- | ------------- | ----- | ------- | --- | --- | --- | --- | --- |
Tabela 2 – Atividades da Abordagem
| aplicação  |     | no  processo  |     | de  desenvolvimento  |     | de  |     |     |     |     |     |
| ---------- | --- | ------------- | --- | -------------------- | --- | --- | --- | --- | --- | --- | --- |
Proposta, relacionadas com as Práticas da PA
software da organização.
de GCS do CMMI

Implementação da Abordagem Proposta  correspondem  aos  papéis  definidos  na
|                                         |     |     |     |     |     | abordagem.  |     |     |     |     |     |     |
| --------------------------------------- | --- | --- | --- | --- | --- | ----------- | --- | --- | --- | --- | --- | --- |
| Está sendo desenvolvida uma ferramenta  |     |     |     |     |     |             |     |     |     |     |     |     |
para apoiar esta abordagem proposta, auxiliando
| as  empresas  |     | que  forem  |     | utilizá-la.  | Esta  |     |     |     |     |     |     |     |
| ------------- | --- | ----------- | --- | ------------ | ----- | --- | --- | --- | --- | --- | --- | --- |
ferramenta, denominada SoCManager (Software
| Configuration  | Manager)  |     | oferece  | funcionalidades  |     |     |     |     |     |     |     |     |
| -------------- | --------- | --- | -------- | ---------------- | --- | --- | --- | --- | --- | --- | --- | --- |
que permitem o GCS em granularidade fina (fine-
| grained)      | [15],      | segundo     | o  conceito  |              | de  CI  |     |     |     |     |     |     |     |
| ------------- | ---------- | ----------- | ------------ | ------------ | ------- | --- | --- | --- | --- | --- | --- | --- |
| apresentado   | na         | abordagem,  |              | dando        | apoio   |     |     |     |     |     |     |     |
| automatizado  | ao         | controle    | da           | evolução     | dos     |     |     |     |     |     |     |     |
| artefatos     | descritos  | segundo     | um           | meta-modelo  |         |     |     |     |     |     |     |     |
baseado no MOF (Metadata Object Facility) [16] e
| representados                 | segundo  |     | o  padrão  | XMI  | (XML  |     |     |     |     |     |     |     |
| ----------------------------- | -------- | --- | ---------- | ---- | ----- | --- | --- | --- | --- | --- | --- | --- |
| Metadata Interchange) [17].   |          |     |            |      |       |     |     |     |     |     |     |     |
A  SoCManager  está  integrada  ao  Figura 4 - Definição da Equipe do Projeto
| ambiente  | Orion  | [18]  que  | possui  | outras  | duas  |     |     |     |     |     |     |     |
| --------- | ------ | ---------- | ------- | ------- | ----- | --- | --- | --- | --- | --- | --- | --- |
Para cada papel desempenhado por um
ferramentas de suporte aos processos técnicos
de análise, projeto, implementação e testes de  membro  na  SoCManager,  há  uma  perspectiva
software: a MVCASE [19], para modelagem de  associada  a  qual  fornece,  através  do  Project
sistemas; e a C-CORE [20] para implementação e  Browser,  acesso  aos  serviços  sob
testes. Esta integração ocorre através do uso de  responsabilidade  daquele  papel.  A  Figura  5
um  repositório,  controlado  pela  SoCManager,  mostra  o  Project  Browser  do  bibliotecário  que
onde são armazenados os artefatos gerados pela  permite a definição dos repositórios onde serão
MVCASE e C-CORE. Além disso, estes artefatos  armazenados  os  artefatos  do  projeto
são  representados  pelo  padrão  XMI  e,  neste  (correspondentes à biblioteca de desenvolvimento
caso, a SoCManager realiza a introspecção sobre  descrita  na  abordagem)  e,  para  cada  módulo
definido no projeto, o local no repositório, onde
| esses  artefatos,  |     | através  | do  uso  | do  JMI  | (Java  |     |     |     |     |     |     |     |
| ------------------ | --- | -------- | -------- | -------- | ------ | --- | --- | --- | --- | --- | --- | --- |
Metadata  Interface)  [21]  e  das  bibliotecas  do  serão armazenados seus artefatos.
| MDRRepository  |     | [22],  facilitando  |     | a  atividade  | de  |     |     |     |     |     |     |     |
| -------------- | --- | ------------------- | --- | ------------- | --- | --- | --- | --- | --- | --- | --- | --- |
Aquisição de CIs sobre eles.
Os requisitos da SoCManager são oriundos
de três fontes:
| •  Responsabilidades  |     | definidas  |     | para  | o  agente  |     |     |     |     |     |     |     |
| --------------------- | --- | ---------- | --- | ----- | ---------- | --- | --- | --- | --- | --- | --- | --- |
CMO da abordagem para o processo de GCS
apresentado neste artigo;
| •  Iterações                       | dos  | demais      | agentes  |           | com  as  |     |     |     |     |     |     |     |
| ---------------------------------- | ---- | ----------- | -------- | --------- | -------- | --- | --- | --- | --- | --- | --- | --- |
| atividades de GCS da abordagem; e  |      |             |          |           |          |     |     |     |     |     |     |     |
| •  Aspectos                        | que  | idealmente  |          | deveriam  | ser      |     |     |     |     |     |     |     |
atendidos  pelas  ferramentas  de  GCS  [5]:  Figura 5 - Project Browser do bibliotecário
| Bibliotecas de GCS; Requisição de Mudança  |     |     |     |     |     |     |     |     |     |     |     |     |
| ------------------------------------------ | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
de Software e Procedimentos de Aprovação;
Trabalhos Relacionados
| Tarefas  | de  | Gerenciamento  |     | de  Mudanças;  |     |     |     |     |     |     |     |     |
| -------- | --- | -------------- | --- | -------------- | --- | --- | --- | --- | --- | --- | --- | --- |

Reportar Status de Configuração de Software    As abordagens para o processo de GCS
e Métricas de GCS; Auditoria de Software;
|                |     |     |               |     |      | normalmente  |        | atendem   | apenas  |         | parte  | das     |
| -------------- | --- | --- | ------------- | --- | ---- | ------------ | ------ | --------- | ------- | ------- | ------ | ------- |
| Gerenciamento  |     | e   | Rastreamento  |     | das  |              |        |           |         |         |        |         |
|                |     |     |               |     |      | atividades   | deste  | processo  |         | e  não  |        | tratam  |
Documentações de Software; e Gerenciar e  diretamente as necessidades das empresas de
Rastrear as Liberações de Software e suas  pequeno porte. Dentre as abordagens existentes,
Distribuições.
citam-se:
|     |     |     |     |     |     | •  Abordagem  |     | ITI  de  | GCS  | [6]:  desenvolvida  |     |     |
| --- | --- | --- | --- | --- | --- | ------------- | --- | -------- | ---- | ------------------- | --- | --- |
Atualmente  a  SoCManager  possui  uma  pela ITI (Instituto nacional de Tecnologia da
| versão  operacional  |     | e  atende     |     | a  atividade  | de   |              |     |              |     |       |          |     |
| -------------------- | --- | ------------- | --- | ------------- | ---- | ------------ | --- | ------------ | --- | ----- | -------- | --- |
|                      |     |               |     |               |      | Informação)  |     | e  aplicada  |     | numa  | pequena  |     |
| Identificação        | de  | Configuração  |     | e  parte      | das  |              |     |              |     |       |          |     |
empresa. Esta abordagem define atividades
atividades de Controle de Configuração. O fato de  relacionadas  apenas  com  o  Controle  de
| a  SoCManager  |     | estar  fundamentada  |     |     | em  uma  |     |     |     |     |     |     |     |
| -------------- | --- | -------------------- | --- | --- | -------- | --- | --- | --- | --- | --- | --- | --- |
Configuração;
abordagem para o processo de GCS torna os
|     |     |     |     |     |     | •  Abordagem  |     | INPE  | de  | GCS  |     | [23]:  |
| --- | --- | --- | --- | --- | --- | ------------- | --- | ----- | --- | ---- | --- | ------ |
seus benefícios mais concisos e tangíveis.   desenvolvida para ser aplicada em um projeto
A Figura 4 mostra a tela de definição da
de desenvolvimento de software para controle
equipe do projeto onde o gerente define o papel
|     |     |     |     |     |     | de  | satélites  | do  | Instituto  | Nacional  |     | de  |
| --- | --- | --- | --- | --- | --- | --- | ---------- | --- | ---------- | --------- | --- | --- |
de  cada  membro  da  equipe.  Estes  papéis  Pesquisas Especiais (INPE). Define aspectos
|     |     |     |     |     |     | relacionados  |     | tanto  | a  Identificação  |     | como  | o   |
| --- | --- | --- | --- | --- | --- | ------------- | --- | ------ | ----------------- | --- | ----- | --- |

Controle  de  Configuração,  apresentando  facilitando com isso a adoção do processo de
| conceitos                                   | como  | o   | de  Elemento  | Controlado  |     | GCS.        |     |     |     |     |     |
| ------------------------------------------- | ----- | --- | ------------- | ----------- | --- | ----------- | --- | --- | --- | --- | --- |
| adotado na abordagem para o processo de     |       |     |               |             |     |             |     |     |     |     |     |
| GCS proposta neste trabalho.                |       |     |               |             |     | Resultados  |     |     |     |     |     |
| •  Abordagem Praxis de GCS [1]: integrante  |       |     |               |             |     |             |     |     |     |     |     |
do  processo  gerencial  de  Gestão  da  Visando  obter  resultados  conclusivos
Qualidade  e  que  está  diretamente  quanto à aplicabilidade da Abordagem de GCS
relacionado com a área chave de processo  proposta,  esta  foi  implantada,  a  partir  da
de Gerenciamento de Configuração do SW- execução da estratégia de GCS descrita neste
CMM  [3].  Não  define  explicitamente  como  artigo, em uma empresa de software. Para tanto,
foi escolhido um projeto de software em estágio
| realizar  | as  | atividades  |     | de  Identificação,  |     |     |     |     |     |     |     |
| --------- | --- | ----------- | --- | ------------------- | --- | --- | --- | --- | --- | --- | --- |
Controle,  Auditagem  e  Administração  de  inicial de desenvolvimento. A equipe do projeto
Estado  da  configuração  do  projeto  de  era  formada  por  11  integrantes  que  foram
| software.                                 |     |     |     |     |     | treinados          | para  | desempenhar  |     | as  atividades  | da  |
| ----------------------------------------- | --- | --- | --- | --- | --- | ------------------ | ----- | ------------ | --- | --------------- | --- |
| •  Abordagem RUP de GCS [24]: define uma  |     |     |     |     |     | abordagem de GCS.  |       |              |     |                 |     |
série de atividades a serem desempenhadas  Num primeiro momento, as dificuldades,
inclusive relacionados ao conceito de GCS, foram
| por  agentes  |     | para  | que  | se  tenha  | a   |     |     |     |     |     |     |
| ------------- | --- | ----- | ---- | ---------- | --- | --- | --- | --- | --- | --- | --- |
operacionalização deste processo. Porém, é  evidentes.  No  entanto,  a  medida  em  que  o
difícil  de  ser  adotada  em  empresas  com  processo foi sendo executado, foi possível torná-
recursos  escassos,  como  as  de  pequeno  lo mais receptível, tanto aos membros do projeto
como aos demais profissionais da empresa.
| porte,  | e  não  | define  |     | explicitamente  | as  |     |     |     |     |     |     |
| ------- | ------- | ------- | --- | --------------- | --- | --- | --- | --- | --- | --- | --- |
atividades Identificação, Controle, Auditagem  Para apoiar a aplicação da abordagem,
e Administração de Estado da configuração  foi utilizada inicialmente a ferramenta de controle
|     |     |     |     |     |     | de  | versões  | CVS  (Concurrent  |     | Version  System),  |     |
| --- | --- | --- | --- | --- | --- | --- | -------- | ----------------- | --- | ------------------ | --- |
do projeto de software.
•  Abordagem GCONF de GCS [25]: define um  além  de  e-mails  para  troca  de  informações
processo  de  GCS  para  ambientes  de  relacionadas  com  as  atividades  de  GCS  da
abordagem proposta.
| desenvolvimento  |     | de  | software  | orientados  | a   |     |     |     |     |     |     |
| ---------------- | --- | --- | --------- | ----------- | --- | --- | --- | --- | --- | --- | --- |
organização  (ADSOrg)  que  enfatizam  a  No entanto, a partir do momento em que
necessidade  da  gestão  do  conhecimento  a  ferramenta  SoCManager  foi  disponibilizada,
pode-se notar uma sensível melhora na execução
relacionado com a produção de software de
da abordagem de GCS proposta.
| uma              | determinada  |           | organização.  |              | Esse  |                         |     |     |     |     |     |
| ---------------- | ------------ | --------- | ------------- | ------------ | ----- | ----------------------- | --- | --- | --- | --- | --- |
| processo         | define       | gerentes  |               | de  projeto  | e     |                         |     |     |     |     |     |
| desenvolvedores  |              |           | como          | agentes      | que   | Discussão e Conclusões  |     |     |     |     |     |

| colaboram  | na  | execução  |     | de  três  atividades  |     |     |     |     |     |     |     |
| ---------- | --- | --------- | --- | --------------------- | --- | --- | --- | --- | --- | --- | --- |
principais, que são: planejar o gerenciamento  A proposta inicial desta pesquisa era o
de  Configuração,  controlar  liberação  e  desenvolvimento de uma ferramenta de apoio ao
processo de GCS. No entanto, para atingir este
distribuição e controlar configuração.
|     |     |     |     |     |     | objetivo,  | foi  | elaborada  | uma  | estratégia  | de  |
| --- | --- | --- | --- | --- | --- | ---------- | ---- | ---------- | ---- | ----------- | --- |
Além  das  abordagens  apresentadas,  implantação  do  processo  de  GCS  que  define
atividades que devem ser desempenhadas pelas
existem outras que também tratam o processo de
empresas de software para tornar operacional o
GCS. Dentre elas têm-se a da NASA [26], usada
pelos  centros  de  desenvolvimento  de  software  processo de GCS em seus projetos de software.
dessa organização e pelos seus fornecedores de  A  partir  desta  estratégia,  foi  definida  uma
abordagem que descrevesse o processo a ser
software.
Muitas  dessas  abordagens  são  automatizado pela ferramenta.
executadas pelas empresas sem a preocupação  Este artigo apresentou esta abordagem,
|                    |     |     |      |             |       | seus  | conceitos,  | agentes  |     | e  atividades.  | A   |
| ------------------ | --- | --- | ---- | ----------- | ----- | ----- | ----------- | -------- | --- | --------------- | --- |
| com  a  aplicação  |     | de  | uma  | estratégia  | para  |       |             |          |     |                 |     |
implantação do processo de GCS. Além disso,  aplicação da Abordagem Proposta, descrita em
não existem ferramentas de GCS que dêem apoio  Resultados,  acabou  por  validar  os  objetivos
|     |     |     |     |     |     | iniciais  | da  | pesquisa,  facilitando  |     | a  aplicação  | do  |
| --- | --- | --- | --- | --- | --- | --------- | --- | ----------------------- | --- | ------------- | --- |
a todas as atividades definidas pelas abordagens.
processo de GCS em empresas de software.
Estes fatores acabam dificultando a adoção do
processo  de  GCS  em  empresas  que  A  melhoria  da  abordagem  e,
desenvolvem software.  conseqüentemente, da ferramenta SoCManager,
é algo contínuo e que depende da sua aplicação
Já a abordagem apresentada neste artigo
está  sob  o  contexto  de  uma  estratégia  para  em  projetos  de  software  desenvolvidos  por
implantação do processo de GCS e foi elaborada  empresas de software. Por este motivo, a próxima
etapa é analisar a aplicação da abordagem em
| de  tal  forma  | que  | pudesse  |     | ser  aplicado  | em  |     |     |     |     |     |     |
| --------------- | ---- | -------- | --- | -------------- | --- | --- | --- | --- | --- | --- | --- |
empresas  de  pequeno  porte.  Além  disso,  a  outras empresas de software inclusive de maior
| ferramenta SoCManager está sendo desenvolvida  |     |     |     |     |     | porte.  |     |     |     |     |     |
| ---------------------------------------------- | --- | --- | --- | --- | --- | ------- | --- | --- | --- | --- | --- |

para automatizar as atividades dessa abordagem,
Agradecimentos
A CAPES, pelo apoio financeiro.

Referências Roadmap. In The Future of Software
Engineering. ACM, New York, 2000, 291-302
1. Pádua F., W. P. Engenharia de Software: 16. OBJECT MANAGEMENT GROUP. Object
Fundamentos, Métodos e Padrões. LTC, Management Group. Meta-Object Facility
2003. (MOF) - Version 1.4. 2002. Disponível Site
2. SEI. Capability Maturity Model Integration, OMG. URL:
v1.1. 2001. Disponível Site SEI. URL: (http://www.omg.org/technology/documents/fo
(http://www.sei.cmu.edu/cmmi/). Consultado rmal/mof.htm) - Consultado em 2/2004.
em 11/2004. 17. OBJECT MANAGEMENT GROUP. XML
3. Paulk, M. C., Curtiss, W. B. e Chrissis, M. B. Metadata Interchange (XMI) – Version 1.2.
The Capability Maturity Model: Guidelines for 2002. Disponível site OMG. URL:
Improving the Software Process. Addison- (http://www.omg.org/technology/documents/fo
Wesley, 1999. rmal/xmi.htm). Consultado em 02/2004.
4. IEEE Std 828-1998: IEEE Standard for 18. Lucredio, D.; Almeida E. S.; Bianchini, C. P.;
Software Configuration Management Plans. Prado, A. F.; Trevelin, L. C. Orion – A
Standards Coordinating Committee – IEEE Component Based Software Engineering
Computer Society, 1998. Environment., in Journal of Object
5. IEEE. Guide to the Software Engineering Technology. April, 2004.
Body of Knowledge 2004 Version. IEEE - 19. Almeida, E. S.; Lucrédio, D.; Bianchini, C. P.;
Computer Society, Los Alamitos, USA, 2004. Prado, A. F.; Trevelin, L. C.; Ferramenta
6. Oliveira, A. A. C. P.; Formoso, P., F.;Cruz, J. MVCASE - Uma Ferramenta Integradora de
L; Martino, W. R. Gerência de Configuração Tecnologias para o Desenvolvimento de
de Software: Evolução de Software sob Componentes Distribuídos. XVI Simpósio
Controle. ITI – Instituto Nacional de Brasileiro de Engenharia de Software, Sessão
Tecnologia da Informação, Brasil, 2001. de Ferramentas, Brasil, 2002.
7. Mcfeeley, R. IDEAL: A user guide for software 20. Souza N., R. M.; Lucredio, D.; Bossonaro, A.;
process improvement. Relatório Técnico Cunha, J. R. D. D.; Prado, A. F.; Catarino, I.
CMU/SEI-96-HB-001, Software Engineering C. S.; Souza, A. M. Component-Based
Institute, 1996. Software Development Environment. 6th
8. Gremba J.; Myers, C. The IDEAL model: A International Conference on Enterprise
practical guide to improvement. Software Information Systems - ICEIS - Porto –
Engineering Institute, 1997 Portugal, 2004.
9. Cugola, G.; Lavazza, L.; Nart, V. Manca; S.; 21. Sun. Java Metadata Interface (JMI).
Pagone, M. R.; Oliveira, A. L. C. An Disponível Site Sun. URL:
Experience in Setting-Up a Configuration (http://java.sun.com/products/jmi/index.jsp).
Management Environment Software Consultado em 7/2004.
Technology and Engineering Practice, 1997. 22. NetBeans. Metadata Repository (MDR)
Proceedings., Eighth IEEE International Project Home. Disponível Site NetBeans.
Workshop on [incorporating Computer Aided URL: (http://mdr.netbeans.org/). Consultado
Software Engineering] , 14-18 July 1997. em 7/2004.
10. Visconti, M.; Guzmán, L. A Measurement- 23. Cunha, J. B. S. Uma Abordagem de
Based Approach for Implanting SQA & SCM Qualidade e Produtividade para o
Practices. Computer Science Society, 2000. Desenvolvimento de Sistemas de Software
SCCC ’00. Proceedings. XX International Complexos utilizando a Arquitetura de Placa
Conference of the Chilean, 16-18 Nov. 2000. de Software – SOFTBOARD. Tese de
11. Project Management Institute. PMBOK Doutorado em Computação Aplicada. Instituto
2000:Project Management Book. Brazil Minas Nacional de Pesquisas Espaciais – INPE.
Gerais Chapter, 2002. Abril, 1997.
12. IEEE Std. 610.12-1990: IEEE Standard 24. Kruchten, P. Rational Unified Process: An
Glossary of Software Engineering Introduction. Addison-Wesley, Reading-MA,
Terminology. Standards Coordinating 2000.
Committee - Computer Society, 1990. 25. Figueiredo, S. M. Gerência de Configuração
13. Pressman, R., S. Software Engineering: A em Ambientes de Desenvolvimento de
Practitioner's Approach. McGraw-Hill. 5a Software Orientados à Organização, B.Sc.,
Edição. 2001. DCC - IM / UFRJ, Rio de Janeiro, RJ, 2004.
14. ANSI/IEEE Std. 1042.-1987: IEEE Guide to 26. NASA Software Configuration Management
Software Configuration Management. Guidebook. 1997.Disponível Site NASA. URL:
Technical Committee On Software (http://satc.gsfc.nasa.gov/GuideBooks/cmpub.
Engineering - Computer Society, 1987. html) - Consultado em 1/2004.
15. Dittrich, K.R.; Tombros, D. and Geppert, A.
Databases in Software Engineering: A