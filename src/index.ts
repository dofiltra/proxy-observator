import _ from 'lodash'
import { extractProxy, ProxyList } from 'proxy-extract'

class ProxyObservator {
  public static proxies: ProxyList.IFreeProxy[] = []
  private static timerId: NodeJS.Timeout

  static async start(count = 10, tryLimit = 1, refreshTimeout?: number) {
    console.log('refresh')
    const newProxies = await extractProxy({
      count,
      tryLimit
    })
    console.log('refresh', newProxies?.length)
    ProxyObservator.proxies = newProxies?.length ? newProxies : []

    if (refreshTimeout) {
      //   clearTimeout(ProxyObservator.timerId)
      ProxyObservator.timerId = setTimeout(() => ProxyObservator.start(count, tryLimit, refreshTimeout), refreshTimeout)
    }
    return ProxyObservator.timerId
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
