module.exports = function(grunt){
	//
	require('time-grunt')(grunt);
	'use strict';
	grunt.initConfig({
		//检查css语法
		csslint:{
			src:['css/*.css']
		},
		//检查js文件中的语法
		jshint:{
			all:['js/*.js']
		},
		//复制task
		copy: {
			options: {
				separator : ';'
			},
			main:{
				files:[ 
					{
						/*启用下面*/
						expand:true,
						/*相对于src目录*/
						cwd:'app/',
						src:['*.html'],
						dest:'dist'
					},
					{
						expand:true,
						cwd:'app/image/',
						src:['*'],
						dest:'dist/image'
					}
				]
			} 
		},
		//清除目录下的文件
		clean:{
			src:'dist/'
		},
		//文件合并
		concat:{
			options:{
				/*文件合并，添加分割符*/
				separator:';',
				stripBanners: true
			},
			js:{
				src:[
					'app/js/index.js','app/js/main.js'
				],
				dest:'dist/js/main.js'
			},
			css:{
				src:[
					'app/css/header.css','app/css/style.css'
				],
				dest:'dist/css/main.css'
			}
		},
		
		//js文件压缩
		uglify:{
			dist:{
				files:{
					'dist/js/m.min.js':['<%=concat.js.dest %>']//引用concat下的合并js文件
				}
			},
            minjs: { //最小化、混淆所有 js/ 目录下的 JavaScript 文件
                files: [{
                    expand: true,
                    cwd: 'app/js/',
                    src: ['*.js', '!*.min.js'],
                    dest: 'dist/js/',
                    ext: '.min.js'
                }]
            }
		},
		//css压缩
		cssmin:{
			options:{
				keepSpecialComments:0/*移除css文件中的所有注释*/
			},
			minify:{
				expand:true,
				cwd:'dist/css/',
				src:['main.css'],
				dest:'dist/css/',
				ext:'.min.css',
			}
		},
		useminPrepare: {
  			html: 'index.html'
		},
		//根据html中的注释，替换其中的js、css文件，换成合并压缩后的js、css文件
		usemin:{
			html:'dist/*.html'
		},
	
	});
	//加载任务
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-usemin');

	//注册任务
	grunt.registerTask('default',['copy','concat','uglify','cssmin','usemin']);
	grunt.registerTask('test',['clean']);
}