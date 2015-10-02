define(['handlebars'], function (Handlebars){

   Handlebars.registerHelper('ifequal', function (val, comp, context, options){
      if (String(val) === String(comp)){
        return options.fn(context);
      } else {
        return options.inverse(context);
      }
    });

});