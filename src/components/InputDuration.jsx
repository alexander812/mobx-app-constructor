import React from "react";
export function trim(str) {
  return str.replace(new RegExp('^[^\\d\\:]+|[^\\d\\:]+$', 'g'), '');
}

function prepareMask(mask, sp){
 //const mask = 'xx ч. xx мин. xx сек.';
  const result = {};
  const arr1 = mask.split(new RegExp(`${sp}+`));
  const arr2 = mask.split(new RegExp(`[^${sp}]+`));

  for(let i = arr2.length - 1; i >= 0; i--) {
    if(!(new RegExp(sp)).test(arr2[i])) {
      arr2.splice(i, 1);
    }
  }

 // console.log([123,arr1, arr2] );
  return {
    separators: arr1,
    masks: arr2,
  }

}


export function formatNumber(str, mask, cache, caret) {

  let result = '';
  let regStr = '';
  let newCaret = null;

  const fromMask = cache;

  fromMask.separators.forEach((val, i)=>{
    if(typeof fromMask.separators[i+1] !== 'undefined'){
      regStr += `${val}(\\d*)`
    }else {
      regStr += val;
    }
  });

  //console.log(['regStr', regStr]);

  const enteredArr = (new RegExp(regStr)).exec(str);

  //console.log(['fromMask', fromMask]);

  fromMask.separators.forEach((val, i)=>{
    //console.log([222, fromMask.masks[i+1].length, fromMask.masks[i+1]]);

    const maskLength =  fromMask.masks[i] ? fromMask.masks[i].length : 99;
    const enteredValue = enteredArr[i+1] || '';

    result += `${val}${enteredValue.slice(0, maskLength)}`;
    if(result.length === caret &&
      maskLength &&
      maskLength === enteredValue.length &&
      fromMask.separators[i+1]){

      newCaret = result.length + fromMask.separators[i+1].length;
    }
    //console.log(['result', result.length, maskLength, enteredValue.length, caret]);
  });

  return {
    result,
    caret:  newCaret,
  };
}
export function setCaret(tearget, caretPos) {

  if (tearget != null) {
    if ('selectionStart' in tearget) {
      tearget.selectionStart = caretPos;
      tearget.selectionEnd = caretPos;
    } else if (tearget.setSelectionRange) {
      tearget.setSelectionRange(caretPos, caretPos);
    } else if (tearget.createTextRange) {
      const range = tearget.createTextRange();
      range.collapse(true);
      range.moveEnd('character', caretPos);
      range.moveStart('character', caretPos);
      range.select();
    }
  }
}

export default class InputDuration extends React.Component {


  constructor(props){
    super(props);
    this.state = {
      //value:props && props.value ? props.value : ''
      value:props.value,
    };

    this.input = null;
    this.caret = null;

    this.mask = prepareMask(props.mask, 'x');

    this.onChange = this.onChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.setInputRef = this.setInputRef.bind(this);

  }

  componentDidUpdate() {
    if (this.input && this.caret) {
      setCaret(this.input, this.caret);
    }
  }
  setInputRef(node) {
    this.input = node;
  }

  onKeyDown(e) {
    if (e.target instanceof HTMLInputElement) {
      this.lastCaret = e.target.selectionStart;
    }
  }

  onKeyPress(e) {

    if (/[^\d]/.test(e.key)) {
      e.preventDefault();
    }
  }

  onChange(e){
    const t = e.currentTarget;
    let value = t.value;
    let caret;
    if (e.target instanceof HTMLInputElement) {
      caret = e.target.selectionStart;
    }

    if(this.isValid(value)){


      const {result, caret: formatCaret} = formatNumber(value, this.props.mask, this.mask, caret);



      const oldValue = this.state.value;
      const newValue = result;
      const diffClear = newValue.replace(/[^\d]+/g, '').length - oldValue.replace(/[^\d]+/g, '').length;

      const diffReal = newValue.length - oldValue.length;
      const diff = caret < oldValue.length && diffReal > diffClear ? diffClear : diffReal;
      const newCaret = caret + (diff >= 0 ? diff - 1 : 0);
      if (formatCaret) {
        console.log(['formatCaret', caret, formatCaret]);
        this.caret = formatCaret;
      } else if (newCaret >= 0) {
        this.caret = newCaret;
      }

      if(result){
        this.setState({value: result});
      }
    } else {

      setTimeout(()=>{
        setCaret(this.input, this.lastCaret );
      }, 0);

    }




  }

  isValid(val){

    let regStr = '';

    this.mask.separators.forEach((val, i)=>{
      if(typeof this.mask.separators[i+1] !== 'undefined'){
        regStr += `${val}(\\d*)`
      } else {
        regStr += val;
      }
    });



    return (new RegExp(regStr)).test(val);

/*
    let result = true;
    const arr = val.split(':');
    const [before, after] = arr;
    const beforeNumber = Number(before);
    const afterNumber = Number(after);

    if(arr.length < 2){
      result = false;
    } else if(before.length && beforeNumber > 23){
      result = false;
    } else if(after.length && afterNumber > 59){
      result = false;
    }
*/


    ///return result;
  }


  render() {


    return (
      <div>
        <input
          style={{width:'100%'}}
          ref={this.setInputRef}
          value={this.state.value}
          onChange={this.onChange}
          onKeyPress={this.onKeyPress}
          onKeyDown={this.onKeyDown}
          type="text"
        />
      </div>

    );
  }
}
