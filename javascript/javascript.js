///////////////////////////////////////////////////////////////////////
// Program: javascript.js
// Description: Main javascript program for matching the passwords.
// This program will check if two user inputs of type password match.
// Matching passwords will displayed in green while passwords that don't
// match will be displayed in red. 
//////////////////////////////////////////////////////////////////////

const input_one = document.querySelector('#pwd'); // Node reference variable to the first input element of type password.
const input_two = document.querySelector('#con_pwd'); // Node reference variable to the second input element (confirm password) of type password.
const password_check = document.querySelector('#password_check'); // Node reference variable for a div that will display if the password is valid or invalid.
let userInputs = {}; // Object that that have two property keys: password_one and pasword_two. 

input_one.addEventListener('input', userInput_one);
input_two.addEventListener('input', userInput_two);

// Will add a default look to input one when the user clicks on it.
input_one.addEventListener('focus', (e)=>{
    
    if (input_one.classList.contains('display_invalid') || input_one.classList.contains('display_valid'))
    {
        input_one.classList.remove('display_focus');
    }
    else
    {
        input_one.classList.add('display_focus');
    }
});

// Will remove the default look from the input when the user has not clicked on it.
input_one.addEventListener('focusout', (e)=>{
    input_one.classList.remove('display_focus');
});

// Will add a default look to input two when the user clicks on it.
input_two.addEventListener('focus', (e)=>{
    if (input_two.classList.contains('display_invalid') || input_two.classList.contains('display_valid'))
    {
        input_two.classList.remove('display_focus');
    }
    else
    {
        input_two.classList.add('display_focus');
    }
});

// Will remove the default look from the input when the user has not clicked on it.
input_two.addEventListener('focusout', (e)=>{
    input_two.classList.remove('display_focus');
});

// Password one input from the user.
function userInput_one(e){
    userInputs["password_one"] = input_one.value;
    input_one.classList.remove('display_focus');
    check();

    if (userInputs["password_one"] === '')
    {
        input_one.classList.add('display_focus');
    }
}

// Password two input from the user (password confirmation).
function userInput_two(e){
    userInputs["password_two"] = input_two.value; 
    input_two.classList.remove('display_focus');
    check();

    if (userInputs["password_two"] === '' && input_two.classList.contains('display_invalid'))
    {
        input_two.classList.remove('display_focus');
    }
    else if (userInputs["password_two"] === '')
    {
        input_two.classList.add('display_focus');
    }
    else if (userInputs["password_two"] !== '' && (input_two.classList.contains('display_invalid') || input_two.classList.contains('display_valid')))
    {
        input_two.classList.remove('display_focus');
    }
    else
    {
        input_two.classList.add('display_focus');
    }
}

// Function will check if the object has two valid user passwords that match. If
// both password inputs have no property values in the object then both valid and
// invalid classes will be removed from reference node password_check. If both
// password do have property values, then they will be tested for matching
// passwords. Passwords that match are valid, and passwords that don't match
// are invalid. 
function check()
{
    // Checks userInputs["password_one"]
    if (userInputs["password_one"] === '')
    {
        password_check.classList.remove('password_valid');
        password_check.classList.remove('password_invalid');

        input_one.classList.remove('display_invalid');
        input_one.classList.remove('display_valid'); // Will remove display_valid just in case.

        input_two.classList.remove('display_invalid');
        input_two.classList.remove('display_valid'); // Will remove display_valid just in case.

        password_check.textContent = '';
    }
    else
    {
        if (userInputs["password_one"] === userInputs["password_two"])
        {
            // Checks if the last class list entry is 'invalid' so it can change to 'valid'. 
            if(password_check.classList.contains('password_invalid'))
            {
                password_check.classList.remove('password_invalid');
                input_one.classList.remove('display_invalid');
                input_two.classList.remove('display_invalid');
            }
            password_check.classList.add('password_valid');
            input_one.classList.add('display_valid');

            input_two.classList.add('display_valid');

            password_check.textContent = '* Passwords match';
        }
        else
        {
            // Checks if the user has entered input into the second password field (confirm password) first. 
            if (userInputs["password_one"] === undefined)
            {
                input_two.classList.add("display_focus");
            }
            else
            {
                // Checks if the last class list entry was 'valid' so it can change to 'invalid'.
                if(password_check.classList.contains('password_valid'))
                {
                    password_check.classList.remove('password_valid');
                    input_one.classList.remove('display_valid');
                    input_two.classList.remove('display_valid');
                }
                password_check.classList.add('password_invalid');
                input_one.classList.remove('display_valid');
                input_one.classList.add('display_invalid');
    
                input_two.classList.add('display_invalid');
                input_two.classList.remove('display_focus');
    
                password_check.textContent = '* Passwords do not match';
            }
        }
    }
}