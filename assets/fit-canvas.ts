const scratch = new Float32Array(2);

export default function fit(
  canvas: HTMLCanvasElement,
  parent?: ((arr: Float32Array) => Float32Array) | HTMLElement,
  scale?: number
) {
  const isSVG = canvas.nodeName.toUpperCase() === "SVG";

  canvas.style.position = canvas.style.position || "absolute";
  canvas.style.top = "0";
  canvas.style.left = "0";

  resize.scale = scale || 1;
  resize.parent = parent;

  return resize();

  function resize() {
    const p = resize.parent || canvas.parentNode;

    if (typeof p === "function") {
      var dims = p(scratch) || scratch;
      var width = dims[0];
      var height = dims[1];
    } else if (p && p !== document.body) {
      var psize = getSize(p);
      var width = psize[0] | 0;
      var height = psize[1] | 0;
    } else {
      var width = window.innerWidth;
      var height = window.innerHeight;
    }

    if (isSVG) {
      canvas.setAttribute("width", width * resize.scale + "px");
      canvas.setAttribute("height", height * resize.scale + "px");
    } else {
      canvas.width = width * resize.scale;
      canvas.height = height * resize.scale;
    }

    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    return resize;
  }
}

function getSize(element: Element): [number, number] {
  // Handle cases where the element is not already
  // attached to the DOM by briefly appending it
  // to document.body, and removing it again later.
  if (element === document.body) {
    return [window.innerWidth, window.innerHeight];
  }

  let temporary = false;

  if (!element.parentNode) {
    temporary = true;
    document.body.appendChild(element);
  }

  var bounds = element.getBoundingClientRect();
  var styles = getComputedStyle(element);
  var height =
    (bounds.height | 0) +
    parse(styles.getPropertyValue("margin-top")) +
    parse(styles.getPropertyValue("margin-bottom"));
  var width =
    (bounds.width | 0) +
    parse(styles.getPropertyValue("margin-left")) +
    parse(styles.getPropertyValue("margin-right"));

  if (temporary) {
    document.body.removeChild(element);
  }

  return [width, height];
}

function parse(prop: string): number {
  return parseFloat(prop) || 0;
}
