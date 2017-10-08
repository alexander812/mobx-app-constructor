import {BaseStore} from 'helper/context';
import {PAIR_SERVICE} from 'constants/moduleNames';

class PairsStore extends BaseStore {

  config = {
    bindAs:'PairsStore'
  };

  api = {
    selectPair: (id)=>{
      this.callApi(PAIR_SERVICE, 'selectPair', id);
    }

  }

}

export default PairsStore;
