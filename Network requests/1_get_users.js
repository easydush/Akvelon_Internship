async function getUsers(names) {
    let promises = [];
    for(let name of names) {
        let promise = fetch(`https://api.github.com/users/${name}`).then(
            (response) => {
                if (response.status != 200) {
                    return null;
                } else {
                    return response.json();
                }
            }
        );
        promises.push(promise);
    }
    let results = await Promise.all(promises);
    return results;
}
