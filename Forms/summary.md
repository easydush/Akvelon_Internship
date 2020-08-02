### 1. Form properties
Form navigation:

* `document.forms`
A form is available as document.forms[name/index].
* `form.elements`
Form elements are available as form.elements[name/index], or can use just form[name/index]. The elements property also works for <fieldset>.
* `element.form`
Elements reference their form in the `form` property.

Value is available as `input.value, textarea.value, select.value` etc, or `input.checked` for checkboxes and radio buttons.

For `<select>` we can also get the value by the index `select.selectedIndex` or through the options collection `select.options`.

### 2. Focus/blur
Events focus and blur trigger on focusing/losing focus on the element.

Their specials are:

1. They do not bubble. Can use capturing state instead or `focusin/focusout`.
2. Most elements do not support focus by default. Use `tabindex` to make anything focusable.
3. The current focused element is available as `document.activeElement`.

### 4. Forms: event and method submit

There are two main ways to submit a form:

1. to click <input type="submit"> or <input type="image">.
2. press Enter on an input field.

To submit a form to the server manually, we can call form.submit().
