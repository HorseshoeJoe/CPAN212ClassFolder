const http = require("http");
const fs = require("fs");
const path = require("path");

const app = http.createServer((req, res) => { //fspath modules
    const filePath = path.join(__dirname, "pages", req.url === "/" ? "index.html" : `${req.url.slice(1)}.html`);
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            const notFoundPath = path.join(__dirname, "pages", "404.html");
            fs.readFile(notFoundPath, "utf8", (err, notFoundData) => {
                res.end(notFoundData || "Page not found");
            });
        } else {
            res.end(data);
        }
    });
});

app.listen(8000);
