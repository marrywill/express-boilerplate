const express = require('express')
const app = express()
const port = 5000
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const config = require('./config/key')
const { User } = require('./models/User')

// bodyParser는 클라이언트에서 보낸 데이터를 서버에서 사용할수 있도록 도와줌
app.use(bodyParser.json())

mongoose
	.connect(config.mongoURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then(() => console.log('MongoDB Connected...'))
	.catch((err) => console.log(err))

app.get('/', (req, res) => res.send('반가워용'))

app.post('/register', (req, res) => {
	const user = new User(req.body)
	console.log(req.body)
	// 몽고db에서 넘어오는 메소드 save

	user.save((err, userInfo) => {
		if (err) return res.json({ success: false, err })
		return res.status(200).json({
			success: true,
		})
	})
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
