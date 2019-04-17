# Intro
This lib is similar like talib but is written in js and supports streaming.
The codebase prioritize efficiency. 

Often we need realtime calculation of some indicators, and some required previous knowledge, such as EMA, RSI, ATR. Ideally longer priods are better. But it would cost a lot of time to simply calculate from the beginning.

This lib is intended for fast calculating indicators from data stream.


# Usage
```
npm i no-talib --save 
```

# Build
`npm build` to build the lib
