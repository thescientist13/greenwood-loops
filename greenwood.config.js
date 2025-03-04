import { greenwoodPluginTypeScript } from '@greenwood/plugin-typescript';

export default {
  plugins: [
    greenwoodPluginTypeScript({
      servePage: 'dynamic',
      extendConfig: true
    })
  ]
}