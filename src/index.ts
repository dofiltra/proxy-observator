import _ from 'lodash'
import { extractProxy, ProxyList } from 'proxy-extract'

type TStartOpts = {
  count: number
  tryLimit?: number
  refreshTimeout?: number
}

class ProxyObservator {
  public static proxies: ProxyList.IFreeProxy[] = []
  private static timerId: NodeJS.Timeout

  static async start(opts: TStartOpts) {
    const { count = 10, tryLimit = 1, refreshTimeout = 0 } = opts

    return new Promise(async (resolve) => {
      const newProxies = await extractProxy({
        count,
        tryLimit
      })
      ProxyObservator.proxies = newProxies?.length ? newProxies : []

      if (refreshTimeout) {
        // clearTimeout(ProxyObservator.timerId)
        ProxyObservator.timerId = setTimeout(() => ProxyObservator.start(opts), refreshTimeout)
      }

      return resolve(ProxyObservator.timerId)
    })
  }

  static async stop() {
    clearTimeout(ProxyObservator.timerId)
    ProxyObservator.proxies = []
  }

  static getAll() {
    return ProxyObservator.proxies
  }

  static getRandom() {
    return _.shuffle(ProxyObservator.proxies)[0]
  }
}

export { ProxyObservator }
