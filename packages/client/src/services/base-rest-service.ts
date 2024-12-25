type TRequestType = {
  url: string
  data?: Record<string, string> | FormData
  headers?: Record<string, string>
}

export class BaseRestService {
  constructor(public baseUrl: string) {}

  private _checkResponse(res: Response) {
    if (res.ok) {
      return res.json()
    } else {
      throw new Error("request error")
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
        console.log(e)
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
