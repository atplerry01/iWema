
import BidObsoleteCarRouter from './bid_obsolete_car/routes';


export default class GSDRouter {

  bidObsoleteCarRouter: any;

  constructor() {
    this.bidObsoleteCarRouter = new BidObsoleteCarRouter();
  }

    setupRouter(app, jwt) {

      this.bidObsoleteCarRouter.setupRouter(app, jwt);

        
    }
}
