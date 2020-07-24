let genres = ['Jazz', 'Blues']
genres.push('Rock-n-Roll');
console.log(genres);
genres[Math.round(genres.length / 2) - 1] = 'Classics';
console.log(genres);
genres.shift();
console.log(genres);
genres.unshift('Rap', 'Reggae');
console.log(genres);