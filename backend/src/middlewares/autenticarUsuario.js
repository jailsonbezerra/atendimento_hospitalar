import awt from 'jsonwebtoken'


export function autenticarAdmin(req, res, next) {
    const authHeader = req.headers.authorization

    if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' })

    const [, token] = authHeader.split(' ')

    try {
        const decoded = awt.verify(token, process.env.JWT_SECRET)
        
        req.user = decoded

        if (req.user.papel === 'ADMIN') return next()

        return res.status(403).json({ error: 'Acesso negado' })
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido' })
    }
}

export function autenticarMedico(req, res, next) {
    const authHeader = req.headers.authorization

    if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' })

    const [, token] = authHeader.split(' ')

    try {
        const decoded = awt.verify(token, process.env.JWT_SECRET)

        req.user = decoded

        if (req.user.papel === 'MEDICO') return next()

        return res.status(403).json({ error: 'Acesso negado' })
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido' })
    }
}

export function autenticarAtendente(req, res, next) {
    const authHeader = req.headers.authorization

    if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' })

    const [, token] = authHeader.split(' ')

    try {
        const decoded = awt.verify(token, process.env.JWT_SECRET)

        req.user = decoded

        if (req.user.papel === 'ATENDENTE') return next()

        return res.status(403).json({ error: 'Acesso negado' })
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido' })
    }
}