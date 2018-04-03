(function () {
  // define
  let Singleton = function (name) {
    this.name = name;
    this.instance = null;
  };
  Singleton.prototype.log = function () {
    console.log(this.name);
  };
  Singleton.getInstance = function (name) {
    if (!this.instance) {
      this.instance = new Singleton(name);
    }
    return this.instance;
  };
  // use
  console.log('标准的单例模式');
  let a = Singleton.getInstance('a');
  let b = Singleton.getInstance('b');
  console.log(a.name);
  a.log();
  console.log(b.name);
  b.log();
  console.log(a === b);
})();

(function () {
  // define
  let Singleton = function (name) {
    this.name = name;
  }
  Singleton.prototype.log = function () {
    console.log(this.name);
  };
  Singleton.getInstance = (function () {
    let instance = null;
    return function (name) {
      if (!instance) {
        instance = new Singleton(name);
      }
      return instance;
    }
  })();
  // use
  console.log('通过闭包保存标志');
  let a = Singleton.getInstance('a');
  let b = Singleton.getInstance('b');
  console.log(a.name);
  a.log();
  console.log(b.name);
  b.log();
  console.log(a === b);
})();

(function () {
  // define
  let CreateSingleton = (function () {
    let instance = null;
    let CreateSingleton = function (name) {
      if (instance) {
        return instance;
      }
      this.name = name;
      return instance = this;
    };
    CreateSingleton.prototype.log = function () {
      console.log(this.name);
    }
    return CreateSingleton;
  })();
  // use
  console.log('透明的单例模式');
  let a = new CreateSingleton('a');
  let b = new CreateSingleton('b');
  console.log(a.name);
  a.log();
  console.log(b.name);
  b.log();
  console.log(a === b);
})();

(function () {
  // define
  let CreateSingleton = function (name) {
    this.name = name;
  };
  CreateSingleton.prototype.log = function () {
    console.log(this.name);
  }
  let ProxySingleton = (function () {
    let instance = null;
    return function (name) {
      if (!instance) {
        instance = new CreateSingleton(name);
      }
      return instance;
    }
  })()
  // use
  console.log('使用代理实现单例模式');
  let a = new ProxySingleton('a');
  let b = new ProxySingleton('b');
  console.log(a.name);
  a.log();
  console.log(b.name);
  b.log();
  console.log(a === b);
})();

(function () {
  // define
  let createLogin = function () {
    let div = document.createElement('div');
    div.innerHTML = '登录框';
    div.style.display = 'none';
    document.body.appendChild(div);
    let div = {};
    return div;
  }
  let getSingleton = function (fn) {
    let instance = null;
    return function () {
      return instance || (instance = fn.apply(this, arguments));
    }
  }
  let createSingleLogin = getSingleton(createLogin);
  // use
  console.log('通用惰性单例实现登录浮框');
  document.getElementById('login').onclick = function(){
    let loginDiv = createSingleLogin();
    loginDiv.style.display = 'block';
  }
})();
