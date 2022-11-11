import EventEmiter from 'events';

const _emitter = new EventEmiter();
_emitter.setMaxListeners(0); // unlimit listener

export const emitter = _emitter;