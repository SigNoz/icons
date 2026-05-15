import { cloneElement, forwardRef } from 'react';
import type { IconProps } from '../icon-config.js';
import { ICON_SIZE_MAP, STROKE_WIDTH_MAP } from '../icon-config.js';

export type { IconProps };

const ICON_NAME = 'fish-off';
const SvgFishOff = forwardRef<SVGSVGElement, IconProps>(
 ({ color = 'currentColor', size, strokeWidth, className, ...props }, ref) => {
  const element = (
   <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" {...props}>
    <g clipPath="url(#fish-off_svg__a)">
     <path
      stroke="inherit"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.33}
      d="M12 8.333V8m-.316 3.684A4.5 4.5 0 0 1 10 12c-2.373 0-5.04-1.687-5.666-4 .232-.853.742-1.622 1.414-2.253m2.296-1.392A5.9 5.9 0 0 1 10 4c2.374 0 4.04 1.693 4.667 4a6.4 6.4 0 0 1-.942 2.039M4.667 7.113c0-1.78-.947-3.133-2.847-3.446-.666 1-.666 3.333.154 4.333-.827 1-.827 3.333-.154 4.333 1.9-.313 2.847-1.666 2.847-3.446m4.987-2.915a6.5 6.5 0 0 1 1.013-1.925m0 7.906a6.5 6.5 0 0 1-1.152-2.412m1.159 2.412-.154.934A1.334 1.334 0 0 1 9.2 14H6.334c.646-.732 1-1.677.993-2.653M5.687 2H9.2a1.33 1.33 0 0 1 1.32 1.113l.154.934m-9.34-2.714 13.333 13.334"
     />
    </g>
    <defs>
     <clipPath id="fish-off_svg__a">
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
SvgFishOff.displayName = 'SvgFishOff';
export default SvgFishOff;
