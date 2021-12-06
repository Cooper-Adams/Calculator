//Global answer variable for resetting calculator after calculation
let answer = 'NaN';

//Global symbol variable for input validation from user
let prevSymbol = '@'

//Gets access to the calculator's display and defaults it to 0
const screen = document.getElementById('screenDisplay');
screen.textContent = '';

//Gets the button box div and then populates it with buttons
const btnBox = document.querySelector('.buttons');

//The window will listen for key presses, and will call the addtodisplay
//function with the data for the corresponding keys. Allows keyboard
//support for the calculator, so the user can choose not to manually click
//the onscreen buttons.
window.addEventListener('keydown', function (e) 
{
    //preventDefault is here to "disable" the quick find feature in Firefox.
    //Basically just ignores the call to it, allowing the user to divide
    //freely.
    e.preventDefault();

    //Prevents null errors for if shift is pressed
    if (e.key == 'Shift')
    {
        return;
    }

    //Specifies Enter as it is different than the data key for the
    //physical button onscreen.
    else if (e.key == 'Enter')
    {
        const key = document.querySelector(`button[data-key="="]`);
        key.classList.toggle('button-active');
        addToDisplay('equalButton', '=');
    }

    //Specifies the other pressable buttons from the calculator. This is
    //done so as prevent null key errors if the user is pressing non-numeric
    //or non-operational keys on their keyboard.
    else if (e.key >= 0 && e.key <= 9
        || e.key == '.'
        || e.key == '-'
        || e.key == '+'
        || e.key == '*'
        || e.key == '/'
        || e.key == 'Backspace')
    {
        const key = document.querySelector(`button[data-key="${e.key}"]`);
        key.classList.toggle('button-active');
        addToDisplay(key.id, key.textContent);
    }

    //Does nothing if the key pressed is not numeric or operational.
    else
    {
        return;
    }
});

//The window will listen for the release of keys in order to remove the
//button-active class from the keys that are pressed. This is so the buttons
//still give the effect of being pressed even if the user is using the keyboard.
window.addEventListener('keyup', function (e) 
{
    //preventDefault is here to "disable" the quick find feature in Firefox.
    //Basically just ignores the call to it, allowing the user to divide
    //freely.
    e.preventDefault();

    //Ignores shift press in console due to null key errors.
    if (e.key == 'Shift')
    {
        return;
    }

    //Specifies the enter key as it's data key is different from the
    //onscreen button's.
    else if (e.key == 'Enter')
    {
        const key = document.querySelector(`button[data-key="="]`);
        key.classList.toggle('button-active');
    }

    //Specifies the other pressable buttons from the calculator. This is
    //done so as prevent null key errors if the user is pressing non-numeric
    //or non-operational keys on their keyboard.
    else if (e.key >= 0 && e.key <= 9
        || e.key == '.'
        || e.key == '-'
        || e.key == '+'
        || e.key == '*'
        || e.key == '/'
        || e.key == 'Backspace')
    {
        const key = document.querySelector(`button[data-key="${e.key}"]`);
        key.classList.toggle('button-active');
    }

    //Does nothing if the key pressed is not numeric or operational.
    else
    {
        return;
    }
});

//Instantiates the buttons 7, 8, 9, that go on the top row of the number
//side of the calculator
for (let i = 7; i <= 9; ++i)
{
    const button = document.createElement('button');
    button.setAttribute('id', 'num' + i);
    button.setAttribute('data-key', i);
    button.classList.add('key');
    button.textContent = i;
    button.addEventListener('click', function() {addToDisplay(button.id, button.textContent, false)});
    btnBox.appendChild(button);
}

//Instantiates the buttons 4, 5, 6, that go in the middle row of the num
//side of the calculator
for (let i = 4; i <= 6; ++i)
{
    const button = document.createElement('button');
    button.setAttribute('id', 'num' + i);
    button.setAttribute('data-key', i);
    button.classList.add('key');
    button.textContent = i;
    button.addEventListener('click', function() {addToDisplay(button.id, button.textContent, false)});
    btnBox.appendChild(button);
}

