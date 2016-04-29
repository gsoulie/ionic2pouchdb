import {Page, NavController, NavParams} from 'ionic-angular';
import {Data} from '../../providers/data/data';

@Page({
  templateUrl: 'build/pages/detail/detail.html'
})
export class DetailPage {
  static get parameters() {
    return [[NavController],[NavParams],[Data]];
  }

  //ctor
  constructor(nav,navParams, dataService) {
    this.nav = nav;
    this.item = navParams.get("item");
    this.callback = navParams.get("callback");
    this.dataService = dataService;
  }

  // Mise à jour d'un document  
  validate(){
      // Récupérer les valeurs de l'item
      let updatedDoc = {
          '_id': this.item._id,
          '_rev': this.item._rev,
          'message': this.item.message
      };
            
      this.dataService.addDocument(updatedDoc);
      this.callback();
  }
  
  // Mise à jour de la valeur du message après saisie
  updateMessage(val) {this.item.message = val;}
}
