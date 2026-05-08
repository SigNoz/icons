import { cloneElement, forwardRef } from 'react';
import type { IconProps } from '../icon-config.js';
import { ICON_SIZE_MAP, STROKE_WIDTH_MAP } from '../icon-config.js';
export type { IconProps };
const ICON_NAME = 'tractor';
const SvgTractor = forwardRef<SVGSVGElement, IconProps>(
 ({ color = 'currentColor', size, strokeWidth, className, ...props }, ref) => {
  const element = (
   <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
     d="m6.666 7.333 7.334.6a.667.667 0 0 1 .533.734l-.443 2.772a.667.667 0 0 1-.659.561h-.098m0 0a1.333 1.333 0 1 1-2.667 0m2.667 0a1.333 1.333 0 1 0-2.667 0m0 0H7.333M12 3.333a.667.667 0 0 0-.667.667v3.715M2 2.667h5.419a.667.667 0 0 1 .66.575l.587 4.255m-6-.164V2.667m2 7.333h.007m.66-3.267V2.667M8 10a3.333 3.333 0 1 1-6.667 0A3.333 3.333 0 0 1 8 10Z"
     stroke="inherit"
     strokeWidth={1.33}
     strokeLinecap="round"
     strokeLinejoin="round"
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
SvgTractor.displayName = 'SvgTractor';
export default SvgTractor;
