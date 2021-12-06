# Calculator

Project Specifications: https://www.theodinproject.com/paths/foundations/courses/foundations/lessons/calculator

The calculator is functionally able to compute basic mathematics from order of left to right (project specs did not call for order of operations, but should be added in later.). The user can add, subtract, divide, and multiply INT and FLOAT numbers, and the user can input FLOAT numbers manually with the usage of the decimal button. If the user chooses to do so, they can use the keyboard for operating the calculator as opposed to manually clicking the onscreen buttons. The user should not be able to input anything that will cause logic errors, aside from dividing by 0, which will return an actual error message to the display.

Functionally, the calculator operates by listening for key presses/clicks and then sending the data from the corresponding key/button to the 
operate() function, where it then works through the logic of whether said key/button will be appended to the display.

The look for the calculator is finalized, and makes use of the color palette found here: https://www.color-hex.com/color-palette/1006144

This calculator makes user of the Long Press function created by John Doherty, which you can find here: https://github.com/john-doherty/long-press-event