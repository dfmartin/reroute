import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { Router } from './router'

const router = Router({
    root: '/',
    mode: "history",
    routes: [
        { path: 'pageone', handler: () => { alert('pageone') } },
    ],
});

router.add("/pageone/", () => { alert('page One') });


class App extends React.Component<any> {
    render() {
        return (
            <div>
                Hello app!!
            </div>
        )
    }
}

var mount = document.getElementById('app')
ReactDOM.render(<App />, mount)
router.listen();

declare var module: any

if (module.hot) {
    module.hot.accept()
}