//Instantiates the buttons 1, 2, 3, that go on the bottom row of the num
//side of the calculator
for (let i = 1; i <= 3; ++i)
{
    const button = document.createElement('button');
    button.setAttribute('id', 'num' + i);
    button.setAttribute('data-key', i);
    button.classList.add('key');
    button.textContent = i;
    button.addEventListener('click', function() {addToDisplay(button.id, button.textContent, false)});
    btnBox.appendChild(button);
}

//Instantiates the buttons 0, '.', '=', that go below the numbers on the num
//side of the calculator
for (let i = 10; i <= 12; ++i)
{
    //Zero button
    if (i == 10)
    {
        const button = document.createElement('button');
        button.setAttribute('id', 'zeroButton');
        button.setAttribute('data-key', 0);
        button.classList.add('key');
        button.textContent = '0';
        button.addEventListener('click', function() {addToDisplay(button.id, button.textContent, false)});
        btnBox.appendChild(button);
    }

    //Decimal button
    else if (i == 11)
    {
        const button = document.createElement('button');
        button.setAttribute('id', 'deciButton');
        button.setAttribute('data-key', '.');
        button.classList.add('key');
        button.textContent = '.';
        button.addEventListener('click', function() {addToDisplay(button.id, button.textContent, false)});
        btnBox.appendChild(button);
    }

    //Equals button
    else
    {
        const button = document.createElement('button');
        button.setAttribute('id', 'equalButton');
        button.setAttribute('data-key', '=');
        button.classList.add('key');
        button.textContent = '=';
        button.addEventListener('click', function() {addToDisplay(button.id, button.textContent, false)});
        btnBox.appendChild(button);
    }
}


//Gets the operations box div and then populates it with buttons
const opBox = document.querySelector('.operations');

//Instantiates the 5 buttons in the column to the right of the numbers.
//Contains a backspace/clear button, then division, multiplication, addition, and subtraction
for (let i = 1; i <= 5; ++i)
{
    //Backspace/Clear Button
    if (i == 1)
    {
        //This button makes use of the long press function created by
        //John Doherty. The js file is included in the directory.
        const button = document.createElement('button');
        button.setAttribute('id', 'backButton');
        button.setAttribute('data-key', 'Backspace');
        button.classList.add('key');
        button.setAttribute('data-long-press-delay', '500')
        button.textContent = '⌫';
        button.addEventListener('click', function() {addToDisplay(button.id, button.textContent, false)});
        button.addEventListener('long-press', function(e) {
            screen.textContent = '';
        });
        opBox.appendChild(button);
    }

    //Division button
    else if (i == 2)
    {
        const button = document.createElement('button');
        button.setAttribute('id', 'diviButton');
        button.setAttribute('data-key', '/');
        button.classList.add('key');
        button.textContent = '÷';
        button.addEventListener('click', function() {addToDisplay(button.id, button.textContent, false)});
        opBox.appendChild(button);
    }

    //Multiplication button
    else if (i == 3)
    {
        const button = document.createElement('button');
        button.setAttribute('id', 'multButton');
        button.setAttribute('data-key', '*');
        button.classList.add('key');
        button.textContent = '×';
        button.addEventListener('click', function() {addToDisplay(button.id, button.textContent, false)});
        opBox.appendChild(button);
    }

    //Subtraction button
    else if (i == 4)
    {
        const button = document.createElement('button');
        button.setAttribute('id', 'subtButton');
        button.setAttribute('data-key', '-');
        button.classList.add('key');
        button.textContent = '-';
        button.addEventListener('click', function() {addToDisplay(button.id, button.textContent, false)});
        opBox.appendChild(button);
    }

    //Addition button
    else if (i == 5)
    {
        const button = document.createElement('button');
        button.setAttribute('id', 'addButton');
        button.setAttribute('data-key', '+');
        button.classList.add('key');
        button.textContent = '+';
        button.addEventListener('click', function() {addToDisplay(button.id, button.textContent, false)});
        opBox.appendChild(button);
    }
}

