import React from 'react';
import Connector from 'lib/Connector';
import BaseComponent from 'lib/BaseComponent';
import pairService from 'services/pairService';
import PairsStore from 'components/Pairs/store/PairsStore';
import {observer} from 'mobx-react';
import {toJS} from 'mobx';

//@observer
class Pairs extends BaseComponent {

    static displayName = 'Pairs';

    static defaultProps = {};


    componentWillReceiveProps(props){
      console.log(['props', props]);
    }



    render() {

        return <div>
          <h1>Pairs</h1>
          <ul>
            {this.props.items.map((item)=>{
              return <li key={item.id} onClick={()=>{this.props.api.selectPair(item.id)}}>
                  {
                    item.selected
                    ?
                      <strong>{item.id} = {item.rate}</strong>
                      :
                      <span>{item.id} = {item.rate}</span>
                  }
              </li>
            })}
          </ul>

        </div>;
    }
}

export default Connector(Pairs,
    {
      services:[pairService],
      store(){
        return new PairsStore()
      },
        helper() {
            return {
              items:toJS(pairService.pairRateCollection.models)
            };
        },
    });
