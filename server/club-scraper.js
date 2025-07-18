const cheerio = require('cheerio'); //cheerio - parse HTML
const fs = require('fs');


(async () => {
    const url = 'https://community.ucla.edu/studentorgs/engineering';
    const response = await fetch(url); //fetch HTML content from url

    const $ = cheerio.load(await response.text());
    const lines = $("main").text()
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);
    
    
    const clubNames = lines.filter((_, index) => index % 2 === 1);

    fs.writeFile('output.txt', clubNames.join('\n'), (err) => {
        if (err) {
            console.error('Error writing to file', err);
        } else {
            console.log(`Extracted ${clubNames.length} club names to clubs.txt`);
        }
    });

})();