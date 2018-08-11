# Netlify function zips&nbsp;&nbsp;&nbsp;<a href="https://app.netlify.com/start/deploy?repository=https://github.com/DavidWells/function-zips"><img src="https://www.netlify.com/img/deploy/button.svg"></a>

1. Create a functions folder

	```bash
	mkdir functions
	```

2. Create a sub folder with a function and a `package.json` file with its dependancies

	The function (right now) needs to have the same name as the folder that contains it.

	Like so: `/functions/one/one.js`

	```
  /functions
	  /one
	    one.js <-- function code
	    package.json <-- function dependencies
	```

3. Configure your build directory for functions in netlify.toml

		```toml
		# netlify.toml file
		[build]
	  	command = "npm run build"
	  	publish = "build" # <-- Frontend build dir
	  	functions = "functions-build" # <-- Functions build dir
		```

4. During your build, Zip up the function and dependancies and place in functions dist folder `functions-build`


## Future Plans

We are working on streamlining the zips based function flow with a single CLI command!
