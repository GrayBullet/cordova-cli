# Apache Cordova CLI
`cordova` command wrapper, use project local `cordova` package.


## Getting Started
Uninstall `cordova` package from global, before install`cordova-cli`

* Install: `npm install -g cordova-cli`

Create project.

```
$ mkdir app1 && cd $_
$ npm init . -y
$ npm install -D cordova
$ cordova create cordova
$ cordova platform add android
$ cordova build
```

When you use a specific version of cordova, run `npm install -D cordova@6.0.0`.


## Settings
### Sample
```
{
  "cordova-root": "cordova"
}
```


### Options
#### cordova-root
Cordova root directory. Default is '.'.


## LICENSE
MIT
