# React Native Reanimated 2

이 프로젝트는 유튜브 채널 [Reactiive](https://www.youtube.com/channel/UCaUilVZamr6K-dAdUt_e6Lw) 의 영상을 바탕으로 스터디를 진행한 내용을 담고 있습니다.

## Reactiive

### intro
![preview gif](src/reactive/intro/preview.gif)

### pan-gesture-handler
![preview gif](src/reactive/pan-gesture-handler/preview.gif)

### animated-scroll-view
![preview gif](src/reactive/animated-scroll-view/preview.gif)

### interpolate-colors
![preview gif](src/reactive/interpolate-colors/preview.gif)

### pinch-gesture-handler
![preview gif](src/reactive/pinch-gesture-handler/preview.gif)

### tap-gesture-handler
![preview gif](src/reactive/tap-gesture-handler/preview.gif)

### scroll-view-implementation
![preview gif](src/reactive/scroll-view-implementation/preview.gif)

### color-picker
![preview gif](src/reactive/color-picker/preview.gif)

### svg-and-text
![preview gif](src/reactive/svg-and-text/preview.gif)

### swipe-to-delete
![preview gif](src/reactive/swipe-to-delete/preview.gif)

### ripple
![preview gif](src/reactive/ripple/preview.gif)

### perspective-menu
![preview gif](src/reactive/perspective-menu/preview.gif)

---------------------------------------------------------------------------

### 주의사항

#### 타입에러
react 18 배포와 함께 `@types/react` 버전이 18로 올라감에 따라 기존 라이브러리와 타입 충돌 [이슈](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/59765) 가 있습니다.

현재 `@types/react-native` 의존성은 아래와 같습니다.
```json
{
  "dependencies": {
    "@types/react": "*"
  }
}
```

`package.json` 에 `@types/react` 에 대한 resolution 설정으로 해결하였습니다.
```json
{
  "resolutions": {
    "@types/react": "~17.0.21"
  }
}
```

#### react native debugger 버전
```json
{
  "resolutions": {
    "react-devtools-core": "4.14.0"
  }
}
```
