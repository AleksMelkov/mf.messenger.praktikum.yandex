export const profileFormTemplate = `
    <div class="{{ elementClass }}" type="{{ elementType }}">
        <div class="profile-wrapper-form__element-name">{{ header }}</div>
        <div class="profile-wrapper-form__element-input" name="{{ name }}" type="{{ type }}" contenteditable="{{ contenteditable }}" data-placeholder="{{ placeholder }}"></div>
    </div>
`;