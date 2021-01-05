// import { assert } from "chai";
// import {it} from "mocha";
//
// import Templator from "../Templator";
//
// describe('Templator',()=>{
//     const template = `<button type="submit" class="{{ parent.class }}">{{ parent.text }}</button>`;
//     const cntx = {
//         parent:{
//             class:'test-class',
//             text:'Надпись на кнопке'
//         }
//     };
//     const templator = new Templator(template);
//     it('Возвращаем правильную строку',function () {
//         assert.equal(templator.compile(cntx),'<button type="submit" class="test-class">Надпись на кнопке</button>','Совпадение достигнуто');
//     });
// });