export default function sendError(res, message = "Request Failed", code = 400){
    return res.status(code).json({
        message
    }).end();
}