import LinkInformation,{store}from'./link-information';import{raiseError,raiseWarning,triggerEvent}from'../../../fc-core/src/event-api';import{extend2,domInsertModes,POINTER,HASHSTRING,PXSTRING,NORMAL,regex,BOLD}from'../../../fc-core/src/lib';import domEvtHandler from'../../../fc-core/src/dom-event';const DROP_HASH_RE=regex.dropHash;function checkObjectRenderLocationOverride(a,b){return(a.options.containerElement===b.options.containerElement||a.options.containerElementId===b.options.containerElementId)&&a.options.insertMode===domInsertModes.REPLACE}function linkInitialize(a){var b;!(a.sender.link instanceof LinkInformation)||a.sender.link.root.disposed?a.sender.link=new LinkInformation(a.sender):a.sender.link.parent instanceof this&&(b=a.sender.link.parent.link.items,!b[a.sender.id]&&(b[a.sender.id]=a.sender))}function addlinkedCharts(a){a.prototype.configureLink=function(a,b){var c;if(a instanceof Array){for(c=0;c<a.length;c+=1)'object'!=typeof store[this.link.root.id][c]&&(store[this.link.root.id][c]={}),extend2(store[this.link.root.id][c],a[c],!1,!0);store[this.link.root.id].splice(a.length)}else'object'==typeof a?('number'!=typeof b&&(b=this.link.level),'undefined'==typeof store[this.link.root.id][b]&&(store[this.link.root.id][b]={}),extend2(store[this.link.root.id][b],a,!1,!0)):raiseError(this,'25081731','param','~configureLink()','Unable to update link configuration from set parameters')},a.prototype.drawOverlayButton=function(a){var b,c,d,e=this.jsVars,f=e.overlayButton;if(a&&a.show){for(f||(f=e.overlayButton=document.createElement('span'),domEvtHandler.listen(f,'click',function(){triggerEvent('OverlayButtonClick',e.fcObj,a)})),d=a.message?a.message:'Back';f.firstChild;)f.removeChild(f.firstChild);for(c in f.appendChild(document.createTextNode(d)),e.overlayButtonMessage=d,b={border:'1px solid '+(a.borderColor?a.borderColor.replace(DROP_HASH_RE,HASHSTRING):'#7f8975'),backgroundColor:a.bgColor?a.bgColor.replace(DROP_HASH_RE,HASHSTRING):'#edefec',fontFamily:a.font?a.font:'Verdana,sans',color:'#'+a.fontColor?a.fontColor:'49563a',fontSize:(a.fontSize?a.fontSize:'10')+PXSTRING,padding:(a.padding?a.padding:'3')+PXSTRING,fontWeight:0===parseInt(a.bold,10)?NORMAL:BOLD,position:'absolute',top:'0',right:'0',cursor:POINTER},b)f.style[c]=b[c];e.hcObj.container.appendChild(f),e.overlayButtonActive=!0}else f&&(e.overlayButton=f.parentNode.removeChild(f),e.overlayButtonActive=!1,delete e.overlayButtonMessage)},a.addEventListener('beforeRender',linkInitialize),a.addEventListener('beforeInitialize',linkInitialize),a.addEventListener('linkedChartInvoked',function(b,c){var d,e=b.sender,f=e.clone({dataSource:c.data,dataFormat:c.linkType,link:new LinkInformation(e.link.root,e,e instanceof a),clickedEntity:c.clickedEntity,clickedEntityBox:c.clickedEntityBox},!0),g=c.alias;g&&(!f.typeSource&&f.swfUrl&&(f.typeSource=f.swfUrl.replace(/(.*?)?[^\/]*\.swf.*?/ig,'$1')),f.type=g),e.args&&0!==parseInt(e.args.animate,10)&&delete f.animate,extend2(f,e.link.configuration(),!1,!0),triggerEvent('beforeLinkedItemOpen',e.link.root,{level:e.link.level},void 0,function(){a.items[f.id]instanceof a&&a.items[f.id].dispose(),d=new a(f),checkObjectRenderLocationOverride(d,e)||e.options.overlayButton&&e.options.overlayButton.message||('object'!=typeof e.options.overlayButton&&(e.options.overlayButton={}),e.options.overlayButton.message='Close'),d.render(),triggerEvent('linkedItemOpened',e.link.root,{level:e.link.level,item:d})})}),a.addEventListener('overlayButtonClick',function(b,c){var d,e,f,g;'LinkManager'!==c.id||(d=b.sender,e=d.link.level-1,f=d.link.parent,g=d.link.root,triggerEvent('beforeLinkedItemClose',g,{level:e,item:d},void 0,function(){setTimeout(function(){a.items[d.id]&&d.dispose(),triggerEvent('linkedItemClosed',g,{level:e})},0),f.disposed||f.isActive()||!checkObjectRenderLocationOverride(d,f)?(f._addChartDependency('returnFromLinkedChart',{resolve:()=>({state:3})}),f._setState()):f.render()}))}),a.addEventListener('DrawComplete',function(b){var c,d=b.sender;return d&&'undefined'!=typeof d.link?d.link.root!==d&&d.link.parent instanceof a?d.ref&&'function'==typeof d.drawOverlayButton?void(c=extend2({show:!0,id:'LinkManager'},d.link.parent.options.overlayButton,!1,!0),extend2(c,d.link.parent.link.configuration().overlayButton||{},!1,!0),d.drawOverlayButton(c)):void raiseWarning(d,'04091602','run','::LinkManager^Loaded','Unable to draw overlay button on object. -'+d.id):void 0:void 0}),a.addEventListener('beforeDispose',function(b){var c=b.sender;c&&c.link instanceof LinkInformation&&(c&&c.link&&c.link.parent instanceof a&&c.link.parent.link&&c.link.parent.link.items&&delete c.link.parent.link.items[b.sender.id],delete store[c.id])})}export default{type:'extension',name:'LinkedChart',extension:addlinkedCharts,requiresFusionCharts:!0};