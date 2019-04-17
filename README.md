## Intro
This lib is similar like talib but is written in js and supports streaming.
The codebase prioritize efficiency. 

Often we need realtime calculation of some indicators, and some required previous knowledge, such as EMA, RSI, ATR. Ideally longer priods are better. But it would cost a lot of time to simply calculate from the beginning.

This lib is intended for fast calculating indicators from data stream.


## Usage
```
npm i no-talib --save 
```

example code
```
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
