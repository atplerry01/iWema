
import ALATRouter from './ALAT/routes';
import BPRRouter from './BPR/audit/routes';
import CBGRouter from './CBG/routes';
import CBNRouter from './CBN/routes';
import CCURouter from './CCU/routes';
import CMGRouter from './CMG/routes';
import FCURouter from './FCU/routes';
import GenericRouter from './Generic/routes';
import GSDRouter from './GSD/routes';
import HCMRouter from './HCM/routes';
import HRRouter from './HR/routes';
import INURouter from './INU/routes';
import ITURouter from './ITU/routes';
import IwemaRouter from './iwema/routes';
import MGTRRouter from './MGTR/routes';
import MICRRouter from './MICR/routes';
import OPSRouter from './OPS/routes';
import PortalRouter from './Portal/routes';
import RCURouter from './RCU/routes';
import RetailRouter from './Retail/routes';
import TBURouter from './TBU/routes';

export default class ApplicationRouter {
  iwemaRouter: any;
  auditRouter: any;
  gsdRouter: any;
  hrRouter: any;
  cbgRouter: any;
  retailRouter: any;
  cmgRouter: any;
  rcuRouter: any;
  ccuRouter: any;
  tbuRouter: any;
  hcmRouter: any;
  fcuRouter: any;
  cbnRouter: any;
  genericRouter: any;
  micrRouter: any;
  alatRouter: any;
  ituRouter: any;
  opsRouter: any;
  inuRouter: any;
  portalRouter: any;
  mgtrRouter: any;
  
  constructor() {
    this.iwemaRouter = new IwemaRouter();
    this.auditRouter = new BPRRouter();
    this.gsdRouter = new GSDRouter();
    this.hrRouter = new HRRouter();
    this.cbgRouter = new CBGRouter();
    this.retailRouter = new RetailRouter();
    this.cmgRouter = new CMGRouter();
    this.rcuRouter = new RCURouter();
    this.tbuRouter = new TBURouter();
    this.ccuRouter = new CCURouter();
    this.hcmRouter = new HCMRouter();
    this.fcuRouter = new FCURouter();
    this.cbnRouter = new CBNRouter();
    this.genericRouter = new GenericRouter();
    this.micrRouter = new MICRRouter();
    this.alatRouter = new ALATRouter();
    this.ituRouter = new ITURouter();
    this.opsRouter = new OPSRouter();
    this.inuRouter = new INURouter();
    this.portalRouter = new PortalRouter();
    this.mgtrRouter = new MGTRRouter();
  }

  setupRouter(app, jwt, _redis) {
    this.iwemaRouter.setupRouter(app, jwt);
    this.auditRouter.setupRouter(app, jwt);
    this.gsdRouter.setupRouter(app, jwt);
    this.hrRouter.setupRouter(app, jwt);
    this.cbgRouter.setupRouter(app, jwt);
    this.retailRouter.setupRouter(app, jwt, _redis);
    this.cmgRouter.setupRouter(app, jwt);
    this.rcuRouter.setupRouter(app, jwt);
    this.ccuRouter.setupRouter(app, jwt);
    this.tbuRouter.setupRouter(app, jwt);
    this.hcmRouter.setupRouter(app, jwt);
    this.fcuRouter.setupRouter(app, jwt);
    this.cbnRouter.setupRouter(app, jwt);
    this.genericRouter.setupRouter(app, jwt);
    this.micrRouter.setupRouter(app, jwt);
    this.alatRouter.setupRouter(app, jwt);
    this.ituRouter.setupRouter(app, jwt);
    this.opsRouter.setupRouter(app, jwt);
    this.inuRouter.setupRouter(app, jwt);
    this.portalRouter.setupRouter(app, jwt);
    this.mgtrRouter.setupRouter(app, jwt);
  }
}
