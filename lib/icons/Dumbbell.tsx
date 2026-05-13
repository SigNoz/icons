import { cloneElement, forwardRef } from 'react';
import type { IconProps } from '../icon-config.js';
import { ICON_SIZE_MAP, STROKE_WIDTH_MAP } from '../icon-config.js';

export type { IconProps };

const ICON_NAME = 'dumbbell';
const SvgDumbbell = forwardRef<SVGSVGElement, IconProps>(
 ({ color = 'currentColor', size, strokeWidth, className, ...props }, ref) => {
  const element = (
   <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#dumbbell_svg__a)">
     <path
      d="M9.6 9.6 6.4 6.4m7.934 7.933L13.4 13.4M2.6 2.6l-.933-.933m10.771 12.656a1.333 1.333 0 1 1-1.886-1.885l-1.178 1.179a1.334 1.334 0 0 1-1.886-1.886l4.243-4.243a1.334 1.334 0 0 1 1.886 1.886l-1.179 1.178a1.334 1.334 0 0 1 1.885 1.886l-1.885 1.885ZM4.27 8.512a1.334 1.334 0 1 1-1.886-1.886l1.178-1.178a1.333 1.333 0 1 1-1.885-1.886l1.885-1.885a1.333 1.333 0 1 1 1.886 1.885l1.178-1.179A1.334 1.334 0 1 1 8.512 4.27L4.27 8.512Z"
      stroke="inherit"
      strokeWidth={1.33}
      strokeLinecap="round"
      strokeLinejoin="round"
     />
    </g>
    <defs>
     <clipPath id="dumbbell_svg__a">
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
SvgDumbbell.displayName = 'SvgDumbbell';
export default SvgDumbbell;
