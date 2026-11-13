<!-- OCR (EasyOCR pt+en) -->

## Página 1

4.2 Estudo de viabilidade Parte do estudo de viabilidade é fazer a análise dos requisitos do sistema para definir várias alternativas de solução para projeto do sistema. Essas alternativas devem ser in- vestigadas mais apuradamente; de forma que possam ser ordenadas por preferência em uma xecomendação que é 0 resultado do estudo de viabilidade   Pere $e verificar ª viabilidade de cada alternativa, usualmente é necessário refiná-las. A análise dos requisitos tenta de- terminar características de soluções aceitáveis; ferramentas, bem como facilidades € pessoas disponíveis para desenvolver solução.   Requisitos freqüentemente 8ão conflitantes ou não são economicamente viáveis considerando-se os recursos disponíveis. Muitos requisitos po- dem e devem ser negociados. Deve-se iniciar esse estudo indicando soluções alternativas para problema.  Uma liste de alternatives deve ger considerade e, num processo de refinamento, deve-e ir exeluindo aqueles que, pela ordem, não eão viáveis tecnicamente, operacionalmente economicamente.  As alternativas que sobrarem serão consideradas viáveis.

Viabilidade técnica. Esse estudo deve gerar um conjunto de alternativas tecnicamente viáveis através do exame de implicações técnicas dos requisitos da verificação da viabilidade de cada requisito de possíveis conflitos técnicos com outros requisitos. Por exemplo, se desenvolvimento for interno, só poderão ser consideradas alternativas que necessitem apenas do conhecimento técnico da equipe

## Página 2

Ariadne M. B. Rizzoni Carvalho Thelma C. dos Santos Chiossi

117

Viabilidade operacional ou organizacional. São considereções respeito da rejeição do usuário alguma alternativa tecnicamente viável.   Por exemplo, 0 cliente poderia se opor a0 desenvolvimento do sistema por ter- ceiros; ou à compra de outro equipamento; exigindo a utilização dos recursos existentes na empresa.

Viabilidade econômica Nesse ponto, deve-se estimar 0 custo tanto operaciona] como de desenvolvimento de cada alternativa restante.  Calculam-se também economias de custo e/ou aumentos de receita em comparação com sistema existente (se houver) Podem-se selecionar, partir desse estudo; alternativas viáveis sob todos 08 aspectos já considerados .

Pode-se considerar, também, um estudo da viabilidade legal da alternativa.

A quantidade de tempo que se deve gastar com estudo de viabilidade depende do projeto. Por exemplo; é bastante razoável gastar um dia para avaliar as alternativas para modificar 0 formato de um relatório. Já para desenvolver um novo sistema de contabilidade; será necessário gastar semanas 0 desenvolvimento de um novo pacote que custará milhões de dólares com certeza pede um estudo mais apurado das possíveis soluções e, portanto; pode levar meses ou até anos

4.2.1 Lista de alternativas Inicialmente; 0 grau de funcionalidade do sistema deve ser examinado. Nesse caso, podem- se utilizar; como técnicas para gerar alternativas; delineamento de diferentes fronteiras de automação a técnica de brainstorming;  vista no capítulo 2 Os aspectos funcionais de cada alternativa devem ser verificados e pontuados pela complexidade de implementação. Se duas funcionalidades têm a mesma prioridade de implementação e a mesma prioridade de negociação; & mais simples (menos complexa) é a melhor Um conjunto de alternativas será gerado a partir da aplicação das técnicas acima. Deve- se verificar; então; ª viabilidade técnica de cada alternativa, rejeitando-se as que não forem viáveis. Por exemplo; se um sistema exigir tempo de resposta de três a quatro segundos; as alternativas voltadas a lote (batch) devem ser ignoradas.  As alternativas tecnicamente viáveis podem ser apresentadas a0 usuário para verificar se ele rejeita alguma delas (viabilidade operacional)- A partir desse ponto, deve-se passar para estudo da viabilidade econômica Para sistema de venda de sementes;  podem-se considerar as seguintes  alternativas viáveis para sua solução; muito embora várias outras pudessem ser geradas, bastando; por exemplo; modificar as fronteiras de automação.

Alternativa 1: manter 0 funcionamento atual da fábrice, aumentando 0 número de funcionários e 0 tamanho das instalações, para atender demnanda crescente_

## Página 3

118

Introdução à Engenharia de Software

Alternativa % desenvolver um sistema informatizado para agilizar 0 funcionamento do sistema atual , mantendo seu modo de operação Esse sistema terá as seguintes funções: Fl: controlar estoque de matéria-prima e de produtos manufaturados; F2; controlar pedidos; F3: controlar contas & receber; F4: produzir guia de busca; F5: compor 0s custos dos produtos manufaturados; F6: emitir fatura.

Alternativa 3: instalar um sistema integrado; totalmente informatizado; envolvendo os subsistemas de produção; controle de estoque vendas Esse sistema conterá todas as funções da alternativa 2 mais função controlar produção das máquinas. As ordens de serviço irão diretamente para a8 máquinas disponíveis.

Para cada uma das alternativas técnica operacionalmente viáveis; devem-se fazer esti- mativas de custo (em geral em termos de mão-de-obra e tempo de desenvolvimento) , benefício e reCUISOS e determinar 0s riscos; preparando um estudo de custo-benefício para cada alter - nativa. Dessa forma; será possível quantificar a viabilidade econômica e justificar 0 fato de se descartar algumas das alternativas.  As alternativas que sobrarem, por serem viáveis, devem ser apresentadas ao cliente, incluindo-se considerações sobre vantagens desvantagens de cada uma. Baseando-se nas vantagens e desvantagens das alternativas viáveis, deve-se apre- sentar também uma recomendação da melhor solução para problema. Para a alternativa recomendada, pode-se acrescentar um estudo de custo-benefício detalhado.

4.2.2 Estimativas processo de estimativa para projetos de software está diretamente relacionado com decomposição do produto e do processo de desenvolvimento (princípios discutidos no capítulo 2) . No início do desenvolvimento, têm-se poucos detalhes e, portanto, 8ó é possível  fazer uma estimativa grosseira; mas, à medida que 0 desenvolvimento progride mais detalhes se tornam conhecidos; a8 estimativas se tornam mais precisas.  Isso deve ser bem compreendido para garantir uma melhor qualidade das estimativas de esforço, tempo e recursos contidas o planejamento do projeto de software. As estimativas iniciais em geral são baseadas em experiências de desenvolvimentos anteriores,  quando foram registrados as   estimativas feitas em cada fase e 0 valor real obtido. Nas fases que se sucedem durante construção do software; os valores estimados podem ser registrados; de forma que, a0 se terminar 0 projeto; seja possível verificar se processo de estimativa permitiu que 08 resultados intermediários das estimativas convergissem para 0 valor real conforme 0 projeto foi avançando. 0 processo de estimativa faz uso não somente de perícia e conhecimento, mag também de um conjunto de regras que podem ser encontradas em métodos de estimativas. Para obter bons resultados, um método de estimativa deve:

