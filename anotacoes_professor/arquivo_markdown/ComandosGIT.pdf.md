<!-- OCR (EasyOCR pt+en) -->

## Página 1

2017-6-1

Comandos Git - Aprenda Git do básico ao avançado

Comandos Git Aprenda Git do básico ao avançado (http:llcomandosgit github iol)

Instalando e Configurando Instalação

Windows

Mac

Linux

Instalar Git no Windows muito fácil. 0 projeto msysgit tem um dos procedimentos mais simples de instalação Simplesmente baixe arquivo exe do instalador partir da página do GitHub execute-0:

http:llmsysgit. github.com (http: Imsysgit github.com)

Após concluir instalação, você terá tanto uma versão command line (linha de comando; incluindo um cliente SSH que será útil depois) uma GUI padrão

git config

Sua Identidade

Ativando Cores

primeira coisa que você deve fazer quando instalar Git definir seu nome de usuário endereço de e-mail. Isso é importante porque todos os commits no Git utilizam essas informações  está imutavelmente anexado nos commits que você realiza:

git config global user name John Doe git config --globa user email johndoe@example com

Relembrando, você só precisará fazer isso uma vez caso passe opção --global, pois Git sempre usará essa informação para qualquer coisa que você faça nesse sistema Caso você queira sobrepor estas com um nome ou endereço de e-mail diferentes para projetos especificos; você pode executar comando sem a opção global quando estiver no próprio projeto .

git help

Obter Ajuda

Se você precisar de ajuda ao usar Git, existem três maneiras de obter ajuda para qualquer um dos comandos Git:

git help {comando} git {comando} ~help man git - {comando}

Criando 0 projeto git init

Repositório Git

Você pode obter um projeto Git utilizando duas formas principais primeira faz uso de um projeto ou diretório existente importa para Git. segunda clona um repositório Git existente partir de outro servidor.

Inicializando um Repositório em um Diretório Existente

Caso você esteja iniciando monitoramento de um projeto existente com Git, você precisa ir para diretório do projeto digitar

git init

ss0 cria um novo subdiretório chamado .git que contem todos os arquivos necessários de seu repositório um esqueleto de repositório Git. Neste ponto nada em seu projeto monitorado_

Primeira versão

http:llcomandosgit github.iol

1/7

## Página 2

2017-6-1

Comandos Git - Aprenda Git do básico ao avançado Caso voce queira começar controlar versionamento dos arquivos existentes (diferente de um diretório vazio) , você provavelmente deve começar monitorar esses arquivos fazer um commit inicial. Você pode realizar IssO com poucos comandos

touch gitignore git add .gitignore git commit Versão inicial do projeto"

Bem, nós iremos repassar esses comandos em um momento_ Neste ponto você tem um repositório Git com arquivos monitorados um commit inicial.

git clone

Clonando um Repositório Existente

Você clona um repositório com git clone [url]. Por exemplo, caso você queria clonar biblioteca Git do Ruby chamada Grit, você pode fazê-lo da seguinte forma:

git clone git:lIgithub comlschacon/grit.git

Se você entrar no novo diretório grit, você veraá todos os arquivos do projeto nele pronto para serem editados ou utilizados Caso você queira clonar repositório em um diretório diferente de grit, é possível especificar esse diretório utilizando opção abaixo;

git clone git:lIgithub comlschacon grit.git mygrit

Este comando faz exatamente mesma coisa que anterior;, mas diretório alvo será chamado mygrit.

Básico git add

Gravando Alterações

Quando um repositório inicialmente clonado todos os seus arquivos estarão monitorados inalterados porque você simplesmente os obteve ainda não os editou . Conforme você edita esses arquivos Git passa vê-los como modificados porque você os alterou desde seu último commit . Você seleciona esses arquivos modificados então faz commit de todas as alterações selecionadas ciclo se repete

Monitorando Novos Arquivos

Para passar monitorar um novo arquivo use comando git add. Para monitorar arquivo README você pode rodar Isso:

git add README

Se você rodar comando git status voce pode ver que seu arquivo README agora está sendo monitorado Os arquivos monitorados serão os que faram parte do commit.

git status

Verificando Status

A principal ferramenta utilizada para determinar quais arquivos estão em quais estados

comando:

git status

comando Ihe mostra em qual branch você se encontra Vamos dizer que você adicione um novo arquivo em seu projeto; um simples arquivo README Caso arquivo não exista você execute git status, vOCê verá arquivo não monitorado dessa forma:

# On branch master # Untracked files: # (use "git add {file}. to include in what will be committed)

#README nothing added to commit but untracked files present (use git add" to track)

Você pode ver que seu novo arquivo README não está sendo monitorado pois está listado sob cabeçalho "Untracked files' na saída do comando status. Não monitorado significa basicamente que Git está vendo um arquivo que não existia na última captura (commit); Git não vai incluí-lo nas suas capturas de commit até que você diga

