import { cloneElement, forwardRef } from 'react';
import type { IconProps } from '../icon-config.js';
import { ICON_SIZE_MAP, STROKE_WIDTH_MAP } from '../icon-config.js';

export type { IconProps };

const ICON_NAME = 'wheat';
const SvgWheat = forwardRef<SVGSVGElement, IconProps>(
 ({ color = 'currentColor', size, strokeWidth, className, ...props }, ref) => {
  const element = (
   <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" {...props}>
    <g clipPath="url(#wheat_svg__a)">
     <path
      stroke="inherit"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.33}
      d="m1.333 14.667 9.333-9.334m0 0H12a2.667 2.667 0 0 0 2.666-2.666V1.333h-1.333A2.667 2.667 0 0 0 10.666 4zm-6.313 6.314a2.333 2.333 0 0 0 0-3.294l-1.02-1.02-1.02 1.02a2.333 2.333 0 0 0 0 3.294l1.02 1.02m1.02-1.02-1.02 1.02m1.02-1.02a2.333 2.333 0 0 1 3.293 0l1.02 1.02-1.02 1.02a2.333 2.333 0 0 1-3.293 0l-1.02-1.02M7.02 8.98a2.333 2.333 0 0 0 0-3.293L6 4.667l-1.02 1.02a2.333 2.333 0 0 0 0 3.293L6 10m1.02-1.02L6 10m1.02-1.02a2.333 2.333 0 0 1 3.293 0l1.02 1.02-1.02 1.02a2.333 2.333 0 0 1-3.293 0L6 10m3.686-3.687a2.333 2.333 0 0 0 0-3.293L8.666 2l-1.02 1.02a2.333 2.333 0 0 0 0 3.293l1.02 1.02m1.02-1.02-1.02 1.02m1.02-1.02a2.333 2.333 0 0 1 3.294 0L14 7.333l-1.02 1.02a2.333 2.333 0 0 1-3.294 0l-1.02-1.02"
     />
    </g>
    <defs>
     <clipPath id="wheat_svg__a">
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
SvgWheat.displayName = 'SvgWheat';
export default SvgWheat;
