export default function (req, res){
    if (req.method === 'GET'){
        res.status(200).json({'Message': 'DB API Request'})
    } else {
        res.status(200).json({'Message': 'Unauthorized Request'})
    }
}