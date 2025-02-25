document.addEventListener("DOMContentLoaded", function () {
    let form = document.getElementById("form"); // ✅ Certifique-se de que o ID está correto
    if (!form) {
        console.error("Erro: Formulário não encontrado!");
        return;
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Evita o recarregamento da página

        let nomeForm = document.getElementById("nome").value;
        let emailForm = document.getElementById("email").value;
        let telefoneForm = document.getElementById("telefone").value;
        let senhaForm = document.getElementById("senha").value;
        let confirmarSenha = document.getElementById("confirmar-senha").value;

        if (!validaSenha(senhaForm, confirmarSenha)) {
            window.alert("Senha não corresponde");
            return; // Para a execução se as senhas forem diferentes
        }

        const usuario = {
            nome: nomeForm,
            email: emailForm,
            telefone: telefoneForm,
            senha: senhaForm
        };

        if (typeof db === "undefined") {
            console.error("Erro: 'db' não está definido.");
            return;
        }

        db.adicionarUsuario(usuario)
            .then((message) => {
                console.log(message); // Usuário adicionado com sucesso
                // ✅ Redirecionar após sucesso
                window.location.href = "../view/LOGIN.HTML";
            })
            .catch((error) => {
                console.error(error); // Erro ao adicionar usuário
            });
    });
});

function validaSenha(senha, confirmarSenha) {
    return senha === confirmarSenha;
}



document.addEventListener("DOMContentLoaded", function () {
    let form = document.getElementById("login-form"); 
    if (!form) {
        console.error("Erro: Formulário de login não encontrado!");
        return;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let emailForm = document.getElementById("email").value;
        let senhaForm = document.getElementById("senha").value;

        if (typeof db === "undefined") {
            console.error("Erro: 'db' não está definido.");
            return;
        }
        db.verificarUsuario(emailForm, senhaForm)
            .then((usuario) => {
                if (usuario) {
                    console.log("Login bem-sucedido!");
                    window.location.href = "../view/LOGIN.HTML"; 
                } else {
                    window.alert("Email ou senha incorretos.");
                }
            })
            .catch((error) => {
                console.error("Erro ao verificar usuário:", error);
            });
    });
});

function verificarUsuario(emailForm, senhaForm) {
    return usuario.senha === senhaHash;
}