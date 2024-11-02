// Skenario 1
function koneksiKeDatabase(callback) {
    console.log("Connecting to the database...");
    setTimeout(() => {
        console.log("Connected to the database.");
        callback(null, "DatabaseConnection");  
    }, 1000);  // Simulating 1 second delay
}

// Skenario 2
function getUserData(connection, userId, callback) {
    console.log(`Getting data for user with ID: ${userId}...`);
    setTimeout(() => {
        // dict/list
        const user = { id: userId, name: "Bejo Sugiantoro" };
        console.log(`User data fetched:`, user);
        callback(null, user);
    }, 1000);  // Simulating 1 second delay
}

// Skenario 3
function getUserPost(userId, callback) {
    console.log(`Querying posts for user with ID: ${userId}...`);
    setTimeout(() => {
        const posts = [
            { postId: 1, content: "Post 1 content" },
            { postId: 2, content: "Post 2 content" },
            { postId: 3, content: "Post 2 content" },
        ];
        console.log(`Posts fetched for user ${userId}:`, posts);
        callback(null, posts);
    }, 1000);  // Simulating 1 second delay
}

// Skenario 4 semua sudah oke
function logPesan(callback) {
    console.log("Sudah beres semua gaes!");
    callback(null);
}

function jalakanCallback(userId){
    // callback skenario 1
    koneksiKeDatabase(function(error, pesanKoneksi){
        // callback skenario 2
        getUserData(pesanKoneksi, userId, function(error, user){
            // callback skenario 3
            getUserPost(userId, function(error, posts){
                logPesan(function(error){
                    console.log("Pesan tambahan akhir")
                })
            })
        })    
    })

    
}

jalakanCallback(111)

// function jalankanCallbackHell(userId) {

//     // Skenario 1
//     koneksiKeDatabase(function(error, koneksi){
//         // Skenario 2
//         getUserData(koneksi, userId, function(error, user){

//             // Skenario 3
//             getUserPost(user.id, function(error, posts){

//                 // Skenario 4
//                 logPesan(function(error){
//                     console.log("Sudah berakhir")
                    
//                 })
//             })
//         })
//     })

    
// }

// jalankanCallbackHell(123);
