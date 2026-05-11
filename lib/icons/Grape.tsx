import { cloneElement, forwardRef } from 'react';
import type { IconProps } from '../icon-config.js';
import { ICON_SIZE_MAP, STROKE_WIDTH_MAP } from '../icon-config.js';
export type { IconProps };
const ICON_NAME = 'grape';
const SvgGrape = forwardRef<SVGSVGElement, IconProps>(
 ({ color = 'currentColor', size, strokeWidth, className, ...props }, ref) => {
  const element = (
   <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#grape_svg__a)">
     <path
      d="M14.666 3.333v-2L10.74 5.26m2.326 5.333a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm-5.66-5.66a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm2.827 2.834a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm1.04-3.867a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM14.1 6.727a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM6.373 8.8a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM9.2 11.627a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm-3.867 1.04a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
      stroke="inherit"
      strokeWidth={1.33}
      strokeLinecap="round"
      strokeLinejoin="round"
     />
    </g>
    <defs>
     <clipPath id="grape_svg__a">
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
SvgGrape.displayName = 'SvgGrape';
export default SvgGrape;
