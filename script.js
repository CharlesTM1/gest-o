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

    }
});
