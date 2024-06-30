const path = require('path');
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");

const publicFolder = "./src/public";
const jsPath = "./src/public/js/";
const publicRoutes = "./src/public/js/routes/";

module.exports = {
	devtool: "source-map",
	mode: "development",
	entry: {
		auth_create_account: {
			import: [
				`${publicRoutes}auth/create_account.js`
			],
			filename: "js/routes/auth/create_account.js"
		},
		job_create: {
			import: [
				`${publicRoutes}job/create.js`
			],
			filename: "js/routes/job/create.js"
		},
		job_edit: {
			import: [
                `${publicRoutes}job/edit.js`
            ],
            filename: "js/routes/job/edit.js"
		},
		job_delete: {
			import: [
                `${publicRoutes}job/delete.js`
			],
			filename: "js/routes/job/delete.js",
		}
	},
    module: {
        rules: [
            {
                // Load css files
                test: /\.css$/,
                use: "css-loader"
            }, {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
			{
                test: /\.js$/,
                // test: /\.(?:js|mjs|cjs)$/,
                exclude: /node_modules/,
                include: [
                    path.resolve(__dirname, "src/public")
                ],
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                        ]
                    }
                }
            }, {
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            }
        ]
    },
    output: {
        // filename: "[name].js",
        path: path.resolve("public"),
        // Deletes property images 😭😭
        // clean: true,
        assetModuleFilename: '[name][ext]'
    },
    plugins: [
        // new CopyPlugin({
        //     patterns: [
        //         { from: "src/public/image", to: "image" }
        //     ]
        // })
    ]
};
