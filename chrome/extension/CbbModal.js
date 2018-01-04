import React, { PropTypes, Component } from 'react';
import style from '../assets/bccModal.css';

export default class CbbModal extends Component { 

  constructor(props) {
    super(props);
  }

  
  render() {
    return (
      <div id="cbModal">
        <div id="p1" className="tab">Listen <br/>& Ask</div>
        <div id="cbb-1" className="suggestion1">How would you define... ?</div>
        <div id="cbb-2"  className="suggestion1">Good point...</div>
        <div id="cbb-3" className="suggestion1">What made you aware of this problem?</div>
        <div id="cbb-4" className="suggestion1">Want to talk about this in offline?</div>
        <div id="p1" className="tab">Group <br/>& Frame</div>
        <div id="cp" className="tab" title="Cognitive Politics Audience Method">
          Based on <a href="http://cognitivepolitics.org">Cognitive Politics</a>,
          this method is intended to pull an audience
        </div>
        <div id="rcc" className="tab" title="Radical Civility Cycle">
          Based on <a href="http://cognitivepolitics.org">Cognitive Politics</a>,
          this method is intended especially for group conversations, 
          where people might be listening besides the person you're talking
          with.
        </div>
      </div>
    );
  }
}
