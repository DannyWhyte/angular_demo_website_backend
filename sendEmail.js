var q = require('q');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');



var test = function(req, res) {
    var body = req.body[0]
    sendMail(body).then(function(response) {
            res.send(response)
        })
        .catch(function(error) {
            res.status(500).send(error);
        }).done();

}

function sendMail(response) {
    console.log(response)
    var deferred = q.defer();
    var transporter = nodemailer.createTransport(smtpTransport({
        service: "Gmail",
        host: 'imap.gmail.com',
        port: 993,
        auth: {
            user: 'user email here',
            pass: 'password here'
        },
        tls: true,
        debug: true
    }));


    var htmlBody = `<div class="PlainText">
                            <table>
                                <tr>
                                <th>Name</th>
                                <td>${response.yourName}</td>
                                </tr>
                                 <tr>
                                <th>Email</th>
                                <td>${response.email}</td>
                                </tr>
                                 <tr>
                                <th>Subject</th>
                                <td>${response.subject}</td>
                                </tr>
                                 <tr>
                                <th>Message</th>
                                <td>${response.message}</td>
                                </tr>
                            </table>
                     </div>`;
    var mailOptions = {
        from: 'sender email address', // sender address
        to: 'receiver email address', // list of receivers
        subject: 'your subject', // Subject line
        html: htmlBody
    };
    console.log("about to send")
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            deferred.reject({ error });
            //res.json({yo: 'error'});
        } else {
            console.log('Message sent: ' + info.response);
            deferred.resolve({ "message": "Thank's for showing intrest in us. We will get back to you soon" });
            //res.json({yo: info.response});
        }
    });
    return deferred.promise;

}

exports.testing = test;