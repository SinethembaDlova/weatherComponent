define(
    ['ojs/ojcore', 'knockout', 'jquery'], function (oj, ko, $, ace, monokai) {
    'use strict';

    function WeatherViewModel(context) {
        var self = this;
        var capeId;
        self.iconUrl = ko.observable()
        self.tempMeasure = ko.observable(55);
        self.description = ko.observable("");
        self.maxTemp = ko.observable(100);
        self.minTemp = ko.observable(0);

        self.currentCity = ko.observable(context.element.city);
        self.date = context.element.date;

        // self.currentCity = ko.pureComputed(function(){
        //     console.log('this value changed');
        // })
        // $.getJSON("js/components/weather-component/cape.json", function(results) {
        //   capeId = results[0].woeid;
        //   // console.log(capeId);
        // });

        // console.log(context.element.city);

        // var date = new Date();
        // var date2 = new Date(self.date);
        //
        // var difference = date2-date;
        //
        // var one_day = 1000*60*60*24;
        //
        // let theDay = Math.round(difference/one_day);

        //console.log(date);
        // api.openweathermap.org/data/2.5/forecast?q=
        var weatherState;
        $.getJSON("http://api.openweathermap.org/data/2.5/forecast?q=" +context.element.city+",ZA&units=metric&appid=ac3a98f79cf5e6236bf5c166a4aab756", function(results) {
          var getDays = results.list;
          var currentDay = {};
          var maxTemp = 0;
          var minTemp = 1000;

          getDays.forEach(function(day) {
            if (day.dt_txt.startsWith(self.date)) {
                if (day.main.temp_max > maxTemp) {
                  maxTemp = day.main.temp_max;
                }

                if (day.main.temp_min < minTemp) {
                  minTemp = day.main.temp_min;
                }

              if (day.dt_txt.startsWith(self.date)) {
                console.log(day)
                self.tempMeasure(day.main.temp.toFixed());
                self.maxTemp(maxTemp.toFixed());
                self.minTemp(minTemp.toFixed());
                self.description(day.weather[0].description)
                var icon = day.weather[0].icon+".png";
                var weatherState = "http://openweathermap.org/img/w/"+icon;
                var url = "url('" + weatherState + "')";
                self.iconUrl(url);
              }
            }
          })
          // var weatherState = currentDay.consolidated_weather[2].weather_state_abbr;


          // console.log(results.weather[0].icon);
        })
        //
        // self.city = ko.Computed(function(self.currentCity) {
        //     console.log(self.currentCity);
        // });
        //
        // function eventHandler(e) {
        //     self.currentCity(e);
        // }
    };

    return WeatherViewModel;
});
