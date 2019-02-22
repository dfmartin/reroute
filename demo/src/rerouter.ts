
const isPushStateAvailable = () => {
    return !!(
        typeof window !== 'undefined' &&
        window.history &&
        window.history.pushState
    )
}

const clean = (s: RegExp | string) => {
    if (s instanceof RegExp) return s
    return s.replace(/\/+$/, '').replace(/^\/+/, '^/')
}

class Router {
    private _root: string
    private _routes: any[] = []
    private _useHash: boolean
    private _hash: any

    constructor(root?: string, useHash?: boolean, hash?: any) {
        this._hash = !hash ? '#' : hash
        this._useHash = useHash || false

        if (root) {
            this._root = useHash ? root.replace(/\/$/, '/' + hash) : root.replace(/\/$/, '')
        }
        else if (useHash) {
            this._root = this._cLoc().split(this._hash)[0].replace(/\$/, '/' + this._hash)
        }

        this.listen()
        this.updatePageLinks()
    }


    private _cLoc = () => {
        if (typeof window !== 'undefined') {
            if (typeof window.__REROUTER_LOCATION_MOCK__ !== 'undefined') {
                return window.__REROUTER_LOCATION_MOCK
            }
            return clean(window.location.href)
        }
        return ''
    }


}