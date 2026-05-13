import { cloneElement, forwardRef } from 'react';
import type { IconProps } from '../icon-config.js';
import { ICON_SIZE_MAP, STROKE_WIDTH_MAP } from '../icon-config.js';
export type { IconProps };
const ICON_NAME = 'chat-maze';
const SvgChatMaze = forwardRef<SVGSVGElement, IconProps>(
 ({ color = 'currentColor', size, strokeWidth, className, ...props }, ref) => {
  const element = (
   <svg
    height={800}
    width={800}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 60 60"
    xmlSpace="preserve"
    {...props}
   >
    <path d="M5 47h50c.6 0 1-.4 1-1V5c0-.6-.4-1-1-1H5c-.6 0-1 .4-1 1v41c0 .6.4 1 1 1zm9-41v4h2V6h13v15c0 .6.4 1 1 1h19v-2H31v-8h13c.6 0 1-.4 1-1V8h-2v2H31V6h23v20H43v2h11v17H15V33h6v7h2v-7h8v8c0 .6.4 1 1 1h17v-2H33v-7h14v-2h-9v-5c0-.6-.4-1-1-1h-9c-.6 0-1 .4-1 1v3h2v-2h7v4H14c-.6 0-1 .4-1 1v5H9v2h4v6H6V23h8c.6 0 1-.4 1-1v-5h-2v4H6v-6h15v13h2V14c0-.6-.4-1-1-1H6V6h8z" />
    <path d="M59 0H1C.4 0 0 .4 0 1v49c0 .6.4 1 1 1h34v8c0 .4.3.8.6.9.2.1.3.1.4.1.3 0 .6-.1.7-.3l7.7-8.7H59c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1zm-1 49.1H44c-.2 0-.5.1-.7.3l-6.3 7V50c0-.6-.4-1-1-1H2V2h56v47.1z" />
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
SvgChatMaze.displayName = 'SvgChatMaze';
export default SvgChatMaze;
