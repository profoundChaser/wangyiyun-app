import { def } from '@vue/shared'
import {
    Button,
    Swipe, 
    SwipeItem,
    Popup,
    Progress
} from 'vant'

let plugins=[
    Button,
    Swipe, 
    SwipeItem,
    Popup,
    Progress
]

export default function getVant(app){
    plugins.forEach(component=>{
        app.use(component)
    })
}