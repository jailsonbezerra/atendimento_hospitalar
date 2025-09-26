import { toast } from 'react-toastify'


export function notificacao(msg, tipo = 'success') {
    if (tipo === 'success') return toast.success(msg)

    if (tipo === 'error') return toast.success(msg)

    if (tipo === 'info') return toast.success(msg)

    return toast.warn('Tipo da notificação não definida')
}