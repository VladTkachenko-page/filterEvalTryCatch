const filterByType = (type, ...values) => values.filter(value => typeof value === type), //создаем фуинкцию filterByType, которая создает новый масив из проверенных элементов 

	hideAllResponseBlocks = () => { //создаем фуинкцию hideAllResponseBlocks
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block')); //создаем переменную responseBlocksArray, который содержит массив с div-ов с класом dialog__response-block
		responseBlocksArray.forEach(block => block.style.display = 'none'); // каждому элементу массива меняем значение display на none
	},

	showResponseBlock = (blockSelector, msgText, spanSelector) => { //создаем фуинкцию showResponseBlock, которая принимает 3 переменные
		hideAllResponseBlocks(); // вызываем функцию hideAllResponseBlocks
		document.querySelector(blockSelector).style.display = 'block'; //меняем display на block передаваемому blockSelector
		if (spanSelector) { //условие есть ли spanSelector 
			document.querySelector(spanSelector).textContent = msgText; //в spanSelector через textContent вставляем текст, который содержится в переменной msgText
		}
	},

	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'), //создаем функцию showError, которая вызывает функцию showResponseBlock с передаваемыми переменными

	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'), //создаем функцию showResults, которая вызывает функцию showResponseBlock с передаваемыми переменными

	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'), //создаем функцию showNoResults, которая вызывает функцию showResponseBlock с передаваемыми переменными

	tryFilterByType = (type, values) => { //создаем функцию tryFilterByType, которая принимает 2 переменные
		try { // используем конструкцию try
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", "); //создаем переменную valuesArray, которая через метод eval создает массив, а методом join превращает массив в строку
			const alertMsg = (valuesArray.length) ? //создаем переменную alertMsg, которая содержит тернарный оператор, который проверяет длину переменной valuesArray
				`Данные с типом ${type}: ${valuesArray}` : //если условие верно выводим сообщение
				`Отсутствуют данные типа ${type}`; //если условие ложное выводим соответствующее сообщение 
			showResults(alertMsg); //вызываем функцию showResults и передаем ей переменную alertMsg
		} catch (e) { //используем конструкцию catch, которая сработает если в try возникнет ошибка
			showError(`Ошибка: ${e}`); ////вызываем функцию showError, которая выведет ошибку
		}
	};

const filterButton = document.querySelector('#filter-btn'); //создаем переменную filterButton, которая содержит кнопку с id filter-btn

filterButton.addEventListener('click', e => { //вызываем обработчик событий для переменной filterButton, который проверяет клик
	const typeInput = document.querySelector('#type'); //создаем переменную typeInput, которая содержит инпут с id type
	const dataInput = document.querySelector('#data'); //создаем переменную dataInput, которая содержит инпут с id data

	if (dataInput.value === '') { //проверяем пустой ли инпут dataInput
		dataInput.setCustomValidity('Поле не должно быть пустым!'); //устанавливаем специальное сообщение для dataInput
		showNoResults(); //вызываем функцию showNoResults
	} else { //если инпут не пустой
		dataInput.setCustomValidity(''); //очищаем специальное сообщение для dataInput
		e.preventDefault(); //действие по умолчанию не выполняeтся 
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim()); //вызываем функцию tryFilterByType, которая принимает значения инпутов без пробелов
	}
});

