function right_three(str) {
    if (str.length > 1)
    {
        return str.slice(-3) + str.slice(0, -3);
    }
    return str;
}
console.log(right_three("Python"))