## Página 4

Ariadne M. B. Rizzoni Carvalho Thelma C. dos Santos Chiossi

119

ter a primeira estimativa entre 4309 do valor real  (estimativa feita nos primeiros estágios de desenvolvimento); ter definida uma faixa de valores (erro-padrão de estimativa) que garanta que em pelo menos 689 das vezes 0 valor estimado esteja compreendido nessa faixa; permitir refinamentos da estimativa durante desenvolvimento do sistema (reestimar ao final de cada fase, incluindo novas informações); ser fácil de utilizar;

ter ferramentas de suporte documentação.

Os modelos usados para estimar são bastante imprecisos; entretanto, essas distorções podemn e devem ser compensadas de alguma forma, poís, do contrário; método produzirá resultados impróprios no planejamento de recursos, implicando; em geral , valores subestima - dos; 0 que gera problemas tais como ultrapassagem de custos, descumprimento de prazos produtos de baixa qualidade. As variações normais nas estimativas podem ser contornadas utilizando-se fatores múltiplos que influenciem 0 tamanho complexidade do sistema utilizando-se alguma maneira independente para verificar os resultados. A imprecisão nas estimativas feitas nas fases iniciais do projeto é grande pois pouco se sabe sobre produto 9 ser desenvolvido.  Conforme 0 projeto avança; mais se passa a conhecer sobre 0 produto; grau de imprecisão tende a diminuir . De acordo com DeMarco [DEM 82], os desenvolvedores de software reconhecidamente não são bons estimadores por não saberem exatamente que é estimativa, não fazerem previsões adequadas para contrabalançar efeito de distorções; não saberem lidar com os problemas políticos que dificultam processo de estimativa e não basearem as estimativas em desempenhos passados. Um projeto normal de software requer estimativas no início do projeto e, periodicamente, daí por diante. Isso consome pouco tempo do gerente (3% do tempo gasto n0 projeto), 0 que explica; em parte; a sua falta de especialização no assunto.

4.2.3 Estimativa de custo A estimativa de custo laz parte da fase de planejamento de qualquer projeto de enge- nharia_ A diferença é que na engenharia de software 0 custo principal é 0 esforço; ou seja, custo de mão-de-obra; assim; para se calcular 0 custo do software; é necessário dimensionar trabalho para desenvolvê-lo. Em geral, esse trabalho é expresso pelo número de pessoas trabalhando numa unidade de tempo; tal como pessoas-mês ou pessoas-ano_ 0 trabalho que uma pessoa consegue fazer num mês pode ser traduzido em número de horas de trabalho num mês: Boebm [BOE 81] sugere que se utilize 0 valor de 152 horas por mês (máximo de horas produtivas num mês) como parâmetro para 0 cálculo do esforço.   Assim; se para um projeto forem estimadas 40 pessoas-mês , tem-se um trabalho equivalente 6.080 horas (152 x 40), que deverão ser distribuídas no prazo estimado para 0 projeto. Pode-se afirmar que 0 esforço está diretamente relacionado à produtividade; que é medida pela quantidade de trabalho

## Página 5

120

Introdução à Engenharia de Software

realizada por uma unidade de esforço.   Assim; um exemplo de medida de produtividade é a quantidade de linhas de código /pessoas-mês. Existem vários métodos que podem ser utilizados para se estimar 0 custo do desenvolvi - mento e à vida útil de um sistema  Em geral, 0 custo pode representar 0 custo monetário ou esforço necessário para desenvolver e manter 0 sistema. Para estabelecer essas estimativas; pode-se decompor produto e 0 prOCeSSO e, então; utilizar a opinião de especialistas que; baseados em experiências de projetos anteriores; 8ã0 capazes de estimar 0 esforço e 0 tempo de desenvolvimento para 0 novo projeto.  Outra maneira de se estabelecer uma estimativa de custo é utilizar modelos empíricos (como os discutidos no capítulo 3), que poderão ou não necessitar da decomposição do produto e do processo. Apesar de 0s modelos empíricos serem bastante utilizados (usualmente fazem parte das ferramentas automatizadas para previsão de custos), eles não sã0 diretamente transportáveis para qualquer empresa.  Assim; os modelos empíricos podem ser utilizados como base inicial em uma empresa até que ela possa criar seu próprio modelo. Sendo assim, quando se deseja estabelecer estimativas para um software novo, em geral é necessário utilizar técnicas de decomposição. Nesse caso, 0 processo de estimativa começa com uma declaração definida do escopo do software, e à partir dela tenta-se decompor software em pequenas subfunções que podem ser estimadas individualmente. Podem-se con- siderar dois tipos de decomposição: (1) decomposição do produto para estimar 0 número de linhas de código; utilizando-se & métrica LOC (lines of code) , ou estimando a funcionalidade através da métrica FP (function points); e (2) decomposição do processo considerando-se as atividades de cada etapa da engenharia de software; dependendo do paradigma utilizado. LOC se refere à estimativa do número de linhas de código executáveis de um software, FP se refere a08 pontos de função que são determinados estimando-se 0 número de entradas; saídas, arquivos de dados, consultas interfaces externas, bem como valores de ajuste de complexidade. A partir da decomposição do produto utilizando-se qualquer métrica (LOC; FP etc), pode-se estimar um valor otimista () um valor mais provável (m) um valor pessimista (p) para cada subfunção então utilizar métodos de estimativa existentes para calcular valor previsto para variável a ser estimada [LON 87]. Entre os modelos dis- poníveis, pode-se citar 0 modelo PERT, que na sua forma mais simplificada utiliza 0 valor otimista e 0 valor pessimista para cálculo da variáve] estimada, como segue: 0 + pi Ve; 2 Essa estimativa deverá ser corrigida, por um erro-padrão de estimativa, para garantir que em pelo menos 68% das vezes 0 valor real esteja dentro do esperado (Ve;) corrigido pelo errO Uma forma mais sofisticada do modelo PERT considera o8 valores otimista, pessimista e mais provável dos componentes (subfunções) do sistema; 0 valor esperado pode ser calculado por uma média ponderada, como segue: Vei O; + 4m; + Pi

## Página 6

Ariadne M. B Rizzoni Carvalho e Thelma C. dos Santos Chiossi

121

