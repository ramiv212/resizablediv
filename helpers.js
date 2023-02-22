export function intToPx(int) {
    return `${int}px`;
}

export function pxToInt(px) {
    return parseInt(px.replace("px",""));
}