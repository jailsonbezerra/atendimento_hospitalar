import { toast } from 'react-toastify'


export function notificacao(msg, tipo = 'success') {
    tipo === 'success' ? toast.success(msg) : toast.error(msg)
}