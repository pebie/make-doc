import Highlights from 'highlights';
import process from 'process';
import fs from 'fs';
import prompt from 'prompt';

//Try to click on the line above the highlighted one.
let fileName;
let helper = './doc/helpers/DocHelper.js';
let highlighter = new Highlights();

/*
I can tell you a bigger story : Minions ipsum jeje po kass poopayee tank yuuu! Pepete.
Tank yuuu! gelatooo aaaaaah belloo! Uuuhhh. Po kass belloo! Jiji baboiii butt bappleees
baboiii po kass la bodaaa uuuhhh. Chasy chasy underweaaar gelatooo. Potatoooo belloo!
Bee do bee do bee do belloo! Wiiiii la bodaaa bananaaaa. 
*/
let code;
var schema = {
  properties: {
    fileName: {
      description: 'Enter a js file path',
      pattern: /\.(js)$/gi,
      default: 'makedoc.js',
      required: true,
      before: function(value) {
        console.log(value);
        try{
          code = fs.readFileSync(value, 'utf-8')
        }catch(err){
          console.log(err);
          return 1;
        }
        return value;
      }
    }
  }
};

prompt.start();

prompt.get(schema,  (err, result)=> {
  if (err) { return Prompt.onErr(err); }
  const MakeDoc    =     {
    highlight: () => {
      let highlightedCode = highlighter.highlightSync({
        fileContents: code,
        scopeName: 'source.js'
      });
      return [
        'const DocHelper = {',
        '   getDocHtml: ()=>{',
        '       var result = \'' + highlightedCode + '\'',
        '       return result;',
        '   }',
        '};',
        'export default DocHelper;'
      ].join('\n');
    }
  };

  var js = MakeDoc.highlight(code);

  fs.writeFileSync(helper, js);


});
