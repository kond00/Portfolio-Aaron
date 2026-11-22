// 1. Cria as 20 mensagens de teste se o banco local estiver vazio
function inicializarLocalStorage() {
    if (!localStorage.getItem('mensagens_contato')) {
        let mensagensTeste = [];
        for (let i = 1; i <= 20; i++) {
            mensagensTeste.push({
                id: Date.now() + i,
                data: new Date().toLocaleString('pt-BR'),
                nome: `Visitante Teste ${i}`,
                email: `teste${i}@exemplo.com`,
                mensagem: `Mensagem de teste ${i} para validação do avaliador.`
            });
        }
        localStorage.setItem('mensagens_contato', JSON.stringify(mensagensTeste));
    }
}
inicializarLocalStorage();

// 2. Abre o painel quando clica no botão do terminal
document.getElementById('secretBtn').addEventListener('click', function() {
    document.getElementById('adminPanel').style.display = 'block';
    carregarTabela();
});

// 3. Fecha o painel
function fecharAdmin() {
    document.getElementById('adminPanel').style.display = 'none';
}

// 4. Carrega a tabela com as mensagens
function carregarTabela() {
    const tbody = document.getElementById('tabelaMensagens');
    tbody.innerHTML = '';
    let mensagens = JSON.parse(localStorage.getItem('mensagens_contato')) || [];

    mensagens.forEach((msg, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${msg.data}</td>
            <td>${msg.nome}</td>
            <td>${msg.email}</td>
            <td>${msg.mensagem}</td>
            <td>
                <button class="btn btn-sm btn-outline-danger" onclick="excluirMensagem(${index})"><i class="bi bi-trash"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// 5. Exclui a mensagem
function excluirMensagem(index) {
    if (confirm('Tem certeza que deseja excluir esta mensagem?')) {
        let mensagens = JSON.parse(localStorage.getItem('mensagens_contato')) || [];
        mensagens.splice(index, 1);
        localStorage.setItem('mensagens_contato', JSON.stringify(mensagens));
        carregarTabela();
    }
}

// 6. Envio do formulário (INTEGRADO COM FORMSPREE)
document.getElementById('formContato').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const novaMsg = {
        id: Date.now(),
        data: new Date().toLocaleString('pt-BR'),
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        mensagem: document.getElementById('mensagem').value
    };

    // Salva no navegador
    let mensagens = JSON.parse(localStorage.getItem('mensagens_contato')) || [];
    mensagens.unshift(novaMsg); 
    localStorage.setItem('mensagens_contato', JSON.stringify(mensagens));

    // ENVIA O E-MAIL REAL (Seu link do Formspree abaixo)
    fetch('https://formspree.io/f/xkjrpgbz', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            nome: novaMsg.nome,
            email: novaMsg.email,
            mensagem: novaMsg.mensagem
        })
    }).then(response => {
        console.log("Notificação enviada com sucesso para o e-mail!");
    }).catch(error => {
        console.error("Erro ao enviar e-mail:", error);
    });

    this.reset();
    document.getElementById('alertaSucesso').classList.remove('d-none');
    setTimeout(() => document.getElementById('alertaSucesso').classList.add('d-none'), 4000);
    
    if (document.getElementById('adminPanel').style.display === 'block') {
        carregarTabela();
    }
});