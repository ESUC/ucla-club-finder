const cheerio = require('cheerio'); //cheerio - parse HTML
const fs = require('fs');


(async () => {
    const url = 'https://community.ucla.edu/studentorgs/engineering';
    const response = await fetch(url); //fetch HTML content from url

    const $ = cheerio.load(await response.text());
    const body = $("main").text().split('\n').map(line => line.trim()).filter(line => line.length > 0).join('\n');
    
    

    fs.writeFile('output.txt', body, (err) => {
        if (err) {
            console.error('Error writing to file', err);
        } else {
            console.log('Data has been written to output.txt');
        }
    });

})();