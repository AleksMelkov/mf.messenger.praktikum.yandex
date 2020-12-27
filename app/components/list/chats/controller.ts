import EventBus from "../../../EventBus.js";
import { GLOBAL_EVENTS} from "../../../GlobalEvents.js";
import Store from "../../../Store.js";
import { GetUserApi } from "../../../api/get-user-api.js";

const eventBus = new EventBus();
const userApi = new GetUserApi('/user');

type ChatElement = Record<string, string|number>

export const chatsController = {
    component_name:'',
    parent: {
        name: 'ul',
        class: 'chat-list',
    },
    elements:[
        // {
        //     id: 'pb6m8452xemf',
        //     class: 'chat-list__element',
        //     logo: 'https://sun1-17.userapi.com/impf/c848632/v848632779/1b774f/NVelhWIfl3c.jpg?size=200x0&quality=96&crop=0,0,1440,1440&sign=8a29ad1f3c8eeda59abf90663fb9a3da&ava=1',
        //     name: 'Иван',
        //     preview: 'Привет! Как дела? Придешь сегодня на учебу?',
        //     time: '16:20',
        //     show: 'true',
        //     count: 1
        // },
        // {
        //     id: 'c76r0u8xij8a',
        //     class: 'chat-list__element',
        //     logo: 'https://sun1-47.userapi.com/impf/c639218/v639218214/34408/YouiYm102AI.jpg?size=100x0&quality=96&crop=1008,558,554,554&sign=cf151ba66bd3380b185826761ff9266a&ava=1',
        //     name: 'Анатолий',
        //     preview: 'Перезвони мне, очень надо!',
        //     time: '15:20',
        //     show: 'true',
        //     count: 2
        // },
        // {
        //     id: '97zsrz2ykvxl',
        //     class: 'chat-list__element',
        //     logo: 'https://sun1-86.userapi.com/impf/c858020/v858020688/93df7/zqVl2efyvoA.jpg?size=100x0&quality=96&crop=0,0,2160,2160&sign=1c0827251c80a4c493cbced894f54547&ava=1',
        //     name: 'Алексей',
        //     preview: 'Че как?',
        //     time: '15:20',
        //     show: 'false',
        //     count: 0
        // },
        // {
        //     id: '36igccajek12',
        //     class: 'chat-list__element',
        //     logo: 'https://sun1-85.userapi.com/impg/bPC4alERVbdBizXEXo5niVF9pyHEC-PASXT16Q/DMdl4HB8kzA.jpg?size=100x0&quality=96&crop=462,532,739,739&sign=f7d1e9ce359f337a862c74779ed01b85&ava=1',
        //     name: 'Степан',
        //     preview: 'Сколько стоит это?',
        //     time: '15:20',
        //     show: 'false',
        //     count: 0
        // },
        // {
        //     id: 'pyclr370geky',
        //     class: 'chat-list__element',
        //     logo: 'https://sun1-30.userapi.com/impg/WjGDJXY8fJcxdnkfcxSWVVlG4opgRCtrSaziCw/g74EM9Latzs.jpg?size=100x0&quality=96&crop=3,67,1291,1291&sign=57f25f36374d179ce17b01a7e98fd608&ava=1',
        //     name: 'Дмитрий',
        //     preview: 'Сколько стоит это?',
        //     time: '15:20',
        //     show: 'false',
        //     count: 0
        // },
        // {
        //     id: 'cgup1e4g0e4a',
        //     class: 'chat-list__element',
        //     logo: 'https://sun1-91.userapi.com/impg/NnJnzq_xt_IWbAFLjYjYzVsYQMjlw_UhotkhOg/I3pHIzTvoJk.jpg?size=100x0&quality=96&crop=88,88,524,524&sign=2e18f3dd8d49bb11a30868601c8393e5&ava=1',
        //     name: 'Работа',
        //     preview: 'Отчет нужен завтра!',
        //     time: '15:20',
        //     show: 'false',
        //     count: 0
        // },
        // {
        //     id: 'ty1wu8898o4d',
        //     class: 'chat-list__element',
        //     logo: 'https://sun1-19.userapi.com/impf/c848628/v848628022/126438/Z5xrby1L45w.jpg?size=100x0&quality=96&crop=0,0,200,200&sign=c9378d4c81fb374004bde15b6c6ef3f7&ava=1',
        //     name: 'Практикум',
        //     preview: 'Уже сдал задание на ревью?',
        //     time: '15:20',
        //     show: 'false',
        //     count: 0
        // },
        // {
        //     id: '8c9ltlm5lcy4',
        //     class: 'chat-list__element',
        //     logo: 'https://sun1-98.userapi.com/impg/_55ypbqoIoGWorWiJjdOnrypmgYH_m-MjE6ukQ/lYHGi8zQVD8.jpg?size=100x0&quality=96&crop=2,0,1077,1077&sign=727e65de61c2b03e14de55f39f4f9016&ava=1',
        //     name: 'Тимур',
        //     preview: 'что-то мне нехорошо',
        //     time: '15:20',
        //     show: 'false',
        //     count: 0
        // },
        // {
        //     id: 'd35emt0mj1bp',
        //     class: 'chat-list__element',
        //     logo: 'https://pbs.twimg.com/profile_images/428320690182561792/yXkZYokb.jpeg',
        //     name: 'Избранное',
        //     preview: 'Изображение',
        //     time: '15:20',
        //     show: 'false',
        //     count: 0
        // },
        // {
        //     id: 'lwmuoosbz60o',
        //     class: 'chat-list__element',
        //     logo: 'https://sun1-17.userapi.com/impg/ONM26c3Sbt7J2_wP71F9cS69q9DyethhjQtCGw/Rf6m6qCUxns.jpg?size=100x0&quality=96&crop=0,159,956,956&sign=ae63d9ff7dcd0af0e651895d0169e0df&ava=1',
        //     name: 'Станислав',
        //     preview: 'что скажешь насчет того чтобы прогуляться?',
        //     time: '15:20',
        //     show: 'false',
        //     count: 0
        // },
    ],
    mount() {
        eventBus.on(GLOBAL_EVENTS.SEARCH,chatsController.methods.changeChatList.bind(chatsController));
        chatsController.methods.getUserChats();
    },
    methods: {
        getUserChats() {
            const store = new Store();
            store.value.chats.forEach((element:ChatElement)=>{
                (chatsController.elements as ChatElement[]).push({
                    id:element.id,
                    class: 'chat-list__element',
                    name: element.title,
                    preview: '',
                    time: '',
                    show: 'false',
                    logo: element.avatar,
                    count: 0
                });
            });
        },
        changeChatList(data:Record<string, string>):void {
            if (data.string==='') {
                chatsController.elements = [];
                chatsController.methods.getUserChats();
                eventBus.emit(GLOBAL_EVENTS.CHANGE_ELEMENT_PROPS,chatsController.component_name,chatsController.elements)
            } else {
                userApi.create(data.string)
                    .then(res=>JSON.parse(res.responseText))
                    .then(data=>{
                        chatsController.elements = [];
                        data.forEach((element:Record<string, unknown>)=>{
                            (chatsController.elements as Object[]).push({
                                id:element.id,
                                class: 'chat-list__element',
                                name: element.second_name+' '+element.first_name,
                                preview: '',
                                time: '',
                                show: 'false',
                                logo: element.avatar,
                                count: 0
                            });
                    });
                    eventBus.emit(GLOBAL_EVENTS.CHANGE_ELEMENT_PROPS,chatsController.component_name,chatsController.elements)
            });
        }
        }
    },
    events: [
        {
            type: 'click',
            callback: function (event:Event) {
                const elements:NodeList|null = document.querySelectorAll('.chat-list__element');
                if (elements) {
                    elements.forEach((item:HTMLElement)=>{
                        item.classList.remove('chat-list__element_active');
                    })
                }
                const chatElement:HTMLElement|null = (event.target as HTMLElement).closest('.chat-list__element');
                if (!chatElement) {
                    return;
                }
                chatElement.classList.add('chat-list__element_active');
            }
        }
    ]
}