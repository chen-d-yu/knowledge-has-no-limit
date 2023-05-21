import { sum } from "./utils/foo.js";
import { el } from "./components/Nav/nav.js";
import { el as titleEl } from "./components/Title/title.js";
import { el as imgEl } from "./components/Image/image.js";

const aFn = (x, y, z) => {
  return x + y + z;
};
console.log(aFn(1, 2, 3));
console.log(sum(1.2, 3));
console.log(sum(1.2, 3) + aFn.length);

document.body.append(el);
document.body.append(titleEl);
document.body.append(imgEl);
