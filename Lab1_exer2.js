// function maxNum(x, y, z) {
//     if (x > y) {
//         if (x > z)
//         {console.log(x)}
//     }
//     else if (y > z) {
//         console.log(y)
//     }
//     else {console.log(z)}
// }

// maxNum(3, 5, 1);

// max_val = 0;
// if(x>y)
// {
//     max_val = x;

// } else

function max_val(x, y, z) {
    var max_val = 0;
    if (x > y) {
        if (x > z){
            max_val = x;
        }
    }
    else if (y > z) {
        max_val = y;
    }
    else {
        max_val = z;
    }

    console.log(max_val);
}

max_val(500, 1000, 700);