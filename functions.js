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

function add(num1, num2)
{
    return num1 + num2;
}

function subtract(num1, num2)
{
    return num1 - num2;
}

function divide(num1, num2)
{
    return num1 / num2;
}

function multiply(num1, num2)
{
    return num1 * num2;
}