<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <h3>#INstall React</h3>
    <hr>
    <pre><b>
        composer require laravel/ui
        //
        php artisan ui react
        //
        npm install && npm run debr 
    </b></pre>
    <br>
    <h5>In Blade File</h5>
    <p><b>In Header,</b></p>
    <pre><b>
        <link href="/css/app.css" rel="stylesheet">
    </b></pre>
    <p><b>In Body,</b></p>
    <pre><b>
        <div id="example"></div>
        <script src="/js/app.js"></script>
    </b></pre>
        <hr>
    <h4>Change the structure as React Index.js and App.js structure</h4>
    <p><b>Example.js will be renamed as Index.js</b></p>
    <pre><b>
        import React from 'react';
        import App from './App';
        import ReactDOM from 'react-dom';
        //
        //
        if (document.getElementById('root')) {
            ReactDOM.render(<App />, document.getElementById('root'));
        }
    </b></pre>
    <br>
    <p><b>App.js Will be like this</b></p>
    <pre><b>
        import React, { Component } from "react";
        class App extends Component {
            render() {
                return (
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <div className="card">
                                    <div className="card-header">App Component</div>
                                    <div className="card-body">I am ready to start</div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
        }
        export default App;
    </b></pre>
</body>

</html>
