import { sleep } from 'time-helpers'
import { ProxyObservator } from '.'

const startDebug = async () => {
  ProxyObservator.start({ count: 1, tryLimit: 1, refreshTimeout: 3e3 })

  while (true) {
    await sleep(5e3)
    console.log(ProxyObservator.getAll())
  }
}
startDebug()
