export var getElementById = function (id, array) {
    if (!Array.isArray(array)) {
        throw new Error('Второй аргумент должен быть массивом объектов');
    }
    return array.filter(function (element) {
        if (Object.keys(element).includes('id') &&
            element.id === id) {
            return element;
        }
        else {
            return false;
        }
    });
};
//# sourceMappingURL=getElementById.js.map