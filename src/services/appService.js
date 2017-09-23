import {BaseService} from 'helper/context';
import {APP_SERVICE} from 'constants/moduleNames';


class AppService extends BaseService {

    config = {
      bindAs: APP_SERVICE,
      debug: true,
    };



    onStart(){

      console.log(['AppService startDo']);

      return true;
    }
}

export default new AppService();