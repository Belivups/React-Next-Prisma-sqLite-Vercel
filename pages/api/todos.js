import prisma from "../../prisma/prisma";

export default async function HandleTodos(req, res){

    if(req.url === '/api/todos'){

        switch(req.method) {

            case 'GET':

                if(req.headers.authtoken === 'admin'){

                    const data = await prisma.todos.findMany({
                        select:{
                            id:true,
                            title:true,
                            email:true
                        }
                    })

                    res.status(200).json({data})

                } else {
                    res.status(200).json({'Message': 'Auth Failed'})
                }
                break;

            case 'POST':

                if(req.headers.authtoken === 'admin'){

                    await prisma.todos.create({
                        data: req.body
                    })

                    console.log(req.body)

                    res.status(200).json({'status': 'success', 'message':`Added New Todos Successfully -- ${req.body.title} | ${req.body.email}`})
                } else {
                    res.status(200).json({'Message': 'Auth Failed'})
                }
                break;

            case 'PUT':

                if(req.headers.authtoken === 'admin'){
                    res.status(200).json({'name':'Todo PUT API - Auth Success'})
                } else {
                    res.status(200).json({'Message': 'Auth Failed'})
                }
                break;

            case 'DELETE':

                if(req.headers.authtoken === 'admin'){
                    console.log(req.body)

                    await prisma.todos.delete({
                        where: {
                            id: +req.body
                        }
                    })

                    res.status(200).json({'status': 'deleted'})
                } else {
                    res.status(200).json({'message': 'Error'})
                }
                break;


            default:
                try {
                    res.status(200).json({'Message':'Invalid Request'})
                } catch (err){
                    res.status(200).json({'Message': 'Invalid Request', 'Error': err})
                }
                break;
        }

    }

}