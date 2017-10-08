import Model from 'lib/Model';

class PairRateModel extends Model {

  attribures = {
    id:{value:null},
    pair:{value:null},
    rate:{value:0},
    prevRate:{value:0},
    diff:{value:0},
  };

  parse(data, prevModel){

    return {
      id: data.pair,
      rate: data.rate,
      prevRate: prevModel && prevModel.rate,
      diff: prevModel ? data.rate - prevModel.rate : 0
    }

  }

}

export default new PairRateModel();