type TRequestType = {
  url: string
  data?: Record<string, string> | FormData
  headers?: Record<string, string>
}

export class BaseRestService {
  constructor(public baseUrl: string) {}

  private async _checkResponse(res: Response) {
    if (res.ok) {
      try {
        const json = await res.json()
        return json
      } catch (e) {
        console.log(e)
        return "OK"
      }
    } else {
      const error = await res.json()
      throw new Error(error.reason || "request error")
    }
  }

  private _fetchData<T>({
    url,
    options,
  }: {
    url: URL
    options: RequestInit
  }): Promise<T> {
    return fetch(url, options)
      .then(this._checkResponse)
      .catch(e => {
        if (e instanceof Error) {
          throw e
        }
      })
  }

  public get<T>({ url, data = {}, headers = {} }: TRequestType): Promise<T> {
    const fullUrl = new URL(`${this.baseUrl}${url}`)
    fullUrl.search =
      data instanceof FormData
        ? new URLSearchParams({}).toString()
        : new URLSearchParams(data).toString()
    const options = {
      method: "GET",
      headers,
    }
    return this._fetchData<T>({ url: fullUrl, options })
  }

  public post<T>({ url, data = {}, headers = {} }: TRequestType): Promise<T> {
    const fullUrl = new URL(`${this.baseUrl}${url}`)
    const body = data instanceof FormData ? data : JSON.stringify(data)
    const fullHeaders =
      data instanceof FormData
        ? headers
        : {
            ...headers,
            "content-type": "application/json",
          }
    const options = {
      method: "POST",
      headers: fullHeaders,
      body,
    }
    return this._fetchData<T>({ url: fullUrl, options })
  }
}
