import express from 'express'
const app = express()
import nodemailer from 'nodemailer'
import path from 'path'
import bodyParser from 'body-parser'
import 'dotenv/config'

const PORT = 8000
app.set("view engine" , "ejs")
app.set("views", path.resolve('./views'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json())
app.get('/' , (req , res) => res.render("Home"))
app.post('/mail' , async (req , res) => {
    const {name , password , mailId} = req.body
    const transporter =  nodemailer.createTransport({
        service:'gmail',
        auth: {
          user: process.env.user,
          pass: process.env.pass,
        },
    });
    const info = await transporter.sendMail({
        from: '<kkIndustries@malviya.com>', // sender address
        to: `${mailId}`, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: `<h1>Hello ${name}</h1>
             <h2>Password : ${password}</h2>`, // html body
      });
      console.log(info.messageId)
      return res.render("Home" , {
        response:"Done"
      })
})
app.listen(PORT , () => console.log("Server is listening on " , PORT))