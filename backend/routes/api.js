var express = require('express');
var router = express.Router();
var trabajosModel = require('../models/trabajosModel');
var cloudinary = require('cloudinary').v2;
var nodemailer = require('nodemailer');

router.get('/trabajos', async (req, res, next) =>{

    let trabajos = await trabajosModel.getTrabajos();

    trabajos = trabajos.map( (trabajo)=>{
        if(trabajo.img_id){
            const imagen = cloudinary.url(trabajo.img_id,{
                width:100,
                height:100,
                crop:"fill"
            });
            return{
                ...trabajo, imagen
            }
        }else{
            return{
                ...trabajo, imagen:""
            }
        }
    });


    res.json(trabajos);
});

router.post('/contacto', async (req, res, next) => {
    const mail={
        to:'servicioecu@gmail.com',
        subject:'Contacto web',
        html:`${req.body.nombre}  se contactó a traves de la web y solicita información al correo ${req.body.email} <br> 
        Además hizo el siguiente comentario: ${req.body.mensaje} <br> Su telefono es ${req.body.telefono}`
    };

/*     var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "97a0656f767b31",
          pass: "d1bf59d1db7b56"
        }
      }); */

    const transport = nodemailer.createTransport({
        host:process.env.SMTP_HOST,
        port:process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
          }
    });

    await transport.sendMail(mail)

    res.status(201).json({
        error:false,
        message:'Mensaje enviado'
    });
});

module.exports = router;