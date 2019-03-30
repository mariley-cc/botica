import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue'
import Vuetify, { VLayout, VDialog } from 'vuetify/lib'

// custom theme & variables
import './main.styl'

import colors from 'vuetify/es5/util/colors'

// Translation provided by Vuetify
import en from 'vuetify/es5/locale/en'
import es from 'vuetify/es5/locale/es'

Vue.use(Vuetify, {
  lang: {
    locales: { en, es },
    current: 'es'
  },
  theme: {
    success: '#4CAF50',
    info: '#2196F3',
    warning: '#FFC107',
    error: '#FF5252',

    primary: '#341069',
    secondary: colors.deepPurple,
    accent: '#74ba1a'
  },
  customProperties: true,
  iconfont: 'md',
  components: {
    VLayout,
    VDialog
  }
})
