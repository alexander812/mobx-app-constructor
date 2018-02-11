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

  console.log([123,arr1, arr2] );
  return {
    separators: arr1,
    masks: arr2,
  }

}


export function formatNumber(str, mask, cache) {
  //const arr = str.split('');

  let result = mask;
  let regStr = '';

  const fromMask = cache;

  fromMask.separators.forEach((val, i)=>{
    if(fromMask.separators[i+1]){
      regStr += `${val}(\\d*)`
    }
  });



  console.log([fromMask, (new RegExp(regStr)).exec(str) ]);
  return;
  //const fromString = prepareMask(str,  "\\d");

















/*
  let result = maskParam;
  const [maskBefore, maskAfter] = maskParam.split(':');
  const [strBefore, strAfter] = str.split(':');
  let resultBefore = strBefore && strBefore.split('');
  let resultAfter = strAfter && strAfter.split('');


  maskBefore.split('').forEach((val, index) => {
    const letter = resultBefore && resultBefore[index];
    const replacement = /[\d]/.test(letter)
      ? letter : '';
    result = result.replace(/x/, replacement);
  });


  maskAfter.split('').forEach((val, index) => {
    const letter = resultAfter && resultAfter[index];
    const replacement = /[\d]/.test(letter)
      ? letter : '';
    result = result.replace(/x/, replacement);
  });
*/


  //return result;


/*  let mask = maskParam;
  arr.forEach((letter) => {
    if (/[\d\+]/.test(letter)) {
      mask = mask.replace(/x/, letter);
    }
  });

  mask = trim(mask.replace(/x(-)/g, '').replace(/x/g, ''));

  return mask;*/
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

  onKeyPress(e) {
    if (/[^\d]/.test(e.key)) {
      e.preventDefault();
    }
  }

  onChange(e){
    const t = e.currentTarget;
    let result = t.value;
    let caret;
    if (e.target instanceof HTMLInputElement) {
      caret = e.target.selectionStart;
    }

/*
    if(!/[\:]/.test(result)){
      return;
    }
*/



    if(this.isValid(result)){

      result = formatNumber(result, this.props.mask, this.mask);


      const oldValue = this.state.value;
      const newValue = result;
      const diffClear = newValue.replace(/[^\d]+/g, '').length - oldValue.replace(/[^\d]+/g, '').length;

      const diffReal = newValue.length - oldValue.length;
      const diff = caret < oldValue.length && diffReal > diffClear ? diffClear : diffReal;
      const newCaret = caret + (diff >= 0 ? diff - 1 : 0);
      if (newCaret >= 0) {
        this.caret = newCaret;
      }

      if(result){
        this.setState({value: result});
      }
    } else {

      setTimeout(()=>{
        setCaret(this.input, this.caret);
      }, 0);

    }




  }

  isValid(val){

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


    return result;
  }


  render() {


    return (
      <div>
        <input
          ref={this.setInputRef}
          value={this.state.value}
          onChange={this.onChange}
          onKeyPress={this.onKeyPress}
          type="text"

        />
      </div>

    );
  }
}
