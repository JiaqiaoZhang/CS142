'use strict';

function Cs142TemplateProcessor(template) {
    this.template = template;
}

Cs142TemplateProcessor.prototype.fillIn = function(dic){
        let str = this.template;
        for(let i = 0; i < this.template.length - 1; i++){
            if(str.charAt(i) === '{' && str.charAt(i+1) === '{'){
                let property = "", n = i + 1, newstr;
                while(str.charAt(n+1) !== '}'){
                    property += str.charAt(n+1);
                    n++;
                }

                if(dic.hasOwnProperty(property)){
                     newstr = dic[property];
                }else{
                     newstr ="";
                }
                str = str.replace("{{"+property+"}}", newstr);
                i = i + property.length + 2;
            }
        }
        return str;
};

