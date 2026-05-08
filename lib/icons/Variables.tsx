import { cloneElement, forwardRef } from 'react';
import type { IconProps } from '../icon-config.js';
import { ICON_SIZE_MAP, STROKE_WIDTH_MAP } from '../icon-config.js';
export type { IconProps };
const ICON_NAME = 'variables';
const SvgVariables = forwardRef<SVGSVGElement, IconProps>(
 ({ color = 'currentColor', size, strokeWidth, className, ...props }, ref) => {
  const element = (
   <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
     d="M12.667 2h2v12h-2M3.333 14h-2V2h2M8.692 4.702a.774.774 0 0 0-.293-.27.85.85 0 0 0-.798 0 .774.774 0 0 0-.293.27l-3.2 5.187a.7.7 0 0 0-.001.74c.07.113.171.206.293.271.121.066.259.1.4.1h6.4a.85.85 0 0 0 .4-.1.773.773 0 0 0 .293-.27.7.7 0 0 0 0-.741l-3.2-5.187Z"
     stroke="inherit"
     strokeWidth={1.333}
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
SvgVariables.displayName = 'SvgVariables';
export default SvgVariables;
