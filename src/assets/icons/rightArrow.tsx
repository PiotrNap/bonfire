import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

export const RightArrowIcon = (props: SvgProps) => {
  return (
    <Svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={props.strokeWidth ?? 2}
        d="M9 5l7 7-7 7"
      />
    </Svg>
  )
}
