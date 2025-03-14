// Função para abrir o banco de dados
function abrirBanco() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("mental_health", 1);

        request.onupgradeneeded = function(event) {
            const db = event.target.result;
            if (!db.objectStoreNames.contains("usuarios")) {
                db.createObjectStore("usuarios", { keyPath: "id" });
            }
            if (!db.objectStoreNames.contains("psicologos")) {
                db.createObjectStore("psicologos", { keyPath: "id" });
            }
            if (!db.objectStoreNames.contains("agendamentos")) {
                db.createObjectStore("agendamentos", { keyPath: "id" });
            }
        };

        request.onsuccess = function(event) {
            resolve(event.target.result);
        };

        request.onerror = function(event) {
            reject("Erro ao abrir o banco de dados: " + event.target.errorCode);
        };
    });
}

// Função para adicionar um usuário
function adicionarUsuario(usuario) {
    return new Promise(async (resolve, reject) => {
        try {
            // Garantir que o ID seja gerado automaticamente, caso não seja fornecido
            if (!usuario.id) {
                usuario.id = new Date().getTime(); // Gerando um ID único usando o timestamp
            }

            const db = await abrirBanco();
            const transaction = db.transaction(["usuarios"], "readwrite");
            const store = transaction.objectStore("usuarios");

            const request = store.add(usuario);

            request.onsuccess = function() {
                resolve("Usuário adicionado com sucesso!");
            };

            request.onerror = function() {
                reject("Erro ao adicionar usuário: " + request.error);
            };
        } catch (error) {
            reject(error);
        }
    });
}

// Função para buscar um usuário pelo ID
function buscarUsuario(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await abrirBanco();
            const transaction = db.transaction(["usuarios"], "readonly");
            const store = transaction.objectStore("usuarios");
            const request = store.get(id);

            request.onsuccess = function() {
                if (request.result) {
                    resolve(request.result);
                } else {
                    reject("Usuário não encontrado.");
                }
            };

            request.onerror = function() {
                reject("Erro ao buscar usuário: " + request.error);
            };
        } catch (error) {
            reject(error);
        }
    });
}


function adicionarPsicologo(nome,telefone,area,cidade,avaliacao,imagem) {
    return new Promise(async (resolve, reject) => {
        try {
            const psicologo={
                nome:nome,
                telefone:telefone,
                area:area,
                cidade:cidade,
                avaliacao:avaliacao,
                imagem:imagem,
            }
            // Garantir que o ID seja gerado automaticamente, caso não seja fornecido
            if (!psicologo.id) {
                psicologo.id = new Date().getTime(); // Gerando um ID único usando o timestamp
            }

            const db = await abrirBanco();
            const transaction = db.transaction(["psicologos"], "readwrite");
            const store = transaction.objectStore("psicologos");

            const request = store.add(psicologo);

            request.onsuccess = function() {
                resolve("Usuário adicionado com sucesso!");
            };

            request.onerror = function() {
                reject("Erro ao adicionar usuário: " + request.error);
            };
        } catch (error) {
            reject(error);
        }
    });
}

function buscarPsicologo(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await abrirBanco();
            const transaction = db.transaction(["psicologos"], "readonly");
            const store = transaction.objectStore("psicologos");
            const request = store.get(id);

            request.onsuccess = function() {
                if (request.result) {
                    resolve(request.result);
                } else {
                    reject("Psicologo não encontrado.");
                }
            };

            request.onerror = function() {
                reject("Erro ao buscar psicologo: " + request.error);
            };
        } catch (error) {
            reject(error);
        }
    });
}
//login
function verificarUsuario(email, senha) {
    return new Promise((resolve, reject) => {
        const tx = db.transaction("usuario", "readonly");
        const store = tx.objectStore("usuario");
        const request = store.get(email);
        request.onsuccess = function() {
            const usuario = request.result;
            if (usuario) {
                hashSenha(senha).then((senhaHash) => {
                    if (usuario.senha === senhaHash) {
                        resolve("Login bem-sucedido!");
                    } else {
                        reject("Email ou senha incorretos!");
                    }
                });
            } else {
                reject("Usuário não encontrado!");
            }
        };
        request.onerror = function() {
            reject("Erro ao buscar usuário.");
        };
    });
 }

// Exportando as funções
window.db = {
    adicionarUsuario,
    buscarUsuario,
    adicionarPsicologo,
    buscarPsicologo,
    verificarUsuario
};
