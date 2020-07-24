function checkSpam(text){
    if(text) {
        text = text.toLowerCase();
        return text.includes('viagra') || text.includes('xxx');
    }
    else return false;
}
console.log(checkSpam(''))
console.log(checkSpam())
console.log(checkSpam('xxX'))