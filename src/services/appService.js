import {BaseService} from 'helper/context';
import {APP_SERVICE} from 'constants/moduleNames';
import {observable, toJS} from 'mobx';
import pairRateModel from 'models/pairRateModel';
import Collection from 'lib/Collection';


function randNumber(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class AppService extends BaseService {

    config = {
      bindAs: APP_SERVICE,
      debug: true,
    };


    pairRateCollection = new Collection([]);



    onStart(){

      console.log(['AppService startDo']);
      this.generator((data)=>{

        let toUpdate = data.map((item)=>{
          return pairRateModel.parse(item, this.pairRateCollection.getById(item.pair, true));
        });



        this.pairRateCollection.update(
          toUpdate,
          {remove:false});

        console.log(['this.pairRateCollection.', toJS(this.pairRateCollection.models)]);

      });

      return true;
    }

    generator(fn){
      const data = [
        {
          pair: 'EURUSD',
          rate: 4,
        },
        {
          pair: 'GBPUSD',
          rate: 5,
        }
      ];

      setInterval(()=>{

        const rate = randNumber(1,10);

        data.forEach((item)=>{
          item.rate = rate;
        });

        fn(data);

      }, 1000);


    }
}

export default new AppService();