em que Ve; é 9 variável de estimativa e 0;, mi e p; são 0s valores otimista, mais provável pessimista dos componentes do sistema. Nesse caso, a margem de erro também deve ser indicada.  A estimativa global, incluindo todos 0s n componentes de um sistema, será:

Ve = E(Ve) i=1

A Tabela 4.1 lista

valor  otimista, mais provável

pessimista para 0 tamanho em LOC das funções que compoõm a alternativa 2 do projeto para 0 sistema de venda de sementes. Esses valores podem ter sido obtidos a partir de um banco de dados sobre projetos, ou através da opinião de especialistas, foram utilizados para cálculo do valor eperado para 0 tamanho das funções do sistema aplicando-se técnica PERT_ que calcula a média ponderada.

Funcões Otimista Mais provavel Pessimista Esperado Fl 1.400 2.000 2.800 2.033 F2 3.500 5.400 6.300 5,233 F3 1.500 2.300 3.700 2,400 F4 5.000 6.300 7.500 6.283 F5 1.000 1.500 1.900 1.483 F6 2.300 2.880 3.175 2.833

Tabela 4.1: Tamanbo estimado para as funções da alternativa 2

Considerando-se 0 tamanho estimado para cada um dos subsístemas ou funções de alter - nativas de solução para 0 projeto; pode-se utilizar um modelo de custo e estimar 0 esforço tempo necessários para 0 desenvolvimento do projeto. Por exemplo; 0 tamanho total esti- mado para a alternativa 2 é S 20.265 (20 Kuoc); e, se 0 modelo básico de Boehm, visto no capítulo 3, for utilizado; esforço total estimado será E = 56 pessoas-mês.  Essa é apenas uma estimativa grosseira do custo do projeto; visto que apenas 0 tamanho do sistema foi considerado. As estimativas podem ser refinadas estimando-se esforço das funções em cada etapa da engenharia de software. Para isso, é necessário considerar paradigma a ser utilizado para 0 desenvolvimento do sistema. Boebm sugere uma distribuição do esforço total entre 85 fases do ciclo de vida do desenvolvimento, apresentada na Tabela 4.2. Deve-se observar que 0 custo de manutenção é adicional, não considerado no custo calculado por Boehm. A porcentagem de esforço depende; entre outros fatores, do tipo de sistema e do ambiente de desenvolvimento. Para a alternativa 2 do sistema de venda de sementes, pode-se consi- derar que a Tabela 4.3 representa distribuição esperada do esforço nas diversas fases do desenvolvimento. Para se calcular 0 custo monetário da alternativa; 0 total de cada fase pode ser multiplicado pela taxa relativa 80 custo em pessoas-mês (pm) para a fase, calculando-se

## Página 7

122

Introdução à Engenharia de Software

Etapa 0 de esforco PlanejamentoJanálise dos requisitos 6 a 8 Projeto 16 a 18 Implementação 48 a 68 Teste/integração 16 a 34

Tabela 4.2: Proporção de eforço gasto nas fases de desenvolvimento.

custo monetário de cada fase.  Essa estimativa permite programar utilização dos recur - 80S financeiros. Por exemplo; a fase de planejamento/análise dos requisitos requer quatro pessoas-mês. Se 0 custo por pessoa-mês nessa fase é de $ 230,00, 0 custo total dessa fase é de $ 920,00. Calculando-se 0 custo de cada uma das outras fases, chega-se a0 custo total da alternativa.

Etapa

Esforço estimado Planejamento/análise dos requisitos 3 pm Projeto 9 pm Implementação 29 pm Teste /integração 15 pm

Tabela 4.3: Distribuição do esforço para a alternativa 2

4.2.4 Estimativa de tempo Após estimar esforço necessário para construir produto, pode-se utilizar esse valor par8 estimar 0 tempo; ou seja, 0 prazo para 0 desenvolvimento do projeto.  Evidentemente tempo de desenvolvimento depende da produtividade da equipe   Quanto maior produ - tividade, menor é 0 tempo de desenvolvimento. Se 0 modelo de Boehm for utilizado para estimar tempo de desenvolvimento da alternativa 2, tem-Be que Ta 10 meses. Se for necessário estimar 0 tempo que será gasto em cada fase do desenvolvimento; pode-se utilizar distribuição de tempo sugerida por Boehm, apresentada na Tabela 4.4. Da mesma maneira que a Tabela 4.2 pode ser utilizada para estimar 0 esforço nas diferentes fases, a Tabela 4.4 pode ser utilizada para estimar & quantidade de tempo nas diferentes fases. Essa estimativa é muito útil na programação do projeto.

4.2.5 Estimativa de recursos Devem ser estimados 0s recursos necessários para 0 desenvolvimento do projeto e para operação do produto de softwar:. Os principais recursos são: humano, de software e de hardware .

## Página 8

Ariadne M. B Rizzoni Carvalho Thelma C. dos Santos Chiossi

123

EtapaQ

% de tempo PlanejamentoJanálise dos requisitos 10 a 40 Projeto 19 a 38 Implementação 19 a 38 Teste /integração 18 a 34

Tabela 4.4: Proporção de tempo gasto nas fases de desenvolvimento

As estimativas de recursos humanos devem fazer uma previsão das habilidades exigidas; disponibilidade; duração das tarefas data em que esse recurso deve estar disponível. número de pessoas só pode ser determinado após a estimativa de esforço ter sido efetuada. Para projetos pequenos (uma pessoa-ano ou menos) , uma única pessoa pode executar todas a8 etapas da engenharia de software,  consultando especialistas quando necessário. Para projetos grandes; deve-se organizar uma equipe. 0 número de pessoas na equipe pode ser estimado dividindo-se 0 esforço total pelo tempo de desenvolvimento No exemplo do sistema de venda de sementes; pode-se prever que 0 número de pessoas na equipe é igual ao esforço dividido pelo tempo de desenvolvimento, ou seja, 56 pessoas-mês/10 meses, 0 que resulta em uma equipe de seis pessoas. As estimativas de hardware e software devem prever a descrição, disponibilidade, duração do uso e início da utilização desse tipo de recurso.  Recursos de hardware 2 ser estimados du - rante planejamento podem ser relativos ao hardware utilizado durante desenvolvimento ou a0 hardware em que 0 produto será instalado; ou ainda a outros equipamentos necessários para desenvolvimento operação do sistema de software Os recursos de software & ser estimados são aqueles necessários ao desenvolvimento gerenciamento do projeto de soft- ware Deve-se considerar um conjunto de ferramentas que auxiliem nas diversas tarefas de engenharia de software. Essas ferramentas 8ão denominadas ferramentes CASE (computer- aided softwcre engineering engenharia de software auxiliada por computador) e auxiliam em várias atividades da engenharia de software; entre elas:   desenvolvimento; planejamen - to; gerenciamento de projetos; programação, integração e testes construção de protótipos. Outro tipo de recurso de software é aquele necessário para a operação do sistema. Nessa classe estão os softwares básicos aplicativos A proporção dos recursos gastos em cada etapa do ciclo: de vida depende da natureza do projeto. Se um sistema envolve grande e complexo arquivo de dadog; 0s recursos devem se concentrar no projeto; as etapas de implementação e testes exigirão menos recursos. Se sistema for utilizar um arquivo 'existente para programação de produção; as fases de implementação e 0 treinamento de operadores vão requerer mais recursos. Em sistemas de apoio à decisão, se usuário não souber direito quais 8ão as informações necessárias; como serão usadas e com que freqüência; estudo de viabilidade e a especificação de requisitos do sistema exigirão mais recursos.

