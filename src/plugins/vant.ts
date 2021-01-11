import { App } from 'vue'
import Vant from 'vant'
import 'vant/lib/index.css'

export function setupVant (app: App) {
  app.use(Vant)
}
