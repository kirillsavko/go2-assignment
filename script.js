const elementsClasses = {
  codeCountrySelectControl: 'select__control',
  codeCountrySelectControlActive: 'select__control--active',
  codeCountrySelectOptions: 'select__options',
  codeCountrySelectOptionsActive: 'select__options--active',
  codeCountrySelectOption: 'select__options-item',
  codeCountrySelectOptionInput: 'select__options-item-input',
  form: 'basic-details__form',
  thankYou: 'thank-you',
  thankYouActive: 'thank-you--active',
  thankYouButton: 'thank-you__button',
  basicDetails: 'basic-details',
  basicDetailsActive: 'basic-details--active',
  formFieldInputError: 'form-field__input--error',
  formFieldError: 'form-field__error',
  formFieldLabel: 'form-field',
  formSubmitButton: 'basic-details__form-submit-btn',
}

const countryCodeMapping = {
  us: {
    imgSrc: 'assets/icons/usa-flag.svg',
    imgAlt: 'USA flag',
    phoneCode: '+1',
    // 10 symbols, all numbers. First symbol isn't 0 or 1
    regex: /^[2-9]\d{9}$/,
    maxLength: 10,
    mask: [3, 6],
  },
  uk: {
    imgSrc: 'assets/icons/uk-flag.svg',
    imgAlt: 'UK flag',
    phoneCode: '+44',
    // 10 symbols, all numbers. First symbol isn't 0
    regex: /^[1-9]\d{9}$/,
    maxLength: 10,
    mask: [5]
  },
  germany: {
    imgSrc: 'assets/icons/germany-flag.svg',
    imgAlt: 'Germany flag',
    phoneCode: '+49',
    // 9-13 symbols, all numbers. First symbol isn't 0
    regex: /^[1-9]\d{8,12}$/,
    maxLength: 13,
    mask: [3, 7, 10],
  },
}

/**
 * Finds the HTML node by the given selector
 * @param selector Selector the node should be found by
 * @throws Error when the HTML node was not found
 * @return Found HTML node
 */
function findNodeBySelector(selector) {
  const node = document.querySelector(selector)
  if (!node) {
  throw new Error(`Cannot find node with selector '${selector}'`)
  }
  return node
}

/**
 * Finds the country code select control node
 * @return Country code select control
 */
function getCountryCodeSelectControlNode() {
  return findNodeBySelector(`.${elementsClasses.codeCountrySelectControl}`)
}

/**
 * Finds the country code select option element
 * @return Country code select option element
 */
function getCountryCodeSelectOptionsNode() {
  return findNodeBySelector(`.${elementsClasses.codeCountrySelectOptions}`)
}

/**
 * Finds the thank-you node section
 * @return Thank-you node section
 */
function getThankYouNode() {
  return findNodeBySelector(`.${elementsClasses.thankYou}`)
}

/**
 * Gets the basic details node section
 * @return Basic details node section
 */
function getBasicDetailsNode() {
  return findNodeBySelector(`.${elementsClasses.basicDetails}`)
}

/**
 * Finds the form node
 * @return Form node
 */
function getFormNode() {
  return findNodeBySelector(`.${elementsClasses.form}`)
}

/**
 * Finds the submit form button node
 * @return Submit form button
 */
function getSubmitFormButton() {
  return findNodeBySelector(`.${elementsClasses.formSubmitButton}`)
}

/**
 * Finds the phone number input in the form
 * @return Phone number input
 */
function getPhoneNumberInput() {
  return findNodeBySelector(`.${elementsClasses.form} input[name=phone-number]`)
}

/**
 * Toggles the visibility of the country code select. When the function is called and select is
 * closed then the select gets opened and the way around
 */
function toggleCountryCodeSelectVisibility() {
  const control = getCountryCodeSelectControlNode()
  const options = getCountryCodeSelectOptionsNode()

  control.addEventListener('click', () => {
    control.classList.toggle(elementsClasses.codeCountrySelectControlActive)
    options.classList.toggle(elementsClasses.codeCountrySelectOptionsActive)

    // If the select was just shown then sets the focus on the selected input automatically.
    // It allows the user jump between elements with their keyboard directly
    if (control.classList.contains(elementsClasses.codeCountrySelectControlActive)) {
      const input = findNodeBySelector(`.${elementsClasses.codeCountrySelectOptionInput}:checked`)
      if (input) {
        input.focus()
      }
    }
  })
}

function closeCountryCodeSelect() {
  const control = getCountryCodeSelectControlNode()
  const options = getCountryCodeSelectOptionsNode()

  control.classList.remove(elementsClasses.codeCountrySelectControlActive)
  options.classList.remove(elementsClasses.codeCountrySelectOptionsActive)
}

/**
 * Closes the country code select when the user either clicked outside the component or clicked `ESC`
 */
