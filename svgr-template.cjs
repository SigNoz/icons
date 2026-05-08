module.exports = function template(variables, { tpl }) {
 const baseName = String(variables.componentName).replace(/^Svg/, '');
 const defaultAriaLabel = baseName
  .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
  .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
  .replace(/([A-Za-z])(\d)/g, '$1-$2')
  .toLowerCase();

 return tpl`
    import { cloneElement, forwardRef } from 'react';
    import type { IconProps } from '../icon-config.js';
    import { ICON_SIZE_MAP, STROKE_WIDTH_MAP } from '../icon-config.js';

    export type { IconProps };

    const ICON_NAME = '${defaultAriaLabel}';

    const ${variables.componentName} = forwardRef<SVGSVGElement, IconProps>(({
      color = 'currentColor',
      size,
      strokeWidth,
      className,
      ...props
    }, ref) => {
      const element = ${variables.jsx};
      const hasViewBox = element.props.viewBox != null;
      const isCustomIcon = element.props['data-custom-icon'] === 'true';
      const defaultSize = isCustomIcon ? element.props.width : ICON_SIZE_MAP.xs;
      const resolvedSize =
        size != null
          ? typeof size === 'number'
            ? size
            : ICON_SIZE_MAP[size]
          : defaultSize;
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
      const viewBoxWhenMissing = \`0 0 \${w} \${h}\`;

      const isHidden = props['aria-hidden'] === true || props['aria-hidden'] === 'true';
      const a11yProps = isHidden
        ? { focusable: 'false' }
        : {
            role: props.role ?? 'img',
            'aria-label': props['aria-label'] ?? ICON_NAME,
            focusable: 'false',
          };

      const baseClassName = \`signoz-icon signoz-icon-\${ICON_NAME}\`;
      const elementProps = {
        ...props,
        ...a11yProps,
        ref,
        className: className ? \`\${baseClassName} \${className}\` : baseClassName,
        ...(!isCustomIcon && { stroke: color, strokeWidth: resolvedStrokeWidth }),
        ...(!isCustomIcon && !hasViewBox && { viewBox: viewBoxWhenMissing }),
        ...(isCustomIcon && { style: { color, ...props.style }, viewBox: viewBoxWhenMissing }),
        width: resolvedSize,
        height: resolvedSize,
      };

      return cloneElement(element, elementProps);
    });

    ${variables.componentName}.displayName = '${variables.componentName}';

    export default ${variables.componentName};
  `;
};
