import UnoCSS from 'unocss/vite'

export const commonConfig = (mode: string) => ({
	server: {
		host: true,
		open: false,
	},

	esbuild: {
		drop: mode === 'production' ? ['console', 'debugger'] : [],
	},

	build: {
		// 启用/禁用对Gzip压缩后的文件大小的报告。对于较大的输出文件，压缩过程可能较慢，因此对于大型项目，禁用此功能可能会提高构建性能。
		reportCompressedSize: false,
		chunkSizeWarningLimit: 1500,
		rollupOptions: {
			// 限制在读取模块或写入块时并行打开的文件数量。
			maxParallelFileOps: 3,
		},
	},

	plugins: [UnoCSS()],
})
