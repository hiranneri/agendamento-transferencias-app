import axios from 'axios'

const API_URL = 'http://localhost:8080/transferencia'

class TransferenciaService {
  
  /**
   * Agenda uma nova transferência
   */
  agendarTransferencia(transferencia) {
    return axios.post(API_URL, transferencia)
  }

  /**
   * Lista o extrato com paginação
   */
  listarExtrato(page = 0, size = 10, sort = 'dataAgendamento,desc') {
    return axios.get(`${API_URL}/extrato`, {
      params: { page, size, sort }
    })
  }

  /**
   * Formata valor para moeda brasileira
   */
  formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor)
  }

  /**
   * Formata data para padrão brasileiro
   */
  formatarData(data) {
    if (!data) return ''
    const [ano, mes, dia] = data.split('-')
    return `${dia}/${mes}/${ano}`
  }
}

export default new TransferenciaService()