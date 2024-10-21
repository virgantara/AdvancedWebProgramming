
function koneksiKeDatabase(callback) {
    console.log("Connecting to the database...");
    setTimeout(() => {
        console.log("Connected to the database.");
        callback(null, "DatabaseConnection");  
    }, 1000);  // Simulating 1 second delay
}


function getUserData(connection, userId, callback) {
    console.log(`Getting data for user with ID: ${userId}...`);
    setTimeout(() => {
        const user = { id: userId, name: "Bejo Sugiantoro" };
        console.log(`User data fetched:`, user);
        callback(null, user);
    }, 1000);  // Simulating 1 second delay
}


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


function logPesan(callback) {
    console.log("Sudah beres semua gaes!");
    callback(null);
}

function jalankanCallbackHell(userId) {
    koneksiKeDatabase((dbErr, connection) => {
        getUserData(connection, userId, (userErr, user) => {
            getUserPost(user.id, (postsErr, posts) => {
                logPesan((logErr) => {
                    console.log("Log terakhir.");
                });
            });
        });
    });
}

jalankanCallbackHell(123);
