let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

console.log( aclean(arr) ); // "nap,teachers,ear" or "PAN,cheaters,era"

function aclean(arr){
    let cleaned = new Map();
    arr.forEach((key, value, arr)=>{
        cleaned.set(key.toLowerCase().split('').sort().join(''), key);
    });
    return Array.from(cleaned.values());
}