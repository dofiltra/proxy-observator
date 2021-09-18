import _ from 'lodash'
import { extractProxy, ProxyList } from 'proxy-extract'

class ProxyObserver {
  public static proxies: ProxyList.IFreeProxy[] = []
  private static timerId: NodeJS.Timeout

  static start(refreshTimeout?: number) {
    if (!refreshTimeout) {
      return
    }

    clearTimeout(ProxyObserver.timerId)
    ProxyObserver.timerId = setTimeout(
      async () => await this.refresh(),
      refreshTimeout
    )
  }

  static async stop() {
    clearTimeout(ProxyObserver.timerId)
    ProxyObserver.proxies = []
  }

  static getRandom() {
    return _.shuffle(ProxyObserver.proxies)[0]
  }

  static async refresh() {
    const newProxies = await extractProxy({
      count: 50,
      tryLimit: 5,
    })

    if (newProxies?.length) {
      ProxyObserver.proxies = newProxies
    }
  }
}

export { ProxyObserver }
