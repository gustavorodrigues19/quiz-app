var renderPages = function (pageName) {
    fetch("pages/".concat(pageName, ".html"))
        .then(function (resp) {
        if (!resp.ok) {
            throw new Error('Erro ao carregar a página');
        }
        return resp.text();
    })
        .then(function (html) {
        var rootElem = document.getElementById("root");
        if (rootElem) {
            rootElem.innerHTML = html;
            // Adicione um manipulador de eventos ao formulário
            var formStart = document.getElementById("form-start");
            if (formStart) {
                formStart.addEventListener("submit", function (event) {
                    event.preventDefault();
                    armazenarNome();
                });
            }
        }
        else {
            console.error('Elemento com ID "root" não encontrado.');
        }
    })
        .catch(function (error) {
        console.error('Erro durante a requisição fetch:', error);
    });
};
renderPages("start");
function armazenarNome() {
    var nomeUsuarioInput = document.getElementById('input-name');
    if (nomeUsuarioInput && nomeUsuarioInput.value.trim() !== '') {
        var nomeUsuario = nomeUsuarioInput.value;
        localStorage.setItem('usuario', nomeUsuario);
        // Exiba uma mensagem diretamente na página ou use uma abordagem mais amigável
        var mensagem_1 = criarMensagem('Nome armazenado com sucesso!');
        document.body.appendChild(mensagem_1);
        // Adiciona ouvinte de evento de clique à mensagem
        mensagem_1.addEventListener('click', function () {
            mensagem_1.remove(); // Remove a mensagem quando ela é clicada
        });
    }
    else {
        var mensagem_2 = criarMensagem('Por favor, digite seu nome antes de começar.');
        document.body.appendChild(mensagem_2);
        // Adiciona ouvinte de evento de clique à mensagem
        mensagem_2.addEventListener('click', function () {
            mensagem_2.remove(); // Remove a mensagem quando ela é clicada
        });
    }
}
function criarMensagem(texto) {
    var mensagem = document.createElement('div');
    mensagem.textContent = texto;
    mensagem.classList.add('alert-message'); // Adicione classes de estilo conforme necessário
    return mensagem;
}