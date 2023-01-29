// 被观察者
class Subject {
  constructor(name) {
    this.name = name;
    this._arr = [];
    this.state = {};
  }

  // 订阅中心，1.1挂载观察者方法，将所有的观察者保存到类内部中
  attach(o) {
    this._arr.push(o);
  }

  // 发布中心，被观察者主动触发，通知到观察者
  setState(state) {
    // 2.1设置传递进来的数据
    this.state = state;
    // 2.2发布，主动通知观察者
    this._arr.forEach((o) => {
      o.update(this);
    });
  }
}
// 观察者
class Observer {
  constructor(name) {
    this.name = name;
  }
  // 2.3观察者接收到被观察者传递过来的数据以及事件
  update(subject) {
    console.log(
      `通知${this.name}，当前被观察者"${subject.name}"触发--"${subject.state}"事件`
    );
  }
}

const s = new Subject("张三"); // 创建被观察者，需要去接收观察者的信息

const o = new Observer("监护人");

// 1.订阅
s.attach(o);
// 2.发布事件，这里触发会通知到所有的观察者
s.setState("上学");
