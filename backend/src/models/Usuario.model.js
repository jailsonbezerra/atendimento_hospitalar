import { prisma } from './prisma.js'


class UsuarioModel {
    async create(data) {        
        return await prisma.$transaction(async (tx) => {
            const usuario = await tx.usuario.create({ 
                data: { 
                    email: data.email,
                    nome: data.nome,
                    papel: data.papel,
                    hash_senha: data.hash_senha
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
            const usuarioDate = {
                email: data.email,
                nome: data.nome,
                papel: data.papel,
                hash_senha: data.hash_senha
            }

            Object.keys(usuarioDate).forEach(key => {
                if (usuarioDate[key] === undefined) {
                    delete usuarioDate[key]
                }
            })

            const usuario = await tx.usuario.update({ where: { id }, data: { ...usuarioDate } })

            
            switch (data.papel) {
                case 'ATENDENTE':
                    await tx.medico.deleteMany({ where: { usuario_id: id } })

                    await tx.atendente.upsert({ 
                        where: { usuario_id: id },
                        update: {
                            corem: data.corem
                        },
                        create: {
                            corem: data.corem,
                            usuario_id: id
                        }
                    })

                    break

                case 'MEDICO':
                    await tx.atendente.deleteMany({ where: { usuario_id: id } })

                    await tx.medico.upsert({ 
                        where: { usuario_id: id },
                        update: {
                            prm: data.prm
                        },
                        create: {
                            prm: data.prm,
                            usuario_id: id
                        }
                    })

                    break

                case 'ADMIN':
                    await tx.atendente.deleteMany({ where: { usuario_id: id } })
                    await tx.medico.deleteMany({ where: { usuario_id: id } })

                    break
                  
                default:
                    break
            }

            return usuario
        })  
    }

    async delete(id) {
        return await prisma.usuario.delete({ where: { id } })
    }
}

export default new UsuarioModel()