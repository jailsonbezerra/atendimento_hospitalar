import { prisma } from './prisma.js'


class UsuarioModel {
    async create(data) {        
        return await prisma.$transaction(async (tx) => {
            const usuario = await tx.usuario.create({ 
                data: {
                    email: data.email,
                    nome: data.nome,
                    hash_senha: data.hash_senha,
                    papel: data.papel,
                }
            })

            switch (data.papel) {
                case 'ATENDENTE':
                    await tx.atendente.create({ 
                        data: {
                            corem: data.corem,
                            usuario_id: usuario.id
                        }
                    })

                    break

                case 'MEDICO':
                    await tx.medico.create({ 
                        data: {
                            prm: data.prm,
                            usuario_id: usuario.id
                        }
                    })

                    break

                case 'ADMIN':
                    break

                default:
                    break
            }

            return usuario
        })
    }

    async findAll() {
        return await prisma.usuario.findMany({
            select: {
                id: true,
                email: true,
                nome: true,
                papel: true,
                atendente: true,
                medico: true
            }
        })
    }

    async findById(id) {
        return await prisma.usuario.findUnique({ 
            where: { id },
            select: {
                id: true,
                email: true,
                nome: true,
                papel: true,
                atendente: true,
                medico: true
            }
        })
    }

    async findByEmail(email) {
        return await prisma.usuario.findUnique({ where: { email } })
    }

    async update(id, data) {
        return await prisma.$transaction(async (tx) => {
            const usuario = await tx.usuario.update({ where: { id }, data: { ...data } })

            if (data.papel) {
                await tx.atendente.deleteMany({ where: { usuario_id: id } })
                await tx.medico.deleteMany({ where: { usuario_id: id } })

                switch (data.papel) {
                    case 'ATENDENTE':
                        await tx.atendente.create({ 
                            data: {
                                corem: data.corem,
                                usuario_id: id
                            }
                        })

                        break

                    case 'MEDICO':
                        await tx.medico.create({ 
                            data: {
                                prm: data.prm,
                                usuario_id: id
                            }
                        })

                        break

                    case 'ADMIN':
                        break
                }
            }

            return usuario
        })  
    }

    async delete(id) {
        return await prisma.usuario.delete({ where: { id } })
    }
}

export default new UsuarioModel()