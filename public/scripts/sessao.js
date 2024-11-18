// Função para verificar se o usuário está logado
function verificarSessao() {
    const userId = sessionStorage.getItem('id_usuario');
    
    
    if (!userId) {
      // Se não houver ID de usuário na sessão, redirecionar para a página de login
      window.location.href = '/login.html';
    } else {
      // Se estiver logado, verificaremos se ele é administrador. Caso seja, adicionaremos a opção das dashboards na navbar
      const adm = sessionStorage.getItem('adm');
      if (adm) {
        // elemento da navbar
        const opcoes = document.getElementById("opcoes");
        opcoes.innerHTML += `<li><a href="dashboard/dashboard.html">Dashboard</a></li>`;
        
      } 
    }
  }
  
  document.addEventListener('DOMContentLoaded', verificarSessao);
  