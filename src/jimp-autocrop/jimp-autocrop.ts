import Jimp from 'jimp'
import fs from 'fs'

export async function cropCentreFromPath(
    inImgPath: string,
    options?: {
        outImgPath?: string,
        ratio?: {
            min?: number,
            max?: number
        }
    }
) {
    return new Promise<{
        img: Jimp,
        path?: string
    }>((resolve, reject) => {
        try {
            options = options ?? { ratio: { min: 1, max: 1 }}
            options.ratio = options.ratio ?? { min: 1, max: 1 }

            Jimp.read(inImgPath)
            .then(inImg => {
                const img = cropCentre(inImg, options.ratio.min, options.ratio.max)
                
                if (options.outImgPath) img.write(options.outImgPath)

                resolve({
                    img: img,
                    path: (options.outImgPath && fs.existsSync(options.outImgPath)) ? options.outImgPath : null
                })
            })
            .catch(err => reject(err))
        } catch (error) {
            reject(error)
        }
    })
}

export function cropCentre(
    img: Jimp,
    minRatio: number = 1,
    maxRatio: number = 1
): Jimp {
    let w = img.getWidth()
    let h = img.getHeight()
    let r = w/h

    var tw = w
    var th = w / minRatio
    var x = 0
    var y = (h-th)/2

    if (w > h) {
        tw = h * maxRatio
        th = h
        y = 0
        x = (w-tw)/2
    }

    return img.crop(x, y, tw, th)
}