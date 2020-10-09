;
(function() {
  // formValidator({
  //   form: id('contacts-form'),
  //   formBtn: q('button', form),
  //   uploadFilesBlock: id('uploadedfiles'),
  //   filesInput: id('files-input')
  // });
  let $contactsForm = id('contacts-form'),
    $formBtn = q('button', $contactsForm),
    $uploadFilesBlock = id('uploadedfiles'),
    errorsClass = 'invalid',
    $filesInput = id('files-input'),
    rules = {
      name: {
        required: true
      },
      tel: {
        required: true,
        pattern: /\+7\([0-9]{3}\)[0-9]{3}\-[0-9]{2}\-[0-9]{2}/,
        or: 'email'
      },
      email: {
        required: true,
        pattern: /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z])+$/,
        or: 'tel'
      },
      msg: {
        required: true,
        pattern: /[^\<\>\[\]%\&'`]+$/
      },
      policy: {
        required: true
      }
    },
    messages = {
      tel: {
        required: 'Введите ваш телефон или E-mail',
        pattern: 'Укажите верный телефон'
      },
      name: {
        required: 'Введите ваше имя',
      },
      email: {
        required: 'Введите ваш E-mail или телефон',
        pattern: 'Введите верный E-mail'
      },
      msg: {
        required: 'Введите ваше сообщение',
        pattern: 'Введены недопустимые символы'
      },
      policy: {
        required: 'Согласитель с политикой обработки персональных данных'
      }
    },
    /*
      Функция получения значения полей у текущей формы.
      Ищет только те элементы формы, именя которых указаны в rules.
      Возвращает объект: 
      {название-поля: значение-поля}
      Например:
      {'user-email': 'mail@mail.ru'}
    */
    getFormData = function($form) {
      let formElements = $form.elements,
        values = {};

      for (let rule in rules) {
        let formElement = formElements[rule];

        if (formElement) {
          values[rule] = formElement.value;
        }
      }

      return values;
    },
    /*
      Функция проверки правильности заполнения формы.
    */
    validationForm = function(event) {
      let errors = {},
        thisForm = $contactsForm,
        values = getFormData(thisForm);

      for (let elementName in values) {
        let rule = rules[elementName],
          $formElement = thisForm[elementName],
          elementValue = values[elementName],
          or = rule.or,
          $orFormElement = thisForm[or];

        if (rule) {
          if ($formElement.hasAttribute('required') || rule.required === true) {
            let elementType = $formElement.type,
              pattern = rule.pattern;

            if (((elementType === 'checkbox' || elementType === 'radio') && !$formElement.checked) ||
              elementValue === '') {

              if (or) {
                if ($orFormElement.value === '') {
                  errors[elementName] = messages[elementName].required;
                  continue;
                }
              } else {
                errors[elementName] = messages[elementName].required;
                continue;
              }
            }

            if (elementType !== 'cehckbox' && elementType !== 'radio' && pattern) {
              if (pattern.test(elementValue) === false) {
                if (or) {
                  if ($orFormElement.value === '') {
                    errors[elementName] = messages[elementName].pattern;
                    continue;
                  }
                } else {
                  errors[elementName] = messages[elementName].pattern;
                  continue;
                }

              }
            }

            hideError($formElement);
          }
        }
      }

      if (Object.keys(errors).length == 0) {
        thisForm.removeEventListener('change', validationForm);
        thisForm.removeEventListener('input', validationForm);
        $contactsForm.validatie = true;
      } else {
        thisForm.addEventListener('change', validationForm);
        thisForm.addEventListener('input', validationForm);
        showErrors(thisForm, errors);
        $contactsForm.validatie = false;
      }

    },
    showErrors = function($form, errors) {
      let $formElements = $form.elements;

      for (let elementName in errors) {
        let errorText = errors[elementName],
          $errorElement = `<label class="${errorsClass}">${errorText}</label>`,
          $formElement = $formElements[elementName],
          $nextElement = $formElement.nextElementSibling;

        if ($nextElement && $nextElement.classList.contains(errorsClass)) {
          if ($nextElement.textContent !== errorText) {
            $nextElement.textContent = errorText;
          }
          continue;
        } else {
          $formElement.insertAdjacentHTML('afterend', $errorElement);
        }

        $formElement.classList.add(errorsClass);
      }

    },
    hideError = function($formElement) {
      let $nextElement = $formElement.nextElementSibling;
      $formElement.classList.remove(errorsClass);
      if ($nextElement && $nextElement.classList.contains(errorsClass)) {
        $nextElement.parentElement.removeChild($nextElement);
      }
    },
    submitHandler = function(event) {
      let $form = q('#' + event.detail.id + '>form'),
        eventType = event.type;

      if (eventType === 'wpcf7mailsent') {
        let $formElements = $form.elements;

        for (let i = 0; i < $formElements.length; i++) {
          hideError($formElements[i]);
          $formElements[i].classList.remove('filled');
        }

        $form.reset();
        $uploadFilesBlock.innerHTML = '';
        // console.log('отправлено');
      }
      /* else if (eventType === 'wpcf7mailfailed') {
              console.log('отправка не удалась');
            }*/

      $contactsForm.classList.remove('loading');

      thanksPopup.openPopup();
      thanksPopupTimer = setTimeout(function() {
        thanksPopup.closePopup();
      }, 3000);


    },
    toggleInputsClass = function() {
      let $input = event.target,
        type = $input.type,
        files = $input.files,
        classList = $input.classList,
        value = $input.value;

      if (type === 'text' || $input.tagName === 'TEXTAREA') {
        if (value === '') {
          classList.remove('filled');
        } else {
          classList.add('filled');
        }
      } else if (type === 'file') {
        // $input.filesArray = [];

        let uploadedFiles = '';
        for (let i = 0, len = files.length; i < len; i++) {
          // $input.filesArray[i] = files[i];
          uploadedFiles += '<span class="uploadedfiles__file"><span class="uploadedfiles__file-text">' + files[i].name + '</span></span>';
        }
        $uploadFilesBlock.innerHTML = uploadedFiles;
      }

    };

  if ($contactsForm) {
    $contactsForm.setAttribute('novalidate', '');
    $contactsForm.validatie = false;
    $formBtn.addEventListener('click', function() {
      validationForm();
      if ($contactsForm.validatie === false) {
        event.preventDefault();
      } else {
        $contactsForm.classList.add('loading');
      }
    });
    document.addEventListener('wpcf7mailsent', submitHandler);
    $contactsForm.addEventListener('input', toggleInputsClass);
  }


})();