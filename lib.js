//DOM Functions


//On ready function

//

var domAction = {
	//Get by class
	getByClass(className, ...args){
		if(args[0]!==undefined){
			if(args[0]=="All"){
				return document.querySelectorAll('.'+className);
			}else{
				throw new SyntaxError("Argument is incorrect!")
			}
		}else{
			if([...className][0] != '.'){
				console.log('Add "." in class name');
				return document.querySelector('.'+className)
			}else{
				return document.querySelector(className);
			}
		}
	},
	// Get by id
	getById(id, ...args){
		if(document.getElementById(id) == null){
			throw new SyntaxError("Could not find id "+id)
		}
		if(args[0]!==undefined){
			throw new SyntaxError("Argument is incorrect!")
		}else{
			return document.getElementById(id)
		}
	}


}

////////////

var ready = (function() {
  var readyList,
      DOMContentLoaded,
      class2type = {};
      class2type["[object Boolean]"] = "boolean";
      class2type["[object Number]"] = "number";
      class2type["[object String]"] = "string";
      class2type["[object Function]"] = "function";
      class2type["[object Array]"] = "array";
      class2type["[object Date]"] = "date";
      class2type["[object RegExp]"] = "regexp";
      class2type["[object Object]"] = "object";

  var ReadyObj = {
      // Является ли DOM готовым к использованию? Установите значение true, как только оно произойдет.
      isReady: false,
      // Счетчик, чтобы отслеживать количество элементов, ожидающих до начала события. См. #6781
      readyWait: 1,
      // Удерживать (или отпускать) готовое событие
      holdReady: function(hold) {
        if (hold) {
          ReadyObj.readyWait++;
        } else {
          ReadyObj.ready(true);
        }
      },
      // Обрабатывать, когда DOM готов
      ready: function(wait) {
        // Либо трюк не работает, либо событие DOMready/load и еще не готовы
        if ((wait === true && !--ReadyObj.readyWait) || (wait !== true && !ReadyObj.isReady)) {
          // Убедитесь, что тело существует, по крайней мере, в случае, если IE наложает (ticket #5443).
          if (!document.body) {
            return setTimeout(ReadyObj.ready, 1);
          }

          // Запоминаем что DOM готов
          ReadyObj.isReady = true;
          // Если обычное событие DOM Ready запускается, уменьшается и ожидает, если потребуется,
          if (wait !== true && --ReadyObj.readyWait > 0) {
            return;
          }
          // Если функции связаны, выполнить
          readyList.resolveWith(document, [ReadyObj]);

          // Запуск любых связанных событий
          //if ( ReadyObj.fn.trigger ) {
          //    ReadyObj( document ).trigger( "ready" ).unbind( "ready" );
          //}
        }
      },
      bindReady: function() {
        if (readyList) {
          return;
        }
        readyList = ReadyObj._Deferred();

        // Поймать случаи, когда $(document).ready() вызывается после
        // события браузера, которое уже произошло.
        if (document.readyState === "complete") {
          // Обращайтесь к нему асинхронно, чтобы позволить скриптам возможность задержать готовность
          return setTimeout(ReadyObj.ready, 1);
        }

        // Mozilla, Opera и webkit nightlies в настоящее время поддерживают это событие
        if (document.addEventListener) {
          // Используем удобный callback события
          document.addEventListener("DOMContentLoaded", DOMContentLoaded, false);
          // Откат к window.onload, который всегда будет работать
          window.addEventListener("load", ReadyObj.ready, false);

          // Если используется тип событий IE
        } else if (document.attachEvent) {
          // Обеспечить запуск перед загрузкой,
          // Возможно, поздно, но безопасно также для iframes
          document.attachEvent("onreadystatechange", DOMContentLoaded);

          // Откат к window.onload, который всегда будет работать
          window.attachEvent("onload", ReadyObj.ready);

          // Если IE, а не frame
          // Постоянно проверяем, готов ли документ
          var toplevel = false;

          try {
            toplevel = window.frameElement == null;
          } catch (e) {}

          if (document.documentElement.doScroll && toplevel) {
            doScrollCheck();
          }
        }
      },
      _Deferred: function() {
        var // список callback
          callbacks = [],
          // stored [ context , args ]
          fired,
          // Чтобы избежать запуска, когда это уже сделано
          firing,
          // Чтобы узнать, отменена ли отсрочка
          cancelled,
          // Отложенный
          deferred = {
            // done( f1, f2, ...)
            done: function() {
              if (!cancelled) {
                var args = arguments,
                  i,
                  length,
                  elem,
                  type,
                  _fired;
                if (fired) {
                  _fired = fired;
                  fired = 0;
                }
                for (i = 0, length = args.length; i < length; i++) {
                  elem = args[i];
                  type = ReadyObj.type(elem);
                  if (type === "array") {
                    deferred.done.apply(deferred, elem);
                  } else if (type === "function") {
                    callbacks.push(elem);
                  }
                }
                if (_fired) {
                  deferred.resolveWith(_fired[0], _fired[1]);
                }
              }
              return this;
            },

            // Разрешить с заданным контекстом и аргументами
            resolveWith: function(context, args) {
              if (!cancelled && !fired && !firing) {
                // Убедитесь, что имеются аргументы (#8421)
                args = args || [];
                firing = 1;
                try {
                  while (callbacks[0]) {
                    callbacks.shift().apply(context, args); //shifts a callback, and applies it to document
                  }
                } finally {
                  fired = [context, args];
                  firing = 0;
                }
              }
              return this;
            },

            // решить с этим в качестве контекста и приведенных аргументов
            resolve: function() {
              deferred.resolveWith(this, arguments);
              return this;
            },

            // Отложено ли это решение?
            isResolved: function() {
              return !!(firing || fired);
            },

            // Отмена
            cancel: function() {
              cancelled = 1;
              callbacks = [];
              return this;
            }
          };

        return deferred;
      },
      type: function(obj) {
        return obj == null ?
          String(obj) :
          class2type[Object.prototype.toString.call(obj)] || "object";
      }
    }
    // Проверка готовности DOM для Internet Explorer
  function doScrollCheck() {
    if (ReadyObj.isReady) {
      return;
    }

    try {
      // Если используется IE, то используйте трюк Диего Перини
      // http://javascript.nwbox.com/IEContentLoaded/
      document.documentElement.doScroll("left");
    } catch (e) {
      setTimeout(doScrollCheck, 1);
      return;
    }

    // И выполнить функцию ожидания
    ReadyObj.ready();
  }
  // Функция очистки для document ready
  if (document.addEventListener) {
    DOMContentLoaded = function() {
      document.removeEventListener("DOMContentLoaded", DOMContentLoaded, false);
      ReadyObj.ready();
    };

  } else if (document.attachEvent) {
    DOMContentLoaded = function() {
      // Убедимся, что тело существует, по крайней мере, в случае, если IE наложает (ticket #5443).
      if (document.readyState === "complete") {
        document.detachEvent("onreadystatechange", DOMContentLoaded);
        ReadyObj.ready();
      }
    };
  }

  function ready(fn) {
    // Прикрепление слушателя
    ReadyObj.bindReady();

    var type = ReadyObj.type(fn);

    // Добавление callback'а
    readyList.done(fn); // ReadyList является результатом _Deferred()
  }
  return ready;
})();
