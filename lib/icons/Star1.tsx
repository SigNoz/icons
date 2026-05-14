import { cloneElement, forwardRef } from 'react';
import type { IconProps } from '../icon-config.js';
import { ICON_SIZE_MAP, STROKE_WIDTH_MAP } from '../icon-config.js';

export type { IconProps };

const ICON_NAME = 'star-1';
const SvgStar1 = forwardRef<SVGSVGElement, IconProps>(
 ({ color = 'currentColor', size, strokeWidth, className, ...props }, ref) => {
  const element = (
   <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" {...props}>
    <path
     fill="#fff"
     d="M10.52 4.99 9.46 2.017a1.56 1.56 0 0 0-2.344-.743c-.26.18-.46.434-.572.73L5.482 4.99H2.555a1.56 1.56 0 0 0-1.46 1.017 1.54 1.54 0 0 0 .465 1.72l2.525 2.077-1.061 3.156a1.54 1.54 0 0 0 .56 1.744 1.56 1.56 0 0 0 1.83-.002l2.587-1.88 2.584 1.88a1.56 1.56 0 0 0 2.398-.776c.102-.315.1-.653-.006-.966l-1.061-3.158 2.528-2.078a1.54 1.54 0 0 0 .506-1.574l-.048-.152a1.55 1.55 0 0 0-1.454-1.008zm2.979 1.558a.05.05 0 0 1-.016.024l-2.778 2.284a1.02 1.02 0 0 0-.318 1.108l1.169 3.474a.04.04 0 0 1 0 .027.05.05 0 0 1-.018.024.06.06 0 0 1-.035.011.06.06 0 0 1-.035-.011L8.6 11.404a1.02 1.02 0 0 0-1.199 0l-2.868 2.085a.06.06 0 0 1-.035.01.06.06 0 0 1-.035-.01.05.05 0 0 1-.018-.024.04.04 0 0 1 0-.026l1.169-3.474a1.01 1.01 0 0 0-.318-1.107L2.516 6.57a.05.05 0 0 1-.015-.022.04.04 0 0 1 .002-.026.05.05 0 0 1 .018-.023.06.06 0 0 1 .034-.01h3.267a1.02 1.02 0 0 0 .96-.677L7.96 2.498q-.006.016-.004.017.028-.016.044-.015a.06.06 0 0 1 .034.01.05.05 0 0 1 .018.023l1.167 3.28a1.015 1.015 0 0 0 .96.677h3.266a.06.06 0 0 1 .033.01l.011.011.008.013a.04.04 0 0 1 0 .024"
    />
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
SvgStar1.displayName = 'SvgStar1';
export default SvgStar1;
