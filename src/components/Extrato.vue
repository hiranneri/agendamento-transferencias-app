<template>
  <div class="card shadow-sm">
    <div class="card-header bg-primary text-white">
      <h5 class="mb-0">
        <i class="bi bi-list-ul me-2"></i>
        Extrato de Transferências
      </h5>
    </div>
    
    <div class="card-body">
      <!-- Loading -->
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Carregando...</span>
        </div>
        <p class="mt-3 text-muted">Carregando extrato...</p>
      </div>

      <!-- Sem Dados -->
      <div v-else-if="!transferencias.length" class="text-center py-5">
        <i class="bi bi-inbox display-1 text-muted"></i>
        <p class="mt-3 text-muted">Nenhuma transferência agendada ainda.</p>
        <router-link to="/agendamentos" class="btn btn-primary">
          <i class="bi bi-plus-lg me-2"></i>
          Criar Agendamento
        </router-link>
      </div>

      <!-- Tabela -->
      <div v-else>
        <div class="table-responsive">
          <table class="table table-hover align-middle">
            <thead class="table-light">
              <tr>
                <th>ID</th>
                <th>Conta Origem</th>
                <th>Conta Destino</th>
                <th>Valor</th>
                <th>Taxa</th>
                <th>Data Transferência</th>
                <th>Data Agendamento</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in transferencias" :key="item.id">
                <td>
                  <span class="badge bg-secondary">#{{ item.id }}</span>
                </td>
                <td>
                  <code>{{ formatarConta(item.contaOrigem) }}</code>
                </td>
                <td>
                  <code>{{ formatarConta(item.contaDestino) }}</code>
                </td>
                <td>
                  <strong class="text-primary">
                    {{ formatarMoeda(item.valorTransferencia) }}
                  </strong>
                </td>
                <td>
                  <span class="badge bg-warning text-dark">
                    {{ formatarMoeda(item.taxa) }}
                  </span>
                </td>
                <td>
                  <i class="bi bi-calendar-event me-1"></i>
                  {{ formatarData(item.dataTransferencia) }}
                </td>
                <td>
                  <i class="bi bi-clock me-1"></i>
                  {{ formatarData(item.dataAgendamento) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Paginação -->
        <nav aria-label="Navegação de páginas" v-if="totalPages > 1">
          <ul class="pagination justify-content-center mt-4">
            <!-- Botão Anterior -->
            <li class="page-item" :class="{ disabled: currentPage === 0 }">
              <button 
                class="page-link" 
                @click="mudarPagina(currentPage - 1)"
                :disabled="currentPage === 0"
              >
                <i class="bi bi-chevron-left"></i>
                Anterior
              </button>
            </li>

            <!-- Números das páginas -->
            <li 
              v-for="page in paginasVisiveis" 
              :key="page"
              class="page-item"
              :class="{ active: page === currentPage }"
            >
              <button 
                class="page-link" 
                @click="mudarPagina(page)"
              >
                {{ page + 1 }}
              </button>
            </li>

            <!-- Botão Próximo -->
            <li 
              class="page-item" 
              :class="{ disabled: currentPage === totalPages - 1 }"
            >
              <button 
                class="page-link" 
                @click="mudarPagina(currentPage + 1)"
                :disabled="currentPage === totalPages - 1"
              >
                Próximo
                <i class="bi bi-chevron-right"></i>
              </button>
            </li>
          </ul>
        </nav>

        <!-- Info da Paginação -->
        <div class="text-center text-muted mt-3">
          <small>
            Mostrando {{ (currentPage * pageSize) + 1 }} - 
            {{ Math.min((currentPage + 1) * pageSize, totalElements) }} 
            de {{ totalElements }} registros
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TransferenciaService from '../services/TransferenciaService'

export default {
  name: 'ExtratoTable',
  data() {
    return {
      transferencias: [],
      loading: false,
      currentPage: 0,
      pageSize: 10,
      totalPages: 0,
      totalElements: 0
    }
  },
  computed: {
    paginasVisiveis() {
      const paginas = []
      const maxPaginas = 5
      let inicio = Math.max(0, this.currentPage - 2)
      let fim = Math.min(this.totalPages, inicio + maxPaginas)
      
      if (fim - inicio < maxPaginas) {
        inicio = Math.max(0, fim - maxPaginas)
      }
      
      for (let i = inicio; i < fim; i++) {
        paginas.push(i)
      }
      
      return paginas
    }
  },
  methods: {
    async carregarExtrato() {
      this.loading = true
      
      try {
        const response = await TransferenciaService.listarExtrato(
          this.currentPage,
          this.pageSize
        )
        
        this.transferencias = response.data.content
        this.totalPages = response.data.totalPages
        this.totalElements = response.data.totalElements
        
      } catch (error) {
        console.error('Erro ao carregar extrato:', error)
        alert('Erro ao carregar extrato. Verifique se a API está rodando.')
      } finally {
        this.loading = false
      }
    },
    
    mudarPagina(novaPagina) {
      if (novaPagina >= 0 && novaPagina < this.totalPages) {
        this.currentPage = novaPagina
        this.carregarExtrato()
      }
    },
    
    formatarMoeda(valor) {
      return TransferenciaService.formatarMoeda(valor)
    },
    
    formatarData(data) {
      return TransferenciaService.formatarData(data)
    },
    
    formatarConta(conta) {
      // Formato: 1234-567890
      return conta.slice(0, 4) + '-' + conta.slice(4)
    }
  },
  mounted() {
    this.carregarExtrato()
  }
}
</script>

<style scoped>
.card {
  border: none;
  border-radius: 10px;
}

.card-header {
  border-radius: 10px 10px 0 0 !important;
}

.table {
  margin-bottom: 0;
}

.table thead th {
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.85rem;
  color: #495057;
  border-bottom: 2px solid #dee2e6;
}

.table tbody tr {
  transition: all 0.2s;
}

.table tbody tr:hover {
  background-color: #f8f9fa;
  transform: scale(1.01);
}

code {
  font-size: 0.9rem;
  color: #6c757d;
  background-color: #f8f9fa;
  padding: 2px 6px;
  border-radius: 4px;
}

.pagination {
  margin-bottom: 0;
}

.page-link {
  color: #0d6efd;
  border: 1px solid #dee2e6;
}

.page-link:hover {
  background-color: #e9ecef;
}

.page-item.active .page-link {
  background-color: #0d6efd;
  border-color: #0d6efd;
}

.badge {
  font-weight: 500;
  padding: 0.5em 0.75em;
}
</style>