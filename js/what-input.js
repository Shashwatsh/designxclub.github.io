window.whatInput=(function(){'use strict';var activeKeys=[];var body;var buffer=false;var currentInput=null;var nonTypingInputs=['button','checkbox','file','image','radio','reset','submit'];var mouseWheel=detectWheel();var ignoreMap=[16,17,18,91,93];var inputMap={'keydown':'keyboard','keyup':'keyboard','mousedown':'mouse','mousemove':'mouse','MSPointerDown':'pointer','MSPointerMove':'pointer','pointerdown':'pointer','pointermove':'pointer','touchstart':'touch'};inputMap[detectWheel()]='mouse';var inputTypes=[];var keyMap={9:'tab',13:'enter',16:'shift',27:'esc',32:'space',37:'left',38:'up',39:'right',40:'down'};var pointerMap={2:'touch',3:'touch',4:'mouse'};var timer;function eventBuffer(){clearTimer();setInput(event);buffer=true;timer=window.setTimeout(function(){buffer=false;},650);}
  function bufferedEvent(event){if(!buffer)setInput(event);}
  function unBufferedEvent(event){clearTimer();setInput(event);}
  function clearTimer(){window.clearTimeout(timer);}
  function setInput(event){var eventKey=key(event);var value=inputMap[event.type];if(value==='pointer')value=pointerType(event);if(currentInput!==value){var eventTarget=target(event);var eventTargetNode=eventTarget.nodeName.toLowerCase();var eventTargetType=(eventTargetNode==='input')?eventTarget.getAttribute('type'):null;if((!body.hasAttribute('data-whatinput-formtyping')&&currentInput&&value==='keyboard'&&keyMap[eventKey]!=='tab'&&(eventTargetNode==='textarea'||eventTargetNode==='select'||(eventTargetNode==='input'&&nonTypingInputs.indexOf(eventTargetType)<0)))||(ignoreMap.indexOf(eventKey)>-1)){}else{switchInput(value);}}
    if(value==='keyboard')logKeys(eventKey);}
  function switchInput(string){currentInput=string;body.setAttribute('data-whatinput',currentInput);if(inputTypes.indexOf(currentInput)===-1)inputTypes.push(currentInput);}
  function key(event){return(event.keyCode)?event.keyCode:event.which;}
  function target(event){return event.target||event.srcElement;}
  function pointerType(event){if(typeof event.pointerType==='number'){return pointerMap[event.pointerType];}else{return(event.pointerType==='pen')?'touch':event.pointerType;}}
  function logKeys(eventKey){if(activeKeys.indexOf(keyMap[eventKey])===-1&&keyMap[eventKey])activeKeys.push(keyMap[eventKey]);}
  function unLogKeys(event){var eventKey=key(event);var arrayPos=activeKeys.indexOf(keyMap[eventKey]);if(arrayPos!==-1)activeKeys.splice(arrayPos,1);}
  function bindEvents(){body=document.body;if(window.PointerEvent){body.addEventListener('pointerdown',bufferedEvent);body.addEventListener('pointermove',bufferedEvent);}else if(window.MSPointerEvent){body.addEventListener('MSPointerDown',bufferedEvent);body.addEventListener('MSPointerMove',bufferedEvent);}else{body.addEventListener('mousedown',bufferedEvent);body.addEventListener('mousemove',bufferedEvent);if('ontouchstart'in window){body.addEventListener('touchstart',eventBuffer);}}
    body.addEventListener(mouseWheel,bufferedEvent);body.addEventListener('keydown',unBufferedEvent);body.addEventListener('keyup',unBufferedEvent);document.addEventListener('keyup',unLogKeys);}
  function detectWheel(){return mouseWheel='onwheel'in document.createElement('div')?'wheel':document.onmousewheel!==undefined?'mousewheel':'DOMMouseScroll';}
  if('addEventListener'in window&&Array.prototype.indexOf){if(document.body){bindEvents();}else{document.addEventListener('DOMContentLoaded',bindEvents);}}
  return{ask:function(){return currentInput;},keys:function(){return activeKeys;},types:function(){return inputTypes;},set:switchInput};}());