//Function for on button click, adds the value of the clicked button
//to the display.
function addToDisplay(id, value)
{
    //Identifies if the button pressed was the back button
    if (id == 'backButton')
    {
        //Makes a single character turn into 0
        if (screen.textContent.length == 1)
        {
            screen.textContent = '';
        }

        //If the last operation was the answer, clear display
        else if (screen.textContent == answer)
        {
            prevSymbol = '@';
            screen.textContent = '';
        }

        //Removes a character from the display completely if there is
        //more than one on the screen
        else if (screen.textContent.length > 1)
        {
            screen.textContent = screen.textContent.slice(0, -1);
        }
    }

    //Identifies if the display contains an answer from a problem.
    else if (screen.textContent == answer)
    {
        //If a symbol is pressed, it will not erase the answer
        if (value == '+' || 
        value == '-' || 
        value == '×' || 
        value == '÷' ||
        (value == '.' && !answer.includes('.')))
        {
            prevSymbol = value;
            screen.textContent = screen.textContent + value;
            return;
        }

        //If user presses '=' after an answer is displayed, do nothing
        else if (value == '=')
        {
            return;
        }

        //Erases the answer if another number is pressed
        else
        {
            prevSymbol = '@';
            answer = 'NaN';
            screen.textContent = value;
            return;
        }
    }

    //Removes zero and starts with whatever button was pressed if 0 is
    //only character in the display
    else if (screen.textContent == '')
    {
        //If a symbol is pressed, there is no reason for it to erase the 0
        if (value == '+' ||
        value == '=' || 
        value == '×' || 
        value == '÷')
        {
            return;
        }

        else 
        {
            screen.textContent = value;
            return;
        }
    }

    //Doesn't allow user to input three '-' in a row
    else if (value == '-' && prevSymbol == screen.textContent[screen.textContent.length
         - 1] && prevSymbol == screen.textContent[screen.textContent.length - 2])
    {
        return;
    }

    //Doesn't allow user to put two symbols in a row (unless it is a '-')
    else if (value == prevSymbol && prevSymbol == screen.textContent[screen.textContent.length - 1] && prevSymbol != '-')
    {
        return;
    }

    //Identifies if the previous key press was '.' for verification logic.
    else if (screen.textContent[screen.textContent.length - 1] == '.')
    {
        //Does not allow user to perform operation if there is no value on
        //the right of the decimal
        if (value == '+' 
        || value == '÷' 
        || value == '×' 
        || value == '-' 
        || value == '=')
        {
            return;
        }

        //Otherwise appends to display
        else
        {
            screen.textContent = screen.textContent + value;
        }
    }

    //Identifies if the last non numeric button pressed was '.'
    else if (value == '.')
    {
        //If '.' was the last symbol or button pressed, it will not allow
        //the user to put another
        if (screen.textContent[screen.textContent.length - 1] == '.'
        || prevSymbol == '.')
        {
            return;
        }

        //Otherwise, updates the previous symbol and adds to display
        else
        {
            prevSymbol = value;
            screen.textContent = screen.textContent + value;
        }
    }

    //Identifies if the button pressed was '='
    else if (value == '=')
    {
        //Returns if the last character is an operator. Visually,
        //It will appear as if nothing has happened.
        if (screen.textContent[screen.textContent.length - 1] == '+' || 
        screen.textContent[screen.textContent.length - 1] == '-' ||
        screen.textContent[screen.textContent.length - 1] == '×' ||
        screen.textContent[screen.textContent.length - 1] == '÷')
        {
            return;
        }

        let numberOne = "";
        let numberTwo = "";
        let currentChar;
        let currentSymbol = '@';
    
        //Loops through the display and performs mathematical operations
        //in order from left to right.
        for (let i = 0; i < screen.textContent.length; ++i)
        {
            currentChar = screen.textContent[i];

            //If currentChar is a number or '-' as the first character in
            //the display, adds that character to numberOne
            if (currentChar >= '0' && currentChar <= '9' && currentSymbol == '@'
            || i == 0 && currentChar == '-')
            {
                numberOne += String(currentChar);
            }

            //Accounts for the decimal in the first number
            else if (currentChar == '.' && currentSymbol == '@')
            {
                numberOne += String(currentChar);
            }

            //Accounts for the decimal in the second number
            else if (currentChar == '.' && currentSymbol != '@')
            {
                numberTwo += String(currentChar);
            }

            //Allows user to user a subtraction sign immediately after another symbol
            //in order to account for negative numbers in numberTwo
            else if (currentChar == '-' && currentSymbol == screen.textContent[i - 1])
            {
                numberTwo += String(currentChar);
            }

            //If it is a number and a symbol has already been found,
            //add that number to numberTwo to keep track of it
            else if (currentChar >= '0' && currentChar <= '9' && currentSymbol != '@')
            {
                //If the number is the last in the display, calculate
                if (i == (screen.textContent.length - 1))
                {
                    numberTwo += String(currentChar);

                    //If user tries to divide by zero, print ERROR to display
                    if (numberTwo == '0' && currentSymbol == '÷')
                    {
                        screen.textContent = 'ERROR';
                    }

                    else
                    {
                        screen.textContent = operate(numberOne, currentSymbol, numberTwo);
                        return;
                    }
                }
                
                //If not the last number in the display, keep going
                else
                {
                    numberTwo += String(currentChar);
                }
            }

            //Sets the current operator if one does not exist yet
            else if (currentChar == '÷' && currentSymbol == '@' ||
            currentChar == '×' && currentSymbol == '@' ||
            currentChar == '-' && currentSymbol == '@' ||
            currentChar == '+' && currentSymbol == '@')
            {
                currentSymbol = currentChar;
            }

            //If another operator has been reached and one already exists,
            //perform the operation, update the new operator, and clear
            //number two so that it can be reused
            else if (currentChar == '÷' && currentSymbol != '@' ||
            currentChar == '×' && currentSymbol != '@' ||
            currentChar == '-' && currentSymbol != '@' ||
            currentChar == '+' && currentSymbol != '@')
            {
                numberOne = operate(numberOne, currentSymbol, numberTwo);
                currentSymbol = currentChar;
                numberTwo = '';
            }
        }
    }

    //Adds whatever button was pressed to the display
    else
    {
        //Keeps track of what the last symbol was
        if (value == '+' || 
        value == '-' || 
        value == '×' || 
        value == '÷')
        {
            prevSymbol = value;
        }

        screen.textContent = screen.textContent + value;
    }
}

