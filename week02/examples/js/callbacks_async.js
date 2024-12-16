function fetchData(callback) {
    setTimeout(() => {
        const data = 'Data loaded';
        callback(data); 
    }, 2000); // 
}

function displayData(data) {
    console.log(data);
}

console.log('Mulai');
fetchData(displayData);
console.log('Selesai');