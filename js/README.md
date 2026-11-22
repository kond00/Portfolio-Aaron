# Portfólio Web - Aaron Dai Kondo
## O que foi usado
- eu usei HTML5 e CSS3 (para deixar a estrutura e o design escuro)
- JavaScript (para a lógica do formulário quando enviarem algo e do painel admin)
- Bootstrap 5 (para deixar o site funcionando e não quebrar no celular)
- Google Fonts e Bootstrap Icons (para as fontes e ícones)

## Mensagem para o e-mail
Para o formulário realmente enviar e-mail, eu usei a API do Formspree que me recomendaram. O JavaScript pega os dados do formulário, salva no LocalStorage e envia um fetch para o link do Formspree. Testei e o e-mail chega normal na caixa de entrada pra mim no email e pelo site.

## Como acessar o Painel Oculto
Fiz para aparecer só de clicar no botão que tem um ícone de terminal no canto inferior direito da tela pois meu navegador o brave nao estava funcionando com comandos. 
Lá dentro tem a lista de todas as mensagens recebidas, com a opção de excluir qualquer uma. O sistema também cria 20 mensagens de teste automaticamente quando a página é aberta pela primeira vez, caso o LocalStorage esteja vazio.

## Como rodar
Só precisa abrir o arquivo `index.html` no navegador, ou usar a extensão Live Server no VS Code.