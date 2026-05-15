import { cloneElement, forwardRef } from 'react';
import type { IconProps } from '../icon-config.js';
import { ICON_SIZE_MAP, STROKE_WIDTH_MAP } from '../icon-config.js';

export type { IconProps };

const ICON_NAME = 'atom';
const SvgAtom = forwardRef<SVGSVGElement, IconProps>(
 ({ color = 'currentColor', size, strokeWidth, className, ...props }, ref) => {
  const element = (
   <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" {...props}>
    <path
     stroke="inherit"
     strokeLinecap="round"
     strokeLinejoin="round"
     strokeWidth={1.33}
     d="M8 8.667a.667.667 0 1 0 0-1.334.667.667 0 0 0 0 1.334"
    />
    <path
     stroke="inherit"
     strokeLinecap="round"
     strokeLinejoin="round"
     strokeWidth={1.33}
     d="M13.467 13.467c1.36-1.354.013-4.907-3-7.934-3.027-3.013-6.58-4.36-7.934-3-1.36 1.354-.013 4.907 3 7.934 3.027 3.013 6.58 4.36 7.934 3"
    />
    <path
     stroke="inherit"
     strokeLinecap="round"
     strokeLinejoin="round"
     strokeWidth={1.33}
     d="M10.467 10.467c3.013-3.027 4.36-6.58 3-7.934-1.354-1.36-4.907-.013-7.934 3-3.013 3.027-4.36 6.58-3 7.934 1.354 1.36 4.907.013 7.934-3"
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
SvgAtom.displayName = 'SvgAtom';
export default SvgAtom;
