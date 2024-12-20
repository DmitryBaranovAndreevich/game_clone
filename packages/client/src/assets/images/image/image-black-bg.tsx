import { FC } from "react"
import { IIconProps } from "../../../types"

export const CrazyCrackerIcon: FC<IIconProps> = ({
  height = 467,
  width = 480,
  className,
}) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 480 467"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink">
      <rect width="480" height="467" fill="url(#pattern0_35_815)" />
      <defs>
        <pattern
          id="pattern0_35_815"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1">
          <use
            xlinkHref="#image0_35_815"
            transform="matrix(0.000976562 0 0 0.00100375 0 -0.0139186)"
          />
        </pattern>
        <image
          id="image0_35_815"
          width="1024"
          height="1024"
        />
      </defs>
    </svg>
  )
}