## Página 9

124

Introdução Engenharia de Software

4.2.6 Estimativa de benefícios Os benefícios podem ser tangíveis ou intangíveis. Benefícios tangíveis; tais como redução de custo operacional do sistema eou aumento de lucro; são quantificáveis . Um cliente pode esperar aumentar 0 lucro porque maís trabalho será feito na mesma quantidade de tempo.  Um estudo de custo-benefício detalhado indicará 0 lucro. Os benefícios tangíveis são: aumento de receita, redução de custo; aperfeiçoamento de serviços a0 cliente e atendimento de exigências inflexíveis.  Benefícios intangíveis não são facilmente quantificáveis.   Exemplos desse tipo de benefício são: moral da equipe, melhoria do processo de tomada de decisão; melhoria na documentação facilidade de uso do sistema. É adequado pedir auxílio a0 usuário; pois ele, melhor do que ninguém, conhece os benefícios possíveis; mas nem sempre é possível estimar todos os benefícios, já que muitos deles são baseados em fatos futuros que; não ocorrendo, modificam estimativa feita.   Os benefícios considerados em partes do sistema podem afetar outras partes, e nem sempre é possível estimar quais partes quanto serão afetadas. Além  disso, os  benefícios baseados em novas tecnologias não podem ser previstos . Voltando ao exemplo do sistema de venda de sementes; podem-se considerar as seguintes estimativas para as alternativas de solução já apresentadas:

Alternativa 1: a rotina de trabalho preestabelecida não será alterada; contudo; 0 au- mento do número de funcionários tornará desnecessário pagamento de horas-extras permitirá que as operações de atualização de estoque não se atrasem em relação 80 ritmo de trabalho das unidades produtivas. 0 custo de investimento para implan- tação dessa alternativa será de $ 10.400,00, referentes a reformas ampliação das dependências da empresa, custo operacional previsto será de $ 23.560,00 anuais; gastos com salários e encargos de três novos funcionários. A economia esperada será de $ 12.070,00 a0 ano, correspondentes economias hoje pagas em horas extras funcionários.

Alternativa 2 0 custo de investimento previsto para essa alternativa é de $ 22.930,00, referentes ao 'desenvolvímento de software. custo operacional será de $ 20.420,00 a0 ano, necessários à manutenção do hardware, pagamento de funcionário para manu - tenção de software e outros gastos. A economia anual esperada é de $ 30.880,00. Alternativa 3: para essa alternativa, estima-se um custo de $ 52.900,00, que corres- pondem gastos com aquisição de hardware e desenvolvimento de software. 0 custo operacional esperado é 0 mesmo da alternativa anterior, ou seja, $ 20.420,00 ao ano, benefício estimado é de $ 39.500,00 ao ano.

4.2.7

Análise de risco

A análise de risco do desenvolvimento de um sistema de software deve identificar as partes que apresentam as maiores dificuldades no desenvolvimento apontar os riscog e as ações que devem ser tomadas para contornar as causas desses riscos (isto é, devem-se estabelecer 0S   passos à ser seguidos para que se possa administrar os riscos detectados) . Devem-se,

## Página 10

Ariadne M. B. Rizzoni Carvalho e Thelma C. dos Santos Chiossi

125

também, estabelecer mecanismos para avaliar 0 progresso do desenvolvimento e a organização do pessoal que construirá 0 produto. Fatores que podem provocar 0 encerramento do projeto devem ser tratados antes do início do desenvolvimento. Algumas considerações que podem ser feitas sobre 0s riscos no contexto da engenharia de software são: quais riscos podem fazer com que projeto do software fracasse?   Como mudança nos requisitos do cliente; nos computadores que se destina software, nas tecnologias de desenvolvimento e nas entidades ligadas a0 projeto afetará 0 sucesso global cumprimento do cronograma? Quais métodos e ferramentas devem ser usados para desenvolvimento do sistema? Quantas pessoas devem ser envolvidas? Quanta ênfase deve ser dada à qualidade? Os riscos sã0 medidos pelo grau de incerteza das estimativas estabelecidas para custo, prazo e recursos.  Se 0 escopo de um projeto for mal estabelecido ou se 0s requisitos do sistema estiverem sujeitos a mudanças; a incerteza das estimativas torna-se elevada, aumentando, assim; 0S riscos de fracasso do projeto. Segundo Boehm [BOE 91], ª determinação dos riscos envolve as seguintes atividades: identificação; análise e priorização. Identificação: essa atividade tem como objetivo produzir uma lista de fatores de risco específicos que podem comprometer 0 sucesso do projeto. Os fatores de risco podem estar relacionados ao produto (por exemplo, complexidade do produto) , a0 processo de desenvolvimento (por exemplo; ambigüidade na especificação) a0 negócio (por exemplo, construir um produto para qual não existe mercado)- Análise: essa atividade tem como objetivo determinar probabilidade da ocorrência de cada fator de risco impacto caso 0 risco ocorra.  Para tal, deve-se quantificar probabilidade percebida de ocorrência de um risco.   Quanto a0 impacto do risco; três fatores podem ser considerados: natureza, 0 alcance e 0 tempo de ocorrência do risco,

Priorização: essa atividade tem como objetivo ordenar os fatores de risco identificados analisados.   Os riscos devem ser, então, ponderados em função do possível impacto percebido sobre 0 projeto e depois colocados em ordem de probabilidade de ocorrência.

4.2.8 Análise de custo-benefício Todo investimento tem um risco, e 0 desenvolvimento de um sistema é um investimento. Quanto maior 0 risco, maior deverá ser benefício. Tanto para benefícios tangíveis como para intangíveis,  devem-se indicar prioridades para a sua obtenção, como, por exemplo obrigatório, importante mas negociável, ou opcional. Essas prioridades facilitam ª análise comparativa de alternativas negociação de requisitos; quando necessária. Quando são comparados os benefícios econômicos com 0s custos do projeto; pode-se ver benefício econômico como lucro. Só há duas maneiras de aumentar lucro: aumentando receita e/ou diminuindo 0 custo.   Dessa forma; 0 benefício econômico pode ser calculado em termos de receita custos; como segue:

