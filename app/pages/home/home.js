import {Page, NavController,Platform, Alert} from 'ionic-angular';
import {Data} from '../../providers/data/data';
import {DetailPage} from '../detail/detail';

@Page({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

  static get parameters(){
    return [[Data], [NavController], [Platform]];
  }
  //Chargement de la base de données
  constructor(dataService, nav, platform) {
    this.dataService = dataService;
    this.items = [];
    this.nav = nav;
        
    platform.ready().then(() => {
        console.log("platform is ready !!!");
        this.dataService.getDocuments().then((result) => {
            this.items = result;
        });
    });
    
  }
  //Fonction d'ajout d'un document
    addData(){
        let date = new Date();
        let newDoc = {
            '_id': date,
            'message': date.getTime()
        };

        this.dataService.addDocument(newDoc);
    }
    //Rafraichir la liste
    refreshData(){
        this.items = [];

        this.dataService.getDocuments().then((result) => {
            this.items = result;
        });
    }
    //Supprimer un document
    deleteData(item){
      let confirm = Alert.create({
          title: "Suppression",
          message: 'Êtes-vous certain de vouloir supprimer l\'item ' + item.message + ' ?',
          buttons: [
            {
              text: 'Non',
              handler: () => {
                console.log('Disagree clicked');
              }
            },
            {
              text: 'Oui',
              handler: () => {
                this.dataService.deleteDocument(item);            
              }
            }
          ]
        });

      this.nav.present(confirm);

    }
    
    // Ouverture de la fenêtre détail
    openDetail(item){
        this.nav.push(DetailPage, {
            item: item, 
            callback: function(e){this.nav.pop();}
        });
    }
}
