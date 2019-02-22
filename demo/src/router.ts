type RouterMode = 'history' | 'hash' | undefined

export interface RouterOptions {
    mode?: RouterMode
    root?: string
    routes?: Route[]
}

export interface Route {
    path?: string
    handler?: (...args) => void
}

class RouterClass {
    private _interval: any
    private _routes: Route[] = []

    public mode: RouterMode
    public root: string
    public get routes() { return this._routes }

    constructor(options: RouterOptions) {
        this.mode = options && options.mode && options.mode === 'history' && !(history.pushState) ? 'history' : 'hash'

        this.root = options && options.root ? '/' + this.clearSlashes(options.root) : '/'
    }

    private check = (f: any) => {
        const fragment = f || this.getFragment()

        this._routes.forEach(r => {
            if (!r.handler) return;
            const match = fragment.match(r.path)
            if (match) {
                match.shift()
                r.handler.apply({}, match)
                return;
            }
        })
    }

    private clearSlashes = (path: string) => {
        return path.toString().replace(/\/$/, '').replace(/^\//, '')
    }

    private getFragment = () => {
        let fragment = ''
        if (this.mode === 'history') {
            fragment = this.clearSlashes(decodeURI(location.pathname + location.search))

            fragment = fragment.replace(/\?(.*)$/, '')
            fragment = this.root !== '/' ? fragment.replace(this.root, '') : fragment
        }
        else {
            const match = window.location.href.match(/#(.*)$/)
            fragment = match ? match[1] : ''
        }

        return this.clearSlashes(fragment)
    }

    public add(path: any, handler: any) {
        if (typeof path == 'function') {
            handler = path
            path = ''
        }
        this._routes.push({ path, handler })
        return this
    }

    public listen = () => {
        let current = this.getFragment()
        const fn = () => {
            const frag = this.getFragment()
            //console.log(current, frag)
            if (current !== frag) {
                current = this.getFragment()
                this.check(current)
            }
        }

        clearInterval(this._interval)
        this._interval = setInterval(fn, 50)
    }

    public navigate = (path?: string) => {
        path = path || ''
        if (this.mode === 'history') {
            history.pushState(null, "", this.root + this.clearSlashes(path))
        }
        else {
            window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path
        }
    }
}

export const Router = (options: RouterOptions) => {
    return new RouterClass(options);
}