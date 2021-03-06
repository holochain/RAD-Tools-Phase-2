// gratitude to https://flaviocopes.com/react-electron/ for this approach
const net = require('net')
const { exec } = require('child_process')
const fs = require('fs')
const toml = require('toml')

const hcConfig = toml.parse(fs.readFileSync('../conductor-config.toml', 'utf-8'))
const port = hcConfig.interfaces[0].driver.port || 3400

const client = new net.Socket()

let startedConductor = false
const waitForConductorAndStartUI = () => {
  console.log('hcConfig port:', port)
  client.connect(
    { port },
    () => {
      client.end()
      if (!startedConductor) {
        startedConductor = true
        console.log('Starting UI, connecting to port :', port)
        exec('npm run start-agent', (error, stdout, stderr) => {
          if (error) {
            console.error(`exec error: ${error}`)
            return
          } else if (stderr) {
            console.error(`stderr: ${stderr}`)
            return
          }
          console.log(`stdout: ${stdout}`)
          console.log('Holochain Conductor is up')
        })
      }
    }
  )
}

waitForConductorAndStartUI()

client.on('error', () => {
  console.log('Waiting for Holochain Conductor to configure and boot')
  setTimeout(waitForConductorAndStartUI, 5000)
})
