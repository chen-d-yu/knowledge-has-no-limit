| 捕获器                             | 触发条件                                                                        |
| ---------------------------------- | ------------------------------------------------------------------------------- |
| handler.getPrototypeOf()           | `Object.getPrototypeOf` 方法的捕捉器                                            |
| handler.setPrototypeOf()           | `Object.setPrototypeOf` 方法的捕捉器                                            |
| handler.isExtensible()             | `Object.isExtensible` 方法的捕捉器                                              |
| handler.preventExtensions()        | `Object.preventExtensions` 方法的捕捉器                                         |
| handler.getOwnPropertyDescriptor() | `Object.getOwnPropertyDescriptor` 方法的捕捉器。                                |
| handler.defineProperty()           | `Object.defineProperty` 方法的捕捉器                                            |
| handler.has()                      | `in` 操作符的捕捉器                                                             |
| handler.get()                      | 属性读取操作的捕捉器                                                            |
| handler.set()                      | 属性设置操作的捕捉器                                                            |
| handler.deleteProperty()           | `delete` 操作符的捕捉器                                                         |
| handler.ownKeys()                  | `Object.getOwnPropertyNames` 方法和 `Object.getOwnPropertySymbols` 方法的捕捉器 |
| handler.apply()                    | 函数被`apply`调用操作的捕捉器                                                   |
| handler.construct()                | `new` 操作符的捕捉器                                                            |
