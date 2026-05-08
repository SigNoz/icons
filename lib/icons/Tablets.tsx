import { cloneElement, forwardRef } from 'react';
import type { IconProps } from '../icon-config.js';
import { ICON_SIZE_MAP, STROKE_WIDTH_MAP } from '../icon-config.js';
export type { IconProps };
const ICON_NAME = 'tablets';
const SvgTablets = forwardRef<SVGSVGElement, IconProps>(
 ({ color = 'currentColor', size, strokeWidth, className, ...props }, ref) => {
  const element = (
   <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#tablets_svg__a)">
     <path
      d="M14.666 11.333a3.333 3.333 0 1 1-6.666 0m6.666 0a3.333 3.333 0 1 0-6.666 0m6.666 0H8M2.306 7.027l4.72-4.72M8 4.667a3.333 3.333 0 1 1-6.667 0 3.333 3.333 0 0 1 6.667 0Z"
      stroke="inherit"
      strokeWidth={1.33}
      strokeLinecap="round"
      strokeLinejoin="round"
     />
    </g>
    <defs>
     <clipPath id="tablets_svg__a">
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
SvgTablets.displayName = 'SvgTablets';
export default SvgTablets;
