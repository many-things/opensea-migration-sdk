import fs from 'fs'

import { lookupAccountAddress } from './'

const run = async () => {
  const assets = await lookupAccountAddress(
    '0x8ee55f30b24e42827cb4aad0b75454b92b99f106',
  )

  fs.writeFileSync('./playground.json', JSON.stringify(assets, null, 2))
}
run()
