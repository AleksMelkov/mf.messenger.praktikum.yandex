# praktikum_chat

### Netlify - https://lucid-hopper-fdaf94.netlify.app/ ###
### Figma - https://www.figma.com/file/a7nSJS2XszZC10cw37JGeQ/My-Chat?node-id=0%3A1 ###
### Heroku - https://hirv-messanger.herokuapp.com/ ###

Добрый день!
С хероку разобрался, действительно мой косяк. К ссылке подключения к API забыл один слэш у https://.
Касательно EsLint, это конечно снова странное решение авторов курса, подключать статический анализатор, тогда когда уже весь код написан.
Для чего, чтобы увидеть 1000 ошибок, которые требуют устранения? Ну это странно. Часть правил исключил, часть правил заглушил в коде, иначе
мне придется влезать в ядро системы и менять там много всего, а это куча "увлекательных" часов переписывания, которых у меня к сожалению нет, 
из-за странных требований по return в методах.
Сборку оставил в `development` моде, для удобства отладки

Для сборки проекта нужно в консоли ввести `npm run build`
Для запуска тестов `npm run test`
Для запуска запуска веб сервера на webpack `webpack serve`


