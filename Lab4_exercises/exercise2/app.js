
    const comparer = require('./comparer');
    const calculator = require('./calculator');

    const CompareAndCalculate = (x, y) => {

        if(comparer.AreNumbersEqual(x, y)) {
            console.log('x and y are equal');
            const sum = calculator.Add(x, y);
            console.log(sum);
        }
        else {
            console.log('x and y are not equal');
            const subs = calculator.Subtract(x, y);
            console.log(subs);
        }
    };

    CompareAndCalculate(5, 5);
    CompareAndCalculate(3, 10);