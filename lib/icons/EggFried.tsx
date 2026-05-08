import { cloneElement, forwardRef } from 'react';
import type { IconProps } from '../icon-config.js';
import { ICON_SIZE_MAP, STROKE_WIDTH_MAP } from '../icon-config.js';
export type { IconProps };
const ICON_NAME = 'egg-fried';
const SvgEggFried = forwardRef<SVGSVGElement, IconProps>(
 ({ color = 'currentColor', size, strokeWidth, className, ...props }, ref) => {
  const element = (
   <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g
     clipPath="url(#egg-fried_svg__a)"
     stroke="inherit"
     strokeWidth={1.33}
     strokeLinecap="round"
     strokeLinejoin="round"
    >
     <path d="M7.666 10.667a2.333 2.333 0 1 0 0-4.667 2.333 2.333 0 0 0 0 4.667Z" />
     <path d="M2 5.333c0-2.333 1.666-4 4.333-4 3.333 0 3.22 2 5 3.334 1.78 1.333 3.333 1.333 3.333 4C14.666 11.667 13 13 10 13c-1.667 0-1.667 1.667-4 1.667-2.334 0-4.667-1.334-4.667-3.667 0-2 1-2 1-3.333C2.333 6.667 2 6 2 5.333Z" />
    </g>
    <defs>
     <clipPath id="egg-fried_svg__a">
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
  const a11yProps = isHidden
   ? {
      focusable: 'false',
     }
   : {
      role: props.role ?? 'img',
      'aria-label': props['aria-label'] ?? ICON_NAME,
      focusable: 'false',
     };
  const baseClassName = `signoz-icon signoz-icon-${ICON_NAME}`;
  const elementProps = {
   ...props,
   ...a11yProps,
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
SvgEggFried.displayName = 'SvgEggFried';
export default SvgEggFried;
