'use strict'
// Валидация формы обратной связи
window.onload = function(e){
(function() {

	var form = document.querySelector('.feedback__form');
	if (!form) return;

	var	elements	= form.querySelectorAll('.feedback__input');
	var	btn	= document.querySelector('.feedback__input-button');
	var	patternName	= /^[A-Za-z0-9]+$/;
	var	patternMail	= /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z])+$/;
	var	patternSpam	= /[^\<\>\[\]%\&'`]+$/;

	
	var errorMess = {
		emptyField: 'Незаполненное поле ввода',
		wrongName: 'Введите Ваше реальное имя',
		emptyEmail: 'Укажите Вашу электронную почту',
		wrongEmail: 'Неверный формат электронной почты',
		emptySubject: 'Укажите тему сообщения',
		emptyMess: 'Напишите текст сообщения',
		spamMess: 'Ваше сообщение похоже на спам, уберите специальные символы'
	};

	var	iserror	= false;

	btn.addEventListener('click', validForm);
	form.addEventListener('focus', function() {
		var el = document.activeElement;
		if (el !== btn) {
			cleanError(el);
		}
	}, 
	true);

	function validForm(e) {
		e.preventDefault();
		var formVal = getFormData(form);
		var error;

		for (var property in formVal) {
			error = getError(formVal, property);
			if (error.length !== 0) {
				iserror = true;
				showError(property, error);
			}
		}

		if (!iserror) {
			sendFormData(formVal);
		}
		return false;
	}

	function getError(formVal, property) {
		var error = '';
		var	validate = {
			'username': function() {
				if (formVal.username.length === 0 || patternName.test(formVal.username) === false) {
					error = errorMess.wrongName;
				}
			},
			'usermail': function() {
				if (formVal.usermail.length === 0) {
					error = errorMess.emptyEmail;
				} else if (patternMail.test(formVal.usermail) === false) {
					error = errorMess.wrongEmail;
				}
			},
			'subject': function() {
				if (formVal.subject.length === 0) {
					error = errorMess.emptySubject;
				} else if (patternSpam.test(formVal.subject) === false) {
					error = errorMess.spamMess;
				}
			},
			'textmess': function() {
				if (formVal.textmess.length === 0) {
					error = errorMess.emptyMess;
				} else if (patternSpam.test(formVal.textmess) === false) {
					error = errorMess.spamMess;
				}
			}
		};
		validate[property]();
		return error;
	}

	elements.forEach(function(element) {
		element.addEventListener('blur', function(e) {
			var formElement = e.target;
			var	property = formElement.getAttribute('name');
			var	dataField = {};

			dataField[property] = formElement.value;

			var error = getError(dataField, property);
			if (error.length !== 0) {
				showError(property, error);
			}
			return false;
		});
	});

	function showError(property, error) {
		var formElement = form.querySelector('[name=' + property + ']');
		var errorBox	= formElement.parentNode.querySelector('.feedback__error');

		formElement.classList.add('feedback__input-error');
		errorBox.innerHTML = error;
		errorBox.style.display = 'block';
	}

	function cleanError(el) {
		var errorBox = el.parentNode.querySelector('.feedback__error');
		el.classList.remove('feedback__input-error');
		errorBox.removeAttribute('style');
	}

	function getFormData(form) {
		var controls = {};
		if (!form.elements) {
			return '';
		}
		for (var i = 0; i < form.elements.length; i++) {
			var element = form.elements[i];
			if (element.tagName.toLowerCase() !== 'button') {
				controls[element.name] = element.value;
			}
		}
		return controls;
	}

	function sendFormData(formVal) {
		var xhr = new XMLHttpRequest();
		var	body	= 'username=' + encodeURIComponent(formVal.username) +
					  '&usermail=' + encodeURIComponent(formVal.usermail) +
					  '&subject=' + encodeURIComponent(formVal.subject) +
					  '&textmess=' + encodeURIComponent(formVal.textmess);

		xhr.open('POST', '/sendmail.php', true);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		xhr.setRequestHeader('Cache-Control', 'no-cache');

		xhr.onreadystatechange = function() {
			// callback
		}

		xhr.send(body);
	}
}());
}();