<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <AgendamentoForm @transferencia-agendada="onTransferenciaAgendada" />
      </div>
    </div>
  </div>
</template>

<script>
import AgendamentoForm from '../components/Agendamento.vue'

export default {
  name: 'AgendamentoView',
  components: {
    AgendamentoForm
  },
  methods: {
    onTransferenciaAgendada() {
      // Pode adicionar lógica adicional aqui
      console.log('Transferência agendada com sucesso!')
    }
  }
}
</script>