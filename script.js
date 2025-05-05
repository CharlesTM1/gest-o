document.addEventListener('DOMContentLoaded', function() {
    const formEvento = document.getElementById('form-evento');
    const listaEventos = document.getElementById('eventos');

    formEvento.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        const nome = document.getElementById('nome').value;
        const data = document.getElementById('data').value;
        const local = document.getElementById('local').value;

        if (nome && data && local) {
            const novoEvento = document.createElement('li');
            novoEvento.textContent = `${nome} - ${formatarData(data)} - ${local}`;
            listaEventos.appendChild(novoEvento);

            // Limpa o formulário após adicionar o evento
            formEvento.reset();
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });

    function formatarData(data) {
        const partes = data.split('-');
        return `${partes[2]}/${partes[1]}/${partes[0]}`;
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const formEvento = document.getElementById('form-evento');
    const listaEventos = document.getElementById('eventos');
    const notificacoesContainer = document.createElement('div');
    notificacoesContainer.id = 'notificacoes-container';
    document.body.appendChild(notificacoesContainer);

    formEvento.addEventListener('submit', function(event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const data = document.getElementById('data').value;
        const local = document.getElementById('local').value;

        if (nome && data && local) {
            const novoEvento = document.createElement('li');
            novoEvento.textContent = `${nome} - ${formatarData(data)} - ${local}`;
            listaEventos.appendChild(novoEvento);

            exibirNotificacao('Evento "' + nome + '" adicionado com sucesso!', 'success');
            formEvento.reset();
        } else {
            exibirNotificacao('Por favor, preencha todos os campos.', 'error');
        }
    });

    function formatarData(data) {
        const partes = data.split('-');
        return `${partes[2]}/${partes[1]}/${partes[0]}`;
    }

    function exibirNotificacao(mensagem, tipo = 'info') {
        const notificacao = document.createElement('div');
        notificacao.classList.add('notificacao', tipo);
        notificacao.textContent = mensagem;
        notificacoesContainer.appendChild(notificacao);

        // Remove a notificação após alguns segundos
        setTimeout(() => {
            notificacao.remove();
        }, 5000); // 5000 milissegundos = 5 segundos
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const formEvento = document.getElementById('form-evento');
    const listaEventos = document.getElementById('eventos');

    // Solicita permissão para exibir notificações (deve ser feito na interação do usuário)
    if ('Notification' in window) {
        Notification.requestPermission().then(function(permission) {
            console.log('Permissão de notificação:', permission);
        });
    }

    formEvento.addEventListener('submit', function(event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const data = document.getElementById('data').value;
        const local = document.getElementById('local').value;

        if (nome && data && local) {
            const novoEvento = document.createElement('li');
            novoEvento.textContent = `${nome} - ${formatarData(data)} - ${local}`;
            listaEventos.appendChild(novoEvento);

            exibirNotificacaoNativa('Evento "' + nome + '" adicionado!', { body: `Data: ${formatarData(data)}, Local: ${local}` });
            formEvento.reset();
        } else {
            exibirNotificacaoNativa('Por favor, preencha todos os campos.', { });
        }
    });

    function formatarData(data) {
        const partes = data.split('-');
        return `${partes[2]}/${partes[1]}/${partes[0]}`;
    }

    function exibirNotificacaoNativa(titulo, opcoes = {}) {
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(titulo, opcoes);
        } else if ('Notification' in window && Notification.permission !== 'denied') {
            Notification.requestPermission().then(function(permission) {
                if (permission === 'granted') {
                    new Notification(titulo, opcoes);
                }
            });
        }
        // Se as notificações não são suportadas ou a permissão foi negada,
        // você pode usar a abordagem de notificação na tela como fallback.
        // else {
        //     exibirNotificacao(titulo, 'info');
        // }
    }
});
