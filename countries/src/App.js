import axios from 'axios'
import { useState, useEffect } from 'react'
import React from 'react'


const App = () => {

  const [countryList, setCountryList] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState()




  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountryList(response.data)
      })


  }



  useEffect(hook, [])

  const handleSetFilter = (event) => {
    console.log(event.target.value)
    setSearchTerm(event.target.value)
  }



  const WeatherDisplay = ({ lat, lng }) => {
    const [weatherData, setWeather] = useState([])
    console.log('%cApp.js line:37 lat, lng', 'color: #007acc;', lat, lng);
    const hook2 = () => {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=cc76bb943e6b3254cef79ff11e899572`)
        .then(response => {
          setWeather(response.data)
        }
        )
    }
    useEffect((hook2), [])
    return (
      <>
        <div>
          <p>temperature {weatherData?.main?.temp} celcius </p>
          <img src = {"http://openweathermap.org/img/wn/" + (weatherData.weather && weatherData.weather[0].icon ) + ("@2x.png")} 
          alt = 'new'/>
          <p>wind {weatherData?.wind?.speed} m/s</p>
        </div>

      </>
    )



  }

  const SearchResultRow = (countrySearchResult) =>
    <li key={countrySearchResult.id}>
      {countrySearchResult.name.common} <button onClick={(() => setSelectedCountry(countrySearchResult))} type="button">Show</button>
    </li>

  const SearchResults = ({ countryList, searchTerm } /* props */) => {
    console.log("countryList:", countryList)
    const filteredCountries = countryList.filter((c) =>
      c.name.common.toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        )
    )

    if (filteredCountries.length > 10)
      return (<li>Too maany matches, specify another filter</li>)

    if (filteredCountries.length > 1)
      return (
        filteredCountries.map((countrySearchResult) => SearchResultRow(countrySearchResult))
      )

    if (filteredCountries.length === 1)
      setSelectedCountry(filteredCountries[0])
  }

  const CountryDetails = ({ countryData }) => {
    console.log("countryData:", countryData)
    console.log('%cApp.js line:80 countryData.latlng[0]', 'color: #007acc;', Math.round(countryData.latlng[0]));
    console.log('%cApp.js line:81 countryData.latlng[1]', 'color: #007acc;', Math.round(countryData.latlng[1]));
    return (

      <>
        <h1>{countryData.name.common}</h1>
        <br></br>
        <p>{countryData.capital}</p>
        <p>{countryData.area}</p>
        <h3>Languages</h3>
        <ul>
          {Object.values(countryData.languages).map((language) => <li key={JSON.stringify(language)}><p>{JSON.stringify(language)}</p></li>)}
        </ul>
        <img src={countryData.flags.png} alt="country flag"></img>
        <div>
          <h1>Weather in {countryData.name.common}</h1>
          {<WeatherDisplay lat={Math.round(countryData.latlng[0])} lng={Math.round(countryData.latlng[1])} />}
        </div>
      </>
    )
  }


  return (
    <>
      <form>
        <div>find countries <input value={searchTerm} onChange={handleSetFilter} /></div>
        <div>
          {selectedCountry ? <CountryDetails countryData={selectedCountry} /> : <SearchResults countryList={countryList} searchTerm={searchTerm} />}
        </div>
      </form>
    </>
  )
}

export default App;
