import { cloneElement, forwardRef } from 'react';
import type { IconProps } from '../icon-config.js';
import { ICON_SIZE_MAP, STROKE_WIDTH_MAP } from '../icon-config.js';

export type { IconProps };

const ICON_NAME = 'carrot';
const SvgCarrot = forwardRef<SVGSVGElement, IconProps>(
 ({ color = 'currentColor', size, strokeWidth, className, ...props }, ref) => {
  const element = (
   <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" {...props}>
    <g clipPath="url(#carrot_svg__a)">
     <path
      stroke="inherit"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.33}
      d="m5.76 9.333-1.366-1.36M10.227 10l-1.64-1.64M10 6s1.24-1.333 2.334-1.333C13.78 4.667 14.667 6 14.667 6s-.887 1.333-2.333 1.333S10 6 10 6m0 0s-1.333-.887-1.333-2.333S10 1.333 10 1.333s1.334.887 1.334 2.334C11.334 4.773 10 6 10 6m-8.486 8.467s6.58-2.334 8.486-4.24a3 3 0 0 0 .004-4.244A3 3 0 0 0 5.76 5.98c-1.913 1.913-4.246 8.487-4.246 8.487"
     />
    </g>
    <defs>
     <clipPath id="carrot_svg__a">
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
SvgCarrot.displayName = 'SvgCarrot';
export default SvgCarrot;