lucro = receita custo

## Página 11

126

Introdução à Engenharia de Software

em que: lucro receita custo

benefício econômico; dinheiro que flui para a organização; dinheiro que fui da organização.

Análise de custo

custo do software varia com sua funcionalidade características de qualidade_ Um cliente pode desejar um sistema com muitas características mas acabar optando por um sis - tema simples, devido à rapidez de sua construção ou pelo custo em proporção aos benefícios. Deve-se especificar valor a ser gasto para 0 desenvolvimento utilização do sistema no- Vo, Assim, custo para a construção do novo sistema pode ser dividido em investimento (custo fixo) e custo operacional (custo variável, que depende da utilização que será feita do software) Os custos são baseados nas estimativas de esforço e/ou tempo para as atividades e na quantidade e qualidade de recursos. Isso inclui recursos  para:   desenvolvimento; conversão do sistema antigo (manual ou automatizado) no novo operação do sistema novo. Os custos de desenvolvimento ocorrem apenas uma vez são considerados investimento de capital .  Os itens abaixo podem ser considerados 0s que mais afetam 0 custo de desenvo]  vimento.

Pessoal:   analistas; programadores, operadores; pessoal administrativo etc. Equipamentos: tempo de máquina, espaço em disco; instrumentos equipamentos nOvOS.

Software:  ferramentas CASE.

Materiais: discos; ftas, publicações, papéis etc. Despesas gerais: apoio administrativo, espaço; luz etc. Despesas externas:  consultoria; treinamento especial etc.

Os custos operacionais iniciam-se com a instalação € continuam durante a vida útil do sistema; sã0 considerados despesas.   Podem-se levar em conta 0s seguintes itens para estimar OS custos operacionais: Custo de hardware: tempo de residência, espaço de memória; operações de E/S. Custo de pessoal:  operador, administrador, programador (manutenção). Materiais: formulários; discos. Despesas gerais: aluguéis, auditoria; serviços externos.

## Página 12

Ariadne M. B. Rizzoni Carvalho e Thelma C. dos Santos Chiossi

127

Outros custos também devem ser estimados; entre eles podem-se citar: Custo de instalação: inclui custos das atividades associadas com integração do soft - ware a0 complexo de facilidades; equipamentos;  pessoal e procedimentos do sistema operacional do usuário.

Custo de treinamento: inclui treinamento do usuário; do pessoal de operação; do pes - soal de preparação de dados e do pessoal da manutenção Custo de conversão:   quando se estuda possibilidade de uma nova confguração do computador, 0 custo da conversão pode ser um item crítico, que pode incluir con- versão de programas, conversão de base de dados; documentação; teste de validação e aceitação. Custo de documentação: quantidade de documentação produzida para um sistema pode ser associada ao tamanho do produto. Deve-se estimar 0 esforço necessário para escrever, revisar $ especificar a documentação. Análise de beneffcio É importante calcular proporção dos benefíciog 0 custo do projeto. Os benefícios são medidos avaliando-se a melhoria nos negócios dos clientes, remoção de um problema, assim como exploração de uma oportunidade: análise de benefício compara pares de requisitos do produto e benefício para verificar se eles são consistentes realistas . Essa atividade pode usar informações quantitativas sobre as alternativas para ordená-las e negociá - las; se necessário. Cada requisito de uma aternativa deve refletir benefícios e, se isso não ocorrer, deve-se considerar possibilidade de requisito ser supérfuo ou de os benefícios correspondentes não terem sido apropriadamente determinados.

Retorno do investimento Cada parte do projeto rende seus próprios benefícios, acarreta seus próprios custos também exige recursos próprios; dessa forma, enumeração de custos, benefícios e recursos dos componentes do projeto ajuda a decidir quais partes do projeto devem ser realizadas ; em que ordem devem ser implantadas e quais devem ser canceladas ou adiadas no caso de faltarem recursos. Além disso, facilita 0 processo de estimativa total de custo benefício do projeto. Sendo 0 dinheiro aplicado no desenvolvimento de um sistema considerado umn investi- mento; deve-se prever em quanto tempo 0 cliente recuperará 0 dinheiro aplicado. custo estimado para sistema pode ser considerado alto ou não, dependendo do valor do benefício esperado e do tempo para 0 retorno do investimento. Deve-se dar preferência a investimentos em que 0 retorno é mais rápido e maior no início_ valor estimado do benefício deve ser projetado para futuro; de forma que se estime quando benefício acumulado cobrirá 0 investimento feito no desenvolvimento do projeto. Pode-se utilizar & seguinte fórmula para cálculo do valor futuro do dinhieiro:

F =P(l +i)"

## Página 13

128

Introdução à Engenharia de Software

em que: F 4 valor futuro do dinheiro; P 4 valor presente do dinheiro; 4 taxa de juros; 4 número do período da aplicação. Um investimento em desenvolvimento tem chance de ser um bom negócio quando retorno 8e dá em aproximadamente três anos e se 0 tempo de vida do sistema for longo suficiente para que haja tempo de se recuperar investimento e ter lucro.  Entretanto, se 0 valor presente líquido for igual a zero; será melhor aplicar dinheiro num investimento de menor risco. Considerando-se 0 custo-benefício e 0 risco de cada alternativa para 0 projeto do sistema de venda de sementes; pode-se fazer uma análise das alternativas; como segue:

Alternativa 1: principal vantagem nesse caso é que não haverá necegsidade de treinar pessoal para novos   procedimentos. 0 investimento necessário à implantação dessa alternativa é pequeno- Em contrapartida; essa alternativa tem como fator de risco fato de 0 problema inicial voltar a ocorrer caso a expansão de mercado continue.   Além disso, não há previsão de recuperação do investimento

Alternativa ? vantagem dessa alternativa é que, com & automatização das funções básicas (que foram incluídas nessa alternativa) , 0s sistemas de produção e de controle de estoque serão agilizados, resolvendo; assim; 0s principais proble lemas do cliente. Além digso; a expansão dos negócios da empresa não afetará essa solução. 0 investimento não é alto, estima-se que 0 retorno se dê por volta de três anos.  Podem-se apontar como desvantagens, nesse caso; os riscos inerentes a0 desenvolvimento e 08 custos com aquisição de equipamentos e com treinamento. Alternativa 3: comunicação direta da linha de montagem com 0s sistemas de controle (estoque finanças) trará como vantagem bastante agilidade no processo produtivo e de vendas da empresa.  Podem-se citar como fatores de risco nessa alternativa 0 custo modificação radical nos processos de praticamente todos 08 setores da empresa. investimento é 2,3 vezes maior que 0 da alternativa 2, e 0 benefício apenas 1,3 vez maior.

