// Distance between 2 (color) points in Eukledian Space
const distance = (c1, c2) => {
    return Math.sqrt(sqDistance(c1,c2))
}

const sqDistance = (c1, c2) => {
    return (c1.r - c2.r)**2 + (c1.g - c2.g)**2 + (c1.b - c2.b)**2
}

const colorMatch = (c1, c2, threshold = 160) => {
    return sqDistance(c1, c2) < threshold * threshold
}

const getLocationsWithColor = (imgData, color) => {
    const locs = []

    // imgData.data is an array in group of fours for RGBA
    for(let i = 0; i < imgData.data.length; i+=4) {
        const pColor = {
            r:imgData.data[i],
            g:imgData.data[i+1],
            b:imgData.data[i+2]
        }

        // get x,y location
        const pIndex = i/4

        const loc = {
            x:pIndex % imgData.width,
            y:Math.floor(pIndex/imgData.width)
        }

        if(colorMatch(pColor, color)) {
            locs.push(loc)
        }
    }
    
    return locs
}

// Find the average of an array (locs: Array)
const average = (locs) => {
    // initialise
    const res = { x:0, y: 0 }

    // summ up all points
    locs.forEach(loc => {
        res.x += loc.x
        res.y += loc.y
    })

    // get the average by dividing through loc.length
    res.x /= locs.length
    res.y /= locs.length

    return res
}

export { getLocationsWithColor, average }