function handleCountrySelectClosing() {
  const control = getCountryCodeSelectControlNode()
  const options = getCountryCodeSelectOptionsNode()

  document.addEventListener('click', (event) => {
    // Outside the component click
    if (!control.contains(event.target) && !options.contains(event.target)) {
      closeCountryCodeSelect()
    }
  })

  document.addEventListener('keydown', (event) => {
    // ESC click
    if (event.key === 'Escape' || event.key === 'Esc') {
      closeCountryCodeSelect()
    }
  })
}

/**
 * Sets the country code by the given country name
 * @param country Country abbreviation the country code should be set for
 */
function setCountryCode(country) {
  const control = getCountryCodeSelectControlNode()
  const phoneNumberInput = getPhoneNumberInput()

  const imgSrc = countryCodeMapping[country].imgSrc
  const imgAlt = countryCodeMapping[country].imgAlt
  const code = countryCodeMapping[country].phoneCode
  const pattern = countryCodeMapping[country].regex.source

  control.innerHTML = `
    <span class='select__control-item'>
      <img src=${imgSrc} alt=${imgAlt} class='select__control-item-flag-icon'>
      ${code}
    </span>
    <img src='assets/icons/arrow-down.svg' class='select__control-arrow-icon' alt='Black down arrow'>
  `
  phoneNumberInput.value = ''
  phoneNumberInput.pattern = pattern
  disableSubmitFormButton()
}

/** Handles the logic of changing the country code in the select */
function handleCountrySelectSetting() {
  const radioInputs = document.querySelectorAll(`.${elementsClasses.codeCountrySelectOptionInput}`)
  const labels = document.querySelectorAll(`.${elementsClasses.codeCountrySelectOption}`)

  radioInputs.forEach(input => {
    input.addEventListener('change', () => {
      if (input.checked) {
        setCountryCode(input.value)
      }
    })
  })

  labels.forEach(label => {
    label.addEventListener('click', e => {
      // Closes select only if the user updated the value with a mouse
      if (e.pointerType === 'mouse') {
        closeCountryCodeSelect()
      }
    })
  })
}

/** Inits the country code select logic */
function initCountryCodeSelect() {
  toggleCountryCodeSelectVisibility()
  handleCountrySelectClosing()
  handleCountrySelectSetting()
}

/** Shows in the UI the thank-you node section */
function showThankYou() {
  const thankYou = getThankYouNode()
  thankYou.classList.add(elementsClasses.thankYouActive)
}

/** Hides from the UI the thank-you node section */
function hideThankYou() {
  const thankYou = getThankYouNode()
  thankYou.classList.remove(elementsClasses.thankYouActive)
}

/** Shows in the UI the basic details node section */
function showBasicDetails() {
  const thankYou = getBasicDetailsNode()
  thankYou.classList.add(elementsClasses.basicDetailsActive)
}

/** Hides from the UI the basic details node section */
function hideBasicDetails() {
  const thankYou = getBasicDetailsNode()
  thankYou.classList.remove(elementsClasses.basicDetailsActive)
}

/** Enables the submit form button */
function enableSubmitFormButton() {
  const button = getSubmitFormButton()
  button.removeAttribute('disabled')
}

/** Disables the submit form button */
function disableSubmitFormButton() {
  const button = getSubmitFormButton()
  button.setAttribute('disabled', 'disabled')
}

/**
 * Sets the given error for the given input
 * @param input Input the error should be set to
 * @param errorMessage Error message for the input
 */
function setErrorForInput(input, errorMessage) {
  const errorElement = input.closest(`.${elementsClasses.formFieldLabel}`).querySelector(`.${elementsClasses.formFieldError}`)
  input.classList.add(elementsClasses.formFieldInputError)
  errorElement.textContent = errorMessage
}

/**
 * Resets error for the given input
 * @param input Input the error should be reset for
 */
function resetErrorForInput(input) {
  const errorElement = input.closest(`.${elementsClasses.formFieldLabel}`).querySelector(`.${elementsClasses.formFieldError}`)
  input.classList.remove(elementsClasses.formFieldInputError)
  errorElement.textContent = ''
}

/**
 * Validates the given input and sets the error if the input does not pass the validation
 * @param input Input that should be validated
 * @param value Input's value that should be validated
 * @return `true` if the input is valid, otherwise `false`
 */
function validateInput(input, value) {
  if (value.length === 0 && input.required) {
    setErrorForInput(input, 'This field cannot be empty.')
    return false
  }

  if (input.minLength > 0) {
    if (value.length < input.minLength) {
      setErrorForInput(input, `Min length ${input.minLength}.`)
      return false
    }
  }

  if (input.maxLength > 0) {
    if (value.length > input.maxLength) {
      setErrorForInput(input, `Max length ${input.maxLength}.`)
      return false
    }
  }

  if (input.pattern) {
    const regex = new RegExp(input.pattern)
    if (!regex.test(value)) {
      setErrorForInput(input, 'Value is wrong.')
      return false
    }
  }

  return true
}

/**
 * Formats the given value from the phone number input and returns it back
 * @param value Value that should be formatted
 * @param countryCode Code of the country the number belongs to
 * @return Formated phone number
 */
