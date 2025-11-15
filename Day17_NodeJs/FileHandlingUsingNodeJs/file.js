// Creating fs constant for file handling
const fs = require('fs');

// 1. Create "test.txt" file in current directory and write "Hey, I'm Piyush"

// Using Sync
// fs.writeFileSync("./test.txt","Hey, I'm Piyush");

// Using Async : It will take callback function as argument
// fs.writeFile("./test.txt", "Hey, My name is Piyush", (err) => {}); // It will overwrite "test.txt"

// 2. Read "test.txt"

// Using Sync
// const res = fs.readFileSync("./test.txt","utf-8");
// console.log(res);

// Using Async : It doesn't have return type
fs.readFile("./test.txt", "utf-8", (err,res) => {
    if(err){
        console.log(err);
    }else{
        console.log(res);
    }
});

// 3. Modify "test.txt"
// fs.appendFileSync("./test.txt", "\n I'm from bihar.");

// 4. Create a copy file of "test.txt"
// fs.cpSync('./test.txt','./copy.txt');

// 5. Delete "copy.txt"
// fs.unlinkSync('./copy.txt');

// 7. Log the stat of "test.txt"
// console.log(fs.statSync('./test.txt'));

// 6. Create a folder "my-docs" inside current directory
// fs.mkdirSync("my-docs/a");

// Blocking operation (Sync...) : It uses thread to process client requests
// Non-blocking operation (Async...) : It directly process client requests
// Always write non-blocking(async...) functions

const os = require('os');
console.log("max thread : "+os.cpus().length); //max thread : 12