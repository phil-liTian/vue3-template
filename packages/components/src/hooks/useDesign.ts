

export function useDesign(scope: string) {
  const prefixCls = 'phil'
	return {
		prefixCls: `${prefixCls}-${scope}`,
    prefixVar: prefixCls
	}
}