import { ControllerType } from "../../controllerType.js";

export const changeProfileController:ControllerType = {
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
                    ) {
                        const element = <HTMLElement>item.querySelector('.profile-wrapper-form__element-input');
                        if (element) element.setAttribute('contenteditable','true');
                    }

                    if (item.classList.contains('profile-wrapper-form__element_save')) item.style.display = 'block';
                });
            }
        }
    ]
}