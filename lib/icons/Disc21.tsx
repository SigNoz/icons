import { cloneElement, forwardRef } from 'react';
import type { IconProps } from '../icon-config.js';
import { ICON_SIZE_MAP, STROKE_WIDTH_MAP } from '../icon-config.js';

export type { IconProps };

const ICON_NAME = 'disc-21';
const SvgDisc21 = forwardRef<SVGSVGElement, IconProps>(
 ({ color = 'currentColor', size, strokeWidth, className, ...props }, ref) => {
  const element = (
   <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#disc-2-1_svg__a)">
     <path
      d="M8 14.667A6.667 6.667 0 1 0 8 1.333a6.667 6.667 0 0 0 0 13.334Z"
      stroke="inherit"
      strokeWidth={1.333}
      strokeLinecap="round"
      strokeLinejoin="round"
     />
     <path
      d="M8 10.667a2.667 2.667 0 1 0 0-5.334 2.667 2.667 0 0 0 0 5.334ZM8 8h.007"
      stroke="inherit"
      strokeWidth={1.333}
      strokeLinecap="round"
      strokeLinejoin="round"
     />
     <mask id="disc-2-1_svg__b" fill="#fff">
      <rect x={8} y={6.333} width={5.333} height={3.333} rx={0.667} />
     </mask>
     <rect
      x={8}
      y={6.333}
      width={5.333}
      height={3.333}
      rx={0.667}
      stroke="inherit"
      strokeWidth={2.667}
      mask="url(#disc-2-1_svg__b)"
     />
     <path
      d="M11 9.333v.922c0 .463.24.893.634 1.135l3.7 2.277"
      stroke="inherit"
      strokeWidth={1.333}
      strokeLinecap="round"
     />
    </g>
    <defs>
     <clipPath id="disc-2-1_svg__a">
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
SvgDisc21.displayName = 'SvgDisc21';
export default SvgDisc21;