function formatPhoneNumber(value, countryCode) {
  const config = countryCodeMapping[countryCode]
  if (!config) {
    return value
  }

  const onlyDigits = value.replace(/\D/g, '').slice(0, config.maxLength)

  let formatted = ''
  for (let i = 0; i < onlyDigits.length; i++) {
    if (config.mask.includes(i) && i !== 0) {
      formatted += ' '
    }
    formatted += onlyDigits[i]
  }

  return formatted
}

/** Handles the logic of updating inputs in the form */
function handleFormUpdates() {
  const form = getFormNode()

  const thankYouFirstNameInput = findNodeBySelector(`.${elementsClasses.thankYou} input[name=first-name]`)
  const thankYouLastNameInput = findNodeBySelector(`.${elementsClasses.thankYou} input[name=last-name]`)
  const thankYouPhoneNumberInput = findNodeBySelector(`.${elementsClasses.thankYou} input[name=phone-number]`)
  const thankYouRoleInput = findNodeBySelector(`.${elementsClasses.thankYou} input[name=role]`)

  const inputsFilledStatus = {
    'first-name': false,
    'last-name': false,
    'phone-number': false,
  }

  form.addEventListener('reset', () => {
    inputsFilledStatus['first-name'] = false
    inputsFilledStatus['last-name'] = false
    inputsFilledStatus['phone-number'] = false

    setCountryCode('us')
  })

  form.addEventListener('input', (event) => {
    if (event.target.matches('input')) {
      switch (event.target.name) {
        case 'first-name':
          thankYouFirstNameInput.value = event.target.value
          inputsFilledStatus[event.target.name] = event.target.value.length >= 1
          resetErrorForInput(event.target)
          break
        case 'last-name':
          thankYouLastNameInput.value = event.target.value
          inputsFilledStatus[event.target.name] = event.target.value.length >= 1
          resetErrorForInput(event.target)
          break
        case 'phone-number':
          const selectedCodeCountryNode = findNodeBySelector(`.${elementsClasses.codeCountrySelectOptionInput}:checked`)
          const selectedCodeCountry = countryCodeMapping[selectedCodeCountryNode.value].phoneCode

          const formattedPhoneNumber = formatPhoneNumber(event.target.value, selectedCodeCountryNode.value)
          inputsFilledStatus[event.target.name] = formattedPhoneNumber.length >= 1
          event.target.value = formattedPhoneNumber

          thankYouPhoneNumberInput.value = `${selectedCodeCountry} ${formattedPhoneNumber}`
          resetErrorForInput(event.target)
          break
        case 'role':
          if (event.target.id === 'role-buyer') {
            thankYouRoleInput.value = 'Buyer'
          } else {
            thankYouRoleInput.value = 'Seller'
          }
          break
        default:
          break
      }
    }

    const everyInputFilled = Object.values(inputsFilledStatus).every(Boolean)
    if (everyInputFilled) {
      enableSubmitFormButton()
    } else {
      disableSubmitFormButton()
    }
  })
}

/**
 * Validates all existing inputs in the form
 * @param onSuccessCallback Called if all inputs passed the validation
 */
function validateAllInputsInForm(onSuccessCallback) {
  const firstNameInput = findNodeBySelector(`.${elementsClasses.form} input[name=first-name]`)
  const lastNameInput = findNodeBySelector(`.${elementsClasses.form} input[name=last-name]`)
  const phoneNumberInput = getPhoneNumberInput()
  const roleInput = findNodeBySelector(`.${elementsClasses.form} input[name=role]`)

  // We use a mask for phone numbers and that's why all spaces should be removed before the validation
  const formattedPhoneNumberValue = phoneNumberInput.value.replaceAll(' ', '')

  const firstNameResult = validateInput(firstNameInput, firstNameInput.value)
  const lastNameInputResult = validateInput(lastNameInput, lastNameInput.value)
  const phoneNumberInputResult = validateInput(phoneNumberInput, formattedPhoneNumberValue)
  const roleInputResult = validateInput(roleInput, roleInput.value)

  const allInputsValid = [firstNameResult, lastNameInputResult, phoneNumberInputResult, roleInputResult].every(Boolean)

  if (allInputsValid) {
    onSuccessCallback()
  }
}

/** Handles the form submit action */
function handleFormSubmit() {
  const form = getFormNode()
  form.addEventListener('submit', e => {
    e.preventDefault()
    validateAllInputsInForm(() => {
      hideBasicDetails()
      showThankYou()
    })
  })
}

/** Handles the click action on the button in the thank-you section */
function handleThankYouButtonClick() {
  const thankYouButton = findNodeBySelector(`.${elementsClasses.thankYouButton}`)
  const form = getFormNode()
  thankYouButton.addEventListener('click', () => {
    form.reset()
    disableSubmitFormButton()
    hideThankYou()
    showBasicDetails()
  })
}

initCountryCodeSelect()
handleFormUpdates()
handleFormSubmit()
handleThankYouButtonClick()
