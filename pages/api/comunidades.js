import { SiteClient } from 'datocms-client';

export default async function recebedorDeRequests(request,response){
    const TOKEN = '952137b3aae3adf30a78329931b0a9';
    const client = new SiteClient(TOKEN)
    if(request.method === 'POST') {
        const registroCriado = await client.items.create({
            itemType: "977032", //ID do model de comunidades
            ...request.body,
    })

    response.json({
        dados: `Algum dado qualquer`,
        registroCriado: registroCriado,
    })
    return
    }
    response.status(404).json({
        message: 'Ainda não temos nada no GET, mas no POST tem!'
    })
}