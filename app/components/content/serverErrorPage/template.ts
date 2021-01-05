export const serverErrorPageTmpl = `
    <div class="{{ parent.class }}">
        <div class="error-wrapper-content__header">
            <h1>500</h1>
        </div>
        <div class="error-wrapper-content__text">Это всего лишь ошибка, уже чиним</div>
        <a href="/" class="error-wrapper-content__link">назад к чатам</a>
    </div>
`;