const app = require("./app")

var fillAllCountries = function fillAllCountries(countries) {
    countries.forEach(
        country => { 
            if (country.name !== undefined && country.name !== null && country.name !== '') {
                if (country.region !== undefined && country.region !== null && country.region !== '') {
                    app.allCountries.push({"name":country.name, "region":country.region})
                }
                if (app.allRegions.hasOwnProperty(country.region)){
                    app.allRegions[country.region] += 1
                } else{
                    app.allRegions[country.region] = 1
                }
            }                         
        }
    )

    fillSalesRep()

    fillOptimal(countries)

}

var fillSalesRep = function fillSalesRep() {
    keysList = Object.keys(app.allRegions)
    keysList.forEach(
        key => {
            toPush = {}
            toPush["region"] = key
            toPush["minSalesReq"] = Math.ceil((app.allRegions[key] / 7))
            toPush["maxSalesReq"] = Math.ceil((app.allRegions[key] / 3))
            app.salesRep.push(toPush)
        } 
    )  
}

var fillOptimal = function fillOptimal(countries) {
    keysList = Object.keys(app.allRegions)
    keysList.forEach(
        key => { 
            helper={}
            countriesOfRegion = []
            helper["region"] = key
            for(i in countries){
                if (countries[i]["region"] === key){
                    countriesOfRegion.push(countries[i]["name"])
                }
            }
            
            toAdd = []
            i=0
            while (i<Math.ceil(app.allRegions[key] / 7)){
                toAdd.push([])
                i += 1
            }

            for (c in countriesOfRegion){
                toAdd[c % toAdd.length].push(countriesOfRegion[c])
            }

            helper["countryLists"] = toAdd            
            app.allMinPeopleCounts.push(helper)

            for (r in app.allMinPeopleCounts){
                var listoflists = app.allMinPeopleCounts[r]["countryLists"]
                for (e in listoflists){
                    mydoc = {}
                    mydoc["region"] = app.allMinPeopleCounts[r]["region"]
                    mydoc["countryList"] = listoflists[e]
                    mydoc["countryCount"] = listoflists[e].length
                    app.optimal.push(mydoc)
                }
            }            
        }
    )
}

exports.fillAllCountries = fillAllCountries
exports.fillSalesRep = fillSalesRep
exports.fillOptimal = fillOptimal