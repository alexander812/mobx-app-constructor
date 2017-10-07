import React from 'react';
import Connector from 'lib/Connector';
import BaseComponent from 'lib/BaseComponent';
import pairService from 'services/pairService';
import {observer} from 'mobx-react';

@observer
class Pairs extends BaseComponent {

    static displayName = 'Pairs';

    static defaultProps = {};

    render() {

        return <div>
          <h1>Pairs</h1>
          <ul>
            {this.props.items.map((item)=>{
              return <li key={item.id}>{item.id} = {item.rate}</li>
            })}
          </ul>

        </div>;
    }
}

export default Connector(Pairs,
    {
      services:[pairService],
        helper() {
            return {
              items:pairService.pairRateCollection.models
            };
        },
    });
