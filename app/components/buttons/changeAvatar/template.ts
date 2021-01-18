export const changeAvatarTmpl = `
    <div class="{{ parent.class }}" style='background-image: url("https://ya-praktikum.tech{{ parent.avatar }}")'>
        <i class="far fa-image"></i>
        <label for="avatar-file" class="profile-wrapper__avatar-text">Поменять<br>аватар</label>
        <input id="avatar-file" type="file" class="profile-wrapper__avatar-input">
    </div>
`;
