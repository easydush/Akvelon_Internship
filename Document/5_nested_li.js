for (let liElement of document.querySelectorAll('li')){
    alert(`${liElement.firstChild.data}:${ liElement.getElementsByTagName('li').length})`;
}