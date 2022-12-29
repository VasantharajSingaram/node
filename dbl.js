// const [, , num] = process.argv;
// const double = (n) => n * 2;
// console.log(double(num));


// const [, , n1, n2] = process.argv;
// const sum = (a, b) => a + b;
// console.log(sum(+n1, +n2));


// const os  = require('os'); => os package

// console.log("Free Memory", os.freemem() / 1024 / 1024 / 1024);
// console.log("Version", os.version());
// console.log("CPU", os.cpus());

// const fs = require('fs'); //=> use to write files

// const quote = "No beauty shines brighter than that of a good heart";

// fs.writeFile("./awesome.html", quote, (err) => {
//     console.log("Completed writing")
// });

const fs = require('fs');
const [, , noOfFiles] = process.argv; // => command line arguments (catching argument from the command line)

console.log(noOfFiles);

const quote2 = "Live more, worry less";

for(i=1 ;i<=noOfFiles ;i++){
fs.writeFile(`./backup/text-${i}.html`, quote2, (err) => {
    console.log("Completed writing")
})
};

//which does not have in node but in browser is document and window object

// console.log(global); its only in node not in browser


// read file from nodejs

fs.readFile("./cool1.txt", "utf-8", (err, data) => {
    if (err) {
        console.log("❌", err);
    } else {
        console.log(data);
    }
});


// appending the file from node js 

const quote3 = "Dream withou fear, love without limits";

fs.appendFile("./fun.html", "\n" + quote3, (err) => {
    console.log("completed");
})


// deleting the file

fs.unlink("./fun.html", (err) => {
    console.log("Deleted Successfully");
});