
const multer = require("multer");
const path = require("path");
const upload = multer({
    storage: multer.diskStorage({
        destination:function(req,file,cd){
            cd(null,'uploads')
        },
        filename:function(req,file,cd){
            var ext = file.originalname.substring(file.originalname.lastIndexOf('.'))
            
            cd(null,file.fieldname +'-'+ Date.now()+ext)
        }
    }),
}); 

module.exports = upload;