document.getElementById("form").addEventListener('submit', function (event){
    event.preventDefault()
    var nomeForm = document.getElementById("nome").value
    var emailForm = document.getElementById("email").value
    var telefoneForm = document.getElementById("telefone").value
    var senhaForm = document.getElementById("senha").value
    var confirmar_senha = document.getElementById("confirmar-senha").value

    var validar = validaSenha(senhaForm,confirmar_senha)

    if(validar==false){
        window.alert("senha não corresponde")
    }

    const usuario = {
        nome: nomeForm,
        email: emailForm,
        telefone: telefoneForm,
        senha: senhaForm
    }

    db.adicionarUsuario(usuario)
    .then((message) => {
        console.log(message); // Usuário adicionado com sucesso
    })
    .catch((error) => {
        console.error(error); // Erro ao adicionar usuário
    });
    console.log(db.buscarUsuario(1))
})

function validaSenha (senha, confirmar_senha){
    return senha == confirmar_senha
}