export const changeProfileController = {
    parent: {
        class: 'profile-wrapper-form__element',
    },
    events: [
        {
            type: 'click',
            callback: function () {
                let elements = document.querySelectorAll('.profile-wrapper-form__element[type="common"]');
                Array.from(elements).forEach((item:HTMLElement)=>{
                    if (item.classList.contains('profile-wrapper-form__element_hide')) item.style.display = 'none';
                    if (
                        !item.classList.contains('profile-wrapper-form__element_hide') &&
                        !item.classList.contains('profile-wrapper-form__element_save')
                    ) (item.querySelector('.profile-wrapper-form__element-input') as HTMLElement).setAttribute('contenteditable','true');
                    if (item.classList.contains('profile-wrapper-form__element_save')) item.style.display = 'block';
                });
            }
        }
    ]
}