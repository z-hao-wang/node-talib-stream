## Intro
no-talib is now renamed to talib-stream

This lib for efficiently calculating weighted ta-lib metrics with streaming support.

Often we need realtime calculation some weighted metric that requires previous knowledge, such as EMA, RSI, ATR. Ideally longer priods are better. But it would cost a lot of time to simply calculate from the beginning.

This lib is intended for fast calculating indicators from data stream.


## Usage
```
npm i talib-stream --save 
```

example code
```
import { AtrKeeper } from 'talib-stream';

const atrKeeperRes: any = [];
const atrKeeper = new AtrKeeper({ periods: period });
_.each(sampleCandles, c => {
  atrKeeper.add({
    close,
    high,
    low,
  });
  atrKeeperRes.push(atrKeeper.get());
});
```

more usages please check spec files

## Testing
```
npm run test
```

## Build from source
`npm build` to build the lib
