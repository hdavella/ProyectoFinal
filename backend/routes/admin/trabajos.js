var express = require('express');
var router = express.Router();
var trabajosModel = require('../../models/trabajosModel');
var util = require('util');
var cloudinary = require('cloudinary').v2;
var uploader = util.promisify(cloudinary.uploader.upload);
var destroy = util.promisify(cloudinary.uploader.destroy);

router.get('/', async (req, res, next) =>{

        var trabajos = await trabajosModel.getTrabajos();

        trabajos = trabajos.map( (trabajo)=>{
            if(trabajo.img_id){
                const imagen = cloudinary.image(trabajo.img_id,{
                    width:50,
                    height:50,
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
        res.render('admin/trabajos',
            {
                layout: 'admin/layout',
                nombre: req.session.nombre,
                trabajos
            }
        );
    
});

router.get('/agregar', (req, res, next) => {    
    res.render('admin/agregar', {
        layout:'admin/layout'
    });
});

//pido confirmar si realmente se quiere eliminar el trabajo
router.get('/eliminarconfirm/:id', (req, res, next) => {
    var id = req.params.id
    //console.log(id);
    res.render('admin/eliminarconfirm', {
        layout:'admin/layout',
        id
    });
});

router.get('/modificar/:id', async (req, res, next) => {

    try{
        let id = req.params.id;
        let trabajo = await trabajosModel.selectTrabajoById(id);
        res.render('admin/modificar',
            {
                layout: 'admin/layout',
                trabajo
            }
        );
    }catch{
        console.log(error);
    }
});

router.post('/eliminar', async (req, res, next) =>{
    try{
        var id=req.body.idconfirmar;
        let trabajo = await trabajosModel.selectTrabajoById(id);
        if (trabajo.img_id){
            await (destroy(trabajo.img_id));
        }
        //console.log(`trabajo a borrar ${id}`)
        await trabajosModel.deleteTrabajoById(id);
        res.redirect('/admin/trabajos');

    }catch{
        console.log(error);
    }
});

router.post('/agregar', async (req, res, next)=>{
    try{
        let img_id = '';
        if(req.files && Object.keys(req.files).length > 0){
            imagen = req.files.imagen;
            img_id = (await uploader(imagen.tempFilePath)).public_id;
        }
        // Se requieren los campos para que sean todos completos
        if(req.body.titulo != "" && req.body.subtitulo != "" && req.body.descripcion != ""){
            await trabajosModel.altaTrabajo({...req.body, img_id});
            //console.log(req.body);
            
        
            res.redirect('/admin/altaok');
        } else {
            res.render('admin/agregar', {
                layout: 'admin/layout',
                error:true,
                message: 'Todos los campos son requeridos'
            });
        }
        if(req.body.cancelar){
            res.redirect('/admin/trabajos');
        }
    }catch{
        console.log(error);
        res.render('admin/agregar', {
            layout: 'admin/layout',
            error:true,
            message: 'No se cargo el trabajo'
        })
    }
});

router.post('/modificar', async (req, res, next)=>{
    try{
        let img_id = req.body.img_original;
        let img_borrar_vieja = false;
        if(req.body.img_delete === "1"){
            img_id = "";
            img_borrar_vieja = true;
        }else{
            if(req.files && Object.keys(req.files).length > 0 ){
                imagen = req.files.imagen;
                img_id = (await uploader(imagen.tempFilePath) ).public_id;
                img_borrar_vieja = true;
            }
        }
        if(img_borrar_vieja && req.body.img_original){
            await (destroy(req.body.img_original));
        }
        let obj = {
            titulo:req.body.titulo,
            subtitulo:req.body.subtitulo,
            descripcion:req.body.descripcion,
            img_id
        }
        await trabajosModel.updateTrabajoById(obj, req.body.id);
        //una vez modificada la base, vuelvo a listar los trabajos
        res.redirect('/admin/trabajos');
    }catch{
        console.log(error);
        res.render('admin/modificar', {
            layout: 'admin/layout',
            error:true,
            message: 'No se modificó el trabajo'
        })
    }
})

module.exports = router;