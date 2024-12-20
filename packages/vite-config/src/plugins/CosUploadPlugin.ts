// import fs from 'node:fs'
// import COS from 'cos-nodejs-sdk-v5'
// import * as TencentSDK from 'tencentcloud-sdk-nodejs'
// const CdnClient = TencentSDK.cdn.v20180606.Client

// const PLUGIN_NAME = 'BokaCOSUploadPlugin'

// function CosUpload(options = {}) {
// 	var config = Object.assign(
// 		{},
// 		{
// 			auth: {
// 				SecretId: '', // 在腾讯 COS 控制台获取
// 				SecretKey: '', // 在腾讯 COS 控制台获取
// 			},
// 			bucket: {
// 				name: 'zg-shboka-com-1253567392',
// 				region: 'ap-shanghai',
// 			},
// 			bucketDomain: 'https://zg.shboka.com', //静态资源域名
// 			uploadPath: '/', //静态资源目录
// 			// exclude: /.*\.html$/,
// 			exclude: /.*/,
// 			include: /.*/,
// 			reloadCDN: true,
// 		},
// 		options
// 	)

// 	// 初始化腾讯云 COS 客户端
// 	var client = new COS({
// 		SecretId: config.auth.SecretId,
// 		SecretKey: config.auth.SecretKey,
// 	})

// 	return {
// 		name: PLUGIN_NAME,
// 		async writeBundle(_option, bundles) {
// 			const files = Object.keys(bundles).filter((item) => {
// 				return !config.exclude.test(item) || config.include.test(item)
// 			})
// 			console.log('\nCOS 上传开始......')
// 			let { uploadPath, bucket, bucketDomain } = config

// 			let pList = []
// 			for (let file of files) {
// 				let p = new Promise((resolve, reject) => {
// 					let fileKey = `${uploadPath}${file}`
// 					client.putObject(
// 						{
// 							Bucket: bucket.name /* 填入您自己的存储桶，必须字段 */,
// 							Region:
// 								bucket.region /* 存储桶所在地域，例如 ap-beijing，必须字段 */,
// 							Key: fileKey /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */,
// 							/* 当 Body 为 stream 类型时，ContentLength 必传，否则 onProgress 不能返回正确的进度信息 */
// 							Body: fs.createReadStream(`./${_option.dir}${file}`), // 上传文件对象
// 						},
// 						function (err, data) {
// 							// console.log(`${fileKey} 上传完毕`);
// 							if (err) {
// 								reject(err)
// 							} else {
// 								resolve(data)
// 							}
// 						}
// 					)
// 				})
// 				// @ts-ignore
// 				pList.push(p)
// 			}
// 			//全部上传完成之后再回调
// 			try {
// 				let resList = await Promise.all(pList)
// 				console.log('\n')
// 				console.log(
// 					'COS 上传成功',
// 					resList.map((item) => {
// 						// @ts-ignore
// 						return item.Location
// 					})
// 				)
// 				console.log('\n')
// 			} catch (err) {
// 				console.log('\n')
// 				console.error('COS 上传出错', err)
// 				console.log('\n')
// 			}

// 			if (config.reloadCDN) {
// 				let cdnClient = new CdnClient({
// 					/* 为了保护密钥安全，建议将密钥设置在环境变量中或者配置文件中，请参考本文凭证管理章节。
//              硬编码密钥到代码中有可能随代码泄露而暴露，有安全隐患，并不推荐。 */
// 					credential: {
// 						secretId: config.auth.SecretId, // 在腾讯 COS 控制台获取
// 						secretKey: config.auth.SecretKey, // 在腾讯 COS 控制台获取
// 					},
// 					// 产品地域
// 					region: bucket.region,
// 				})

// 				//刷新 CDN
// 				// eslint-disable-next-line new-cap
// 				cdnClient
// 					.PurgePathCache({
// 						Paths: [bucketDomain + '/'],
// 						FlushType: 'delete',
// 					})
// 					.then(
// 						(data) => {
// 							console.log('\nCDN 刷新完成')
// 							console.log(data)
// 							console.log('\n')
// 						},
// 						(err) => {
// 							console.log('\n')
// 							console.error('CDN 刷新出错', err)
// 							console.log('\n')
// 						}
// 					)
// 			}
// 		},
// 	}
// }

// export default CosUpload
