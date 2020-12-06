export const chatsListTmpl = `
    <li class="{{ class }}" data-id="{{ id }}">
        <div class="chat-list__element-logo">
            <img src="{{ logo }}">
        </div>
        <div class="chat-list__content-area">
            <div class="content-area__header">{{ name }}</div>
            <span class="content-area__text">{{ preview }}</span>
        </div>
        <div class="chat-list__info-area">
            <span class="info-area__time">{{ time }}</span>
            <div class="info-area__counter" show="{{ show }}">
                <span>{{ count }}</span>
            </div>
        </div>
    </li>
`;