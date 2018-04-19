import mysqlService from "../services/database/mysql";

class PlayerController {
    constructor () {
        let path = require('path');
        this.viewPath = path.dirname(require.main.filename)+'/views/';
        this.connection = new mysqlService();
    }
   async index (req,res) {
       let data  = await this.getActivePlaylist();
        res.render('index.html',{'playlist' :  JSON.stringify(data)});
    }


    async addMusicView(req,res) {
        let data  = await this.getActivePlaylist();
        res.render('add.html',{'playlist' :  JSON.stringify(data)});
    }

    getActivePlaylist () {
        var sql1 = "SELECT * FROM playlist WHERE status = 1";
        return this.connection.statement(sql1);
    }

    async addMusic (req,res) {
        if(req.query.videourl != '') {

            await this.connection.insert('playlist', req.query.videourl);
            res.send({'success': true, 'data': await this.getActivePlaylist()});
        }

    }

    async deleteMusic (req,res) {
        if(req.query.id != '') {

            await this.connection.delete('playlist', req.query.id);
            res.send({'success': true, 'data': await this.getActivePlaylist()});
        }

    }
}

export default PlayerController
