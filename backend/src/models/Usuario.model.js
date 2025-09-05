import {prisma} from './prisma.js'


class usuarioModel {
    async create(data) {        
        const usuario = await prisma.usuario.create({ 
            data: {
                email: data.email,
                hash_senha: data.hash_senha,
                papel: data.papel,
            }
        })
        
        switch (data.papel) {
            case 'PACIENTE':
                await prisma.paciente.create({ 
                    data: {
                        sus: data.sus,
                        nome: data.nome,
                        data_nascimento: data.data_nascimento,
                        sexo: data.sexo,
                        usuario_id: usuario.id
                    }
                })

                break

            case 'ATENDENTE':
                await prisma.atendente.create({ 
                    data: {
                        nome: data.nome,
                        corem: data.corem,
                        usuario_id: usuario.id
                    }
                })

                break

            case 'MEDICO':
                await prisma.medico.create({ 
                    data: {
                        nome: data.nome,
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
    }

    async findAll() {
        return await prisma.usuario.findMany({
            select: {
                id: true,
                email: true,
                papel: true,
                paciente: true,
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
                papel: true,
                paciente: true,
                atendente: true,
                medico: true
            }
        })
    }

    async findByEmail(email) {
        return await prisma.usuario.findUnique({ where: { email } })
    }

    async update(id, data) {
        const usuario = await prisma.usuario.update({ 
            data: {
                email: data.email,
                hash_senha: data.hash_senha,
                papel: data.papel,
            }, 
            where: { id }
        })
        
        switch (data.papel) {
            case 'PACIENTE':
                await prisma.paciente.update({ 
                    data: {
                        sus: data.sus,
                        nome: data.nome,
                        data_nascimento: data.data_nascimento,
                        sexo: data.sexo,
                        usuario_id: usuario.id
                    },
                    where: { usuario_id: usuario.id }
                })

                break

            case 'ATENDENTE':
                await prisma.atendente.update({ 
                    data: {
                        nome: data.nome,
                        corem: data.corem,
                        usuario_id: usuario.id
                    },
                    where: { usuario_id: usuario.id }
                })

                break

            case 'MEDICO':
                await prisma.medico.update({ 
                    data: {
                        nome: data.nome,
                        prm: data.prm,
                        usuario_id: usuario.id,
                    },
                    where: { usuario_id: usuario.id }
                })

                break

            case 'ADMIN':
                break

            default:
                break
        }

        return usuario
    }

    async delete(id) {
        return await prisma.usuario.delete({ where: { id } })
    }
}

export default new usuarioModel()