let salaries = {
    "John": 100,
    "Pete": 300,
    "Mary": 250
};

function topSalary(salaries) {
    if (salaries) {
       let name = null, max = 0;
       for (let [person, salary] of Object.entries(salaries)){
           if (salary > max){
               ([name, max] = [person, salary]);
           }
       }
       return name;
    } else return null;
}

console.log(topSalary(salaries))