window.jQuery = function (selectorOrArrayOrTemplate) {
  let elements;
  if (typeof selectorOrArrayOrTemplate === "string") {
    if (selectorOrArrayOrTemplate[0] === "<") {
      // 创建 div
      elements = [createElement(selectorOrArrayOrTemplate)];
    } else {
      // 查找 div
      elements = document.querySelectorAll(selectorOrArrayOrTemplate);
    }
  } else if (selectorOrArrayOrTemplate instanceof Array) {
    elements = selectorOrArrayOrTemplate;
  }

  function createElement(string) {
    const container = document.createElement("template");
    container.innerHTML = string.trim();
    return container.content.firstChild;
  }

  // api 可以操作 elements
  return {
    // 闭包: 函数访问外部的变量
    addClass(className) {
      for (let i = 0; i < elements.length; i++) {
        let element = elements[i];
        element.classList.add(className);
      }
      return this;
    },
    find(selector) {
      let array = [];
      for (let i = 0; i < elements.length; i++) {
        const elements2 = Array.from(
          elements[i].querySelectorAll(selector)
        );
        array = array.concat(elements2);
      }
      array.oldApi = this; // this 就是 旧 api
      return jQuery(array);
    },
    oldApi: selectorOrArrayOrTemplate.oldApi,
    end() {
      return this.oldApi; // this 就是新 api
    }
  }
}
window.$ = window.jQuery;