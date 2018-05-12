# NextBus VIZ D3 App
D3 app.  App made for the Web Development CS at University of Los Andes - Bogotá, Colombia2018-1

## How to Use the App
Select one agency from the list and you will see an stack bar chart.
Login with your Google account, select any route from one Agency and add any comment about that single route.

# Running the app

Follow this instructions to run the app locally. 
Or, if you don´t feel to install it locally you can play in this URL: https://nextbusviz.herokuapp.com


## Prerequisites
```
Node JS
Meteor
Git
```

Clone or download the project and from the git master branch:
```
git clone
cd d3BoilerPlate
meteor npm install
meteor
```
Then open your browser on http://localhost:3000

## Data Profiling
All data is extracted from [NextBus](http://www.nextbus.com) [API](https://gist.github.com/grantland/7cf4097dd9cdf0dfed14).
The data profiling was made with [John Guerra's implementation](https://beta.observablehq.com/@john-guerra/d3-stack-with-d3-nest) but the code was fixed in the distance per route tuple calculation:
```
for (let route of this.nestedBuses) {
                route.total = 0;
                for (let i = 0; i < route.values.length; i++) {
                    if (route.values.length === 1)
                        route.values[i].distance = 0;
                    if (i < route.values.length - 1) {
                        route.values[i].distance = this.getDistance(+route.values[i].lat, +route.values[i].lon,
                            +route.values[i + 1].lat, +route.values[i + 1].lon);
                    }
                    else if (!i < route.values.length - 1) {
                        route.values[i].distance = this.getDistance(+route.values[i].lat, +route.values[i].lon,
                            +route.values[i - 1].lat, +route.values[i - 1].lon);
                    }
                    route.total += route.values[i].distance;
                }
                route.values = route.values.sort((a,b)=>a.distance-b.distance);

            }
```
Also at the end of each route iteration, the distance is sort in order to make the Viz according to the data profiling.
```
route.values = route.values.sort((a,b)=>a.distance-b.distance);
```
## Built With

* [Meteor](https://www.meteor.com)
* [D3](https://d3js.org)
* [Node JS](https://nodejs.org/es) 
* [Mongo DB](https://www.mongodb.com/es) 
* [React JS](https://facebook.github.io/react/) 
* [Heroku](https://www.heroku.com/platform) 
* CSS
* HTML

## Authors

* **[Camilo Montenegro](https://github.com/ca-montenegro)**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
