//Global answer variable for resetting calculator after calculation
let answer = -1;

//Global symbol variable for input validation from user
let prevSymbol = '@'

//Gets access to the calculator's display and defaults it to 0
const screen = document.getElementById('screenDisplay');
screen.textContent = "0";

//Gets the button box div and then populates it with buttons
const btnBox = document.querySelector('.buttons');

//Instantiates the buttons 7, 8, 9, that go on the top row of the number
//side of the calculator
for (let i = 7; i <= 9; ++i)
{
    const button = document.createElement('button');
    button.setAttribute('id', 'num' + i);
    button.textContent = i;
    button.addEventListener('click', addToDisplay);
    btnBox.appendChild(button);
}

//Instantiates the buttons 4, 5, 6, that go in the middle row of the num
//side of the calculator
for (let i = 4; i <= 6; ++i)
{
    const button = document.createElement('button');
    button.setAttribute('id', 'num' + i);
    button.textContent = i;
    button.addEventListener('click', addToDisplay);
    btnBox.appendChild(button);
}

//Instantiates the buttons 1, 2, 3, that go on the bottom row of the num
//side of the calculator
for (let i = 1; i <= 3; ++i)
{
    const button = document.createElement('button');
    button.setAttribute('id', 'num' + i);
    button.textContent = i;
    button.addEventListener('click', addToDisplay);
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
        button.textContent = '0';
        button.addEventListener('click', addToDisplay);
        btnBox.appendChild(button);
    }

    //Decimal button
    else if (i == 11)
    {
        const button = document.createElement('button');
        button.setAttribute('id', 'deciButton');
        button.textContent = '.';
        button.addEventListener('click', addToDisplay);
        btnBox.appendChild(button);
    }

    //Equals button
    else
    {
        const button = document.createElement('button');
        button.setAttribute('id', 'equalButton');
        button.textContent = '=';
        button.addEventListener('click', addToDisplay);
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
        button.setAttribute('data-long-press-delay', '500')
        button.textContent = '⌫';
        button.addEventListener('click', addToDisplay);
        button.addEventListener('long-press', function(e) {
            screen.textContent = '0';
        });
        opBox.appendChild(button);
    }

    //Division button
    else if (i == 2)
    {
        const button = document.createElement('button');
        button.setAttribute('id', 'diviButton');
        button.textContent = '÷';
        button.addEventListener('click', addToDisplay);
        opBox.appendChild(button);
    }

    //Multiplication button
    else if (i == 3)
    {
        const button = document.createElement('button');
        button.setAttribute('id', 'multButton');
        button.textContent = '×';
        button.addEventListener('click', addToDisplay);
        opBox.appendChild(button);
    }

    //Subtraction button
    else if (i == 4)
    {
        const button = document.createElement('button');
        button.setAttribute('id', 'subtButton');
        button.textContent = '-';
        button.addEventListener('click', addToDisplay);
        opBox.appendChild(button);
    }

    //Addition button
    else if (i == 5)
    {
        const button = document.createElement('button');
        button.setAttribute('id', 'addButton');
        button.textContent = '+';
        button.addEventListener('click', addToDisplay);
        opBox.appendChild(button);
    }
}

//Function for on button click, adds the value of the clicked button
//to the display.
function addToDisplay(e)
{
    //Identifies if the button pressed was the back button
    if (e.target.id == 'backButton')
    {
        //Makes a single character turn into 0
        if (screen.textContent.length == 1 && screen.textContent != '0')
        {
            screen.textContent = '0';
        }

        //If the last operation was the answer, replace the answer with 0
        else if (screen.textContent == answer)
        {
            prevSymbol = '@';
            screen.textContent = '0';
        }

        //Removes a character from the display completely if there is
        //more than one on the screen
        else if (screen.textContent.length > 1)
        {
            screen.textContent = screen.textContent.slice(0, -1);
        }
    }

    //If the last operation was the answer, replace the answer with the
    //newly pressed key
    else if (screen.textContent == answer)
    {
        prevSymbol = '@';
        screen.textContent = e.target.textContent;
    }

    //Removes zero and starts with whatever button was pressed if 0 is
    //only character in the display
    else if (screen.textContent == '0')
    {
        if (e.target.textContent == '+' || 
        e.target.textContent == '-' || 
        e.target.textContent == '×' || 
        e.target.textContent == '÷')
        {
            prevSymbol = e.target.textContent;
            screen.innerHTML = screen.textContent + e.target.textContent;
            return;
        }

        else 
        {
            screen.innerHTML = e.target.textContent;
            return;
        }
    }

    else if (e.target.textContent == '.')
    {
        if (screen.textContent[screen.textContent.length - 1] == '.'
        || prevSymbol == '.')
        {
            return;
        }

        else
        {
            prevSymbol = e.target.textContent;
            screen.textContent = screen.textContent + e.target.textContent;
        }
    }

    else if (e.target.textContent == '=')
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
    
        for (let i = 0; i < screen.textContent.length; ++i)
        {
            currentChar = screen.textContent[i];

            //If the value is a number and a symbol has not been found yet,
            //adds that number to numberOne to keep track of it
            if (currentChar >= '0' && currentChar <= '9' && currentSymbol == '@')
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
        //Keeps track of what the last pressed symbol was
        if (e.target.textContent == '+' || 
        e.target.textContent == '-' || 
        e.target.textContent == '×' || 
        e.target.textContent == '÷')
        {
            prevSymbol = e.target.textContent;
        }

        screen.innerHTML = screen.textContent + e.target.textContent;
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
    answer = parseFloat(parseFloat(num1) + parseFloat(num2)).toFixed(3);
    return answer;
}

//Simple subtraction function
function subtract(num1, num2)
{
    answer = parseFloat(parseFloat(num1) - parseFloat(num2)).toFixed(3);
    return answer;
}

//Simple division function
function divide(num1, num2)
{
    answer = parseFloat(parseFloat(num1) / parseFloat(num2)).toFixed(3);
    return answer;
}

//Simple multiplication function
function multiply(num1, num2)
{
    answer = parseFloat(num1) * parseFloat(num2);
    return answer;
}