//Takes in a number, operator, and another number, then decides which
//operation to perform based on the operater.
function operate(num1, operater, num2)
{
    if (operater == '+')
    {
        return add(num1, num2);
    }

    else if (operater == '-')
    {
        return subtract(num1, num2);
    }

    else if (operater == '÷')
    {
        return divide(num1, num2);
    }

    else if (operater == '×')
    {
        return multiply(num1, num2);
    }
}

//Simple addition function
function add(num1, num2)
{
    answer = parseFloat(parseFloat(num1) + parseFloat(num2));

    if (answer.toString().length > 10 && answer >= 10000)
    {
        return Number.parseFloat(answer).toExponential(6);
    }

    else
    {
        return answer;
    }
}

//Simple subtraction function
function subtract(num1, num2)
{
    answer = parseFloat(parseFloat(num1) - parseFloat(num2));

    if (answer.toString().length > 10 && answer >= 10000)
    {
        return Number.parseFloat(answer).toExponential(6);
    }

    else
    {
        return answer;
    }
}

//Simple division function
function divide(num1, num2)
{
    answer = parseFloat(parseFloat(num1) / parseFloat(num2));
    
    if (answer.toString().length > 10 && answer >= 10000)
    {
        return Number.parseFloat(answer).toExponential(6);
    }

    else
    {
        return Math.round(answer * 1000) / 1000;
    }
}

//Simple multiplication function
function multiply(num1, num2)
{
    answer = parseFloat(parseFloat(num1) * parseFloat(num2));
    
    if (answer.toString().length > 10 && answer >= 10000)
    {
        return Number.parseFloat(answer).toExponential(6);
    }

    else
    {
        return answer;
    }
}