import { ControllerType } from "../../controllerType.js";

export const messagesController:ControllerType = {
    parent: {
        name: 'ul',
        class: 'chat-area',
    },
    elements:[
        {
            class: 'chat-area__date',
            text: '11 ноября',
        },
        {
            class: 'chat-area__row_in',
            text: '                <div class="chat-area__message chat-area__message_in" data-time="15:20">\n' +
                '                    Утихли истерические женские крики, отсверлили свистки милиции, две санитарные\n' +
                '                    машины увезли: одна – обезглавленное тело и отрезанную голову в морг, другая –\n' +
                '                    раненную осколками стекла красавицу вожатую, дворники в белых фартуках убрали\n' +
                '                    осколки стекол и засыпали песком кровавые лужи, а Иван Николаевич как упал на\n' +
                '                    скамейку, не добежав до турникета, так и остался на ней.\n' +
                '\n' +
                '                    Несколько раз он пытался подняться, но ноги его не слушались – с Бездомным\n' +
                '                    приключилось что-то вроде паралича.\n' +
                '\n' +
                '                    Поэт бросился бежать к турникету, как только услыхал первый вопль, и видел, как голова\n' +
                '                    подскакивала на мостовой. От этого он до того обезумел, что, упавши на скамью, укусил\n' +
                '                    себя за руку до крови.\n' +
                '                </div>',
        },
        {
            class: 'chat-area__row_in',
            text: '                <div class="chat-area__message chat-area__message_in chat-area__message_image" data-time="15:30">\n' +
                '                    <img src="images/image-test.jpg" alt="test">\n' +
                '                </div>'
        },
        {
            class: 'chat-area__row_out',
            text: '                <div class="chat-area__message chat-area__message_out" data-time="16:20">\n' +
                '                    Че-как?\n' +
                '                </div>'
        },
    ]
}