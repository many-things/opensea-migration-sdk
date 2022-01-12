import fs from 'fs'

import { lookupAccountAddress } from './'

const run = async () => {
  const assets = await lookupAccountAddress(
    '0x4a003f0a2c52e37138eb646aB4E669C4A84C1001',
  )

  const clonex = assets['0x49cf6f5d44e70224e2e23fdcdd2c053f30ada28b']
  console.log(clonex)

  fs.writeFileSync('./playground.json', JSON.stringify(clonex, null, 4))
}
run()
