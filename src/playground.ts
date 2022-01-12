import fs from 'fs'

import { lookupAccountAddress } from './'

const run = async () => {
  const assets = await lookupAccountAddress(
    '0x8ee55f30b24e42827cb4aad0b75454b92b99f106',
  )

  // const clonex = assets['0x49cf6f5d44e70224e2e23fdcdd2c053f30ada28b']
  // console.log(clonex)

  fs.writeFileSync('./playground.json', JSON.stringify(assets, null, 2))
}
run()
