const countryCodeSelectClasses = {
  control: 'select__control',
  controlActive: 'select__control--active',
  options: 'select__options',
  optionsActive: 'select__options--active',
  controlItem: 'select__control-item',
  optionInput: 'select__options-item-input',
}

/**
 * Gets the country code select control element and returns it if the element exists, otherwise
 * an error thrown
 * @throws Error when the element wasn't found
 * @return Country code select control element
 */
function getCountryCodeSelectControl() {
  const control = document.querySelector(`.${countryCodeSelectClasses.control}`)
  if (!control) {
    throw new Error('Country code select control element was not found')
  }
  return control
}

/**
 * Gets the country code select option elements and returns them if elements exist, otherwise
 * an error thrown
 * @throws Error when elements weren't found
 * @return Country code select option elements
 */
function getCountryCodeSelectOptions() {
  const options = document.querySelector(`.${countryCodeSelectClasses.options}`)
  if (!options) {
    throw new Error('Country code select options element was not found')
  }
  return options
}

/**
 * Toggles the visibility of the country code select. When the function is called and select is
 * closed then the select gets opened and the way around
 */
function toggleCountryCodeSelectVisibility() {
  const control = getCountryCodeSelectControl();
  const options = getCountryCodeSelectOptions();

  control.addEventListener('click', () => {
    control.classList.toggle(countryCodeSelectClasses.controlActive);
    options.classList.toggle(countryCodeSelectClasses.optionsActive);
  })
}

/**
 * Closes the country code select when the user either clicked outside the component or clicked `ESC`
 */
function closeCountryCodeSelect() {
  const control = getCountryCodeSelectControl();
  const options = getCountryCodeSelectOptions();

  document.addEventListener('click', (event) => {
    // Outside the component click
    if (!control.contains(event.target) && !options.contains(event.target)) {
      control.classList.remove(countryCodeSelectClasses.controlActive);
      options.classList.remove(countryCodeSelectClasses.optionsActive);
    }
  });

  document.addEventListener('keydown', (event) => {
    // ESC click
    if (event.key === 'Escape' || event.key === 'Esc') {
      control.classList.remove(countryCodeSelectClasses.controlActive);
      options.classList.remove(countryCodeSelectClasses.optionsActive);
    }
  });
}

/**
 * Changes the active control item when the user chose the different country code
 * @param inputValue Radio input value of the element that was chosen for the country code
 */
function updateActiveControl(inputValue) {
  const controlToBeActive = document.querySelector(`.${countryCodeSelectClasses.controlItem}--${inputValue}`);

  if (controlToBeActive) {
    const allControls = document.querySelectorAll(`.${countryCodeSelectClasses.controlItem}`);
    // Firstly, hides all controls
    allControls.forEach(control => {
      control.classList.add('hidden');
    })
    // And then shows the new active control
    controlToBeActive.classList.remove('hidden');
  }
}

/**
 * Handles the logic of changing the country code in the select
 */
function changeCountryCode() {
  const radioInputs = document.querySelectorAll(`.${countryCodeSelectClasses.optionInput}`);

  radioInputs.forEach(input => {
    input.addEventListener('change', () => {
      if (input.checked) {
        updateActiveControl(input.value)
      }
    });
  });
}

/**
 * Inits the country code select logic
 */
function initCountryCodeSelect() {
  toggleCountryCodeSelectVisibility()
  closeCountryCodeSelect()
  changeCountryCode()
}
