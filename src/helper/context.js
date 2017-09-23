import Binder from 'lib/Binder';
import ServiceStarter from 'lib/ServiceStarter';
import BaseStoreFactory from 'lib/BaseStore';
import BaseServiceFactory from 'lib/BaseService';


export const serviceStarter = new ServiceStarter();
export const appBinder = new Binder();
export const BaseStore = BaseStoreFactory(appBinder);
export const BaseService = BaseServiceFactory(BaseStore, serviceStarter);