Recomendações: segunda alternativa irá suprir a9 necessidades operacionais da empresa 8em, no entanto, modificar muito radicalmente 8ua estrutura de funcionamento.  Essa alter- nativa permite que 08 negócios da empresa possam se expandir sem que haja necessidade de reinvestimento no sistema. Além disso, 0 retorno do investimento se dará após 2,5 anos (bastante razoável) e, durante a sua vida útil (cinco anos), sistema dará um lucro de $ 37.783,00 $ 22.930,00 = $ 13.473,00. Sendo assim; recomenda-se essa alternativa para solucionar os problemas da empresa. Detalhes do estudo de custo-benefício realizado sã0 apresentados a seguir .

## Página 14

Ariadne M. B. Rizzoni Carvelho e Thelma C. dos Santos Chiossi

129

Estudo de custo benefiício detalhado para alternativa 2 Custo do desenvolvimento Pessoal (56 pm) $ 16.300,00 Equipamentos 8 5.800,00 Materiais $ 500,00 Despesas gerais $ 330,00 8 22.930,00

Custo operacional do sistema novo (anual) Hardware (manutenção) $ 3.600,00 Mão-de-obra $ 14.420,00 Materiais 8 1.560,00 Despesas gerais 8 840,00 8 20.420,00

Receita adicional esperada com a implantação do sistema $ 2.573,33 pOr mês $ 30.880,00 por ano

Economia anual de custo Benefício = $ 30.880,00 $ 20.420,00 = $ 10.460,00 por ano.

Retorno do investimento A Tabela 4.5 mostra 0 resultado do estudo de retorno de investimento para a alternativa 2, considerando benefício (valor futuro) igual para todos os anos e à taxa de juros 129 a0 ano. 0 benefício estimado hoje será desvalorizado; assim; 0 valor de 8 10.460,00 por ano estimado corresponderá a um valor de $ 7.071,00 após três anos. 0 retorno do investimento é esperado para metade do segundo ano. A rigor, 0 retorno do investimento deve ser determinado por uma análise mais detalhada, considerando-se outras possibilidades de investimento.

4.3 Organização do projeto Após completar 2s estimatívas para projeto e obter a aceitação do cliente; para poder iniciar desenvolvimento do sistema; deve-se decompor cada fase do desenvolvimento em atividades (a ser realizadas por apenas uma pessoa) , selecionar organizar a8 pessoas que farão parte da equipe e, fnalmente; atribuir a8 atividades às pessoas da equipe. A organi - zação do projeto exige que ge estime a duração das atividades; assim como a definição das que devem ser realizadas em seqüência e das que podem ser-realizadas paralelamente.   Além disso, devem-se conbecer as habilidades necessárias para realizar cada atividade

## Página 15

130

Introdução à Engenharia de Software

Ano Beneficio Taxa Valor pres. Valor pres. acum. $ 10.460,00 1,12 8 9.339,00 8 9.339,00 2 $ 10.460,00 1,25 $ 8.368,00 $ 17.707,00 3 8 10.460,00 1,40 $ 7.471,00 $ 25.178,00 4 $ 10.460,00 1,57 8 6.662,00 $ 31.840,00 5 $ 10.460,00 1,76 8 5.943,00 $ 37.783,00

Tabela 4.5: Retorno do investimento para alternativa 2

4.3.1 As atividades do desenvolvimento As informações que os gerentes necessitam para julgar 0 progresso do desenvolvimento do sistema e para atualizar estimativas de custo cronograma do projeto somente podem ser obtidas através de documentos que descrevem 0 trabalho que cstá sendo feito. Quan - do especificação do sistema é feita em estágios; como 0s discutidos no capítulo 3, esses documentos 850 constituídos pelas especificações produzidas em cada estágio. Segundo Somerville [SOM 96], quando 0 projeto é planejado, uma série de marcos deve ser estabelecida, e cada marco é 0 ponto final de alguma atividade do processo de engenha- ria de software.   Deve-se; então; escolher um paradis-na ou alguma outra estrutura para desenvolvimento do sistema, desde que cada tarefa a ser executada seja definida, estima- da, documentada e transmitida de etapa para etapa do desenvolvimento de software, isto é, deve-se determinar uma divisão do trabalho de desenvolvimento de software em partes gerenciáveis . Essa divisão nem sempre é simples; pois produto do desenvolvimento de software não é u objeto físico, nenhum material 0 constitui ou envolve; como é 0 caso de outros processos de engenharia. Muitos paradigmas; com diferentes divisões de trabalho; têm sido propoetos sob denominação de ciclo de vida do software; como apresentado na seção 1.4. A escolha do paradigma de desenvolvimento tem um forte impacto no planeja- mento. As estimativas de custos; recursos tempo podem ser baseadas na decomposição do processo em atividades ou tarefas, e, nesse caso, paradigma escolhido determinará primeiro nível de decomposição infuenciará a escolha das atividades para produção dos resultados desejados.

4.3.2 Organização da equipe A organização de pessoas em equipes para desenvolvimento de projetos deve levar em conta ª diferença de personalidade dos vários membros da equipe e como 0 papel da pessoa na equipe afeta sua personalidade Deve-se ter a preocupação de recrutar as pessoas cer- tas, sejam de dentro ou de fora da organização. Pessoas da organização que se tornaram disponíveis em outros projetos ou que estão alocadas; mas com previsão de disponibilidade; poderão ser recrutadas. Nesse caso; tanto 0 trabalho como a personalidade da pessoa já são conhecidos; e é mais fácil prever se ela é adequada a0 projeto.   0 recrutamento de pegsoas de

## Página 16

Ariadne M. B. Rizzoni Carvalho Thelma C. dos Santos Chiossi

131

fora da organização apresenta mais riscos gastos, pois será necessário selecionar treinar uma pessoa até que ela se torne produtiva. Boehm [BOE 81] considera diferentes opções para aplicação de recursos humanos em um projeto que exija n pessoas trabalhando durante k anos, entre elas:

indivíduos são designados para m tarefas funcionais diferentes    Ocorre pouco trabalho combinado. A coordenação cabe a um gerente de software que pode ter outros projetos com que se preocupar;

n indivíduos são designados para m tarefas funcionais diferentes; com m < n, de forma que equipes informaís sejam estabelecidas - Um chefe de equipe pode ser designado; coordenação das equipes fica sob responsabilidade de um gerente; diferentes indivíduos são organizados em t equipes.  Cada equipe tem uma organização específica e tem a ela atribuídas uma ou mais tarefas funcionais. A coordenação é controlada tanto pela equipe quanto pelo gerente Estudos indicam que esse tipo de organização é 0 mais produtivo.

