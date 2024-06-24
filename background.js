/*
Copyright 2014 Google Inc. All rights reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
var AltGr = { PLAIN: "plain", ALTERNATE: "alternate" };
var Shift = { PLAIN: "plain", SHIFTED: "shifted" };

var contextID = undefined;
var altGrState = AltGr.PLAIN;
var shiftState = Shift.PLAIN;
/*var deadKeyRegister = undefined;*/
var lastRemappedKeyEvent = undefined;

var lut = {
"Backquote": { "plain": {"plain": "߷", "shifted": "߽"}, "alternate": {"plain": "", "shifted":""}, "code": "Backquote"},
"Digit1": { "plain": {"plain": "߁", "shifted": "߹"}, "alternate": {"plain": "", "shifted":""}, "code": "Digit1"},
"Digit2": { "plain": {"plain": "߂", "shifted": "@"}, "alternate": {"plain": "", "shifted":""}, "code": "Digit2"},
"Digit3": { "plain": {"plain": "߃", "shifted": "#"}, "alternate": {"plain": "", "shifted":""}, "code": "Digit3"},
"Digit4": { "plain": {"plain": "߄", "shifted": "$"}, "alternate": {"plain": "", "shifted":""}, "code": "Digit4"},
"Digit5": { "plain": {"plain": "߅", "shifted": "%"}, "alternate": {"plain": "€", "shifted":""}, "code": "Digit5"},
"Digit6": { "plain": {"plain": "߆", "shifted": "^"}, "alternate": {"plain": "", "shifted":""}, "code": "Digit6"},
"Digit7": { "plain": {"plain": "߇", "shifted": "&"}, "alternate": {"plain": "", "shifted":""}, "code": "Digit7"},
"Digit8": { "plain": {"plain": "߈", "shifted": "*"}, "alternate": {"plain": "", "shifted":""}, "code": "Digit8"},
"Digit9": { "plain": {"plain": "߉", "shifted": "("}, "alternate": {"plain": "", "shifted":""}, "code": "Digit9"},
"Digit0": { "plain": {"plain": "߀", "shifted": ")"}, "alternate": {"plain": "", "shifted":""}, "code": "Digit0"},
"Minus": { "plain": {"plain": "-", "shifted": "_"}, "alternate": {"plain": "", "shifted":""}, "code": "Minus"},
"Equal": { "plain": {"plain": "=", "shifted": "+"}, "alternate": {"plain": "", "shifted":""}, "code": "Equal"},
"KeyQ": { "plain": {"plain": "ߔ", "shifted": "ߩ"}, "alternate": {"plain": "", "shifted":""}, "code": "#N/A"},
"KeyW": { "plain": {"plain": "ߧ", "shifted": "ߨ"}, "alternate": {"plain": "", "shifted":""}, "code": "#N/A"},
"KeyE": { "plain": {"plain": "ߠ", "shifted": ""}, "alternate": {"plain": "", "shifted":""}, "code": "#N/A"},
"KeyR": { "plain": {"plain": "ߥ", "shifted": ""}, "alternate": {"plain": "", "shifted":""}, "code": "#N/A"},
"KeyT": { "plain": {"plain": "ߦ", "shifted": "߿"}, "alternate": {"plain": "", "shifted":""}, "code": "#N/A"},
"KeyY": { "plain": {"plain": "ߙ", "shifted": "ߚ"}, "alternate": {"plain": "", "shifted":""}, "code": "#N/A"},
"KeyU": { "plain": {"plain": "ߗ", "shifted": "߾"}, "alternate": {"plain": "", "shifted":""}, "code": "#N/A"},
"KeyI": { "plain": {"plain": "ߜ", "shifted": "÷"}, "alternate": {"plain": "", "shifted":""}, "code": "#N/A"},
"KeyO": { "plain": {"plain": "ߢ", "shifted": "×"}, "alternate": {"plain": "", "shifted":""}, "code": "#N/A"},
"KeyP": { "plain": {"plain": "ߡ", "shifted": "ߪ"}, "alternate": {"plain": "", "shifted":""}, "code": "#N/A"},
"BracketLeft": { "plain": {"plain": "ߤ", "shifted": "‹"}, "alternate": {"plain": "[", "shifted":"{"}, "code": "#N/A"},
"BracketRight": { "plain": {"plain": "ߒ", "shifted": "›"}, "alternate": {"plain": "]", "shifted":"}"}, "code": "#N/A"},
"Backslash": { "plain": {"plain": "\"", "shifted": "|"}, "alternate": {"plain": "", "shifted":""}, "code": "#N/A"},
"KeyA": { "plain": {"plain": "ߏ", "shifted": "߶"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyA"},
"KeyS": { "plain": {"plain": "ߎ", "shifted": "°"}, "alternate": {"plain": "", "shifted":""}, "code": "#N/A"},
"KeyD": { "plain": {"plain": "ߍ", "shifted": "["}, "alternate": {"plain": "", "shifted":""}, "code": "#N/A"},
"KeyF": { "plain": {"plain": "ߌ", "shifted": "]"}, "alternate": {"plain": "", "shifted":""}, "code": "#N/A"},
"KeyG": { "plain": {"plain": "ߋ", "shifted": "﴾"}, "alternate": {"plain": "", "shifted":""}, "code": "#N/A"},
"KeyH": { "plain": {"plain": "ߊ", "shifted": "﴿"}, "alternate": {"plain": "", "shifted":""}, "code": "#N/A"},
"KeyJ": { "plain": {"plain": "ߖ", "shifted": "ߺ"}, "alternate": {"plain": "", "shifted":""}, "code": "#N/A"},
"KeyK": { "plain": {"plain": "ߝ", "shifted": "،"}, "alternate": {"plain": "", "shifted":""}, "code": "#N/A"},
"KeyL": { "plain": {"plain": "ߣ", "shifted": "/"}, "alternate": {"plain": "", "shifted":""}, "code": "#N/A"},
"Semicolon": { "plain": {"plain": "ߕ", "shifted": ":"}, "alternate": {"plain": "", "shifted":""}, "code": "#N/A"},
"Quote": { "plain": {"plain": "ߓ", "shifted": ""}, "alternate": {"plain": "", "shifted":""}, "code": "#N/A"},
"KeyZ": { "plain": {"plain": "ߐ", "shifted": "߳"}, "alternate": {"plain": "", "shifted":""}, "code": "#N/A"},
"KeyX": { "plain": {"plain": "߲", "shifted": "߱"}, "alternate": {"plain": "", "shifted":""}, "code": "#N/A"},
"KeyC": { "plain": {"plain": "ߵ", "shifted": "߭"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyC"},
"KeyV": { "plain": {"plain": "ߴ", "shifted": "߮"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyV"},
"KeyB": { "plain": {"plain": "߬", "shifted": "߰"}, "alternate": {"plain": "", "shifted":""}, "code": "#N/A"},
"KeyN": { "plain": {"plain": "߫", "shifted": "߯"}, "alternate": {"plain": "", "shifted":""}, "code": "#N/A"},
"KeyM": { "plain": {"plain": "ߟ", "shifted": "߸"}, "alternate": {"plain": "", "shifted":""}, "code": "#N/A"},
"Comma": { "plain": {"plain": "ߛ", "shifted": "ߑ"}, "alternate": {"plain": "", "shifted":""}, "code": "#N/A"},
"Period": { "plain": {"plain": "ߘ", "shifted": "."}, "alternate": {"plain": "", "shifted":""}, "code": "#N/A"},
"Slash": { "plain": {"plain": "ߞ", "shifted": "؟"}, "alternate": {"plain": "", "shifted":""}, "code": "#N/A"},
};


chrome.input.ime.onFocus.addListener(function(context) {
  contextID = context.contextID;
});

function updateAltGrState(keyData) {
  altGrState = (keyData.code == "AltRight") ? ((keyData.type == "keydown") ? AltGr.ALTERNATE : AltGr.PLAIN)
                                              : altGrState;
}

function updateShiftState(keyData) {
  shiftState = ((keyData.shiftKey && !(keyData.capsLock)) || (!(keyData.shiftKey) && keyData.capsLock)) ? 
                 Shift.SHIFTED : Shift.PLAIN;
}

function isPureModifier(keyData) {
  return (keyData.key == "Shift") || (keyData.key == "Ctrl") || (keyData.key == "Alt");
}

function isRemappedEvent(keyData) {
  // hack, should check for a sender ID (to be added to KeyData)
  return lastRemappedKeyEvent != undefined &&
         (lastRemappedKeyEvent.key == keyData.key &&
          lastRemappedKeyEvent.code == keyData.code &&
          lastRemappedKeyEvent.type == keyData.type
         ); // requestID would be different so we are not checking for it  
}


chrome.input.ime.onKeyEvent.addListener(
    function(engineID, keyData) {
      var handled = false;
      
      if (isRemappedEvent(keyData)) {
        lastRemappedKeyEvent = undefined;
        return handled;
      }

      updateAltGrState(keyData);
      updateShiftState(keyData);
                
      if (lut[keyData.code]) {
          var remappedKeyData = keyData;
          remappedKeyData.key = lut[keyData.code][altGrState][shiftState];
          remappedKeyData.code = lut[keyData.code].code;
        
        if (chrome.input.ime.sendKeyEvents != undefined) {
          chrome.input.ime.sendKeyEvents({"contextID": contextID, "keyData": [remappedKeyData]});
          handled = true;
          lastRemappedKeyEvent = remappedKeyData;
        } else if (keyData.type == "keydown" && !isPureModifier(keyData)) {
          chrome.input.ime.commitText({"contextID": contextID, "text": remappedKeyData.key});
          handled = true;
        }
      }
      
      return handled;
});
