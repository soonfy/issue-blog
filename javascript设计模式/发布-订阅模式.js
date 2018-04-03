(function () {
  let server = {
    eventList: [],
    listen(fn) {
      this.eventList.push(fn);
    },
    trigger() {
      for (let i = 0, fn; fn = this.eventList[i++];) {
        fn.apply(this, arguments);
      }
    }
  };
  console.log('未指定事件名');
  server.listen((name, age) => {
    console.log(`1 --> ${name}:${age}`);
  })
  server.listen((name, age) => {
    console.log(`2 --> ${name}:${age}`);
  })
  server.trigger('a', 3);
  server.trigger('b', 4);
  // 1 --> a:3
  // 2 --> a:3
  // 1 --> b:4
  // 2 --> b:4
})();

(function () {
  let server = {
    eventList: {},
    listen(key, fn) {
      if (!this.eventList[key]) {
        this.eventList[key] = [];
      }
      this.eventList[key].push(fn);
    },
    trigger() {
      let key = Array.prototype.shift.call(arguments);
      let fns = this.eventList[key];
      if (!fns || fns.length === 0) {
        return false;
      }
      for (let i = 0, fn; fn = fns[i++];) {
        fn.apply(this, arguments);
      }
    }
  };
  console.log('指定事件名');
  server.listen('a', (name, age) => {
    console.log(`1 --> ${name}:${age}`);
  })
  server.listen('b', (name, age) => {
    console.log(`2 --> ${name}:${age}`);
  })
  server.trigger('a', 'a', 3);
  server.trigger('b', 'b', 4);
  // 1 --> a:3
  // 2 --> b:4
})();