// import dependencies
const express = require('express')
const bodyparser = require('body-parser')
const ejs = require('ejs')
const Nexmo = require('nexmo')
const socketio = require('socket.io')

const nexmo = new Nexmo({
    apiKey: '0b52da61',
    apiSecret: 'TtoDaNWdLffq6o7z',
  })

  const from = '13185814644'


// Initialize application with express
const app = express()

app.set('view engine', 'html')
app.engine('html', ejs.renderFile)

// setup public folder
app.use(express.static(__dirname + '/public'))

// middleware for body parser
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))


//default route
app.get('/', (req, res) => {
    res.render('index')
})

//form submit
app.post('/', (req, res) => {
    // res.send(req.body)
    // console.log(req.body)
    const number = req.body.number
    const text = req.body.text

    nexmo.message.sendSms(
        from, number, text, { type: 'unicode' },
        (err, responseData) => {
            if(err) {
                console.log(err)
            } else {
                console.dir(responseData)
                // response data 
                const data = {
                    id: responseData.messages[0]['message-id'],
                    number: responseData.messages[0]['to']
                }

                //Show to client
                io.emit('smsStatus', data)
            }
        }
    )
})

// Use port
const port = 3000

// server start
const server = app.listen(port, () => console.log(`Listening on port : ${port}`))

//socket io settings
const io = socketio(server)
io.on('connection', (socket) => {
    console.log('socket connected')
    io.on('disconnect', () => {
        console.log('socket disconnected')
    })
} )



