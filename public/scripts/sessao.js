// Função para verificar se o usuário está logado
function verificarSessao() {
    const userId = sessionStorage.getItem('id_usuario');
    
    if (!userId) {
      // Se não houver ID de usuário na sessão, redirecionar para a página de login
      window.location.href = '/login.html';
    }
  }
  
  document.addEventListener('DOMContentLoaded', verificarSessao);
  