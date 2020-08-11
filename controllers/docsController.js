const { PDFNet } = require('@pdftron/pdfnet-node');

let docsController = {};

docsController.upload = async(req, res, next) => {
    try {
        const { file } = req.files;
        // Verify file extension
        /*if (file.mimetype !== 'application/msword') {
            throw new Error('El archivo seleccionado no es de tipo Word MS.');
        }*/
        // Verify fileSize (default: 20MB)
        if (file.size > 20 * 1000 * 1000) {
            throw new Error('El archivo seleccionado no puede pesar más de 20MB.');
        }
        const main = async () => {
            const pdfdoc = await PDFNet.PDFDoc.create();
            await pdfdoc.initSecurityHandler();
            const convertedFile = await PDFNet.Convert.office2PDFBuffer(file.data);
            const docBufferToBase64 = Buffer.from(convertedFile).toString('base64');
            res.status(200).json({
                message: 'El archivo ha sido convertido exitosamente.',
                file: docBufferToBase64
            });
        }
        await PDFNet.runWithCleanup(main);
        await PDFNet.shutdown();
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: error.message
        })
    }
}



module.exports = docsController;