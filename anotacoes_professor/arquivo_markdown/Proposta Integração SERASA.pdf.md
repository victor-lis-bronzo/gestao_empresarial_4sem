1. SOLUÇÃO PROPOSTA

Os  levantamentos  superficiais  feitos  para  elaboração  desta  proposta,  permitiram  a
visualização  de  um  panorama  macro,  desta  forma,  entendemos  não  ser  possível  orçar  o
tempo  de  implementação  (codificação  do  sistema)  sem  a  conclusão  da  especificação.
Quaisquer  estimativas  seriam  empíricas  e  sujeita  a  erros  para  maior  ou  menor,  portanto,
resolvemos apresentar uma proposta para especificação do sistema, incluindo um protótipo
que permita uma visão real das funcionalidades do sistema.

O sistema não apresenta dificuldades tecnológicas para a XingLing. Tendo como objetivo,
durante  a  fase  de  especificação,  o  pleno  entendimento  das  funções  do  sistema  e  sua
estruturação  adequada,  asseguramos  que  a  fase  de  implementação  não  apresentará
dificuldades para ser realizada.

Com  a  especificação,  a  fase  de  implementação  poderá  ser  dimensionada  com  segurança,
beneficiando o resultado e a qualidade do projeto.

1.1. Descrição Geral

Nossa  proposta  é  desenhar  um  novo  sistema  de  Crédito  e  Cadastro  usando  tecnologia
WEB  Intranet.  A  partir  de  um  detalhado  levantamento  das  funcionalidades  do  sistema
atual,  será  elaborada  uma  especificação  funcional  completa,  mostrando  com  será  o  novo
sistema,  incluindo  a  construção  de  um  protótipo  que  permitirá  navegar  pelo  sistema
validando suas funcionalidades.

O  banco  de  dados  será  totalmente  remodelado  e  adequado  para  utilização  da  aplicação
WEB e dos demais sistemas. Os dados da base atual deverão ser integralmente migrados
para a nova base, com as devidas adequações.

O ambiente RISC conterá apenas a base de dados do sistema. Os módulos do sistema serão
instalados  em  outro  servidor  configurado  com  sistema  operacional  NT  Server  com
gerenciador Internet Information Service (IIS).  Como mostra o diagrama abaixo:

BackboneANALISTAS DE CRÉDITOANALISTAS DE CADASTROWeb ServerRISCDatabaseWorkstations com Browser IE5Workstations com Browser IE5➢NT Server➢IIS➢Aplicação ASPInternetSERASA

2. ABRANGÊNCIA DA PROPOSTA

•  Esta proposta abrange:

• Especificação do sistema Crédito e Cadastro, conforme descrito nesta proposta;

• Elaboração  da  documentação  descrita  no  item  Erro!  Fonte  de  referência  não

encontrada.;

• Construção de protótipo, em HTML e ASP, simulando as funcionalidades do sistema

com exibição de dados fictícios.

•  Não abrangendo:

• Codificação e implantação do sistema;

• Lógica  de  transações  dos  sistemas  que  recebem  ou  enviam  dados  para  Crédito  e

Cadastro;

• Aquisição, montagem, instalação e configuração dos equipamentos e softwares básicos

envolvidos;

• Especificação  de  normas  e  mecanismos  de  segurança  de  acesso  físico,  não

concernentes ao sistema de Crédito e Cadastro;

• Especificação de normas e mecanismos de proteção ao acesso lógico, não concernentes

ao sistema de Crédito e Cadastro;

• Especificação de políticas de segurança física.

3. PREMISSAS

O  desenvolvimento  do  trabalho  de  especificação  descrito  nesta  proposta  segue  as
premissas listadas abaixo:

•  A  especificação  será  voltada  para  o  uso  da  linguagem  ASP,  com  componentes  Visual
Basic 6.0, SGBD SQL Server 7.0 (base de dados de apoio ao sistema) em ambiente NT
Server,  linguagem  Cobol  Microfocus  para  os  processos  batch  e  SGBD  DB2  no
ambiente RISC AIX.

•  Os  arquivos  gerados  na  especificação  serão  em  formato  Word,  Excel,  texto  e  HTML,

formato Office 2000.

•  Para o desenvolvimento dos trabalhos, será utilizada a metodologia da XingLing.

•  O desenvolvimento das atividades será feito parte na sede da TABAJARA em Nárnia e

parte na sede da XingLing em Murdor.

4. FATORES CRÍTICOS DE SUCESSO

Para  que  o  projeto  aqui  especificado  satisfaça  as  metas  de  qualidade  almejadas,  alguns
fatores devem ser observados, como:

•  Indicação  de  Gerente  de  Projetos  na  TABAJARA  para  ser  o  ponto  focal  nas  decisões

quanto ao planejamento e desenvolvimento das atividades.

•  Disponibilidade de profissionais indicados pela TABAJARA para atender à solicitação

de informações, quando necessárias.

•  Acompanhamento rígido dos cronogramas, e administração de eventuais distorções.

5. ETAPAS DO PROJETO

Os trabalhos de especificação do projeto seguirão as seguintes etapas:

Fase I - Planejamento

•  Apresentação  para  a  TABAJARA  do  plano  de  atividades  e  cronograma  para

elaboração da especificação do projeto.

•  Reunião de início de projeto.

Fase II – Levantamento

•  Coleta de informações para elaboração da especificação

•  Análise da base de dados atual

•  Mapeamento das funções

•

Identificação das melhorias dentro do contexto atual

Fase III – Construção dos Modelos

•  Modelo Funcional e de Dados

•  Compatibilização dos Modelos Funcional e de Dados

•  Diagramas e fluxos de dados, navegação e processo batch

Fase IV – Prototipação

•  Construção do protótipo navegável

•  Definição da interface gráfica (padrões TABAJARA)

Fase V – Validação e Aceite

•  Apresentação do projeto

•  Ajustes e adequações

•  Validação do projeto pela TABAJARA

Fase VI – Encerramento

Entrega de toda a documentação impressa e em meio eletrônico

