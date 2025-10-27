<template>
  <div class="card shadow-sm">
    <div class="card-header bg-primary text-white">
      <h5 class="mb-0">
        <i class="bi bi-calendar-plus me-2"></i>
        Novo Agendamento de Transferência
      </h5>
    </div>
    
    <div class="card-body">
      <!-- Alert de Sucesso -->
      <div 
        v-if="showSuccessAlert" 
        class="alert alert-success alert-dismissible fade show" 
        role="alert"
      >
        <i class="bi bi-check-circle-fill me-2"></i>
        Transferência agendada com sucesso!
        <button 
          type="button" 
          class="btn-close" 
          @click="showSuccessAlert = false"
        ></button>
      </div>

      <!-- Alert de Erro -->
      <div 
        v-if="showErrorAlert" 
        class="alert alert-danger alert-dismissible fade show" 
        role="alert"
      >
        <i class="bi bi-exclamation-triangle-fill me-2"></i>
        {{ errorMessage }}
        <button 
          type="button" 
          class="btn-close" 
          @click="showErrorAlert = false"
        ></button>
      </div>

      <form @submit.prevent="agendar">
        <div class="row">
          <!-- Conta de Origem -->
          <div class="col-md-6 mb-3">
            <label for="contaOrigem" class="form-label">
              Conta de Origem *
            </label>
            <input
              type="text"
              class="form-control"
              id="contaOrigem"
              v-model="transferencia.contaOrigem"
              placeholder="0000000000"
              maxlength="10"
              required
              :class="{ 'is-invalid': errors.contaOrigem }"
            >
            <div class="invalid-feedback">
              {{ errors.contaOrigem }}
            </div>
            <small class="form-text text-muted">
              10 dígitos numéricos
            </small>
          </div>

          <!-- Conta de Destino -->
          <div class="col-md-6 mb-3">
            <label for="contaDestino" class="form-label">
              Conta de Destino *
            </label>
            <input
              type="text"
              class="form-control"
              id="contaDestino"
              v-model="transferencia.contaDestino"
              placeholder="0000000000"
              maxlength="10"
              required
              :class="{ 'is-invalid': errors.contaDestino }"
            >
            <div class="invalid-feedback">
              {{ errors.contaDestino }}
            </div>
            <small class="form-text text-muted">
              10 dígitos numéricos
            </small>
          </div>
        </div>

        <div class="row">
          <!-- Valor da Transferência -->
          <div class="col-md-6 mb-3">
            <label for="valorTransferencia" class="form-label">
              Valor da Transferência *
            </label>
            <div class="input-group">
              <span class="input-group-text">R$</span>
              <input
                type="number"
                class="form-control"
                id="valorTransferencia"
                v-model="transferencia.valorTransferencia"
                placeholder="0.00"
                step="0.01"
                min="0.01"
                required
                :class="{ 'is-invalid': errors.valorTransferencia }"
              >
              <div class="invalid-feedback">
                {{ errors.valorTransferencia }}
              </div>
            </div>
          </div>

          <!-- Data da Transferência -->
          <div class="col-md-6 mb-3">
            <label for="dataTransferencia" class="form-label">
              Data da Transferência *
            </label>
            <input
              type="date"
              class="form-control"
              id="dataTransferencia"
              v-model="transferencia.dataTransferencia"
              :min="dataMinima"
              required
              :class="{ 'is-invalid': errors.dataTransferencia }"
            >
            <div class="invalid-feedback">
              {{ errors.dataTransferencia }}
            </div>
          </div>
        </div>

        <!-- Botões -->
        <div class="d-flex gap-2">
          <button 
            type="submit" 
            class="btn btn-primary"
            :disabled="loading"
          >
            <span 
              v-if="loading" 
              class="spinner-border spinner-border-sm me-2"
            ></span>
            <i v-else class="bi bi-check-lg me-2"></i>
            {{ loading ? 'Agendando...' : 'Agendar Transferência' }}
          </button>
          
          <button 
            type="button" 
            class="btn btn-secondary"
            @click="limpar"
            :disabled="loading"
          >
            <i class="bi bi-x-lg me-2"></i>
            Limpar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import TransferenciaService from '../services/TransferenciaService'

export default {
  name: 'AgendamentoForm',
  data() {
    return {
      transferencia: {
        contaOrigem: '',
        contaDestino: '',
        valorTransferencia: null,
        dataTransferencia: ''
      },
      errors: {},
      loading: false,
      showSuccessAlert: false,
      showErrorAlert: false,
      errorMessage: ''
    }
  },
  computed: {
    dataMinima() {
      const hoje = new Date()
      return hoje.toISOString().split('T')[0]
    }
  },
  methods: {
    validar() {
      this.errors = {}
      
      // Validar conta de origem
      if (!/^\d{10}$/.test(this.transferencia.contaOrigem)) {
        this.errors.contaOrigem = 'Conta deve ter exatamente 10 dígitos'
      }
      
      // Validar conta de destino
      if (!/^\d{10}$/.test(this.transferencia.contaDestino)) {
        this.errors.contaDestino = 'Conta deve ter exatamente 10 dígitos'
      }
      
      // Validar valor
      if (!this.transferencia.valorTransferencia || this.transferencia.valorTransferencia <= 0) {
        this.errors.valorTransferencia = 'Valor deve ser maior que zero'
      }
      
      // Validar data
      if (!this.transferencia.dataTransferencia) {
        this.errors.dataTransferencia = 'Data é obrigatória'
      }
      
      return Object.keys(this.errors).length === 0
    },
    
    async agendar() {
      if (!this.validar()) {
        return
      }
      
      this.loading = true
      this.showSuccessAlert = false
      this.showErrorAlert = false
      
      try {
        await TransferenciaService.agendarTransferencia(this.transferencia)
        this.showSuccessAlert = true
        this.limpar()
        
        // Emitir evento para atualizar extrato
        this.$emit('transferencia-agendada')
        
      } catch (error) {
        this.showErrorAlert = true
        
        if (error.response && error.response.data) {
          this.errorMessage = error.response.data.message || 'Erro ao agendar transferência'
        } else {
          this.errorMessage = 'Erro ao conectar com o servidor'
        }
      } finally {
        this.loading = false
      }
    },
    
    limpar() {
      this.transferencia = {
        contaOrigem: '',
        contaDestino: '',
        valorTransferencia: null,
        dataTransferencia: ''
      }
      this.errors = {}
    }
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

.form-label {
  font-weight: 600;
  color: #495057;
}

.btn {
  padding: 10px 20px;
  font-weight: 500;
}

.alert {
  border-radius: 8px;
}
</style>