import EventEmitter from './EventEmitter.js';

class Tile extends EventEmitter {
  constructor(id, { x, y }) {
    super();
    const el = document.createElement('div');
    el.classList.add('tile');
    el.setAttribute('unselectable', 'on');
    el.textContent = id;


    el.addEventListener('click', clickOrTouchHandle.bind(this), false);

    el.addEventListener('touchend', clickOrTouchHandle.bind(this), false);

    this.el = el;
    this.id = id;
    this.position = {
      x,
      y,
    };
  }
}

function clickOrTouchHandle(e) {
  e.stopPropagation();
  e.preventDefault();
  this.emit('trymove', this); 
}

export default Tile;
