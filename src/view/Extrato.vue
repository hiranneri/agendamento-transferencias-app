<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-12">
        <ExtratoTable ref="extratoTable" />
      </div>
    </div>
  </div>
</template>

<script>
import ExtratoTable from '../components/Extrato.vue'

export default {
  name: 'ExtratoView',
  components: {
    ExtratoTable
  },
  methods: {
    recarregarExtrato() {
      this.$refs.extratoTable.carregarExtrato()
    }
  }
}
</script>