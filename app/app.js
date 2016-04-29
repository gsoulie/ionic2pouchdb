import 'es6-shim';
import {App, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HomePage} from './pages/home/home';
import {Data} from './providers/data/data';
//import {Utils} from './providers/lib/Utils';

@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [Data],  //import du Service créé
  config: {
    backButtonText: 'Retour',
  }
})
export class MyApp {
  static get parameters() {
    return [[Platform]];
  }

  constructor(platform) {
    this.rootPage = HomePage;

    platform.ready().then(() => {
      StatusBar.backgroundColorByHexString("#3374dd");
    });
  }
}
