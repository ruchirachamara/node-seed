import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import methodOverride from 'method-override'
import morgan from 'morgan'
import helmet from 'helmet'
import routes from './routes'
import Constants from './config/constants'

const app = express()

app.use(helmet())

app.use(cors())

if (!Constants.envs.test) {
  app.use(morgan('dev'))
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride())
app.use('/public', express.static(`${__dirname}/public`))
app.use(Constants.apiPrefix, routes)

app.listen(Constants.port, () => {
  console.log(`
    Port: ${Constants.port}
    Env: ${app.get('env')}
  `);
});

export default app
