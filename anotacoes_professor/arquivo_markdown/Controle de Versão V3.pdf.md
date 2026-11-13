Gestão de Projetos
Gerência de Configuração

Gerência de Configuração 2
• Produção de Software
• Atributos de um Bom Software
• Desafios-chave
da Engenharia de Software

| Engenharia de Software – | Ciclo de Vida | 3   |
| ------------------------ | ------------- | --- |

Atributos de um Bom Software 4
O software deve fornecer a funcionalidade e o desempenho requeridos para o
| usuário | e deve | ser manutenível, confiável | e aceitável. |
| ------- | ------ | -------------------------- | ------------ |

Qual o principal produto de uma empresa de software? 5
❑Documentos bonitos
❑Códigos fonte maravilhosos dignos de teses de doutorado
❑Reuniões sofisticadas
❑Escritórios suntuosos
❑X Um bom software capaz de atender aos usuários e seus
respectivos negócios.
Todo o resto é secundário,
mas não “irrelevante”.

Cenário da Produção de Software 6
• Popularização do hardware e independência do software.
• Sistemas de software cada vez mais complexos em relação ao
tamanho, sofisticação e tecnologias envolvidas.
• Equipes grandes separadas geograficamente.
• Necessidade de metodologias próprias, para o projeto de sistemas.
É necessário buscar como objetivo criar código corretos
e pensar em como fazer menos software.
Desenvolvimento de software de qualidade deve se
tornar uma questão de arquitetura, processos e
ferramentas.

“Promoção” de Software
“promoção”
“promoção”

Semântica do Versionamento
Exemplo do site da Microsoft
sobre versionamento do
Office
MAJOR.MINOR.PATCH
?

Semântica do Versionamento
Deve ser
correção do
MAJOR.MINOR.PATCH
erro do erro?
PATCH - versão de Correção:
quando corrigir falhas mantendo
compatibilidade.
MINOR - versão Menor: quando
adicionar funcionalidades mantendo
compatibilidade
MAJOR - versão Maior: quando fizer
mudanças incompatíveis
https://medium.com/whatsgooddev/a-import%C3%A2ncia-de-usar-vers%C3%B5es-atualizadas-de-software-ef744692a23a

Semântica do Versionamento - Exemplo
Estamos na versão 2.8.1
Se aparecer a “versão” 2.8.2 quer dizer que foi corrigida alguma falha
e a compatibilidade foi mantida.
Se aparecer a “versão” 2.9.0 quer dizer que existem novas features
compatíveis com a versão anterior.
Se aparecer a “versão” 3.0.0 quer dizer que temos novas features e
correções, mas aconteceram breaking changes, mudanças não
compatíveis com a versão anterior.
https://medium.com/whatsgooddev/a-import%C3%A2ncia-de-usar-vers%C3%B5es-atualizadas-de-software-ef744692a23a

Breaking Changes
• Incompatibilidade de features ou arquitetura vão acontecer.
• Dependendo da situação o usuário é forçado a aderir a nova versão (app
de bancos por exemplo).
• Para empresas desenvolvedores em algum momento um breaking
changes
terá que acontecer.
• Acompanhar novas tecnologias ou eliminar o impacto da manutenção
com features e arquiteturas antigas.
Exemplos: Sistemas Operacionais (Windows 7 descontinuado), Android, etc.)
https://medium.com/whatsgooddev/a-import%C3%A2ncia-de-usar-vers%C3%B5es-atualizadas-de-software-ef744692a23a

Ciclo de Vida do Versionamento de Software
1. Pre-Alpha Version
2. Alpha Version
3. Beta Version
4. Release Candidate
5. General Availability
6. Production Release
https://theproductmanager.com/topics/software-release-life-cycle/

Ciclo de Vida do Versionamento de Software
• Etapa focada no desenvolvimento do produto.
• Compreender as ações executadas durante o
desenvolvimento inicial antes do teste.
https://theproductmanager.com/topics/software-release-life-cycle/

Ciclo de Vida do Versionamento de Software
• A "versão alfa" é o software na primeira fase de teste.
• São testes integrados realizados internamente, ainda pela
equipe de desenvolvimento.
• Não se trata de uma versão para o cliente.
https://theproductmanager.com/topics/software-release-life-cycle/

Ciclo de Vida do Versionamento de Software
• A "versão beta" é aquele software que está testado pela
equipe interna e pode ser enviado para aceite.
• Conforme a estratégia do cliente pode ser oferecido para
avaliação por um grupo específico de usuários (Closed Beta)
ou para toda a comunidade (Opened Beta).
https://theproductmanager.com/topics/software-release-life-cycle/

