const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');


module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"],
        plugins: [new TsconfigPathsPlugin({/* options: see below */ })]

    },

    module: {
        rules: [
            // // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            // { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            // { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
            {
                test: /\.tsx?$/,
                loader: require.resolve('ts-loader'),
                exclude: /node_modules/,
                options: {
                    compiler: 'ttypescript',
                    configFile: 'tsconfig.prod.json',
                },
            },
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
};
