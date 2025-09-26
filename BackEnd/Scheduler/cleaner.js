const URL = require('../models/url');

const handleExpiredURL = () => {
    const delay = 24*60*60*1000;
    setInterval(async() => {
        const now  = Date.now();
        try{
            const result = await URL.deleteMany({expiresAt:{$lt:now}});
        }catch(error){
            console.log(error);
        }
    },delay);
}

module.exports={
    handleExpiredURL
}