Ciclo de Vida do Versionamento de Software
| • Pode-se dizer |               | que Release Candidate (RC) é uma |         |           |     |       | versão | que  |
| --------------- | ------------- | -------------------------------- | ------- | --------- | --- | ----- | ------ | ---- |
| já passou       | por avaliação |                                  | através | da versão |     | beta. |        |      |
•
| Pode     | ser também         | uma | versão | definitiva |                 | mas ainda | sujeita | a   |
| -------- | ------------------ | --- | ------ | ---------- | --------------- | --------- | ------- | --- |
| inclusão | de funcionalidades |     |        | (versão    | de lançamento). |           |         |     |
https://theproductmanager.com/topics/software-release-life-cycle/

Ciclo de Vida do Versionamento de Software
• General Availability (GA) indica uma versão pronta para uso
pelo público em geral.
• Começar campanhas de divulgação e comercialização fica
por conta da estratégia do cliente.
https://theproductmanager.com/topics/software-release-life-cycle/

Ciclo de Vida do Versionamento de Software
• Production Release é por vezes chamada de “stable”
(estável).
• Trata-se da versão final e definitiva que entra em um regime
de manutenção corretiva e evolutiva.
Operação continuada
Contrato de Manutenção
https://theproductmanager.com/topics/software-release-life-cycle/

Controle de Versão 19
Sistema que gerencia diferentes versões de um artefato, evitando
| sobreposições | e   | perdas. |     |     |     |     |     |     |     |
| ------------- | --- | ------- | --- | --- | --- | --- | --- | --- | --- |
➢Artefatos
|     | centralizados |     | em  | um  | repositório | e cópias | locais | para | cada |
| --- | ------------- | --- | --- | --- | ----------- | -------- | ------ | ---- | ---- |
desenvolvedor
Vantagens Repositório
✓Desenvolvimento independente
| ✓Histórico | de  | alterações |     |     |     |     |     | Dev |     |
| ---------- | --- | ---------- | --- | --- | --- | --- | --- | --- | --- |
Dev
Dev
| ✓Trilha | de Auditoria |     |     |     |     |     |     |     |     |
| ------- | ------------ | --- | --- | --- | --- | --- | --- | --- | --- |
✓Ramificação
|              |     | do projeto       | (baseline |     | e branches) |         |     |     |     |
| ------------ | --- | ---------------- | --------- | --- | ----------- | ------- | --- | --- | --- |
| ✓Recuperação |     | de configurações |           |     | em qualquer | momento |     |     |     |

| Controle de Versão – | Funcionamento Básico | 20  |
| -------------------- | -------------------- | --- |
Repositório
Check-out
Check-in
Dev

| Controle de Versão – | Funcionamento Básico | 21  |
| -------------------- | -------------------- | --- |
FONTE: http://www.devmedia.com.br/gerencia-de-configuracao-de-software/9145

| Controle de Versão – |     | Baseline e Branch |     |     |     |     | 22  |
| -------------------- | --- | ----------------- | --- | --- | --- | --- | --- |
| Baseline             |     | e Branch          |     |     |     |     |     |
Branch CorrecaoBugCliente
V1.0.1 V1.0.2
Baseline
|     | Release 1.0 |     | V1.1 | V1.2 | V1.3 | Release 2.0 |     |
| --- | ----------- | --- | ---- | ---- | ---- | ----------- | --- |

Controle de Versão –Softwares de Mercado 23
• Mais utilizado atualmente
• Desenvolvido por Linus Torvalds
• OpenSource
• Distribuído
• Maior Desempenho
• Surgiu como alternativa ao CVS
• Centralizado
• Maior controle de acesso

Controle de Versão - Versionamento
>_
arquivo1.c document2.doc classeA.java
1 1 1
2 2 2
3 3
4 4
5
6
Fonte: Prof. Misael Santos 2010

Controle de Versão - Ações
Fonte: Prof. Misael Santos 2010

Controle de Versão - Ações
Fonte: Prof. Misael Santos 2010

Controle de Versão - Ações
Fonte: Prof. Misael Santos 2010

Controle de Versão - Ações
Fonte: Prof. Misael Santos 2010

Controle de Versão - Ações
Fonte: Prof. Misael Santos 2010

| Controle de Versão – | Branching | (Ramificação) |
| -------------------- | --------- | ------------- |

Controle de Versão – Estratégias de Branching
Fonte: Prof. Misael Santos 2010

Controle de Versão – Estratégias de Branching
Fonte: Prof. Misael Santos 2010

Controle de Versão – Estratégias de Branching

Controle de Versão – Estratégias de Branching
Fonte: Prof. Misael Santos 2010

Controle de Versão – Estratégias de Branching

| Controle de Versão – | Estratégias de Branching | – “Não fazer” |
| -------------------- | ------------------------ | ------------- |
Fonte: Prof. Misael Santos 2010

| Controle de Versão – | Estratégias de Branching | – “Não fazer” |
| -------------------- | ------------------------ | ------------- |
Fonte: Prof. Misael Santos 2010