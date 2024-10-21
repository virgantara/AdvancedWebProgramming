## Understanding let, const, var, and Asynchronous Programming with async/await

This assignment will help you solidify your understanding of JavaScript variable declarations (`let`, `const`, and `var`) and asynchronous programming using `async/await`. You will work with asynchronous tasks and refactor a given code to correctly utilize `async/await` while maintaining good variable scope practices using `let`, `const`, and `var`.

## Tugas:
### Task 1: Memahami scope variabel
You are provided with the following code that incorrectly uses `var`, resulting in scope-related issues. Refactor the code to use `let` and `const` appropriately.

```js
function cetakAngka() {
    for (var i = 1; i <= 5; i++) {
        setTimeout(function () {
            console.log(i);
        }, i * 1000);
    }
}

cetakAngka();  
```
Instruksi:
- Identify the Problem: Run the code and observe the output. Explain why the output is not as expected.
- Refactor the Code: Refactor the code to use let and const appropriately. Ensure that each iteration prints the correct number at the correct time.
- Comment Your Code: Explain why you chose let or const in different parts of the code.

### Task 2: Refactoring (Mengubah Struktur Kode) Callback ke async/await
You are provided with the following code that uses callbacks to handle asynchronous tasks. Refactor this code using `async/await` to make it cleaner and more readable.
```js
function fetchData(callback) {
    setTimeout(() => {
        console.log('Data fetched');
        callback(null, { data: 'Some data' });
    }, 2000);
}

function processData(data, callback) {
    setTimeout(() => {
        console.log('Processing data:', data);
        callback(null, `Processed: ${data.data}`);
    }, 2000);
}

function saveData(processedData, callback) {
    setTimeout(() => {
        console.log('Data saved:', processedData);
        callback(null, 'Success');
    }, 2000);
}

fetchData((fetchErr, fetchedData) => {
    if (fetchErr) {
        console.error('Error fetching data:', fetchErr);
        return;
    }

    processData(fetchedData, (processErr, processedData) => {
        if (processErr) {
            console.error('Error processing data:', processErr);
            return;
        }

        saveData(processedData, (saveErr, result) => {
            if (saveErr) {
                console.error('Error saving data:', saveErr);
                return;
            }

            console.log('All operations completed:', result);
        });
    });
});

```

Instructions:
- Convert Callbacks to async/await:
-- Refactor the provided code to use async/await instead of callbacks.
-- Each function (fetchData, processData, and saveData) should return a promise.
- Handle Errors:
-- Use try/catch blocks to handle errors in your asynchronous code.
-- Ensure that the code properly handles any potential errors that occur during the asynchronous operations.
- Comment Your Code: Provide explanations for each change you make. Explain why async/await improves the readability and maintainability of the code.