A composição da equipe pode ter como núcleo desenvolvedores com experiência (sênior) , pessoal técnico engenheiros substitutos. Além disso; deve-se especificar 0 pessoal auxiliar, como especialistas; pessoal de apoio e bibliotecário-

4.3.3 Programação de projeto A programação de projeto tem como objetivo organizar a atividades de desenvolvimento em uma seqüência coerente. 0 objetivo dessa organização é equilibrar recursos de pesso- al, hardware software, de maneira que sejam usados da melhor forma possível. Depois de estimados os recursos necessários para projeto de software, cronograma do projeto especifica como e quando esses recursos devem estar disponíveis.  Além disso; deve-se especi - ficar, também; quem será responsável pelas atividades do ciclo de vida do sistema.  Segundo DeMarco [DEM 82], a determinação de um cronograma para projeto de software pode ser vista a partir de duas perspectivas:

1) Uma data final para entrega do sistema já foi estabelecida de forma irrevogável- Nesse caso, esforço deverá ser distribuído dentro desse espaço de tempo. 2) Limites cronológicos aproximados são discutidos; mas a data final para entrega estabelecida pela equipe de engenharia de software. 0 esforço é distribuído para se tirar 0 melhor proveito dos recursos, e uma data final é definida após cuidadosa análise.

fixação de prazos para projetos tenta responder a uma série de perguntas Por exemplo: como se relaciona 0 tempo cronológico com esforço humano?   Quais tarefas paralelismos devem ser esperados?   Quais marcos de referência podem ser usados para mostrar 0 progres- s0? Como esforço é distribuído ao longo do processo de engenharia de software?   Existem

## Página 17

132

Introdução à Engenharia de Softwore

métodos disponíveis para determinação de prazos? Como representar fisicamente CrOnO - grama e como rastrear 0 progresso? cronograma do projeto envolve a divisão do trabalho total do projeto em atividades separadas , com estimativas do tempo necessário para completar cada uma dessas atividades. Usualmente; algumas dessas atividades são realizadas paralelamente. 0 cronograma do pro- jeto deve coordenar essas atividades paralelas e organizar 0 trabalho de forma que esforço seja aplicado adequadamente:  Deve-se considerar que todo estágio de desenvolvimento está sujeito a problemas; que trabalhadores individuais podem falhar ou se afastar do projeto; que hardware pode quebrar que 0 suporte de software hardware pode não estar disponível quando necessário. 0 cronograma do projeto é usualmente representado como um conjunto de diagramas mostrando a divisão do trabalho, dependência entre atividades alocação da equipe. Ele pode ser gerado automaticamente; partir do banco de dados do projeto; utilizando-se uma ferramenta automatizada para gerenciamento de projetos. Informações como as listadas na Tabela 4.6 serão necessárias para a elaboração do cronograma. Essa tabela se refere às atividades envolvidas na implementação e teste do sistema de venda de sementes € apresenta uma estimativa de tempo para cada atividade (tarefa) € a precedência desejada entre elas.

Tarefa Descrição Semanas É precedida por 1-3 Criar telas 3 nenhuma 3-4 Implementar cadastrar cliente 5 A e G ! 3-6 Implementar estoque matéria-prima 5 A e G 3-7 Implementar estoque produto A G 4-8 Implementar verificar crédito 3 B 1-2 Criar banco de dados 5 nenhuma 2-3 Inicializar base de dados teste 1 7-11 Implementar guia de busca 9 6-10 Implementar comprar matéria-prima 5 ; 8-12 Implementar controlar pedidos 4 3-5 Implementar controlar contas a receber 3 G 1 9-9Zmpllmneenan compo @tstas de produto 5 12-13 Integrar subsistema vendas 4 ! e N 10-13 Integrar subsistema estoque 3 11-13 Integrar subsistema produção 3 13-14 Realizar teste do sistema 4 P e Q Tabela 4.6: Tarefas para implementação; integração e teste do sistema.

diagrama PERT /CPM; visto no capítulo 3, pode ser utilizado para representar 0 CIO- nograma referente aos dados da Tabela 4.6. A Figura 4.1 representa todas as informações

## Página 18

Ariadne M. B. Rizzoni Carvalho Thelma C. dos Santos Chiossi

133

da tabela, além das folgas, tempo mais cedo tempo mais tarde de cada atividade. Pelo diagrama é possível saber quais sã0 as atividades do caminho crítico (F, G, D, H; Q, R). Essas atividades têm folga igual a zero; assim, elas não podem ser   atrasadas para que projeto seja realizado em 27 semanas .

11

E, 3

14

B,5. (1) L, 3

A, 3

12

15

(1)

18 12 19

(3)

N,3 (2)

M

14 16

0,

F,5 (0)

(0)

11

C, 4 (5)

R, 27 23 14 P,3 13 (0) 27 23

10

1,5 (5)

15 10 20

15

(0)

1l

H,9

20 20

11

(0)

Figura 4.1: PERT /CPM para sistema de venda de sementes

Como já foi visto no capítulo 3, outra maneira de expor 0 relacionamento entre recursos tarefas é 0 diagrama de barras ou gráfico de Gantt. Para cada atividade, esse diagrama indica data prevista de início e de término e a pessoa responsável pela atividade. 0 diagrama de barras pode especificar duração de cada tarefa (atividade) 0 que será feito 0 executor de cada tarefa - Pode ser usado para controle do projeto marcando-se tempo estimado e 0 tempo gasto em cada tarefa. Pode ser utilizado; também, para registrar 0 acompanhamento do projeto, acrescentando-se a0 diagrama um outro tipo de barra, que representa as datas de início e término reais da atividade. A Figura 4.2 apresenta diagrama de barras do gistema de venda de sementes; correspondente a0s dados da Tabela 4.6. Pode-se observar que da sexta até a décima oitava semana deve-se alocar a maior parte dos recursos para que 0 projeto termine no prazo. Se não houver recursos suficientes para cobrir esse cronograma, por exemplo; se forem alocados programadores em número insuficiente; será necessário recalcular tempo.

4.4 Comentários fnais

Grande parte do trabalho envolvido no planejamento de sistemas de software depende da obtenção de dados quantitativos sobre produto e 0 processo; dessa forma, 0 sucesso do projeto de construção do produto de software depende da obtenção registro correto dos requisitos do sistema, além da manutenção de um banco de dados com informações sobre

## Página 19

134

Introdução à Engenharia de Software

