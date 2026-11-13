Gerência de Configuração - CONTROLE DE VERSÃO
Professor André Luis Maciel Leme
Tutorial gitHub

1  Repositório de Documento no github

1.1  Preparação

•  Criar uma conta no github

•  Fazer download e instalar o github desktop

1.2  Criação do Repositório
Abrir o github web

Clicar em repositories

Clicar em NEW

Gerência de Configuração - CONTROLE DE VERSÃO
Professor André Luis Maciel Leme
Tutorial gitHub

Digitar um nome para o repositório (manter Public, a outra versão é paga) e clicar em CREATE
REPOSITORY

Crie uma pasta no HD com o nome do seu repositório (pode ser qualquer nome, mas fica mais
coerente ter o mesmo nome).

Gerência de Configuração - CONTROLE DE VERSÃO
Professor André Luis Maciel Leme
Tutorial gitHub

Abra o github shell

Gerência de Configuração - CONTROLE DE VERSÃO
Professor André Luis Maciel Leme
Tutorial gitHub

Na linha de comando, navegue até o diretório que você criou

Reproduza as instruções que o gitweb lhe sugere no segundo item

Gerência de Configuração - CONTROLE DE VERSÃO
Professor André Luis Maciel Leme
Tutorial gitHub

Vá até o github web e clique em <<code>> novamente

Note que aparece agora o repositório com o arquivo que você criou com o comando ECHO
O commit enviou o arquivo para o repositório na internet

Gerência de Configuração - CONTROLE DE VERSÃO
Professor André Luis Maciel Leme
Tutorial gitHub

Inclusão de outros arquivos

2
Copie os arquivos que deseja controlar dentro da pasta no seu HD

Volte ao github shell e execute o camando GIT ADD, poder com * para todos os arquivos ou um
por um git add nomedoarquivo.

Gerência de Configuração - CONTROLE DE VERSÃO
Professor André Luis Maciel Leme
Tutorial gitHub

Os arquivos foram incluídos no repositório local, mas ainda não foram enviados para o github web,
se você for até o github web e atualizar a página vai ver que os arquivos não estão lá.

Para enviar os arquivos para lá você precisa fazer um commit que é a ação de atualizar o que está
embaixo com o que está em cima. Cada commit tem um nome específico para facilitar a localização
da atualização. Esse comando é feito no gitshell. Para sincronizar os ambientes é preciso fazer o
push.
Faltou na imagem o comando git push -u origin master

Veja que o github web agora está com os arquivos

Gerência de Configuração - CONTROLE DE VERSÃO
Professor André Luis Maciel Leme
Tutorial gitHub

Atualização de Arquivo
Alterar o arquivo com o editor desejado
Ir ao gitshell e executar os comandos

•  git add nome do arquivo alterado
•  git commit -m “nome do commit”
•  git push -u origin master

Lembrando que master é o nome do branch

