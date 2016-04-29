var UI = {};

UI.info = function(_titre, _message){
  _titre = _titre != "" ? _titre : "";
  _message = _message != "" ? _message : "";
  
  console.log(`[--- ${_titre} ---] ${_message}`);
};

export UI;