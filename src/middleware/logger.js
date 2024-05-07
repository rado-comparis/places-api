export const logger = (req,res,next) =>{
    req.time = new Date(Date.now()).toString();
    // to be replaced by something like morgan
    console.log(req.method,req.hostname, req.path, req.time);
    next();
};