http: llcomandosgit githubiol

2/7

## Página 3

2017-6-1

Comandos Git - Aprenda Git do básico ao avançado explicitamente que assim faça Ele faz isso para que você não inclua acidentalmente arquivos binários gerados_ outros arquivos que você não têm intenção de incluir. Digamos; que você queira incluir arquivo README portanto vamos começar monitorar este arquivo.

git diff

Verificando Mudanças

comando git status for muito vago você quer saber exatamente que você alterou, não apenas quais arquivos foram alterados voce pode utilizar comando.

git diff

Apesar do comando git status responder essas duas perguntas de maneira geral; git diff mostra as linhas exatas que foram adicionadas removidas patch por assim dizer. Se você quer ver que selecionou que irá no seu próximo commit; pode utilizar:

git diff cached

git commit

Commits

Armazena conteúdo atua do indice em um novo commit, juntamente com uma mensagem de registro do usuário que descreve as mudanças Se usa commit depois de já ter feito git add para fazer commit:

git commit

'Mensagem

Para commitar também os arquivos versionados mesmo não estando no Stage basta adicionar parâmetro -a

git commit -a -m 'Mensagem

Refazendo commit quando esquecer de adicionar um arquivo no Stage:

git commit

'Mensagem" ~amend

amend destrutivo s6 deve ser utilizado antes do commit ter sido enviado ao servidor remoto

git reset

Desfazendo Coisas

Em qualquer fase você pode querer desfazer alguma coisa Aqui, veremos algumas ferramentas básicas para desfazer modificações que você fez Cuidado_ porque você não pode desfazer algumas dessas mudanças Essa uma das poucas áreas no Git onde você pode perder algum trabalho se fizer errado Para voltar ao último commit:

git reset --hard HEAD~1

Para voltar ao último commit mantém os últimos arquivos no Stage:

git reset soft HEAD~1

Volta para commit com hash XXXXXXXXXXX:

git reset --hard

Recuperando commit apagado pelo git reset Para visualizar os hashs

git reflog

E para aplicar:

git merge {hash}

git rm

Removendo Arquivos

http:llcomandosgit github.iol

3/7

## Página 4

2017-6-1

Comandos Git - Aprenda Git do básico ao avançado

Para remover um arquivo do Git, você tem que removê-lo dos arquivos que estão sendo monitorados (mais precisamente removê-lo da sua área de seleção) então fazer commit. 0 comando git rm faz isso também remove arquivo do seu diretório para você não ver ele como arquivo não monitorado (untracked file) na próxima vez

git rm -f {arquivo}

Se você modificou arquivo adicionou na área de seleção voce deve forçar remoção com opção ~f.Essa uma funcionalidade de segurança para prevenir remoções acidentais de dados que ainda não foram gravados em um sna pshot não podem ser recuperados do Git.

git mv

Movendo Arquivos

Diferente de muitos sistemas VCS Git não monitora explicitamente arquivos movidos_ É um pouco coníuso que Git tenha um comando mv. Se você quiser renomear um arquivo no Git, você pode fazer isso com

git mv arquivo origem arquivo_destino

funciona De fato se você fizer algo desse tipo consultar status voce vera que Git considera que arquivo foi renomeado.

No entanto_ isso equivalente rodar algo como:

mv README txt README git rm READMEtxt git add README

0 Git descobre que arquivo foi renomeado implicitamente; então ele não se importa se você renomeou por este caminho ou com comando mv. única diferença real que comando mv é mais conveniente executa três passos de uma vez 0 mais importante_ você pode usar qualquer ferramenta para renomear um arquivo usar addlrm depois antes de consolidar com commit .

Branch e Merge git branch

Branch Básico

Um branch no Git simplesmente um leve ponteiro móvel para um dos commits 0 nome do branch padrão no Git é master. Como você inicialmente fez commits; você tem um branch principal (master branch) que aponta para último commit que você fez_ Cada vez que você faz um commit ele avança automaticamente_ que acontece se você criar um novo branch? Bem isso cria um novo ponteiro para que você possa se mover. Vamos dizer que você crie um novo branch chamado testing Você faz isso com comando git branch:

git branch testing

SsO crla um novo ponteiro para mesmo commit em que você está no momento Para mudar para um branch existente voc: executa comando git checkout. Vamos mudar para novo branch testing:

git checkout testing

Isto move HEAD para apontar para branch testing

git checkout

Mudando de Branch

Com git checkout você pode mudar de branch_ caso branch ainda não exista você poderá passar parâmetro -b para criar.

git checkout -b {nome

branch}

git merge

Merge Básico

http: llcomandosgit githubiol

4/7

