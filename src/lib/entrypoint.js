import "../scss/style.scss"
import 'bootstrap';
import {OfflineTools, version} from "./offline-tools";

export const app = new OfflineTools();
export const Decimal = app.mathContext;

const consoleLogCss = `
background-color: #f5d020;
background-image: linear-gradient(315deg, #f5d020 0%, #f53803 74%);color: white;
display: block;
text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3);
line-height: 40px;
text-align: center;
font-weight: bold;
border: 1px solid #000;
font-size: 22px;
padding: 8px;
`

console.log('%cOffline Tools 🛠 V. ' + version, consoleLogCss);
