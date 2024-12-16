## Intro to NodeJS

NodeJS adalah runtime environment multi platform yang kuat dan open-source yang memungkinkan para pengembang menjalankan kode JavaScript di server-side. Dulunya, JavaScript hanya digunakan di sisi klien (yaitu di browser), tetapi dengan diperkenalkannya NodeJS, pengembang sekarang dapat menggunakan JavaScript untuk pemrograman server-side.

## Key Concepts of NodeJS:

- Non-blocking, Asynchronous I/O:
Non-Blocking I/O memungkinkan NodeJS untuk menghandle beberapa operasi secara bersamaan. Ini adalah perbedaan utama dari platform lain seperti PHP atau Java, yang biasanya bersifat sinkron dan blocking. Ketika sebuah operasi dilakukan, NodeJS tidak menunggu sampai operasi selesai. Sebaliknya, NodeJS terus mengeksekusi baris kode berikutnya. Hal ini sangat berguna untuk menangani beberapa koneksi yang bersamaan, seperti pada server web, di mana NodeJS dapat menangani ribuan permintaan tanpa menunggu satu permintaan selesai sebelum memulai permintaan berikutnya.

- Event-Driven Architecture:
NodeJS menggunakan model berbasis Event-Driven, di mana sebuah Event (seperti Request dari klien atau query basis data) memicu fungsi callback. Sehingga, NodeJS dapat merespons banyak permintaan tanpa diblokir. Looping di NodeJS memeriksa event secara terus-menerus dan memprosesnya segera.

- Single-Threaded but Highly Scalable:
Meskipun NodeJS single-threaded, NodeJS dapat menangani banyak permintaan secara bersamaan karena sifatnya yang asinkron. Tidak seperti arsitektur multi-threaded tradisional, di mana setiap permintaan ditangani oleh thread yang terpisah, NodeJS menggunakan thread tunggal untuk menangani banyak permintaan. Hal ini membuat NodeJS sangat efisien dan ringan, terutama untuk aplikasi dengan operasi I/O (input/output) yang tinggi, seperti membaca file, query basis data, atau menangani HTTP Request.


- Package Ecosystem (npm):
NodeJS dilengkapi dengan npm (Node Package Manager), yang merupakan ekosistem library terbesar. 

## Why Use NodeJS?

- JavaScript Everywhere:
        With NodeJS, developers can use JavaScript for both client-side and server-side programming, which simplifies the development process and allows for code reuse. Full-stack JavaScript development has become popular due to NodeJS.

- Scalability:
        NodeJS is well-suited for applications that require real-time interaction, such as chat applications, collaboration tools, or live data streaming. It can handle many connections at once without consuming large amounts of system resources.
        Its event-driven, non-blocking model is ideal for scalable and high-performance web applications.

- Efficiency:
        NodeJS is lightweight and fast due to its single-threaded, non-blocking I/O nature. It is perfect for applications that rely on performing multiple I/O operations, such as interacting with databases, file systems, or APIs.

- Real-Time Applications:
        One of NodeJS's major strengths is enabling the development of real-time applications, such as online games, chat applications, and live collaboration tools. NodeJS’s WebSocket capabilities allow for bi-directional communication between the server and the client, making it perfect for real-time data updates.

- Microservices Architecture:
        Due to its lightweight nature, NodeJS is often used in microservices architectures, where applications are divided into smaller, independent services. NodeJS services can be built, scaled, and deployed individually.

## Common Use Cases for NodeJS:

- Web Servers:
        NodeJS is often used to create highly scalable and efficient web servers. With frameworks like Express.js, developers can quickly build RESTful APIs and serve HTML content or static assets.

- Real-Time Applications:
        NodeJS shines in applications that require real-time functionality, such as chat apps, video conferencing, online games, and collaborative tools. Socket.IO is a popular library for implementing WebSockets with NodeJS.

- APIs (RESTful/GraphQL):
        NodeJS is commonly used to build RESTful APIs that interact with databases and return JSON data. It is also used with GraphQL to build APIs that serve flexible and efficient data to the front end.

## Contoh dari NodeJS
- Buatlah sebuah file dengan nama hello.js
- Letakkan di folder/direktori tertentu, misalkan: /home/user/belajarnodejs
```js
// Load the built-in http module
const http = require('http');

// Create an HTTP server
const server = http.createServer((req, res) => {
    // Set the response header content type
    res.writeHead(200, {'Content-Type': 'text/plain'});
    
    // Send the response "Hello, World!"
    res.end('Hello, World!\n');
});

// The server listens on port 3000
server.listen(3000, () => {
    console.log('Server is running at http://localhost:3000/');
});
```

## Instalasi NodeJS
Untuk menjalankan contoh kode NodeJS, pastikan sudah menginstall Node atau NPM. 
- Download NPM di [https://nodejs.org/en/download/package-manager](https://nodejs.org/en/download/package-manager)
- Buka terminal/command prompt/console/cmd
- Pindah ke folder/direktori di tempat file NodeJs berada, misal `cd /home/user/belajarnodejs`
- Ketik `node hello.js`
- Buka browser, ketik di URL: `http://localhost:3000`

