# jimp-autocrop

auto crop centre of a jimp image based on min and max ratio (width/height)

## Install

```bash
npm i jimp-autocrop
```

## Usage

```typescript
import Jimp from 'jimp'
import { cropCentreFromPath } from 'jimp-autopcrop'

cropCentreFromPath('inPath', { outImgPath: 'outPath', ratio: { min: 0.75, max: 1.25 })
.then(res => {
    console.log(res.img, res.path)
})
.catch(err => console.log(err))
```
