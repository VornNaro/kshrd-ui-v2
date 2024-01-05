const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');

//const image = "/static/media/slide1.a4335fe5.JPG";
 const image = 'https://kshrd.com.kh/static/media/slide1.a4335fe5.JPG';
 const defaultDescription = 'We provide the best opportunities for IT major students to become global SW experts with the highest quality training programs. All courses are free of charge. Furthermore, we provide a bridge for graduated students to the global SW job market. Please join our center for a bright future!'


app.get('/', function(request, response) {
    console.log('Home page visited!');
    const filePath = path.resolve(__dirname, './build', 'index.html');

    // read in the index.html file
    fs.readFile(filePath, 'utf8', function(err, data) {
        if (err) {
            return console.log(err);
        }

        // replace the special strings with server generated strings
        data = data.replace(/\$OG_TITLE/g, 'Korea Software HRD Center | www.kshrd.com.kh');
        data = data.replace(/\$OG_URL/g, 'https://kshrd.com.kh/');
        data = data.replace(/\$OG_DESCRIPTION/g, "We provide the best opportunities for IT major students to become global SW experts with the highest quality training programs. All courses are free of charge. Furthermore, we provide a bridge for graduated students to the global SW job market. Please join our center for a bright future!");
        const result = data.replace(/\$OG_IMAGE/g, image);
        response.send(result);
    });
});

app.get('/faq', function(request, response) {
    console.log('FAQ page visited!');
    const filePath = path.resolve(__dirname, './build', 'index.html')
    fs.readFile(filePath, 'utf8', function(err, data) {
        if (err) {
            return console.log(err);
        }
        data = data.replace(/\$OG_TITLE/g, 'FAQ | www.kshrd.com.kh');
        data = data.replace(/\$OG_URL/g, 'https://kshrd.com.kh/faq');
        data = data.replace(/\$OG_DESCRIPTION/g, "Stay in touch If you want to know more information, please feel free to contact us or give us call 012 998 919 or 085 402 605");
        const result = data.replace(/\$OG_IMAGE/g, image);
        response.send(result);
    });
});

app.get('/contact-us', function(request, response) {
    console.log('Contact page visited!');
    const filePath = path.resolve(__dirname, './build', 'index.html')
    fs.readFile(filePath, 'utf8', function(err, data) {
        if (err) {
            return console.log(err);
        }
        data = data.replace(/\$OG_TITLE/g, 'Announcement | www.kshrd.com.kh');
        data = data.replace(/\$OG_URL/g, 'https://kshrd.com.kh/contact-us');
        data = data.replace(/\$OG_DESCRIPTION/g, "If you have have any questions, please feel free to contact us. Address: #12, St 323, Sangkat Boeung Kak II, KhanToul Kork, Phnom Penh, Cambodia.");
        const result = data.replace(/\$OG_IMAGE/g, image);
        response.send(result);
    });
});

app.get('/announcement/:id', function(request, response) {

    const url = `https://api.kshrd-ite.com/api/v1/announcements/${request.params.id}`;
    console.log(url);
    fetch(url)
        .then(response => response.json())
        .then(res => {
            const filePath = path.resolve(__dirname, './build', 'index.html')
            fs.readFile(filePath, 'utf8', function(err, data) {
                if (err) {
                    return console.log(err);
                }

                data = data.replace(/\$OG_TITLE/g, 'Announcement | www.kshrd.com.kh');
                data = data.replace(/\$OG_URL/g, `https://kshrd.com.kh/announcement/${request.params.id}`);
                data = data.replace(/\$OG_DESCRIPTION/g, res.data == null ? defaultDescription :  res.data.description);
                const result = data.replace(/\$OG_IMAGE/g, res.data == null ? image : res.data.thumbnail);
                response.send(result);
            });
        })
        .catch(err => console.log('error', err))

});

app.use(express.static(path.resolve(__dirname, './build')));

app.get('*', function(request, response) {
  console.log('Other pages visited!');
    const filePath = path.resolve(__dirname, './build', 'index.html');

    // read in the index.html file
    fs.readFile(filePath, 'utf8', function(err, data) {
        if (err) {
            return console.log(err);
        }

        // replace the special strings with server generated strings
        data = data.replace(/\$OG_TITLE/g, 'Korea Software HRD Center | www.kshrd.com.kh');
        data = data.replace(/\$OG_URL/g, 'https://kshrd.com.kh/');
        data = data.replace(/\$OG_DESCRIPTION/g, "We provide the best opportunities for IT major students to become global SW experts with the highest quality training programs. All courses are free of charge. Furthermore, we provide a bridge for graduated students to the global SW job market. Please join our center for a bright future!");
        const result = data.replace(/\$OG_IMAGE/g, image);
        response.send(result);
    });

});

app.listen(port, () => console.log(`Listening on port ${port}`));
