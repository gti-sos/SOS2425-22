<svelte:head>
    <title>
        API externa 1
    </title>
</svelte:head>

<script>
    const API_KEY = 'b6f2e233fc2fa8a0a6a344709883f734'; // ¡Reemplaza con tu API key de OpenWeatherMap!
    
    // @ts-ignore
    function getWeather() {
      // @ts-ignore
      const city = document.getElementById('cityInput').value;
      if (!city) {
        alert('Por favor ingresa una ciudad');
        return;
      }

      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Ciudad no encontrada');
          }
          return response.json();
        })
        .then(data => {
          displayWeather(data);
        })
        .catch(error => {
          // @ts-ignore
          document.getElementById('weatherResult').innerHTML = `
            <p class="error">${error.message}</p>
          `;
        });
    }

    // @ts-ignore
    function displayWeather(data) {
      const { name, main, weather } = data;
      const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
      
      // @ts-ignore
      document.getElementById('weatherResult').innerHTML = `
        <h2>${name}</h2>
        <img src="${iconUrl}" alt="${weather[0].description}" class="weather-icon" />
        <p><strong>Temperatura:</strong> ${main.temp} °C</p>
        <p><strong>Humedad:</strong> ${main.humidity}%</p>
        <p><strong>Clima:</strong> ${weather[0].description}</p>
      `;
    }
</script>

<div class="container">
    <h1>Consulta el Clima</h1>
    <input type="text" id="cityInput" placeholder="Ingresa una ciudad (ej: Madrid)" />
    <button on:click={getWeather}>Buscar</button>
    
    <div id="weatherResult" class="weather-info">
      <!-- Aquí se mostrarán los datos del clima -->
    </div>
</div>

<style>
    body {
      font-family: 'Arial', sans-serif;
      background: #f0f2f5;
      margin: 0;
      padding: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }
    .container {
      background: white;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      padding: 20px;
      width: 300px;
      text-align: center;
    }
    h1 {
      color: #333;
      font-size: 24px;
    }
    input {
      width: 80%;
      padding: 10px;
      margin: 10px 0;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
    button {
      background: #007BFF;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
    }
    button:hover {
      background: #0056b3;
    }
    .weather-info {
      margin-top: 20px;
    }
    .weather-icon {
      width: 80px;
      height: 80px;
    }
    .error {
      color: red;
    }
</style>