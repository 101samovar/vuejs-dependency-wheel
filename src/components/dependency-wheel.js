const DW = {
  get: (params, data) => {
    init(params);
    const elements = data.filter(x => x.type === 'element').map(x => ({ id: x.id }));
    const links = data.filter(x => x.type === 'link').map(x => ({ id: x.id, from: x.from, to: x.to }));
    const captions = data.filter(x => x.type === 'element').map(x => ({ id: x.id, name: x.name }));
    const captionLinks = data.filter(x => x.type === 'element').map(x => ({ id: x.id }));
    setElementLength(elements, links);
    setElementPosition(elements);
    setCaptionPosition(captions, elements);
    setElementColor(elements, settings.palette);
    setElementPath(elements);
    setLinkPath(elements, links);
    setLinkColor(elements, links);
    setCaptionLinkPath(captionLinks, captions, elements);
    return { elements, links, captions, captionLinks };
  }
};

export default DW;

const settings = {
  palette: [
    '#B9F6CA', '#69F0AE', '#00E676', '#00C853',
    '#64DD17', '#76FF03', '#B2FF59', '#CCFF90',
    '#F4FF81', '#EEFF41', '#C6FF00', '#AEEA00'
  ]
};

function init(params) {
  Object.entries(params).forEach(([key, value]) => {
    settings[key] = value;
  });
}

function toCartesian(r, phi) {
  return { x: r * Math.cos(phi) + settings.X0, y: r * Math.sin(phi) + settings.Y0 };
}

function setElementPath(elements) {
  const R = settings.R;
  elements.forEach(element => {
    let start = toCartesian(R, element.start * Math.PI * 2);
    let end = toCartesian(R, element.end * Math.PI * 2);
    element.path = `M ${start.x} ${start.y} A ${R} ${R} 0 0 1 ${end.x} ${end.y}`;
  });
}
function setElementColor(elements, palette) {
  elements.forEach((element, i) => element.color = palette[i % palette.length]);
}

function setCaptionPosition(captions, elements) {
  const xLeft = settings.X0 - settings.R * 1.6;
  const xRight = settings.X0 + settings.R * 1.6;
  let yLeft = 0;
  let yRight = 0;
  const D = 10;
  captions.forEach(caption => {
    const element = elements.find(el => el.id === caption.id);
    let middle = (element.start + element.end) / 2;
    caption.order = Math.sin(middle * Math.PI * 2);
  });
  captions.sort((a, b) => a.order < b.order ? -1 : 1);
  captions.forEach(caption => {
    let element = elements.find(el => el.id === caption.id);
    let middle = (element.start + element.end) / 2;
    if (middle > .25 && middle < .75) {
      caption.x = xLeft;
      caption.y = yLeft;
      caption.align = 'end';
      yLeft += D;
    } else {
      caption.x = xRight;
      caption.y = yRight;
      yRight += D;
      caption.align = 'start';
    }
  });
  captions.forEach(caption => {
    if (caption.align === 'end') {
      caption.y += settings.Y0 - yLeft / 2;
    } else {
      caption.y += settings.Y0 - yRight / 2;
    }
  });
}

function setElementLength(elements, links) {
  elements.forEach(element => {
    let length = links.filter(link => link.from === element.id || link.to === element.id).length;
    length = length || 1;
    element.length = length;
  })
}

function setElementPosition(elements) {
  const total = elements.map(element => element.length).reduce((s, x) => s + x, 0);
  let position = 0;
  elements.forEach(element => {
    element.start = position;
    element.end = position + element.length / total;
    position = element.end;
  });
}

function setLinkPath(elements, links) {
  const R = settings.R;
  const eps = 0;
  links.forEach(link => {
    let from = elements.find(element => element.id === link.from);
    let to = elements.find(element => element.id === link.to);
    let fromLinkCount = links.filter(link => link.from === from.id || link.to === from.id).length;
    let toLinkCount = links.filter(link => link.from === to.id || link.to === to.id).length;
    from.shift = from.shift || 0;
    to.shift = to.shift || 0;
    let shiftFrom = (from.end - from.start) / fromLinkCount;
    let shiftTo = (to.end - to.start) / toLinkCount;
    let fromStart = toCartesian(R, (from.start + from.shift) * Math.PI * 2 + eps);
    let fromEnd = toCartesian(R, (from.start + from.shift + shiftFrom) * Math.PI * 2 - eps);
    let toStart = toCartesian(R, (to.start + to.shift) * Math.PI * 2 + eps);
    let toEnd = toCartesian(R, (to.start + to.shift + shiftTo) * Math.PI * 2 - eps);
    let center = toCartesian(0, 0);
    from.shift += shiftFrom;
    to.shift += shiftTo;
    let path = `M ${fromStart.x} ${fromStart.y} ` +
      `A ${R} ${R} 0 0 1 ${fromEnd.x} ${fromEnd.y} ` +
      `C ${center.x} ${center.y} ${center.x} ${center.y} ${toStart.x} ${toStart.y} ` +
      `A ${R} ${R} 0 0 1 ${toEnd.x} ${toEnd.y} ` +
      `C ${center.x} ${center.y} ${center.x} ${center.y} ${fromStart.x} ${fromStart.y} `;
    link.path = path;
  });
}

function setLinkColor(elements, links) {
  links.forEach(link => {
    let from = elements.find(element => element.id === link.from);
    link.color = from.color;
  });
}

function setCaptionLinkPath(captionLinks, captions, elements) {
  const h = settings.R / 2;
  captionLinks.forEach(captionLink => {
    let element = elements.find(element => element.id === captionLink.id);
    let caption = captions.find(caption => caption.id === captionLink.id);
    let position = toCartesian(settings.R, (element.start + element.end) * Math.PI);
    let handle = caption.align === 'end' ? h : -h;
    captionLink.path = `M ${caption.x} ${caption.y} C ${caption.x + handle} ${caption.y} ${position.x - handle} ${position.y} ${position.x} ${position.y}`;
  });
}
