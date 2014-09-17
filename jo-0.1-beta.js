/*!
 * jo JavaScript Library v 0.1
 * http://jo.com/
 *
 * Copyright (c) 2009 Ivan Elías Avila
 * Dual licensed under the MIT and GPL licenses.
 * http://docs.jo.com/License
 *
 * Date: 2009-09-03 22:03:21
 * Revision: 2
 
 */

/**
 * Modo de uso de las funciones de jo
 * extend : 
 * get : 
 * create : var newSpan = jo.create("span");
 * insert : $$("result").insert(newSpan);
 * css : var otroBorder = $$("result").css("border");
 *       $$("result").css("border", "1px #000000 solid");
 * attr: var oldSrc = $$("result").attr("src");
 *       jo.get("otro").attr("src", "carpeta/archivo.jpg");
 * addEvent : $$("result").addEvent("click", function(){alert("Hizo clic");});
 * removeEvent: $$("result").removeEvent("click", function(){alert("Click");});
 */

var jo = (function(){
    var extensionMethods = {
    //use: $$("id").extend({option: function(){...}}); | $$("id").extend(jo);
    extend: function(opt){
        for (var name in opt) this[name] = opt[name];
        return this;
    },
    //use: $$("id")
    get: function(id){
        return jo.extend(document.getElementById(id), extensionMethods);
    },
    //use: $$("id").create(tag,id[,text, classStyle]);
    create: function(tag,idname){
        var obj = this.setElement(tag);
        if(arguments.length > 1){
            if(arguments[2] != undefined){
                var html = (arguments[2].length > 0 && (typeof arguments[2] == 'string')) ? arguments[2] : "";
                obj.innerHTML = html;
            }
            if(arguments[3] != undefined){
                var style = (arguments[3].length > 0 && (typeof arguments[3] == 'string')) ? arguments[3] : "";
                obj.className = style;
            }
        }
        obj.id = idname;
        return this.appendChild(obj);
    },
    //use: $$("id").remove('tun1')
    remove: function(id){
        try{
            var hijo = this.getElement(id);
            return this.removeChild(hijo);
        }catch(e){
            //Capture error
        }
    },
    //use: $$("id").css('border','1px #000000 solid','font','bold 20px verdana','color','#990000','padding','60px');
    css: function() {
    if (arguments.length == 1) {
        var a = arguments[0];
        if (typeof a == 'string') {
          return this.style[a];
        }else {
          for (var p in a) this.style[p] = a[p];
        }
    }else {
        for(var i = 0, l = arguments.length; i<l;) {
            this.style[arguments[i++]] = arguments[i++]
        }
    }
    return this;
    },
    //use: $$("id").attr("value",23);
    attr: function(name, value){
        if(!value) return this.getAttribute(name);
        this.setAttribute(name, value);
        return this;
    },
    //use: $$("id").addEvent('click',function);
    addEvent: function(type, fn ) {
    if ( this.addEventListener ) {
        this.addEventListener( type, fn, false );
    }else if(this.attachEvent){
        var xthis = this;
        var f= function(){fn.call(xthis,window.event);}
        this.attachEvent( 'on'+type, f);
        this[fn.toString()+type]=f;
    }else{
        this['on'+type]=fn;
    }
    return this;
    },
    //use: $$("id").removeEvent('click',function);
    removeEvent: function(type, fn ) {
    if( this.removeEventListener){
        this.removeEventListener(type, fn, false);
    }else if(this.detachEvent){
        this.detachEvent('on'+type,this[fn.toString()+type]);
        this[fn.toString()+type] = null;
    }else{
        this['on'+type]=function(){};
    }
    if(arguments.length == 3){
        if (typeof arguments[2] == 'string') {
            eval(arguments[2]+'()');
        }else{
            arguments[2]();
        }
    }
    return this;
    },
     //use: $$("id").write("texto");
    write: function(html){
        return this.innerHTML = html;
    },
    //use: $&.getElement("id");
     getElement: function(id){
      return document.getElementById(id);
    },
    //use: $$.setElement("div");
    setElement: function(tag){
        return document.createElement(tag);
    }
};
return {
    //use: jo.extend(object, options);
    extend: function(obj, opt){
        for (var name in opt) obj[name] = opt[name];
        return obj;
    },
    //use: $("id")
    get: function(id){
        return jo.extend(document.getElementById(id), extensionMethods);
    }
};
}());

//Definition Context
window.$$ = jo.get;
