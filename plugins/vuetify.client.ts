// plugins/vuetify.js
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { VTimePicker } from "vuetify/labs/VTimePicker";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components: {
      ...components,
      VTimePicker,
    },
    directives,
  });

  nuxtApp.vueApp.use(vuetify);
});
