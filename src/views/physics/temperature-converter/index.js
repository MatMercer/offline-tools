import {app, Decimal} from "../../../lib/entrypoint";
import {convert} from "../../../lib/tools/temperature-converter";
import {createApp} from 'vue';

const EventHandling = {
  data() {
    return {
      values: {
        from: '',
        to: ''
      },
      units: {
        from: 'F',
        to: 'C'
      }
    }
  },
  watch: {
    'units.from': function (newVal, oldVal) {
      if (newVal === this.units.to) {
        this.units.to = oldVal;
      }

      this.convert('from');
    },
    'units.to': function (newVal, oldVal) {
      if (newVal === this.units.from) {
        this.units.from = oldVal;
      }

      this.convert('to');
    }
  },
  methods: {
    convert(caller) {
      const resultId = caller === "from" ? "to" : "from";

      try {
        this.values[resultId] =
          convert(this.units[caller] + this.units[resultId], new Decimal(this.values[caller])).toString();
      } catch (ignored) {}
    },
  }
}

createApp(EventHandling).mount('#temperature-converter')
