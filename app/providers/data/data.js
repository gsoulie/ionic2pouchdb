import {Injectable} from 'angular2/core';
import {Storage, SqlStorage} from 'ionic-angular';

var PouchDB = require('pouchdb');

@Injectable()
export class Data {
  constructor() {

    this.db = new PouchDB('mydb');
    this.username = 'themoseedowstrinkessomms';
    this.password = '94906322efab744839a0fa893f4c19f1a2087505';
    this.remote = 'https://507204ba-6c5b-4449-8387-4033f9e65e27-bluemix.cloudant.com/mydb/';
    //this.remote = 'https://gsoulie.cloudant.com/mydb/';
      
    let options = {
      live: true,
      retry: true,
      continuous: true,
      auth: {
        username: this.username,
        password: this.password
      }
    };

    this.db.sync(this.remote, options);
  }

  //Ajout d'un document
  addDocument(doc){
    this.db.put(doc);
  }
  
  //Suppression d'un document
  deleteDocument(doc){
    this.db.remove(doc);
  }

  //Récupération des documents
  getDocuments(){
    return new Promise(resolve => {
      this.db.allDocs({
        include_docs: true
      }).then((result) => {
        this.data = [];

        let docs = result.rows.map((row) => {
          this.data.push(row.doc);
          resolve(this.data);
        });

        this.db.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {
          this.handleChange(change);
        });
      }).catch((error) => {
        console.log(error);
      });
    });
  }
  //Evénement change
  handleChange(change){
      let changedDoc = null;
      let changedIndex = null;

      this.data.forEach((doc, index) => {
        if(doc._id === change.id){
          changedDoc = doc;
          changedIndex = index;
        }
      });

      //Détection suppression d'un élément
      if(change.deleted){
        this.data.splice(changedIndex, 1);
      }
      else {
        //Un document a été modifié
        if(changedDoc){
          this.data[changedIndex] = change.doc;
        }
        //Un document a été ajouté
        else {
          this.data.push(change.doc);
        }
      }
    }
}
