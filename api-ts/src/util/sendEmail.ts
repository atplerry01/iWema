import * as nodemailer from 'nodemailer';
import { Address, Attachment } from 'nodemailer/lib/mailer';
import * as EmailTemp from './emailTemplate';


export const sendEmail = (from: string | Address, to: string | Address | Array<string | Address>, preheader: string, 
        title: string, 
        subject: string, body: string, senderName?: string,  
        cc?: string | Address | Array<string | Address>, bcc?: string | Address | Array<string | Address>, 
        attachments?: Attachment[], logourl?: string) => {

        return new Promise((resolve, reject) => {

            const smtpConfig = {
                host: process.env.EXCHANGE_IP,
                port:  Number(process.env.EXCHANGE_PORT),
                secure: false, // upgrade later with STARTTLS
                tls: {
                    // ciphers: 'SSLv3',
                      rejectUnauthorized: false
              }
            };

            from = senderName ? `${senderName} <${from}>` : from;

           const transporter = nodemailer.createTransport(smtpConfig);

                // setup email data with unicode symbols
                const mailOptions = {
                    from, // sender address
                    to, // list of receivers
                    cc,
                    bcc,
                    subject, // Subject line
                    text: body, // plain text body
                    html: EmailTemp.EmailTemplate(preheader, title, body, logourl), // html body
                    attachments
                };
            
                // send mail with defined transport object
                transporter.sendMail(mailOptions, (_err, info) => {  
                    return _err ? reject(_err) : resolve(info);                  
                });
            });

    };

    /*
    ATTACHMENT EXAMPLE

    var mailOptions = {
    ...
    attachments: [
        {   // utf-8 string as an attachment
            filename: 'text1.txt',
            content: 'hello world!'
        },
        {   // binary buffer as an attachment
            filename: 'text2.txt',
            content: new Buffer('hello world!','utf-8')
        },
        {   // file on disk as an attachment
            filename: 'text3.txt',
            path: '/path/to/file.txt' // stream this file
        },
        {   // filename and content type is derived from path
            path: '/path/to/file.txt'
        },
        {   // stream as an attachment
            filename: 'text4.txt',
            content: fs.createReadStream('file.txt')
        },
        {   // define custom content type for the attachment
            filename: 'text.bin',
            content: 'hello world!',
            contentType: 'text/plain'
        },
        {   // use URL as an attachment
            filename: 'license.txt',
            path: 'https://raw.github.com/nodemailer/nodemailer/master/LICENSE'
        },
        {   // encoded string as an attachment
            filename: 'text1.txt',
            content: 'aGVsbG8gd29ybGQh',
            encoding: 'base64'
        },
        {   // data uri as an attachment
            path: 'data:text/plain;base64,aGVsbG8gd29ybGQ='
        },
        {
            // use pregenerated MIME node
            raw: 'Content-Type: text/plain\r\n' +
                 'Content-Disposition: attachment;\r\n' +
                 '\r\n' +
                 'Hello world!'
        }
    ]
}


    */
