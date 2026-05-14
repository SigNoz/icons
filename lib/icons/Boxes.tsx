import { cloneElement, forwardRef } from 'react';
import type { IconProps } from '../icon-config.js';
import { ICON_SIZE_MAP, STROKE_WIDTH_MAP } from '../icon-config.js';

export type { IconProps };

const ICON_NAME = 'boxes';
const SvgBoxes = forwardRef<SVGSVGElement, IconProps>(
 ({ color = 'currentColor', size, strokeWidth, className, ...props }, ref) => {
  const element = (
   <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" {...props}>
    <g clipPath="url(#boxes_svg__a)">
     <path
      stroke="inherit"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.33}
      d="m8 12.667-2.647 1.586a1.33 1.33 0 0 1-1.373 0l-2-1.2a1.33 1.33 0 0 1-.647-1.14v-2.16a1.33 1.33 0 0 1 .647-1.14L4.666 7M8 12.667V9m0 3.667 2.646 1.586a1.33 1.33 0 0 0 1.374 0l2-1.2a1.33 1.33 0 0 0 .646-1.14v-2.16a1.33 1.33 0 0 0-.646-1.14L11.333 7M8 9 4.666 7M8 9l-3.334 2M8 9l3.333-2M8 9l3.333 2M8 9V5.333M4.666 7V4.087a1.33 1.33 0 0 1 .647-1.14l2-1.2a1.33 1.33 0 0 1 1.373 0l2 1.2a1.33 1.33 0 0 1 .647 1.14V7m-6.667 4-3.16-1.9m3.16 1.9v3.447M11.333 11l3.16-1.9m-3.16 1.9v3.447M8 5.333l-3.16-1.9M8 5.333l3.16-1.9"
     />
    </g>
    <defs>
     <clipPath id="boxes_svg__a">
      <path fill="#fff" d="M0 0h16v16H0z" />
     </clipPath>
    </defs>
   </svg>
  );
  const hasViewBox = element.props.viewBox != null;
  const isCustomIcon = element.props['data-custom-icon'] === 'true';
  const defaultSize = isCustomIcon ? element.props.width : ICON_SIZE_MAP.xs;
  const resolvedSize =
   size != null ? (typeof size === 'number' ? size : ICON_SIZE_MAP[size]) : defaultSize;
  const resolvedStrokeWidth =
   strokeWidth != null
    ? strokeWidth
    : typeof size === 'string' && size in STROKE_WIDTH_MAP
      ? STROKE_WIDTH_MAP[size]
      : size == null
        ? STROKE_WIDTH_MAP.xs
        : 2;
  const w = element.props.width != null ? Number(element.props.width) : 24;
  const h = element.props.height != null ? Number(element.props.height) : 24;
  const viewBoxWhenMissing = `0 0 ${w} ${h}`;
  const isHidden = props['aria-hidden'] === true || props['aria-hidden'] === 'true';
  const a11yDefaults = isHidden
   ? {
      focusable: 'false',
     }
   : {
      role: 'img',
      'aria-label': ICON_NAME,
      focusable: 'false',
     };
  const baseClassName = `signoz-icon signoz-icon-${ICON_NAME}`;
  const elementProps = {
   ...a11yDefaults,
   ...props,
   ref,
   className: className ? `${baseClassName} ${className}` : baseClassName,
   ...(!isCustomIcon && {
    stroke: color,
    strokeWidth: resolvedStrokeWidth,
   }),
   ...(!isCustomIcon &&
    !hasViewBox && {
     viewBox: viewBoxWhenMissing,
    }),
   ...(isCustomIcon && {
    style: {
     color,
     ...props.style,
    },
    viewBox: viewBoxWhenMissing,
   }),
   width: resolvedSize,
   height: resolvedSize,
  };
  return cloneElement(element, elementProps);
 },
);
SvgBoxes.displayName = 'SvgBoxes';
export default SvgBoxes;
