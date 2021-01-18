export const authTmpl = `
    <div class="{{ elementClass }}">
        <small class="auth-window-field__title">{{ header }}</small>
        <input type="{{ type }}" name="{{ name }}" class="auth-window-field__input" placeholder="{{ placeholder }}">
        <small class="auth-window-field__error">{{ errorText }}</small>
    </div>
`;
