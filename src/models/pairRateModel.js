import {BaseService} from 'helper/context';
import {APP_SERVICE} from 'constants/moduleNames';
import {observable} from 'mobx';


class AppService extends BaseService {

    config = {
      bindAs: APP_SERVICE,
      debug: true,
    };


    @observable pairRates  = {};



    onStart(){

      console.log(['AppService startDo']);
      this.generator();

      return true;
    }

    generator(){
      setInterval(()=>{

        this

      }, 2000)
    }
}

export default new AppService();