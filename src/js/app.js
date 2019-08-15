import './../scss/main.scss';
import { initSearch } from './modules/search';
import { bindMultiEvents } from './modules/multi';
import { bindUnitEvents } from './modules/units';

initSearch();
bindMultiEvents();
bindUnitEvents();