Pessoas | Mar . Abr Maio Jun Jul Ago. Set. Out. Figura 4.2: Diagrama de barras para 0 sistemna de venda de sementes.

projetos passados. estabelecimento do plano do projeto é um processo iterativo que deve convergir para valores próximos dos reais quando 0 projeto 8e aproxima da data de entrega. Quando se utilizam modelos para planejamento de projetos; fca evidente que seria extre- mamente útil que esses modelos fossem construídos utilizando-se ferramentas computadori- zadas. Entre outros motivos, pode-se considerar fato de que 0 planejamento é um processo iterativo e, conseqüentemente;   requer   revisões constantes reorganização do cronograma. Os gráficos devem ser refeitos periodicamente e, além disso; todos os modelos utilizados no desenvolvimento do sistema devem poder se relacionar-

4.5 Exercícios

1) Uma empresa de desenvolvimento de software foi contratada para construir um software para um sistema de segurança residencial. Liste as atividades que ela deverá realizar para elaborar 0 plano inicial do projeto.

2) Uma indústria farmacêutica está planejando e especificando os requisitos de um siste- ma em tempo real para controle de um processo químico. A tabela seguir mostra as atividades para as fases de planejamento extração de requisitos, com duração expressa emn semanas .

## Página 20

Ariadne M. B_ Rizzoni Carvalho Thelma C. dos Santos Chiossi

135

Ativ _ Descrição Duração 1-2 Levantamento das necessidades do usuário 1-3 Análise funcional 5 1-4 Estudo de um modelo 2 5 2-3 Especificação dos requisitos do usuário 8 € 2-5 Análise de requisitos 6 3-6 Desenvolvimento do modelo funcional 5 3-7 Desenvolvimento do modelo de dados 5 1 4-3 Desenvolvimento d0 modelo de comportamento 1 1 5-8 Elaboração do plano de desenvolvimento 5 5 5-9 Revisão dos requisitos 3 K 6-10 Validação do modelo funcional 2 7-10 Validação do modelo de dados 1 8-11 Validação do modelo de comportamento 3 9-11 Verificação dos requisitos 3 10-11 Verificação do plano de desenvolvimento

(a) Desenbe 0 diagrama PERT determinando os tempos mais cedo e mais tarde; assim como 0 caminho crítico. (b) que aconteceria se tempo de duração da atividade "desenvolvimento do mo- delo funcional (3-6)" fosse reduzido para quatro semanas? E para três semanas? E para duas semanas?

3) Desenvolva um diagrama de barras para 0 problema da questão anterior. Considerando a8 estimativas de tamanho para a alternativa 2 do sistema de venda de sementes, apresentadas na Tabela 4.1, 0 custo de $ 0,80 por linha de código e a produtividade média de 360 LOG /pm, resolva as seguintes questões:

(a) Para qual função estimador apresentou maior grau de incerteza na estimativa de tamanho? (b) Estime 0 esforço (pm) necessário para cada função e 0 esforço total para desen - volvimento do sistema . (c) Estime custo monetário para desenvolvimento do sistema (d) tamanho esperado de cada função da Tabela 4.1 foi calculado utilizando-se média ponderada: Se a técnica PERT em sua forma mais simplificada fosse utili- zada, qual seria 0 custo do sistema?

5) Usando a tabela de estimativa de esforço; ª seguir; para cada fase de desenvolvimento considerando a taxa de mão-de-obra dada por pessoas-mês esforço dado pOr pessoas- -mêS, resolva as questões que se seguem.

## Página 21

136

Introdução à Engenharia_de Sottware

(a) Em que fase ge estima que esforço será maior? (b)  Compare 0 resultado obtido com 0 da questão anterior. As estimativas convergem para 0 mnesmo resultado? Pode-se concluir que as estimativas estejam corretas?

Funções Análise (pm Projeto pm_ Implem. pm Teste pm FI 0,5 1,0 2,4 2,1 F2 1,0 2,5 5,5 5,0 F3 0,5 1,3 2,7 2,6 F4 1,2 3,0 6,8 6,0 F5 0,3 0,8 2,0 1,8 F6 0,5 1,3 2,6 2,5 Taxa 400,00 360,00 250,00 280,00

Suponha que uma empresa de software esteja avaliando a possibilidade de desenvolver um software que vai concorrer com alguns outros similares disponíveis no mercado Sabe-se que 12.000, 17.500 e 21.300 8ã0, respectivamente, 98 estimativas otimista; mais provável pessimista para número de linhas do sistema. Sabe-se também que número médio de erros nesse tipo de sistema é de um erro cada 1.250 linhas de código (após & entrega do sistema)  Considerando que pa empresa 0 custo por linha de código é de $ 1,70 e que a produtividade é de 73 LOC/pm:

(a) Estime custo; 0 esforço e 0 número de erros esperados. (b) Estime 0 número de pacotes /mês preço unitário para venda do produto; de forma que 0 investimento seja recuperado em três anos. Sabe-se que preço' de seus concorrentes é, em média, $ 71,00.

Considere a8 funções para 0 sistema de venda de sementes como listadas no exercício 5. Considere, também; que sejam propostas as seguintes alternativas de solução para problema:

Solução 1: implementar apenas as funções Fl, F2 , F4 e F6, Solução 2: implementar apenas as funções Fl, F2, F3, F4 e F6. Solução 3: implementar todas as funções. (a) Calcule 0 custo do projeto para cada solução. (b) Considerando número máximo de seis pessoas trabalhando a0 mesmo tempo no projeto, estime tempo necessário para entrega do produto para cada solução. (c) Se 0 recurso for de $ 13.000,00, qual será melhor solução? (d)   Qual será a melhor solução se os recursos forem irrestritos mas 0 tempo não puder ultrapassar um mês?

## Página 22

Ariadne M. B. Rizzoni Carvalho e Thelma C. dos Santos Chiossi

137

8 Uma empresa de exportação deve decidir entre desenvolver ou comprar um software para controle de seu sistema de remessas. Sabe-se que existem pessoas  disponíveis para realizar trabalho; que projetos desenvolvidos na empresa têm custo médio de $ 1,60/LOC e que 0 custo de um pacote é de $ 2.+ 500,00.

(a)  Que estimativas a empresa deveria considerar antes de decidir entre desenvolver ou comprar? (b) Em quais casos seria melhor comprar e em quais seria melhor desenvolver?

9) Sabendo-se que investimento num sistema é de $ 14.200,00 e que a economia mensal está estimada em 8 560,00 com sua implantação; resolva:

(a) Calcule 0 tempo (em anos) necessário para 0 retorno do investimento. (b) Esse sistema é economicamente viável? Por quê? (c) Considerando que seja estimada uma vida útil de quatro anos para esse sistema; ele geraria algum lucro?
