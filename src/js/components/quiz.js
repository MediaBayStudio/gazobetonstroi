;
(function() {

  let $quizBlock = id('quiz'),
    $quizForm = $quizBlock && id('quiz-form'),
    $quizResult = $quizForm && q('.quiz__form-result', $quizForm),
    $quizImg = $quizBlock && q('.quiz__img');

  if ($quizBlock) {
    window.Quiz = (function() {
      Quiz = (function() {
        return function(element, options) {
          let _ = this;

          _.assign = function(inserted, obj) {
            for (let key in inserted) {
              if (obj[key] === undefined) {
                obj[key] = inserted[key];
              } else if (typeof obj[key] === 'object') {
                _.assign(inserted[key], obj[key]);
              }
            }
          }

          _.createEl = function(block) {
            return document.createElement(block);
          }

          _.q = function(selector, target) {
            target = target || document;
            return target.querySelector(selector);
          }

          if (typeof element === 'string') {
            _.$quiz = _.q(element);
          } else {
            _.$quiz = element;
          }

          if (typeof options.$form === 'string') {
            _.$form = _.q(options.$form);
          } else {
            _.$form = options.$form;
          }

          if (typeof options.$result === 'string') {
            _.$result = _.q(options.$result);
          } else {
            _.$result = options.$result;
          }

          _.options = options || {}

          _.defaults = {
            headerTag: 'div',
            bodyTag: 'div',
            footerTag: 'div',
            stepTitletag: 'span',
            fieldTag: 'label',
            fieldTitleTag: 'span',
            prevBtnTag: 'button',
            nextBtnTag: 'button',

            dotsTag: 'div',
            dotTag: 'div',

            progressBarTag: 'div',
            progressTextTag: 'span',

            stepsCounterNumTag: 'div',
            currentStepNumTag: 'span',
            totalStepNumTag: 'span',

            dots: false,
            counter: false,
            progress: true,
            prev: true,
            next: true,

            finalStepTitle: false,

            headerClass: 'quiz__header',
            bodyClass: 'quiz__body',
            footerClass: 'quiz__footer',
            stepTittleClass: 'quiz__step-title',

            prevBtnClass: 'quiz__prev',
            nextBtnClass: 'quiz__next',

            dotsClass: 'quiz__dots',
            dotClass: 'quiz__dot',

            progressClass: 'quiz__progress',
            progressTextClass: 'quiz__progress-text',
            progressBarText: 'quiz__progress-bar',

            stepsCounterNumClass: 'quiz__steps-counter',
            currentStepNumClass: 'quiz__current-steps-number',
            totalStepNumClass: 'quiz__total-steps-number',

            gropupInputsClass: 'quiz__group-inputs',
            groupInputsTitleClass: 'quiz__group-title',

            prevBtnText: 'Назад',
            nextBtnText: 'Следующий шаг',

            fieldClasses: {
              radio: 'quiz__radio',
              checkbox: 'quiz__checkbox',
              text: 'quiz__text',
              textarea: 'quiz__text',
              select: 'quiz__select'
            }
          }

          _.$dots = [];
          _.$steps = [];
          _.$filledSteps = []; // шаги, которые уже были заполненны (для движения назад)
          _.radioCount = 0;
          _.checkboxCount = 0;

          _.assign(_.defaults, _.options);

          _.stepsLength = options.steps.length + 1;
          _.currentStep = 0;

          _.inputHandler = _.input.bind(_);
          _.nextStepHandler = _.nextStep.bind(_);
          _.prevStepHandler = _.prevStep.bind(_);

          _.init();

          _.$prevStep = _.$steps[_.currentStep - 1];
          _.$currentStep = _.$steps[_.currentStep];
          _.$nextStep = _.$steps[_.currentStep + 1];


          _.$filledFieldsOnThisStep = [];
          _.$fieldsOnThisStep = null;
          _.result = [];

          _.printStep(_.currentStep);

          _.$quiz.resetQuiz = _.resetQuiz;

          // _.dispatchEvent(_.$quiz, 'init', _.setEventDetails());

          _.$quiz.ctx = _;

          return _.$quiz;
          // return _;
        }
      })();

      Quiz.prototype.init = function() {
        console.log(this);
        let _ = this,
          options = _.options,
          evt = 'input';

        // _.$form.parentElement.style.display = 'none';
        _.$form.parentElement.setAttribute('hidden', '');

        _.buildInsides();
        _.buildSteps();
        _.$steps.push(_.$form);

        if (options.prev) {
          _.$prev.classList.add('disabled');
          _.$prev.setAttribute('tabindex', '-1');
        }

        if (options.next) {
          _.$next.classList.add('disabled');
          _.$next.setAttribute('tabindex', '-1');
        } else {
          evt = 'change';
        }

        if (options.dots) {
          _.$dots[_.currentStep].classList.add('active');
        }

        _.$quiz.addEventListener(evt, _.inputHandler);
        // _.$next.addEventListener('click', _.nextStepHandler);
      };

      Quiz.prototype.dispatchEvent = function(element, eventName, argumentsObj) {
        if (typeof window.CustomEvent === "function") {
          argumentsObj = argumentsObj || {}
          let evt = new CustomEvent(eventName, argumentsObj);
          element.dispatchEvent(evt);
        }
      };

      Quiz.prototype.buildInsides = function() {
        let _ = this,
          options = _.options,
          setButtonType = function(tag, el) {
            if (tag === 'button') {
              el.setAttribute('type', 'button');
            }
          };

        _.$header = _.createEl(options.headerTag);
        _.$body = _.createEl(options.bodyTag);
        _.$footer = _.createEl(options.footerTag);
        _.$stepsTitle = _.createEl(options.stepTitletag);

        _.$header.className = options.headerClass;
        _.$body.className = options.bodyClass;
        _.$footer.className = options.footerClass;
        _.$stepsTitle.className = options.stepTittleClass;

        if (options.counter) {
          _.$stepsCounter = _.createEl(options.stepsCounterNumTag);
          _.$counterCurrentNum = _.createEl(options.currentStepNumTag);
          _.$counterTotalNum = _.createEl(options.totalStepNumTag);

          _.$stepsCounter.className = options.stepsCounterNumClass;
          _.$counterCurrentNum.className = options.currentStepNumClass;
          _.$counterTotalNum.className = options.totalStepNumClass;

          _.$counterCurrentNum.textContent = _.currentStep + 1;
          _.$counterTotalNum.textContent = _.stepsLength;

          _.$stepsCounter.innerHTML = '<span>Шаг</span> ';
          _.$stepsCounter.appendChild(_.$counterCurrentNum);
          _.$stepsCounter.insertAdjacentHTML('beforeend', ' <span>из</span> ');
          _.$stepsCounter.appendChild(_.$counterTotalNum);

        }

        if (options.dots) {
          _.$dotsBlock = _.createEl(options.dotsTag);

          _.$dotsBlock.className = options.dotsClass;

          for (let i = 0; i < _.stepsLength; i++) {
            let dot = _.createEl(options.dotTag);
            dot.className = options.dotClass;
            setButtonType(options.dotTag, dot);
            _.$dots[i] = dot;
            _.$dotsBlock.appendChild(dot);
          }
        }

        if (options.prev) {
          _.$prev = _.createEl(options.prevBtnTag);
          _.$prev.className = options.prevBtnClass;
          setButtonType(options.prevBtnTag, _.$prev);
          _.$prev.textContent = options.prevBtnText;
          _.$footer.appendChild(_.$prev);
        }

        if (options.next) {
          _.$next = _.createEl(options.nextBtnTag);
          _.$next.className = options.nextBtnClass;
          setButtonType(options.nextBtnTag, _.$next);
          _.$next.textContent = options.nextBtnText;
          _.$footer.appendChild(_.$next);
        }

        if (options.progress) {
          _.$progressBar = _.createEl(options.progressBarTag);
          _.$progressWrap = _.createEl('div');
          _.$progressText = _.createEl(options.progressTextTag);
          if (options.progressBarTag === 'div') {
            _.$progressBar.setAttribute('role', 'progressbar');
            _.$progressBar.setAttribute('aria-valuemin', '0');
            _.$progressBar.setAttribute('aria-valuenow', '0');
            _.$progressBar.setAttribute('aria-valuemax', '100');
          }
          _.$progressText.textContent = '0%';

          _.$progressWrap.className = options.progressClass;
          _.$progressBar.className = options.progressBarText;
          _.$progressText.className = options.progressTextClass;

          _.$progressWrap.appendChild(_.$progressText);
          _.$progressWrap.appendChild(_.$progressBar);

          _.$footer.appendChild(_.$progressWrap)
        }

        if (options.counter) {
          _.$header.appendChild(_.$stepsCounter);
        }

        if (options.dots) {
          _.$header.appendChild(_.$dotsBlock);
        }

        _.$header.appendChild(_.$stepsTitle);

        _.$quiz.insertAdjacentElement('afterbegin', _.$header);
        _.$quiz.appendChild(_.$body);
        _.$quiz.appendChild(_.$footer);

      };

      Quiz.prototype.setEventDetails = function() {
        let _ = this;

        return {
          'detail': {
            prevStep: _.currentStep - 1,
            currentStep: _.currentStep,
            nextStep: _.currentStep + 1,
            stepsLength: _.stepsLength,
            currentStepObject: _.$currentStep,
            quizObject: _
          }
        }
      };

      Quiz.prototype.buildSteps = function() {
        let _ = this,
          options = _.options,
          steps = options.steps;
        /*
          Перебираем все шаги и формируем удобный объект с щагами
          Будет содержать заголовок шага
          И уже готовые элементы для вставки
        */
        for (let step in steps) {
          let curStep = steps[step], // берем текущий шаг в переменную (для сокр. записи)
            fields = curStep['fields'], // поля шага
            options = curStep.options, // переданные доп. опции (для действий на переключении шагов, например, менять картинки)
            extrafields = curStep['extrafields'], // дополнительные поля
            stepObject = {}; // объект одного шага, который будем вставлять в массив шагов

          // Если есть голые поля, т.е. без ветвления ответов
          if (fields) {
            let stepTitle = curStep['step-title'], // текст заголовка шага
              parsedFields = _.parseFields(fields); // разбираем поля, создаем html объекты

            // Если есть дополнительные поля, то разбираем их
            if (extrafields) {
              extrafields = _.parseExtraFields(extrafields);
            }

            stepObject['step-title'] = stepTitle; // текст для заголовка шага
            stepObject.fields = parsedFields.fieldsArray; // массив разобранных полей
            stepObject.extrafields = extrafields; // вставляем дополнительные поля (могут быть undefined)
            stepObject.html = parsedFields.html; // элементы для вставки на страницу
            stepObject.options = options; // доп. опции, переданные в json, для использования на событиях nextstep, prevstep

            // Если поля есть ветвление ответов
          } else {
            /*
              Разбираем ветвления ответов
              значение овета: [поле, поле, поле]
            */
            for (let key in curStep) {
              let parsedFields = _.parseFields(curStep[key].fields),
                extrafields = curStep[key].extrafields,
                stepTitle = curStep[key]['step-title'],
                options = curStep[key].options;

              // Если есть дополнительные поля, то разбираем и их
              if (extrafields) {
                extrafields = _.parseExtraFields(extrafields);
              }

              stepObject[key] = {
                options: options,
                'step-title': stepTitle,
                fields: parsedFields.fieldsArray,
                extrafields: extrafields,
                html: parsedFields.html
              }

            }
          }

          _.$steps.push(stepObject); // вставляем сформированный объект шага в массив

        }
      };

      Quiz.prototype.parseFields = function(fields, isExtraFields) {
        let _ = this,
          options = _.options,
          obj = {
            fieldsArray: [],
            html: []
          },
          fieldsType;

        // Если мы создаем доп. поле, то добавим ему соотв. дата-атрибут
        // Всем title зададим соотв. дата-атрибут, чтобы было потом легко найти их через q

        for (let field in fields) {
          let curField = fields[field],
            fieldType = curField.type,
            groupTitle = curField['group-title'],
            fieldTitle = curField.title,
            required = curField.required,
            values = curField.values,
            placeholder = curField.placeholder,
            focusOn = curField.focusOn,
            fieldTag = fieldType === 'textarea' ? 'textarea' : 'input',
            fieldClass = options.fieldClasses[fieldType],
            initialSelected = curField.initialSelected;

          fieldsType = fieldType;

          // Разбираем обычное поле с текстом или числом
          if (fieldType === 'text' || fieldType === 'number' || fieldType === 'textarea') {
            let $field = _.createEl(options.fieldTag),
              $title = _.createEl(options.fieldTitleTag),
              $input = _.createEl(fieldTag),
              inputClassPostfix = fieldType === 'textarea' ? '-textarea' : '-inp',
              fieldObject = {};

            if (isExtraFields) {
              $field.setAttribute('data-extra-field', '')
            }

            $input.type = fieldType;

            if (placeholder) {
              $input.placeholder = placeholder;
            }

            if (focusOn) {
              $input.dataset.focus = 1;
            }

            $title.textContent = fieldTitle;
            $title.setAttribute('data-field-title', '');

            $field.className = fieldClass;
            $input.className = fieldClass + inputClassPostfix + (required ? ' required' : '');
            $title.className = fieldClass + '-title';

            $field.appendChild($title);
            $field.appendChild($input);

            fieldObject.input = $input;
            fieldObject.field = $field;
            fieldObject.title = $title;

            obj.fieldsArray.push(fieldObject);
            obj.html.push($field);

          } else if (values && values.length > 0) {
            // Если есть group-title, то помещаем в общий блок
            let $groupBlock,
              $groupTitle,
              $selectBlock,
              $selectLabel,
              $selectBlockTitle;

            if (groupTitle || groupTitle === '') {
              $groupBlock = _.createEl('div');

              if (groupTitle) {
                $groupTitle = _.createEl('span');
                $groupTitle.className = options.groupInputsTitleClass;
                $groupTitle.textContent = groupTitle;
                $groupTitle.setAttribute('data-field-title', ''); // присваиваем тайтлу атрибут для облегчения его поиска
                $groupBlock.appendChild($groupTitle);
              }

              $groupBlock.className = options.gropupInputsClass;
            }

            if (fieldType === 'select') {
              $selectLabel = _.createEl(options.fieldTag); // создаем блок-обертку
              $selectBlock = _.createEl('select'); // создаем сам селект

              // Если есть заголовок полей, то создадим его
              if (fieldTitle) {
                $selectBlockTitle = _.createEl(options.fieldTitleTag); // создаем татйл
                $selectBlockTitle.className = fieldClass + '-title'; // присваиваем тайтлу класс
                $selectBlockTitle.textContent = fieldTitle; // присваиваем тайтлу текст
                $selectBlockTitle.setAttribute('data-field-title', ''); // присваиваем тайтлу атрибут для облегчения его поиска
                $selectLabel.appendChild($selectBlockTitle); // вставляем тайтл в блок-обертку
              }

              $selectLabel.appendChild($selectBlock); // вставляем селект в блок-обертку
              $selectLabel.className = fieldClass; // присваиваем блоку-обертке класс
              $selectBlock.className = fieldClass + '-inp' + (required ? ' required' : ''); // класс для селекта

              if (initialSelected) {
                $selectBlock.dataset.initialSelected = initialSelected;
              }
            }

            /*
              Перебираем все значения и для select создаем options,
              а для radio и checkbox создаем input с классами, значениями и др. атрибутами
            */
            for (let i = 0, len = values.length; i < len; i++) {
              let $field,
                $title,
                $input,
                // $pseudoInp,
                fiteldsNameAttr,
                fieldObject = {};

              /*

                СОКРАТИТЬ РАЗБОР АТРИБУТОВ У SELECT И RADIO/CHECKBOX

              */ 

              if (fieldType === 'select') {
                $input = _.createEl('option');
                // Если передали строку, то вставляем ее как обычно
                if (typeof values[i] === 'string') {
                  $input.value = $input.textContent = values[i];
                  // Если не строка, то разбираем объект с текстом и атрибутами
                } else {
                  let customAttributes = values[i]['attr'],
                    fieldIsNotDisabled = true;

                  if (customAttributes) {
                    for (let i = 0, len = customAttributes.length; i < len; i++) {
                      for (let attrName in customAttributes[i]) {
                        let attrValue = customAttributes[i][attrName];
                        $input.setAttribute(attrName, attrValue);
                        if (attrName === 'disabled') {
                          fieldIsNotDisabled = false;
                        }
                      }
                    }
                  }

                  if (fieldIsNotDisabled) {
                    $input.value = $input.textContent = values[i]['text'];
                  } else {
                    $input.textContent = values[i]['text'];
                  }
                }
                $field = $selectBlock;
              } else {
                $field = _.createEl(options.fieldTag);
                $title = _.createEl(options.fieldTitleTag);
                $input = _.createEl(fieldTag);
                // $pseudoInp = _.createEl('span');

                // Создаем атрибут name (radio-0, radio-1 и т.д.)
                if (fieldType === 'radio') {
                  fiteldsNameAttr = 'radio-' + _.radioCount;
                } else {
                  fiteldsNameAttr = 'checkbox-' + _.checkboxCount;
                }

                if (typeof values[i] === 'string') {
                  $input.value = $title.textContent = values[i];
                } else {
                  let customAttributes = values[i]['attr'];
                  $input.value = $title.textContent = values[i]['text'];

                  if (customAttributes) {
                    for (let i = 0, len = customAttributes.length; i < len; i++) {
                      for (let attrName in customAttributes[i]) {
                        let attrValue = customAttributes[i][attrName];
                        $input.setAttribute(attrName, attrValue);
                        if (attrName === 'disabled') {
                          fieldIsNotDisabled = false;
                        }
                      }
                    }
                  }
                }

                $input.name = fiteldsNameAttr;
                $input.type = fieldType;
                // $pseudoInp.className = fieldClass + '-pseudo-inp';
                $field.className = fieldClass;
                $input.className = fieldClass + '-inp' + (required ? ' required' : '');
                if (required) {
                  $input.setAttribute('required', '');
                }
                // $input.dataset.required = required ? 1 : 0;
              }

              if ($title) {
                $title.className = fieldClass + '-title';
                fieldObject.title = $title;
              }

              fieldObject.input = $input;
              fieldObject.field = $field;

              $field.appendChild($input);

              // if ($pseudoInp) {
              // $field.appendChild($pseudoInp);
              // }

              if ($title) {
                $field.appendChild($title);
              }

              if ($groupBlock && fieldType !== 'select') {
                $groupBlock.appendChild($field);
              }

              obj.fieldsArray.push(fieldObject);
            } // endfor values

            if ($groupBlock) {
              if ($selectLabel) {
                $groupBlock.appendChild($selectLabel);
              }
              obj.html.push($groupBlock);
              // obj.html = $groupBlock;
              // _.$body.appendChild($groupBlock);
            } else if ($selectLabel) {
              obj.html.push($selectLabel);
              // obj.html = $selectLabel;
              // _.$body.appendChild($selectLabel);
            }
          }

        } // endfor fields

        if (fieldsType === 'radio') {
          _.radioCount++;
        }

        if (fieldsType === 'checkbox') {
          _.checkboxCount++;
        }

        return obj;
      };

      Quiz.prototype.parseExtraFields = function(extrafields) {
        let _ = this,
          extrafieldsObject = {};

        for (let value in extrafields) {
          let extrafield = extrafields[value],
            parsedExtrafields = _.parseFields(extrafield, true);

          extrafieldsObject[value] = parsedExtrafields;
        }

        return extrafieldsObject;
      };

      Quiz.prototype.clearPrevStep = function() {
        let _ = this,
          quizBody = _.$body,
          prevStep = _.$prevStep;
        formParent = _.$form.parentElement;

        if (prevStep) {
          // Если предыдущий шаг это форма заявки
          if (prevStep === _.$form) {
            formParent.setAttribute('hidden', '');
            // _.$quiz.replaceChild(quizBody, formParent);
            // _.$body.removeChild(_.$form); // Удалим форму из боди
            _.$result.value = ''; // Чистим ответы
          } else {
            let prevHtml = prevStep.html, // Массив полей предыдущего шага
              prevExtrafields = prevStep.extrafields; // Доп. поля предыдушего шага

            if (prevHtml) {
              for (let i = 0, len = prevHtml.length; i < len; i++) {
                quizBody.removeChild(prevHtml[i]); // Удаляем со страницы поля предыдущего шага
              }
            }

            if (prevExtrafields) {
              for (let key in prevExtrafields) {
                let prevExtrafieldsHtml = prevExtrafields[key].html; // Массив html доп. полей предыдущего шага
                for (let i = 0, len = prevExtrafieldsHtml.length; i < len; i++) {
                  if (quizBody.contains(prevExtrafieldsHtml[i])) {
                    quizBody.removeChild(prevExtrafieldsHtml[i]);
                  }
                }
              }
            }
          }
        }

      };

      Quiz.prototype.printStep = function(num, dir) {
        dir = dir || 'next';
        let _ = this,
          options = _.options,
          quizBody = _.$body,
          prevStep = _.$prevStep,
          currentHtml = _.$currentStep['html'], // html если нет ветвления ответов или шаг 1
          prevStepObject = prevStep && prevStep.value,
          prevStepValue; // Будем искать значение предыдущего шага для ветвления ответов

        formParent = _.$form.parentElement;

        // Если финальный шаг
        if (_.$currentStep === _.$form) {
          formParent.removeAttribute('hidden');
          quizBody.setAttribute('hidden', '');
          // formParent.style.display = 'block';
          // quizBody.style.display = 'none';
          // _.$quiz.replaceChild(formParent, quizBody);
          _.$quiz.classList.add('final-step');

          if (options.finalStepTitle) {
            _.$stepsTitle.textContent = options.finalStepTitle
          }

          // Заполняем поле с результатом
          for (let i = 0, len = _.result.length; i < len; i++) {
            let item = _.result[i];

            for (let key in item) {
              let value = item[key].join(', ');
              _.$result.value += key + ': ' + value + '\n';
            }

          }
          // Убираем поля предыдущего шага, если они есть
          _.clearPrevStep();
          _.setProgress(100, dir);
          return;
        } else {
          if (_.currentStep === 0) {
            _.setProgress(0, dir);
          } else {
            let percent = Math.ceil((_.currentStep + 1) / _.stepsLength * 100);
            _.setProgress(percent, dir);
          }
        }

        // Если нет готового html для вставки, значит есть ветвление
        if (!currentHtml) {
          if (prevStepObject) {
            // Перебираем ответы, которые были даны в предыдущем шаге
            for (let key in prevStepObject) {
              let values = prevStepObject[key], // Массив ответов предыдущего шага
                doBreak = false; // Для прерывания цикла в дочерних циклах

              // Если в массиве всего 1 значение, то преобразуем его в строку
              if (values.length === 1) {
                values = '' + values;
                // console.log(values, 'один в массиве, ищу');
                // Пробуем найти внутри вариантов текущего шага
                if (_.$currentStep[values]) {
                  prevStepValue = values; // Подставляем значение
                  // console.log('есть совпадение с ', values);
                  // console.log('Общий цикл прерван на ', values);
                  break; // Прерываем цикл

                  // Если значение не найдено, то ищем его в каждом варианте текущего шага
                } else {
                  // console.log('нет совпадения с', values);
                  for (let currentStepValue in _.$currentStep) {
                    // console.log('ищу', values, 'в', currentStepValue);
                    if (currentStepValue.indexOf(values) !== -1) {
                      prevStepValue = currentStepValue;
                      doBreak = true;
                      // console.log('есть совпадение', values, 'в', currentStepValue);
                      break;
                    }
                  }
                }
                // Если в массиве несколько значений, то нужно перебирать их
              } else {
                 // console.log(values, 'не один в массиве, перебираю');
                for (let i = 0, len = values.length; i < len; i++) {
                  for (let currentStepValue in _.$currentStep) {
                     // console.log('ищу', values[i], 'в', currentStepValue);
                    if (currentStepValue.indexOf(values[i]) !== -1) {
                      prevStepValue = currentStepValue;
                      doBreak = true;
                      // console.log('есть совпадение', values[i], 'в', currentStepValue);
                      break;
                    }
                  }
                  if (doBreak) {
                    // console.log('Цикл прерван на', values[i]);
                    break;
                  }
                }
              }

              if (doBreak) {
                // console.log('Общий цикл прерван на ', values);
                break;
              }

            }

          } // endif prevStepObject

          if (prevStepValue) {
            _.$currentStep = _.$currentStep[prevStepValue]; // Подставляем значение в текущий шаг
            currentHtml = _.$currentStep['html']; // Подставляем значение html
          }

        } // endelse

        // Если ничего нет вообще, то надо делать следующий шаг
        if (!currentHtml) {
          if (dir === 'prev') {
            _.prevStepHandler();
          } else {
            _.nextStep(false);
            _.currentStep--;
          }
          return;
        }

        if (_.$prevStep === _.$form) {
          formParent.setAttribute('hidden', '');
          // formParent.style.display = 'none';
        } else {
          // Убираем поля предыдущего шага, если они есть
          _.clearPrevStep();
        }
        
        // Вставляем html на страницу
        for (let key in currentHtml) {
          let block = currentHtml[key];
          quizBody.appendChild(block);
        }

        _.$stepsTitle.textContent = _.$currentStep['step-title']; // устанавливаем заголовок для шага

        _.$fieldsOnThisStep = qa('select, input, textarea', quizBody, true); // Собираем все поля с шага

        // Приводим все поля в изначальное состояние
        for (var i = _.$fieldsOnThisStep.length - 1; i >= 0; i--) {
          let $field = _.$fieldsOnThisStep[i],
            fieldType = $field.type;

          if ($field.checked) {
            $field.checked = false; // снимаем выделение
          }

          if (fieldType === 'text' || fieldType === 'textarea' || fieldType === 'number') {
            $field.value = ''; // Чистим поля ввода
          }

          if ($field.tagName === 'SELECT') {
            if ($field.dataset.initialSelected) {
              $field.selectedIndex = $field.dataset.initialSelected;
            } else {
              $field.selectedIndex = 0; // Устанавливаем селект в изначальное положение 0
            }
          }
        } // end for

      };

      Quiz.prototype.input = function(evt) {
        let _ = this,
          options = _.options,
          target = evt.target,
          extrafields = _.$currentStep.extrafields, // доп. поля на текущем шаге

          $radioButtons = [],
          $checkboxes = [],
          $select = [],
          $requiredFields = [], // список обязательных полей
          $emptyRequiredFields = [], // пустые обязательные к заполнению поля (val === '')
          $filledRequiredFields = [], // не пустые обязательные к заполнению поля (val !== '')
          $filledFields = [], // все не пустые поля (val !== '')

          radioGroupIsRequired = false, // группа радиокнопок является обязательной
          radioGroupIsChecked = true, // выбрана хотя бы одна радиокнопка
          checkboxesGroupIsRequired = false, // группа чекбоксов является обязательной
          checkboxesGroupIsChecked = true; // выбран хотя бы один чекбокс
        /*
          Будем перебирать все поля в текущем шаге
          И искать обязательные, заполненные, чекнутые и т.д.
          Потом проверять, чтобы кол-во обязательных === кол-во заполненных
          И хотя бы одна радиокнопка и хотя бы один чекбокс выбран
          И тогда разблокировать кнопку далее, иначе блокировать
        */
        for (let i = _.$fieldsOnThisStep.length - 1; i >= 0; i--) {
          // Переменные для сокращения записи
          let $field = _.$fieldsOnThisStep[i],
            type = $field.type,
            value = $field.value,
            tagName = $field.tagName,
            checked = $field.checked;

          if (type === 'radio') {
            $radioButtons[$radioButtons.length] = $field;
            /*
              Если есть доп. поля и есть доп. поле у текущего значения
              Перебираем эти поля и если радиокнопка выбрана
              Вставялем доп. поле и обновляем массив существующих полей в шаге
              Иначе, удаляем
            */
            if (extrafields && extrafields[value]) {
              extrafields[value].html.forEach(function($field) {
                let bodyContainsField = _.$body.contains($field), // переменная для сокр. записи
                  $fieldInput = q('input', $field); // ищем инпут внутри доп поля, для добавления в массив полей

                if (checked) {
                  if (!bodyContainsField) {
                    $fieldInput.value = ''; // Очищаем поле
                    _.$body.appendChild($field); // Добавляем доп. поле на страницу
                    _.$fieldsOnThisStep.push($fieldInput); // Добавляем в массив текущего шага
                    if ($fieldInput.dataset.focus) {
                      $fieldInput.focus(); // Устанавливаем фокус на этом поле
                    }
                    // Если доп. поле обязательное, то добавляем его в массив обязательных полей
                    if ($fieldInput.classList.contains('required')) {
                      $requiredFields.push($fieldInput);
                    }
                  }
                } else {
                  if (bodyContainsField) {
                    $fieldInput.value = ''; // Очищаем поле
                    _.$body.removeChild($field); // Удаляем доп. поле со страницы

                    // Ищем номер поля в массивах, для его удаления оттуда
                    let indxInFieldsOnThisStep = _.$fieldsOnThisStep.indexOf($fieldInput),
                      indxInRequiredFields = $requiredFields.indexOf($fieldInput),
                      indxInFilledFields = $filledRequiredFields.indexOf($fieldInput);


                    // Удаляем доп. поле из массива текущего шага
                    if (indxInFieldsOnThisStep !== -1) {
                      _.$fieldsOnThisStep.splice(indxInFieldsOnThisStep, 1);
                    }
                    // Удаляем доп. поле из массива обязательных полей
                    if (indxInRequiredFields !== -1) {
                      $requiredFields.splice(indxInRequiredFields, 1);
                    }
                    // Удаляем доп. поле из массива заполненных полей
                    if (indxInFilledFields !== -1) {
                      $filledRequiredFields.splice(indxInFilledFields, 1);
                    }
                  }
                }
              }); // endforeach
            }
          } else if (type === 'checkbox') {
            $checkboxes[$checkboxes.length] = $field;
          } else if (tagName === 'select') {
            $select[$select.length] = $field;
          }

          if ($field.classList.contains('required')) {
            $requiredFields[$requiredFields.length] = $field;
            if (value === '') {
              $emptyRequiredFields[$emptyRequiredFields.length] = $field;
            } else {
              $filledRequiredFields[$filledRequiredFields.length] = $field;
            }
          }

          if (value !== '') {
            // Убираем не выбранные радиокнопки и чекбоксы из массива заполненных полей
            if ((type === 'radio' || type === 'checkbox') && !checked) {
              continue;
            }
            $filledFields[$filledFields.length] = $field;
          }

        } //endfor

        // если есть радиокнопки, то проверяем выбрана хотя бы одна или нет
        if ($radioButtons.length > 0) {
          radioGroupIsRequired = $radioButtons.some($field => $field.required);
          if (radioGroupIsRequired) {
            radioGroupIsChecked = $radioButtons.some($field => $field.checked);
          }
        }

        // если есть чекбоксы, то проверяем выбран хотя бы один или нет
        if ($checkboxes.length > 0) {
          checkboxesGroupIsRequired = $checkboxes.some($field => $field.required);
          if (checkboxesGroupIsRequired) {
            checkboxesGroupIsChecked = $checkboxes.some($field => $field.checked);
          }
        }


        // console.log('radio', $radioButtons);
        // console.log('checkboxes', $checkboxes);
        // console.log('select', $select);
        // console.log('required', $requiredFields);
        // console.log('empty', $emptyRequiredFields);
        // console.log('filled', $filledRequiredFields);
        // console.log('fieldsOnThisStep', _.$fieldsOnThisStep);

        // console.log('radio group checked is', radioGroupIsChecked);
        // console.log('checkboxes group checked is', checkboxesGroupIsChecked);

        // Если все обязательные поля заполнены
        // и хотя бы одна радиокнопка выбрана
        // и хотя бы один чекбокс выбран
        // то разрешаем идти дальше (делаем кнопку активной)
        if (($requiredFields.length === $filledRequiredFields.length || $requiredFields.length === 0) &&
          radioGroupIsChecked && checkboxesGroupIsChecked) {

          // Глобальная переменная с заполненными полями на этом шаге
          _.$filledFieldsOnThisStep = $filledFields;

          // Если стрелка "вперед" разрешена, то
          if (options.next) {
            if ($requiredFields.length === $filledRequiredFields.length &&
              radioGroupIsChecked && checkboxesGroupIsChecked) {
              _.$next.classList.remove('disabled');
              _.$next.addEventListener('click', _.nextStepHandler);
              _.$next.setAttribute('tabindex', '0');
            }
          } else {
            if (options.next) {
              // иначе, делаем кнопку не активной
              _.$next.classList.add('disabled');
              _.$next.removeEventListener('click', _.nextStepHandler);
              _.$next.setAttribute('tabindex', '-1');
            } else {
              _.nextStepHandler();
            }
          }
        } else {
          // Если стрелка "вперед" разрешена, то делаем ее неактивной
          if (options.next) {
            _.$next.classList.add('disabled');
            _.$next.removeEventListener('click', _.nextStepHandler);
            _.$next.setAttribute('tabindex', '-1');
          }
        }

      };

      /*
        При нажатии на кнопку next (срабатывании функции nextStep)
        Будем перебирать все заполненные поля из массива _.$filledFieldsOnThisStep
        Будем искать в их родителе тайтл для полей (data-field-title)
        И сформируем объект ответов:
          obj = {
            key: [value, value, value, ...]
          }
      */
      Quiz.prototype.nextStep = function(event) {
        // Если не передан event, то пропуск шага
        let _ = this,
          options = _.options,
          object = {}, // ключи-значения инпутов (title: [values])
          $filledFields = _.$filledFieldsOnThisStep;

        // Если нажали на кнопку (не автошаг, не пропкуск шага)
        if (event) {
          // Собираем в массив значения всех заполненных полей
          for (let i = 0, len = $filledFields.length; i < len; i++) {
            let $field = $filledFields[i], // текущее поля (для сокр. записи)
              fieldType = $field.type, // тип поля (для сокр. записи)
              $fieldParent = fieldType === 'radio' || fieldType === 'checkbox' ? $field.parentElement.parentElement : $field.parentElement, // родитель полей для поиска тайтла
              fieldTtile = (q('[data-field-title]', $fieldParent) || _.$stepsTitle).textContent; // текст-заголовок полей

            // Если заголовка у группы полей нет, то берется название шага!


            // Если ключа нет, то создаем его
            if (object[fieldTtile] === undefined) {
              object[fieldTtile] = [];
            }

            object[fieldTtile].push($field.value); // Добавляем значение в массив
          }

          _.result[_.result.length] = object; // вставляем пару ключ-значения в результат

          _.$prevStep = _.$currentStep; // Устанавливаем предыдущим шагом текущий

          _.$prevStep.value = object; // Вставляем в него объект собранных значений
        }

        _.currentStep++; // Увеличиваем индекс (делаем шаг вперед)

        _.$currentStep = _.$steps[_.currentStep]; // Делаем текущим шагом текущий шаг по индексу
        _.$nextStep = _.$steps[_.currentStep + 1]; // Делаем следующим шагом ща по индексу + 1


        _.printStep(_.currentStep); // Выводим поля

        // Если передан эвент, то есть если нажалли на кнопку
        if (event) {
          _.dispatchEvent(_.$quiz, 'nextstep', _.setEventDetails());

          // Делаем активной кнопку назад
          if (options.prev) {
            if (_.currentStep > 0) {
              _.$prev.classList.remove('disabled');
              _.$prev.addEventListener('click', _.prevStepHandler);
              _.$prev.setAttribute('tabindex', '0');
            }
          }

          // Делаем не активной кнопку дальше
          if (options.next) {
            _.$next.classList.add('disabled');
            _.$next.removeEventListener('click', _.nextStepHandler);
            _.$next.setAttribute('tabindex', '-1');
          }

          // Меняем активность точек-счетчиков
          if (options.dots) {
            _.$dots[_.currentStep - 1].classList.remove('active');
            _.$dots[_.currentStep].classList.add('active');
          }

          // Увеличиваем значение цифры счетчика
          if (options.counter) {
            _.$counterCurrentNum.textContent = _.currentStep + 1;
          }

          // Ищем самый первый элемент квиза и устанавливаем на нем фокус
          if (_.$currentStep.fields) {
            _.$currentStep.fields[0].input.focus();
          }

          // Добавляем пройденный шаг в массив пройденных шагов
          // для контроля шагов назад
          _.$filledSteps.push(_.$prevStep);
        }

      };

      Quiz.prototype.prevStep = function(event) {
        let _ = this,
          options = _.options;

        _.$prevStep = _.$currentStep; // Устанавливаем предыдущим шагом текущий

        _.currentStep--; // Уменьшаем индекс текущего шага (делаем шаг назад)

        _.$currentStep = _.$filledSteps[_.currentStep]; // Уст. текущим шагом предыдущий пройденный шаг

        _.$nextStep = _.$filledSteps[_.currentStep - 1]; // Уст. следующим шагом еще более ранний пройденный шаг

        // Убираем последнюю пару ключ-значение из результата
        _.result.pop();


        _.printStep(_.currentStep, 'prev'); // Выводим на экран необходимые шаги

        // Делаем активной или не активной кнопку назад
        if (options.prev) {
          _.$prev.classList.toggle('disabled', _.currentStep === 0);
          if (_.currentStep === 0) {
            _.$prev.removeEventListener('click', _.prevStepHandler);
            _.$prev.setAttribute('tabindex', '-1');
          }
        }

        // Делаем не активной кнопку дальше
        if (options.next) {
          _.$next.classList.add('disabled');
          _.$next.removeEventListener('click', _.nextStepHandler);
        }

        // Меняем активность точек-счетчиков
        if (options.dots) {
          _.$dots[_.currentStep].classList.add('active');
          _.$dots[_.currentStep + 1].classList.remove('active');
        }

        // Уменьшаем значение цифры счетчика
        if (options.counter) {
          _.$counterCurrentNum.textContent = _.currentStep + 1;
        }

        _.$quiz.classList.remove('final-step');

        // Убираем последний пройденный шаг из массива пройденных шагов
        _.$filledSteps.pop();
        // console.log('pop');

        _.$body.removeAttribute('hidden');
        _.dispatchEvent(_.$quiz, 'prevstep', _.setEventDetails());

      };

      Quiz.prototype.resetQuiz = function() {
        let _ = this.ctx || this;

        _.$prevStep = _.$currentStep;

        _.currentStep = 0;

        _.$currentStep = _.$steps[_.currentStep];
        _.$nextStep = _.$steps[_.currentStep + 1];

        _.printStep(_.currentStep);

        _.$filledSteps = [];
        _.$filledFieldsOnThisStep = [];
        _.$fieldsOnThisStep = qa('input, select, textarea', _.$body, true);
        _.result = [];

        _.$body.removeAttribute('hidden');
        _.$form.parentElement.setAttribute('hidden', '');
        _.$quiz.classList.remove('final-step');

      };

      Quiz.prototype.setProgress = function(percent, direction) {
        let _ = this,
          currentPercent = +_.$progressText.textContent.slice(0, -1),
          number = currentPercent,
          timer = setInterval(function() {

            if (direction === 'prev') {
              _.$progressText.textContent = --number + '%';
              if (number <= percent) {
                clearInterval(timer);
                _.$progressText.textContent = percent + '%';
              }
            } else {
              _.$progressText.textContent = ++number + '%';
              if (number >= percent) {
                clearInterval(timer);
                _.$progressText.textContent = percent + '%';
              }
            }

          }, 10);

        _.$progressBar.style.backgroundSize = percent + '%, 100%';
      };

      return Quiz;
    })();

    let xhr = new XMLHttpRequest();

    xhr.open('post', templateDir + '/quiz.json');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send();

    xhr.addEventListener('readystatechange', function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        let response = JSON.parse(xhr.response);

        let quiz = new Quiz($quizBlock, {
          steps: response,
          finalStepTitle: 'Для получения расчета оставьте свои контактные данные',
          nextBtnClass: 'quiz__next btn btn_green btn_text-black',
          $form: $quizForm,
          $result: $quizResult
        }),
        loadTooltip = function() {
          let elementsWithTooltip = qa('[data-tooltip]', quiz);

          for (var i = elementsWithTooltip.length - 1; i >= 0; i--) {
            let tooltipIcon = document.createElement('span'),
              tooltipText = tooltipIcon.cloneNode(),
              parent = elementsWithTooltip[i].parentElement;

            tooltipIcon.textContent = 'i';
            tooltipIcon.className = 'tooltip-icon';

            tooltipText.textContent = elementsWithTooltip[i].dataset.tooltip;
            tooltipText.className = 'tooltip-text';

            parent.appendChild(tooltipIcon);
            parent.appendChild(tooltipText);
          }

        };

        loadTooltip();
        quiz.addEventListener('prevstep', loadTooltip);
        quiz.addEventListener('nextstep', loadTooltip);

      }
    });
  }

})();