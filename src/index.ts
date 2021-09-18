import _ from 'lodash'
import { extractProxy, ProxyList } from 'proxy-extract'

class ProxyObservator {
  public static proxies: ProxyList.IFreeProxy[] = []
  private static timerId: NodeJS.Timeout

  static start(refreshTimeout?: number) {
    if (!refreshTimeout) {
      return
    }

    clearTimeout(ProxyObservator.timerId)
    ProxyObservator.timerId = setTimeout(async () => await ProxyObservator.refresh(), refreshTimeout)

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

  static async refresh() {
    const newProxies = await extractProxy({
      count: 50,
      tryLimit: 5
    })

    if (newProxies?.length) {
      ProxyObservator.proxies = newProxies
    }
  }
}

export { ProxyObservator }
