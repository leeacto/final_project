!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e(jQuery)}(function(e,t){var i=0,n=Array.prototype.slice,r=e.cleanData;e.cleanData=function(t){for(var i,n=0;null!=(i=t[n]);n++)try{e(i).triggerHandler("remove")}catch(o){}r(t)},e.widget=function(t,i,n){var r,o,a,s,l={},u=t.split(".")[0];t=t.split(".")[1],r=u+"-"+t,n||(n=i,i=e.Widget),e.expr[":"][r.toLowerCase()]=function(t){return!!e.data(t,r)},e[u]=e[u]||{},o=e[u][t],a=e[u][t]=function(e,t){return this._createWidget?(arguments.length&&this._createWidget(e,t),void 0):new a(e,t)},e.extend(a,o,{version:n.version,_proto:e.extend({},n),_childConstructors:[]}),s=new i,s.options=e.widget.extend({},s.options),e.each(n,function(t,n){return e.isFunction(n)?(l[t]=function(){var e=function(){return i.prototype[t].apply(this,arguments)},r=function(e){return i.prototype[t].apply(this,e)};return function(){var t,i=this._super,o=this._superApply;return this._super=e,this._superApply=r,t=n.apply(this,arguments),this._super=i,this._superApply=o,t}}(),void 0):(l[t]=n,void 0)}),a.prototype=e.widget.extend(s,{widgetEventPrefix:o?s.widgetEventPrefix:t},l,{constructor:a,namespace:u,widgetName:t,widgetFullName:r}),o?(e.each(o._childConstructors,function(t,i){var n=i.prototype;e.widget(n.namespace+"."+n.widgetName,a,i._proto)}),delete o._childConstructors):i._childConstructors.push(a),e.widget.bridge(t,a)},e.widget.extend=function(i){for(var r,o,a=n.call(arguments,1),s=0,l=a.length;l>s;s++)for(r in a[s])o=a[s][r],a[s].hasOwnProperty(r)&&o!==t&&(i[r]=e.isPlainObject(o)?e.isPlainObject(i[r])?e.widget.extend({},i[r],o):e.widget.extend({},o):o);return i},e.widget.bridge=function(i,r){var o=r.prototype.widgetFullName||i;e.fn[i]=function(a){var s="string"==typeof a,l=n.call(arguments,1),u=this;return a=!s&&l.length?e.widget.extend.apply(null,[a].concat(l)):a,s?this.each(function(){var n,r=e.data(this,o);return r?e.isFunction(r[a])&&"_"!==a.charAt(0)?(n=r[a].apply(r,l),n!==r&&n!==t?(u=n&&n.jquery?u.pushStack(n.get()):n,!1):void 0):e.error("no such method '"+a+"' for "+i+" widget instance"):e.error("cannot call methods on "+i+" prior to initialization; "+"attempted to call method '"+a+"'")}):this.each(function(){var t=e.data(this,o);t?t.option(a||{})._init():e.data(this,o,new r(a,this))}),u}},e.Widget=function(){},e.Widget._childConstructors=[],e.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(t,n){n=e(n||this.defaultElement||this)[0],this.element=e(n),this.uuid=i++,this.eventNamespace="."+this.widgetName+this.uuid,this.options=e.widget.extend({},this.options,this._getCreateOptions(),t),this.bindings=e(),this.hoverable=e(),this.focusable=e(),n!==this&&(e.data(n,this.widgetFullName,this),this._on(!0,this.element,{remove:function(e){e.target===n&&this.destroy()}}),this.document=e(n.style?n.ownerDocument:n.document||n),this.window=e(this.document[0].defaultView||this.document[0].parentWindow)),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:e.noop,_getCreateEventData:e.noop,_create:e.noop,_init:e.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled "+"ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:e.noop,widget:function(){return this.element},option:function(i,n){var r,o,a,s=i;if(0===arguments.length)return e.widget.extend({},this.options);if("string"==typeof i)if(s={},r=i.split("."),i=r.shift(),r.length){for(o=s[i]=e.widget.extend({},this.options[i]),a=0;a<r.length-1;a++)o[r[a]]=o[r[a]]||{},o=o[r[a]];if(i=r.pop(),n===t)return o[i]===t?null:o[i];o[i]=n}else{if(n===t)return this.options[i]===t?null:this.options[i];s[i]=n}return this._setOptions(s),this},_setOptions:function(e){var t;for(t in e)this._setOption(t,e[t]);return this},_setOption:function(e,t){return this.options[e]=t,"disabled"===e&&(this.widget().toggleClass(this.widgetFullName+"-disabled ui-state-disabled",!!t).attr("aria-disabled",t),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_on:function(t,i,n){var r,o=this;"boolean"!=typeof t&&(n=i,i=t,t=!1),n?(i=r=e(i),this.bindings=this.bindings.add(i)):(n=i,i=this.element,r=this.widget()),e.each(n,function(n,a){function s(){return t||o.options.disabled!==!0&&!e(this).hasClass("ui-state-disabled")?("string"==typeof a?o[a]:a).apply(o,arguments):void 0}"string"!=typeof a&&(s.guid=a.guid=a.guid||s.guid||e.guid++);var l=n.match(/^(\w+)\s*(.*)$/),u=l[1]+o.eventNamespace,p=l[2];p?r.delegate(p,u,s):i.bind(u,s)})},_off:function(e,t){t=(t||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,e.unbind(t).undelegate(t)},_delay:function(e,t){function i(){return("string"==typeof e?n[e]:e).apply(n,arguments)}var n=this;return setTimeout(i,t||0)},_hoverable:function(t){this.hoverable=this.hoverable.add(t),this._on(t,{mouseenter:function(t){e(t.currentTarget).addClass("ui-state-hover")},mouseleave:function(t){e(t.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(t){this.focusable=this.focusable.add(t),this._on(t,{focusin:function(t){e(t.currentTarget).addClass("ui-state-focus")},focusout:function(t){e(t.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(t,i,n){var r,o,a=this.options[t];if(n=n||{},i=e.Event(i),i.type=(t===this.widgetEventPrefix?t:this.widgetEventPrefix+t).toLowerCase(),i.target=this.element[0],o=i.originalEvent)for(r in o)r in i||(i[r]=o[r]);return this.element.trigger(i,n),!(e.isFunction(a)&&a.apply(this.element[0],[i].concat(n))===!1||i.isDefaultPrevented())}},e.each({show:"fadeIn",hide:"fadeOut"},function(t,i){e.Widget.prototype["_"+t]=function(n,r,o){"string"==typeof r&&(r={effect:r});var a,s=r?r===!0||"number"==typeof r?i:r.effect||i:t;r=r||{},"number"==typeof r&&(r={duration:r}),a=!e.isEmptyObject(r),r.complete=o,r.delay&&n.delay(r.delay),a&&e.effects&&e.effects.effect[s]?n[t](r):s!==t&&n[s]?n[s](r.duration,r.easing,o):n.queue(function(i){e(this)[t](),o&&o.call(n[0]),i()})}})}),function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery"],e):e(window.jQuery)}(function(e){"use strict";var t=0;e.ajaxTransport("iframe",function(i){if(i.async){var n,r,o;return{send:function(a,s){n=e('<form style="display:none;"></form>'),n.attr("accept-charset",i.formAcceptCharset),o=/\?/.test(i.url)?"&":"?","DELETE"===i.type?(i.url=i.url+o+"_method=DELETE",i.type="POST"):"PUT"===i.type?(i.url=i.url+o+"_method=PUT",i.type="POST"):"PATCH"===i.type&&(i.url=i.url+o+"_method=PATCH",i.type="POST"),r=e('<iframe src="javascript:false;" name="iframe-transport-'+(t+=1)+'"></iframe>').bind("load",function(){var t,o=e.isArray(i.paramName)?i.paramName:[i.paramName];r.unbind("load").bind("load",function(){var t;try{if(t=r.contents(),!t.length||!t[0].firstChild)throw new Error}catch(i){t=void 0}s(200,"success",{iframe:t}),e('<iframe src="javascript:false;"></iframe>').appendTo(n),n.remove()}),n.prop("target",r.prop("name")).prop("action",i.url).prop("method",i.type),i.formData&&e.each(i.formData,function(t,i){e('<input type="hidden"/>').prop("name",i.name).val(i.value).appendTo(n)}),i.fileInput&&i.fileInput.length&&"POST"===i.type&&(t=i.fileInput.clone(),i.fileInput.after(function(e){return t[e]}),i.paramName&&i.fileInput.each(function(t){e(this).prop("name",o[t]||i.paramName)}),n.append(i.fileInput).prop("enctype","multipart/form-data").prop("encoding","multipart/form-data")),n.submit(),t&&t.length&&i.fileInput.each(function(i,n){var r=e(t[i]);e(n).prop("name",r.prop("name")),r.replaceWith(n)})}),n.append(r).appendTo(document.body)},abort:function(){r&&r.unbind("load").prop("src","javascript".concat(":false;")),n&&n.remove()}}}}),e.ajaxSetup({converters:{"iframe text":function(t){return t&&e(t[0].body).text()},"iframe json":function(t){return t&&e.parseJSON(e(t[0].body).text())},"iframe html":function(t){return t&&e(t[0].body).html()},"iframe script":function(t){return t&&e.globalEval(e(t[0].body).text())}}})}),function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery","jquery.ui.widget"],e):e(window.jQuery)}(function(e){"use strict";e.support.xhrFileUpload=!(!window.XMLHttpRequestUpload||!window.FileReader),e.support.xhrFormDataFileUpload=!!window.FormData,e.propHooks.elements={get:function(t){return e.nodeName(t,"form")?e.grep(t.elements,function(t){return!e.nodeName(t,"input")||"file"!==t.type}):null}},e.widget("blueimp.fileupload",{options:{dropZone:e(document),pasteZone:e(document),fileInput:void 0,replaceFileInput:!0,paramName:void 0,singleFileUploads:!0,limitMultiFileUploads:void 0,sequentialUploads:!1,limitConcurrentUploads:void 0,forceIframeTransport:!1,redirect:void 0,redirectParamName:void 0,postMessage:void 0,multipart:!0,maxChunkSize:void 0,uploadedBytes:void 0,recalculateProgress:!0,progressInterval:100,bitrateInterval:500,formData:function(e){return e.serializeArray()},add:function(e,t){t.submit()},processData:!1,contentType:!1,cache:!1},_refreshOptionsList:["fileInput","dropZone","pasteZone","multipart","forceIframeTransport"],_BitrateTimer:function(){this.timestamp=+new Date,this.loaded=0,this.bitrate=0,this.getBitrate=function(e,t,i){var n=e-this.timestamp;return(!this.bitrate||!i||n>i)&&(this.bitrate=8*(t-this.loaded)*(1e3/n),this.loaded=t,this.timestamp=e),this.bitrate}},_isXHRUpload:function(t){return!t.forceIframeTransport&&(!t.multipart&&e.support.xhrFileUpload||e.support.xhrFormDataFileUpload)},_getFormData:function(t){var i;return"function"==typeof t.formData?t.formData(t.form):e.isArray(t.formData)?t.formData:t.formData?(i=[],e.each(t.formData,function(e,t){i.push({name:e,value:t})}),i):[]},_getTotal:function(t){var i=0;return e.each(t,function(e,t){i+=t.size||1}),i},_onProgress:function(e,t){if(e.lengthComputable){var i,n,r=+new Date;if(t._time&&t.progressInterval&&r-t._time<t.progressInterval&&e.loaded!==e.total)return;t._time=r,i=t.total||this._getTotal(t.files),n=parseInt(e.loaded/e.total*(t.chunkSize||i),10)+(t.uploadedBytes||0),this._loaded+=n-(t.loaded||t.uploadedBytes||0),t.lengthComputable=!0,t.loaded=n,t.total=i,t.bitrate=t._bitrateTimer.getBitrate(r,n,t.bitrateInterval),this._trigger("progress",e,t),this._trigger("progressall",e,{lengthComputable:!0,loaded:this._loaded,total:this._total,bitrate:this._bitrateTimer.getBitrate(r,this._loaded,t.bitrateInterval)})}},_initProgressListener:function(t){var i=this,n=t.xhr?t.xhr():e.ajaxSettings.xhr();n.upload&&(e(n.upload).bind("progress",function(e){var n=e.originalEvent;e.lengthComputable=n.lengthComputable,e.loaded=n.loaded,e.total=n.total,i._onProgress(e,t)}),t.xhr=function(){return n})},_initXHRData:function(t){var i,n=t.files[0],r=t.multipart||!e.support.xhrFileUpload,o=t.paramName[0];t.headers=t.headers||{},t.contentRange&&(t.headers["Content-Range"]=t.contentRange),r?e.support.xhrFormDataFileUpload&&(t.postMessage?(i=this._getFormData(t),t.blob?i.push({name:o,value:t.blob}):e.each(t.files,function(e,n){i.push({name:t.paramName[e]||o,value:n})})):(t.formData instanceof FormData?i=t.formData:(i=new FormData,e.each(this._getFormData(t),function(e,t){i.append(t.name,t.value)})),t.blob?(t.headers["Content-Disposition"]='attachment; filename="'+encodeURI(n.name)+'"',i.append(o,t.blob,n.name)):e.each(t.files,function(e,n){(window.Blob&&n instanceof Blob||window.File&&n instanceof File)&&i.append(t.paramName[e]||o,n,n.name)})),t.data=i):(t.headers["Content-Disposition"]='attachment; filename="'+encodeURI(n.name)+'"',t.contentType=n.type,t.data=t.blob||n),t.blob=null},_initIframeSettings:function(t){t.dataType="iframe "+(t.dataType||""),t.formData=this._getFormData(t),t.redirect&&e("<a></a>").prop("href",t.url).prop("host")!==location.host&&t.formData.push({name:t.redirectParamName||"redirect",value:t.redirect})},_initDataSettings:function(e){this._isXHRUpload(e)?(this._chunkedUpload(e,!0)||(e.data||this._initXHRData(e),this._initProgressListener(e)),e.postMessage&&(e.dataType="postmessage "+(e.dataType||""))):this._initIframeSettings(e,"iframe")},_getParamName:function(t){var i=e(t.fileInput),n=t.paramName;return n?e.isArray(n)||(n=[n]):(n=[],i.each(function(){for(var t=e(this),i=t.prop("name")||"files[]",r=(t.prop("files")||[1]).length;r;)n.push(i),r-=1}),n.length||(n=[i.prop("name")||"files[]"])),n},_initFormSettings:function(t){t.form&&t.form.length||(t.form=e(t.fileInput.prop("form")),t.form.length||(t.form=e(this.options.fileInput.prop("form")))),t.paramName=this._getParamName(t),t.url||(t.url=t.form.prop("action")||location.href),t.type=(t.type||t.form.prop("method")||"").toUpperCase(),"POST"!==t.type&&"PUT"!==t.type&&"PATCH"!==t.type&&(t.type="POST"),t.formAcceptCharset||(t.formAcceptCharset=t.form.attr("accept-charset"))},_getAJAXSettings:function(t){var i=e.extend({},this.options,t);return this._initFormSettings(i),this._initDataSettings(i),i},_enhancePromise:function(e){return e.success=e.done,e.error=e.fail,e.complete=e.always,e},_getXHRPromise:function(t,i,n){var r=e.Deferred(),o=r.promise();return i=i||this.options.context||o,t===!0?r.resolveWith(i,n):t===!1&&r.rejectWith(i,n),o.abort=r.promise,this._enhancePromise(o)},_getUploadedBytes:function(e){var t=e.getResponseHeader("Range"),i=t&&t.split("-"),n=i&&i.length>1&&parseInt(i[1],10);return n&&n+1},_chunkedUpload:function(t,i){var n,r,o=this,a=t.files[0],s=a.size,l=t.uploadedBytes=t.uploadedBytes||0,u=t.maxChunkSize||s,p=a.slice||a.webkitSlice||a.mozSlice,d=e.Deferred(),f=d.promise();return this._isXHRUpload(t)&&p&&(l||s>u)&&!t.data?i?!0:l>=s?(a.error="Uploaded bytes exceed file size",this._getXHRPromise(!1,t.context,[null,"error",a.error])):(r=function(){var i=e.extend({},t);i.blob=p.call(a,l,l+u,a.type),i.chunkSize=i.blob.size,i.contentRange="bytes "+l+"-"+(l+i.chunkSize-1)+"/"+s,o._initXHRData(i),o._initProgressListener(i),n=(o._trigger("chunksend",null,i)!==!1&&e.ajax(i)||o._getXHRPromise(!1,i.context)).done(function(n,a,u){l=o._getUploadedBytes(u)||l+i.chunkSize,(!i.loaded||i.loaded<i.total)&&o._onProgress(e.Event("progress",{lengthComputable:!0,loaded:l-i.uploadedBytes,total:l-i.uploadedBytes}),i),t.uploadedBytes=i.uploadedBytes=l,i.result=n,i.textStatus=a,i.jqXHR=u,o._trigger("chunkdone",null,i),o._trigger("chunkalways",null,i),s>l?r():d.resolveWith(i.context,[n,a,u])}).fail(function(e,t,n){i.jqXHR=e,i.textStatus=t,i.errorThrown=n,o._trigger("chunkfail",null,i),o._trigger("chunkalways",null,i),d.rejectWith(i.context,[e,t,n])})},this._enhancePromise(f),f.abort=function(){return n.abort()},r(),f):!1},_beforeSend:function(e,t){0===this._active&&(this._trigger("start"),this._bitrateTimer=new this._BitrateTimer),this._active+=1,this._loaded+=t.uploadedBytes||0,this._total+=this._getTotal(t.files)},_onDone:function(t,i,n,r){if(!this._isXHRUpload(r)||!r.loaded||r.loaded<r.total){var o=this._getTotal(r.files)||1;this._onProgress(e.Event("progress",{lengthComputable:!0,loaded:o,total:o}),r)}r.result=t,r.textStatus=i,r.jqXHR=n,this._trigger("done",null,r)},_onFail:function(e,t,i,n){n.jqXHR=e,n.textStatus=t,n.errorThrown=i,this._trigger("fail",null,n),n.recalculateProgress&&(this._loaded-=n.loaded||n.uploadedBytes||0,this._total-=n.total||this._getTotal(n.files))},_onAlways:function(e,t,i,n){this._active-=1,this._trigger("always",null,n),0===this._active&&(this._trigger("stop"),this._loaded=this._total=0,this._bitrateTimer=null)},_onSend:function(t,i){var n,r,o,a,s=this,l=s._getAJAXSettings(i),u=function(){return s._sending+=1,l._bitrateTimer=new s._BitrateTimer,n=n||((r||s._trigger("send",t,l)===!1)&&s._getXHRPromise(!1,l.context,r)||s._chunkedUpload(l)||e.ajax(l)).done(function(e,t,i){s._onDone(e,t,i,l)}).fail(function(e,t,i){s._onFail(e,t,i,l)}).always(function(e,t,i){if(s._sending-=1,s._onAlways(e,t,i,l),l.limitConcurrentUploads&&l.limitConcurrentUploads>s._sending)for(var n,r=s._slots.shift();r;){if(n=r.state?"pending"===r.state():!r.isRejected()){r.resolve();break}r=s._slots.shift()}})};return this._beforeSend(t,l),this.options.sequentialUploads||this.options.limitConcurrentUploads&&this.options.limitConcurrentUploads<=this._sending?(this.options.limitConcurrentUploads>1?(o=e.Deferred(),this._slots.push(o),a=o.pipe(u)):a=this._sequence=this._sequence.pipe(u,u),a.abort=function(){return r=[void 0,"abort","abort"],n?n.abort():(o&&o.rejectWith(l.context,r),u())},this._enhancePromise(a)):u()},_onAdd:function(t,i){var n,r,o,a,s=this,l=!0,u=e.extend({},this.options,i),p=u.limitMultiFileUploads,d=this._getParamName(u);if((u.singleFileUploads||p)&&this._isXHRUpload(u))if(!u.singleFileUploads&&p)for(o=[],n=[],a=0;a<i.files.length;a+=p)o.push(i.files.slice(a,a+p)),r=d.slice(a,a+p),r.length||(r=d),n.push(r);else n=d;else o=[i.files],n=[d];return i.originalFiles=i.files,e.each(o||i.files,function(r,a){var u=e.extend({},i);return u.files=o?a:[a],u.paramName=n[r],u.submit=function(){return u.jqXHR=this.jqXHR=s._trigger("submit",t,this)!==!1&&s._onSend(t,this),this.jqXHR},l=s._trigger("add",t,u)}),l},_replaceFileInput:function(t){var i=t.clone(!0);e("<form></form>").append(i)[0].reset(),t.after(i).detach(),e.cleanData(t.unbind("remove")),this.options.fileInput=this.options.fileInput.map(function(e,n){return n===t[0]?i[0]:n}),t[0]===this.element[0]&&(this.element=i)},_handleFileTreeEntry:function(t,i){var n,r=this,o=e.Deferred(),a=function(e){e&&!e.entry&&(e.entry=t),o.resolve([e])};return i=i||"",t.isFile?t._file?(t._file.relativePath=i,o.resolve(t._file)):t.file(function(e){e.relativePath=i,o.resolve(e)},a):t.isDirectory?(n=t.createReader(),n.readEntries(function(e){r._handleFileTreeEntries(e,i+t.name+"/").done(function(e){o.resolve(e)}).fail(a)},a)):o.resolve([]),o.promise()},_handleFileTreeEntries:function(t,i){var n=this;return e.when.apply(e,e.map(t,function(e){return n._handleFileTreeEntry(e,i)})).pipe(function(){return Array.prototype.concat.apply([],arguments)})},_getDroppedFiles:function(t){t=t||{};var i=t.items;return i&&i.length&&(i[0].webkitGetAsEntry||i[0].getAsEntry)?this._handleFileTreeEntries(e.map(i,function(e){var t;return e.webkitGetAsEntry?(t=e.webkitGetAsEntry(),t&&(t._file=e.getAsFile()),t):e.getAsEntry()})):e.Deferred().resolve(e.makeArray(t.files)).promise()},_getSingleFileInputFiles:function(t){t=e(t);var i,n,r=t.prop("webkitEntries")||t.prop("entries");if(r&&r.length)return this._handleFileTreeEntries(r);if(i=e.makeArray(t.prop("files")),i.length)void 0===i[0].name&&i[0].fileName&&e.each(i,function(e,t){t.name=t.fileName,t.size=t.fileSize});else{if(n=t.prop("value"),!n)return e.Deferred().resolve([]).promise();i=[{name:n.replace(/^.*\\/,"")}]}return e.Deferred().resolve(i).promise()},_getFileInputFiles:function(t){return t instanceof e&&1!==t.length?e.when.apply(e,e.map(t,this._getSingleFileInputFiles)).pipe(function(){return Array.prototype.concat.apply([],arguments)}):this._getSingleFileInputFiles(t)},_onChange:function(t){var i=this,n={fileInput:e(t.target),form:e(t.target.form)};this._getFileInputFiles(n.fileInput).always(function(e){n.files=e,i.options.replaceFileInput&&i._replaceFileInput(n.fileInput),i._trigger("change",t,n)!==!1&&i._onAdd(t,n)})},_onPaste:function(t){var i=t.originalEvent.clipboardData,n=i&&i.items||[],r={files:[]};return e.each(n,function(e,t){var i=t.getAsFile&&t.getAsFile();i&&r.files.push(i)}),this._trigger("paste",t,r)===!1||this._onAdd(t,r)===!1?!1:void 0},_onDrop:function(e){var t=this,i=e.dataTransfer=e.originalEvent.dataTransfer,n={};i&&i.files&&i.files.length&&e.preventDefault(),this._getDroppedFiles(i).always(function(i){n.files=i,t._trigger("drop",e,n)!==!1&&t._onAdd(e,n)})},_onDragOver:function(t){var i=t.dataTransfer=t.originalEvent.dataTransfer;return this._trigger("dragover",t)===!1?!1:(i&&-1!==e.inArray("Files",i.types)&&(i.dropEffect="copy",t.preventDefault()),void 0)},_initEventHandlers:function(){this._isXHRUpload(this.options)&&(this._on(this.options.dropZone,{dragover:this._onDragOver,drop:this._onDrop}),this._on(this.options.pasteZone,{paste:this._onPaste})),this._on(this.options.fileInput,{change:this._onChange})},_destroyEventHandlers:function(){this._off(this.options.dropZone,"dragover drop"),this._off(this.options.pasteZone,"paste"),this._off(this.options.fileInput,"change")},_setOption:function(t,i){var n=-1!==e.inArray(t,this._refreshOptionsList);n&&this._destroyEventHandlers(),this._super(t,i),n&&(this._initSpecialOptions(),this._initEventHandlers())},_initSpecialOptions:function(){var t=this.options;void 0===t.fileInput?t.fileInput=this.element.is('input[type="file"]')?this.element:this.element.find('input[type="file"]'):t.fileInput instanceof e||(t.fileInput=e(t.fileInput)),t.dropZone instanceof e||(t.dropZone=e(t.dropZone)),t.pasteZone instanceof e||(t.pasteZone=e(t.pasteZone))},_create:function(){var t=this.options;e.extend(t,e(this.element[0].cloneNode(!1)).data()),this._initSpecialOptions(),this._slots=[],this._sequence=this._getXHRPromise(!0),this._sending=this._active=this._loaded=this._total=0,this._initEventHandlers()},_destroy:function(){this._destroyEventHandlers()},add:function(t){var i=this;t&&!this.options.disabled&&(t.fileInput&&!t.files?this._getFileInputFiles(t.fileInput).always(function(e){t.files=e,i._onAdd(null,t)}):(t.files=e.makeArray(t.files),this._onAdd(null,t)))},send:function(t){if(t&&!this.options.disabled){if(t.fileInput&&!t.files){var i,n,r=this,o=e.Deferred(),a=o.promise();return a.abort=function(){return n=!0,i?i.abort():(o.reject(null,"abort","abort"),a)},this._getFileInputFiles(t.fileInput).always(function(e){n||(t.files=e,i=r._onSend(null,t).then(function(e,t,i){o.resolve(e,t,i)},function(e,t,i){o.reject(e,t,i)}))}),this._enhancePromise(a)}if(t.files=e.makeArray(t.files),t.files.length)return this._onSend(null,t)}return this._getXHRPromise(!1,t&&t.context)}})});