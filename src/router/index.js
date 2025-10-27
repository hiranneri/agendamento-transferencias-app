import { createRouter, createWebHistory } from 'vue-router'
import AgendamentoView from '../view/Agendamento.vue'
import ExtratoView from '../view/Extrato.vue'

const routes = [
  {
    path: '/',
    redirect: '/agendamentos'
  },
  {
    path: '/agendamentos',
    name: 'Agendamento',
    component: AgendamentoView
  },
  {
    path: '/extrato',
    name: 'Extrato',
    component: ExtratoView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router