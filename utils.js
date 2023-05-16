// Distance between 2 (color) points
const sqDistance = (p1, p2) => {
    return (p1.r - p2.r)**2 + (p1.g - p2.g)**2 + (p1.b - p2.b)**2
}

const colorMatch = (c1, c2, threshold = 160) => {
    return sqDistance(c1, c2) < threshold * threshold
}

const getLocationsWithColor = (imgData, color) => {
    const locs = []

    // imgData.data is an array in group of fours for RGBA
    for(let i = 0; imgData.data.length; i+=4) {
        // const pColor = {
        //     r:imgData.data[i],
        //     g:imgData.data[i+1],
        //     b:imgData.data[i+2]
        // }

        // console.log('pColor =', pColor);

        // get x,y location
        // const pIndex = i/4

        // console.log('pIndex =', pIndex);

        // const loc = {
        //     x:pIndex % imgData.width,
        //     y:Math.floor(pIndex/imgData.width)
        // }

        // console.log('loc =', loc);

        // if(colorMatch(pColor, color)) {
        //     locs.push(loc)
        // }
    }
    
    return locs
}

export { getLocationsWithColor }