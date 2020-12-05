export const registrationTmpl = `
    <div class="{{ elementClass }} auth-window-field_small_padding">
        <small class="auth-window-field__title">{{ header }}</small>
        <input type="{{ type }}" name="{{ name }}" class="auth-window-field__input" placeholder="{{ placeholder }}">
        <small class="auth-window-field__error">{{ errorText }}</small>
    </div>
`;