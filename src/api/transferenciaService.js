const API_BASE_URL = 'http://localhost:8080/transferencia'

export async function agendarTransferencia(transferencia) {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(transferencia)
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(errorText || 'Erro ao agendar transferência.')
  }

  return await response.json()
}

export async function listarTransferencias(page = 0, size = 5) {
  const response = await fetch(`${API_BASE_URL}?page=${page}&size=${size}`)
  if (!response.ok) {
    throw new Error('Erro ao buscar extrato.')
  }
  return await response.json()
}
