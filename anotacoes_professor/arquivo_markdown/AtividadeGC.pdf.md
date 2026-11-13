Gestão de Projetos de Software – 4º ADS
Professor André Luis Maciel Leme
Atividade Avaliativa

1  Objetivos:
•  Aplicar os conceitos de controle de versão utilizando o Git.
•  Simular o processo de planejamento e execução de um release de software.
•  Praticar o uso de branches, commits, pull requests, tags e releases.

2  Descrição da Atividade
Os  grupos  deverão  simular  o  desenvolvimento  de  uma  miniaplicação  web,  com  funcionalidades
previamente definidas, utilizando um repositório Git hospedado no GitHub.

3  Aplicação
A aplicação WEB simulada é bem simples. Foi construída com html e javascript sem recursos de css ou
preocupação  com  design.  A  funcionalidade  completa  tem  4  páginas  html.  Uma  página  de  login
(index.html),  uma  para  mensagem  de  erro  (msg.html)  e  outras  duas  simulando  usuários  diferentes
(administrador – pg001.html e operador – pg002.html).

4  Etapas

1  Criar uma conta no gitHub (caso não tenha)
2  Criar um repositório (nome a critério do grupo).
3  Criar um arquivo README.md, colocar o nome dos integrantes do grupo e o propósito do

projeto e plano de releases previsto.

5  Plano de Releases

5.1  Primeiro Release

•  Tela de login construída, ao clicar no botão exibir mensagem “em construção” (working.html).
•  Página de login (index.html).
•  Página de aviso (working.html).

1

Gestão de Projetos de Software – 4º ADS
Professor André Luis Maciel Leme
Atividade Avaliativa

5.2  Segundo Release

•  Página de login chamando a página do administrador sem validar se os campos login e senha

foram preenchidos.

•  Página de login sem consistência (index.html).
•  Página inicial para usuário administrador (pg001.html).

5.3  Terceiro Release

•  Funcionamento completo: se deixar usuário em branco (só valida este campo) mostra página de
erro. Ao digitar “admin” exibe a tela do administrador, qualquer outro conteúdo em usuário
mostra a página do operador.

•  Página de login atualizada com consistência (index.html).
•  Página inicial para usuário administrador (pg001.html).
•  Página inicial para usuário operador (pg002.html).
•  Página inicial para mensagem (msg.html).

6  Branches
•  Utilizar o controle de versão com ramificações (branches), incluindo ao menos:

▪  main ou master.
▪  develop.
▪  Branches de funcionalidade (versao1, release1, loginsenha, madalena, etc..).
▪  Branches de correção (ajustev1, correcoes, etc).

•  Realizar pull requests simulando revisão de código, com pelo menos um comentário por parte de

outro membro do grupo.

•  Criar tags no repositório para marcar os releases.
•  Gerar um arquivo changelog para a versão v1.0.

7  Entrega
Coletar “prints” do processo e incluir em um documento (word/pdf). O documento dever ser entregue
pelo moodle com o link do repositório logo no primeiro parágrafo.

2