## Página 5

2017-6-1

Comandos Git - Aprenda Git do básico ao avançado Suponha que você decidiu que trabalho na tarefa #53 está completo pronto para ser feito merge no branch master. Para fazer isso você fará merge do seu branch iss53 bem como merge do branch hotfix de antes. Tudo que você tem fazer executar checkout do branch para onde deseja fazer merge então rodar comando git merge:

git checkout master git merge iss53

git mergetool

Resolvendo conflitos

Se você quer usar uma ferramenta grafica para resolver esses problemas você pode executar seguinte comando que abre uma ferramenta visual de merge adequada percorre os conflitos_

git mergetool

Arquivos Temporários

git mergetool cria 'orig arquivos de backup ao resolver fusões Estes são seguros para remover uma vez que um arquivo foi fundida sua git mergetool sessão foi concluida_

git log

Histórico de Commits

Depois que você tiver criado vários commits ou se clonou um repositório com um histórico de commits existente; você provavelmente vai querer ver que aconteceu. A ferramente mais básica poderosa para fazer isso é comando:

git log

git stash

Fazendo Stash

Muitas vezes, quando você está trabalhando em uma parte do seu projeto as coisas estão em um estado confuso você quer mudar de branch por um tempo para trabalhar em outra coisa 0 problema é você não quer fazer commit de um trabalho incompleto somente para voltar ele mais tarde. A resposta para esse problema comando git stash Você quer mudar de branch mas não quer fazer commit do que você ainda está trabalhando; você irá fazer stash das modificações_ Para fazer um novo stash na sua pilha execute:

git stash

Seu diretório de trabalho estará limpo. Neste momento você pode facilmente mudar de branch trabalhar em outra coisa; suas alterações estão armazenadas na sua pilha. Para ver as stashes que voce guardou, você pode usar

git stash list

Você pode aplicar aquele que acabou de fazer stash com comando mostrado na saida de ajuda do comando stash original: git stash apply Se você quer aplicar um dos stashes mais antigos_ você pode especificá-lo assim: git stash apply stash@{2} Se você não especificar um stash_ Git assume que stash mais recente tenta aplicá-lo_

git tag

Tagging

Git tem habilidade de criar tags em pontos específicos na história do código como pontos importantes . Geralmente as pessoas usam esta funcionalidade para marcar pontos de release (v1.0 por aí vai) Nesta seção_ você aprenderá como listar as tags disponiveis como criar novas tags; quais são os tipos diferentes de tags Para listar as tags execute:

git tag

Para criar uma tag basta executar seguinte comando; caso não queira criar tag anotada, somente retire os parâmetros

git tag a v1.,4 -m 'my version 1,4'

Compartilhar e Atualizar Projetos http:llcomandosgit github.iol

5/7

## Página 6

2017-6-1

Comandos Git - Aprenda Git do básico ao avançado

git fetch

Fazendo Fetch

Para pegar dados dos seus projetos remotos, você pode executar:

git fetch origin

Esse comando vai até projeto remoto pega todos os dados que você ainda não tem Depois de fazer isso, você deve ter referências para todos os branches desse remoto onde voce pode fazer merge ou inspecionar qualquer momento

git pull

Atualizando local

Incorpora as alterações de um repositório remoto no branch atual. Em seu modo padrão, git pull uma abreviaçao para git fetch seguido de git merge FETCH_HEAD. Por exemplo; se eu estiver em uma branch chamada develop quiser atualizar caso haja atualizações remotamente:

git pull origin develop

git push

Empurrando seus commits

Empurrar é como você transferir commits partir do seu repositório local um repo remoto_ contrapartida git fetch mas que buscar importações compromete-se agências locais, empurrando as exportações compromete-se filiais remotas. Para fazer isso você executar git empurrar "[alias] [ramo], que vai tentar fazer seu [ramo] novo [ramo] na [alias] remoto. Por exemplo; se eu quiser empurrar filial remota desenvolver:

git push origin develop

git remote

git submodule

Inspeção e Comparação git show git log git diff git shortlog git describe

Pacotes git apply

git cherry-pick

git diff

git rebase

git revert

Debugando git bisect git blame git grep http:llcomandosgit github.iol

6/7

## Página 7

2017-6-1

Comandos Git - Aprenda Git do básico ao avançado

Email

git am

git apply

git format-patch git send-email

git request-pull

Sistemas Externos git svn git fast-import

Administração git clean git gc git fsck

git reflog

git filter-branch

git instaweb

git archive

Servidor git daemon git update-server-info

Canalização de Código git cat-file git commit-tree git count-objects git diff-index git for-each-ref git hash-object

git merge-base

git read-tree

git rev-list

git rev-parse

git show-ref git symbolic-ref git update-index

http: llcomandosgit githubiol

7/7
