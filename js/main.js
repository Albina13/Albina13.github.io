var firstNumber = randomInRange(6, 9);
var secondNumber = randomInRange(11, 14) - firstNumber;
var sumNumbers = firstNumber + secondNumber;
var body = document.body;

function randomInRange(min, max) { 
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

//Выражение

var expression = document.createElement('div');
expression.classList.add('expression');
expression.innerHTML = `
	<span class="first-number">${firstNumber}</span> + <span class="second-number">${secondNumber}</span> <span class="equally-span"> = </span> <span class="amount">?</span>
`;
var expressionFirstNumber = expression.querySelector('.first-number');
var expressionSecondNumber = expression.querySelector('.second-number');
var equallySpan = expression.querySelector('.equally-span');
var amount = expression.querySelector('.amount');

body.insertAdjacentElement('afterBegin', expression);



//Canvas

var convCont = body.querySelector('.cnvs-container');
var canvas = document.querySelector('.cnvs');
var ctx = canvas.getContext('2d');
var axis = body.querySelector('.axis');
var cm = 41.2;

// Первая дуга
var centerFirstArc = (cm * firstNumber) / 2; //координаты центра первой дуги
var bendFirstArc = -70; // Изгиб первой дуги
var endFirstArc = cm * firstNumber; // Координаты конца первой дуги
(function createFirstArc() { //Рисуем первую дугу
	ctx.beginPath();
	ctx.lineWidth = 2;// толщина дуги
	ctx.strokeStyle = '#AA5B82';// цвет дуги
	ctx.moveTo(0, 85); //левый нижний угол canvas
	ctx.quadraticCurveTo(centerFirstArc, bendFirstArc, endFirstArc, 85); // кривая Безье
	ctx.stroke();// отобржение дуги

	ctx.beginPath(); // Рисуем стрелку первой дуге
	ctx.moveTo(endFirstArc, 85);
	ctx.lineTo(endFirstArc - 15, 80);
	ctx.moveTo(endFirstArc, 85);
	ctx.lineTo(endFirstArc - 2, 72);
	ctx.stroke();// отображение стрелки
})();

// Вторая дуга
var centerSecondArc = ((cm * firstNumber) + ((cm * firstNumber) + (cm * secondNumber))) / 2; //Координаты центра второй дуги
var bendSecondArc = -70 / 2; //Изгиб второй дуги
var endSecondArc = (cm * secondNumber) + (cm * firstNumber); // Координаты конца второй дуги

function createSecondArc() { //Рисуем вторую дугу
	ctx.beginPath();
	ctx.moveTo(endFirstArc, 85);//начало второй дуги
	ctx.quadraticCurveTo(centerSecondArc, bendSecondArc, endSecondArc, 85); // кривая Безье
	ctx.stroke();// отобржение дуги

	ctx.beginPath(); // Рисуем стрелку второй дуге
	ctx.moveTo(endSecondArc, 85);
	ctx.lineTo(endSecondArc - 15, 80);
	ctx.moveTo(endSecondArc, 85);
	ctx.lineTo(endSecondArc - 2, 73);
	ctx.stroke();// отображение стрелки
};

// Работа с Input

var firstNumberInput = document.createElement('input');
firstNumberInput.setAttribute("type", "text");
firstNumberInput.setAttribute("maxlength", "1");
firstNumberInput.classList.add('number-input');

convCont.append(firstNumberInput);

firstNumberInput.style.left = ((centerFirstArc + 6.4) + 'px');
console.log(firstNumberInput.clientWidth);
firstNumberInput.style.top = (bendFirstArc + 'px'); //Расположение первого input над дугой

var secondNumberInput = document.createElement('input');
var amountInput = document.createElement('input');
amountInput.setAttribute("type", "text");
amountInput.setAttribute("maxlength", "2");
amountInput.classList.add('amountInput');

// Проверка значения input
function checkValue(inputValue, spanValue, span) { 

	if (inputValue.value != spanValue) {
		inputValue.classList.add('input--error');
		span.classList.add('span---error');
	} else {
		inputValue.disabled = true;
		inputValue.classList.remove('input--error');
		span.classList.remove('span---error');
		appendInputValue();
	};
	if (firstNumberInput.disabled === true && secondNumberInput.disabled === true) {
		amount.after(amountInput);
		amount.remove();
	};
};


// Проверка оставшихся input
function appendInputValue() { 
	var inputs = document.querySelectorAll('input');
	for (var input of inputs) {
		if (!input.disabled) {
			return;
		} else if (input.disabled) {
			secondNumberInput.setAttribute("type", "text");
			secondNumberInput.setAttribute("maxlength", "1");
			secondNumberInput.classList.add('number-input');
			convCont.append(secondNumberInput);
			secondNumberInput.style.left = ((centerSecondArc - 6) + 'px');
			secondNumberInput.style.top = (bendFirstArc / 1.5 + 'px'); //Расположение второго input над дугой
			createSecondArc(); // Рисуем дугу
		}
	};
};


// Проверка input с суммой
function checkSumNumbers() { 
	if (amountInput.value === String(sumNumbers)) {
		amountInput.disabled = true;
		amountInput.classList.remove('input--error');
	} else {
		amountInput.classList.add('input--error');
	}
};


// преобразование Input в число
firstNumberInput.oninput = () => checkValue(firstNumberInput, firstNumber, expressionFirstNumber);
secondNumberInput.oninput = () => checkValue(secondNumberInput, secondNumber, expressionSecondNumber);
amountInput.oninput = checkSumNumbers;