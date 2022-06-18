const router = require('express').Router()
const soap = require('soap');
const url = "http://localhost:3030/bmicalculator?wsdl";


router.get('/', (req, res) => {
    res.render('inicio')
})

router.post('/validate', (req, res) => {

    const { nombres, correo, fecha_nac } = req.body

    let args = {
        nombres, correo, fecha_nac
    }

    soap.createClient(url, function (err, client) {

        if (err)
            console.error(err);
        else {
            client.calculateBMI(args, function (err, response) {
                if (err)
                    console.error(err);
                else {
                    console.log('********** RESPUESTA **********');
                    console.log(response.saludo);
                    console.log("*******************************");
                    res.json({
                        mensaje: "Mensaje enviado: Revisar consola del servidor."
                    })
                }

            })
        }
    });

})

module.exports = router