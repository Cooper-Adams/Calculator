const prevChar = '0';

//Gets access to the calculator's display and defaults it to 0
const screen = document.getElementById('screenDisplay');
screen.textContent = "0";

//Gets the button box div and then populates it with buttons
const btnBox = document.querySelector('.buttons');
for (let i = 1; i <= 16; ++i)
{
    //Buttons for numbers 1-9
    if (i < 10)
    {
        const button = document.createElement('button');
        button.setAttribute('id', 'number ' + i);
        button.textContent = i;
        button.addEventListener('click', addToDisplay);
        btnBox.appendChild(button);
    }

    //Button for number 0
    else if (i == 10)
    {
        const button = document.createElement('button');
        button.setAttribute('id', 'number 0');
        button.textContent = '0';
        button.addEventListener('click', addToDisplay);
        btnBox.appendChild(button);
    }

    //Button for +
    else if (i == 11)
    {
        const button = document.createElement('button');
        button.setAttribute('id', 'plusButton');
        button.textContent = '+';
        button.addEventListener('click', addToDisplay);
        btnBox.appendChild(button);
    }

    //Button for -
    else if (i == 12)
    {
        const button = document.createElement('button');
        button.setAttribute('id', 'minusButton');
        button.textContent = '-';
        button.addEventListener('click', addToDisplay);
        btnBox.appendChild(button);
    }

    //Button for /
    else if (i == 13)
    {
        const button = document.createElement('button');
        button.setAttribute('id', 'divideButton');
        button.textContent = '/';
        button.addEventListener('click', addToDisplay);
        btnBox.appendChild(button);
    }

    //Button for *
    else if (i == 14)
    {
        const button = document.createElement('button');
        button.setAttribute('id', 'multiplyButton');
        button.textContent = '*';
        button.addEventListener('click', addToDisplay);
        btnBox.appendChild(button);
    }

    //Button for . (decimal)
    else if (i == 15)
    {
        const button = document.createElement('button');
        button.setAttribute('id', 'deciButton');
        button.textContent = '.';
        button.addEventListener('click', addToDisplay);
        btnBox.appendChild(button);
    }

    //Button for C (clear)
    else if (i == 16)
    {
        const button = document.createElement('button');
        button.setAttribute('id', 'clearButton');
        button.textContent = 'C';
        button.addEventListener('click', addToDisplay);
        btnBox.appendChild(button);
    }
}

//Function for on button click, adds the value of the clicked button
//to the display.
function addToDisplay(e)
{
    //Clears the display and defaults to 0
    if (e.target.id == 'clearButton')
    {
        screen.textContent = "0";
    }

    //Removes zero and starts with whatever button was pressed if 0 is
    //only character in the display
    else if (screen.textContent == '0')
    {
        if (e.target.textContent == '+', '-', '*', '/')
        {
            screen.innerHTML = screen.textContent + e.target.textContent;
            return;
        }

        screen.innerHTML = e.target.textContent;
    }

    //Adds whatever button was pressed to the display
    else
    {
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

    else if (operater == '/')
    {
        return divide(num1, num2);
    }

    else if (operater == '*')
    {
        return multiply(num1, num2);
    }

    else
    {
        console.log('Please use a valid operater.');
    }
}

//Simple addition function
function add(num1, num2)
{
    return num1 + num2;
}

//Simple subtraction function
function subtract(num1, num2)
{
    return num1 - num2;
}

//Simple division function
function divide(num1, num2)
{
    return num1 / num2;
}

//Simple multiplication function
function multiply(num1, num2)
{
    return num1 * num2;
}