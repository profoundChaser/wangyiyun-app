import { def } from '@vue/shared'
import {
    Button,
    Swipe, 
    SwipeItem 
} from 'vant'

let plugins=[
    Button,
    Swipe, 
    SwipeItem 
]

export default function getVant(app){
    plugins.forEach(component=>{
        app.use(component)
    })
}