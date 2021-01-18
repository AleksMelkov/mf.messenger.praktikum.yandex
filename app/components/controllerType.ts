import ChatWebSocket from '../ChatWebSocket';

export type ControllerType = {
    componentName?:string
    parent:Record<string, string>,
    contenteditableVal?:boolean,
    elementClass?:string,
    mount?:Function,
    header?:Record<string, string>,
    elements?:Record<string, any>[],
    buttonBlock?:Record<string, string>,
    data?:Record<string, any>,
    password?:Record<string, string>,
    methods?:Record<string, Function>,
    events?:Record<string, any>,
    socket?:ChatWebSocket|null,
};
