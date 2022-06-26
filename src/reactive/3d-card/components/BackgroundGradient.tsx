import React, { FC, useEffect } from "react"
import {
  Canvas,
  RoundedRect,
  SweepGradient,
  vec,
  BlurMask,
  useSharedValueEffect,
  useValue
} from "@shopify/react-native-skia"
import { useSharedValue, withRepeat, withTiming } from "react-native-reanimated"

interface Props {
  width: number
  height: number
  padding: number
}

export const BackgroundGradient: FC<Props> = ({ width, height, padding }) => {
  const sharedBlurValue = useSharedValue(5)
  const blur = useValue(5)

  useEffect(() => {
    sharedBlurValue.value = withRepeat(withTiming(20, { duration: 3000 }), -1, true)
  }, [])

  useSharedValueEffect(() => (blur.current = sharedBlurValue.value), sharedBlurValue)

  return (
    <Canvas style={{ width, height }}>
      <RoundedRect
        x={getCanvasX(0, padding)}
        y={getCanvasY(0, padding)}
        width={getCanvasWidth(width, padding)}
        height={getCanvasHeight(height, padding)}
        color="#ffffff"
        r={20}
      >
        <SweepGradient
          c={vec(width / 2, height / 2)}
          colors={["cyan", "magenta", "yellow", "cyan"]}
        />
        <BlurMask style="solid" blur={blur} respectCTM={false} />
      </RoundedRect>
    </Canvas>
  )
}

const getCanvasX = (x: number, padding: number) => x + padding
const getCanvasY = (y: number, padding: number) => y + padding
const getCanvasHeight = (height: number, padding: number) => height - padding * 2
const getCanvasWidth = (width: number, padding: number) => width - padding * 2
