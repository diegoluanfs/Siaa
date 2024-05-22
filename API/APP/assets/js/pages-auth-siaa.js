/**
 *  Pages Authentication
 */

'use strict';
const formRegistration = document.querySelector('#formRegistration');

document.addEventListener('DOMContentLoaded', () => {
  (() => {
    // Form validation for Add new record
    if (formRegistration) {
      const fv = FormValidation.formValidation(formRegistration, {
        fields: {
          username: {
            validators: {
              notEmpty: {
                message: 'Please enter username'
              },
              stringLength: {
                min: 6,
                message: 'Username must be more than 6 characters'
              }
            }
          },
          email: {
            validators: {
              notEmpty: {
                message: 'Please enter your email'
              },
              emailAddress: {
                message: 'Please enter valid email address'
              }
            }
          },
          'email-username': {
            validators: {
              notEmpty: {
                message: 'Please enter email / username'
              },
              stringLength: {
                min: 6,
                message: 'Username must be more than 6 characters'
              }
            }
          },
          password: {
            validators: {
              notEmpty: {
                message: 'Please enter your password'
              },
              stringLength: {
                min: 6,
                message: 'Password must be more than 6 characters'
              }
            }
          },
          'confirm-password': {
            validators: {
              notEmpty: {
                message: 'Please confirm password'
              },
              identical: {
                compare: () => formRegistration.querySelector('[name="password"]').value,
                message: 'The password and its confirm are not the same'
              },
              stringLength: {
                min: 6,
                message: 'Password must be more than 6 characters'
              }
            }
          },
          terms: {
            validators: {
              notEmpty: {
                message: 'Please agree terms & conditions'
              }
            }
          }
        },
        plugins: {
          trigger: new FormValidation.plugins.Trigger(),
          bootstrap5: new FormValidation.plugins.Bootstrap5({
            eleValidClass: '',
            rowSelector: '.mb-3'
          }),
          submitButton: new FormValidation.plugins.SubmitButton(),
          autoFocus: new FormValidation.plugins.AutoFocus()
        },
        init: instance => {
          instance.on('plugins.message.placed', (e) => {
            if (e.element.parentElement.classList.contains('input-group')) {
              e.element.parentElement.insertAdjacentElement('afterend', e.messageElement);
            }
          });
        }
      });

      formRegistration.addEventListener('submit', (e) => {
        e.preventDefault();
        e.stopPropagation();
        fv.validate().then(status => {
          if (status === 'Valid') {
            const data = {
              username: $('#username').val(),
              email: $('#email').val(),
              password: $('#password').val(),
              //terms: formRegistration.querySelector('[name="terms"]').checked
            };

            console.log('JSON.stringify(data): ', JSON.stringify(data));

            $.ajax({
              url: 'http://localhost:3000/api/',
              type: 'POST',
              contentType: 'application/json',
              data: JSON.stringify(data),
              success: function (response) {
                console.log('Success:', response);
              },
              error: function (error) {
                console.error('Error:', error);
              }
            });
          } else {
            console.log('Form is not valid');
          }
        });
      });
    }

    //  Two Steps Verification
    const numeralMask = document.querySelectorAll('.numeral-mask');

    // Verification masking
    if (numeralMask.length) {
      numeralMask.forEach(e => {
        new Cleave(e, {
          numeral: true
        });
      });
    }
  })();
});
