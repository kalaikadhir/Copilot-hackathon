const mongooose = require('mongoose');

const WorkSchema = mongooose.Schema({
    title : {
        type:'string',
        required:true

    },
    body: {
        type:'string',
        required:true

    },
    eod: {
        type:'string',
        required:true
    }
})

const Work = mongooose.model("tasks",WorkSchema)

module.exports= Work;