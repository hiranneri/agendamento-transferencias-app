<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        <i class="bi bi-bank2 me-2"></i>
        Sistema de Transferências
      </router-link>
      
      <button 
        class="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link 
              class="nav-link" 
              to="/agendamentos"
              active-class="active"
            >
              <i class="bi bi-calendar-plus me-1"></i>
              Novo Agendamento
            </router-link>
          </li>
          <li class="nav-item">
            <router-link 
              class="nav-link" 
              to="/extrato"
              active-class="active"
            >
              <i class="bi bi-list-ul me-1"></i>
              Extrato
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style scoped>
.navbar {
  margin-bottom: 0;
}

.nav-link {
  font-weight: 500;
  transition: all 0.3s;
}

.nav-link:hover {
  transform: translateY(-2px);
}

.nav-link.active {
  font-weight: 600;
}
</style>