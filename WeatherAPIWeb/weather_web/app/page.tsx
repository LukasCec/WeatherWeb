'use client';
import React, { useState } from "react";
import FetchWeatherData from "../components/FetchWeatherData";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { useDebouncedCallback } from 'use-debounce';

export default function Home() {
    interface WeatherData {
        current: {
            temp_c: number;
            wind_kph: number;
            wind_dir: string;
            pressure_mb: number;
            humidity: number;
            condition: {
                icon: string;
            };
        };
        location: {
            name: string;
            country: string;
        };
    }


    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [location, setLocation] = useState<string>("");
    const [shouldFetch, setShouldFetch] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isSearching, setIsSearching] = useState<boolean>(true);

    const debouncedHandleSearch = useDebouncedCallback(() => {
        if (location.trim() !== "") {
            setShouldFetch(true);
        } else {
            setIsSearching(false); // Set isSearching to false if the input is empty
        }
    }, 400);

    return (

        <div className="flex justify-center items-center  h-full">
            <BackgroundGradientAnimation>
                <div className="main--div min-h-[600px] md:mt-32 lg:mt-32 mx-auto md:min-h-[400px] lg:min-h-[500px] xl:min-h-[600px] duration-300 bg-gray-500 p-10 md:p-5 lg:p-7 xl:p-10 rounded-2xl  md:w-1/3 lg:w-1/4 backdrop-blur-md backdrop-filter bg-opacity-20 shadow-lg">
                <div className="group relative" onClick={() => document.getElementById("search-input")?.focus()}>
                    <input
                        id="search-input"
                        className="group-hover:scale-105 md:group-hover:scale-100 duration-300 text-gray-300 bg-gray-400 mb-5 p-4 md:p-3 rounded-2xl backdrop-blur-md backdrop-filter bg-opacity-20 z-50 w-full"
                        value={location}
                        onChange={e => {
                            setLocation(e.target.value);
                            debouncedHandleSearch();
                        }}
                        placeholder="Address, City or Zip Code"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="group-hover:scale-110 duration-300 w-6 h-6 absolute top-1/2 right-3 transform -translate-y-[21px]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </div>
                {isSearching && !weatherData && (
                    <div className="flex flex-col justify-center duration-300 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-52 h-52 text-gray-500">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM8.547 4.505a8.25 8.25 0 1 0 11.672 8.214l-.46-.46a2.252 2.252 0 0 1-.422-.586l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.211.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.654-.261a2.25 2.25 0 0 1-1.384-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.279-2.132Z" clipRule="evenodd" />
                        </svg>
                        <div className="text-center text-gray-500 mt-3">
                            <p>Enter a location to get the weather</p>
                        </div>
                    </div>
                )}

                {shouldFetch && location && (
                    <FetchWeatherData
                        setWeatherData={(data) => {
                            setWeatherData(data);
                            setIsSearching(false); // Set isSearching to false when data is fetched
                        }}
                        location={location}
                        setError={setError}
                    />
                )}
                {weatherData && (
                    <div className="flex justify-center">
                        <img
                            src={weatherData.current.condition.icon}
                            alt="Weather icon"
                        />
                    </div>
                )}
                {weatherData && (
                    <>
                        <p className="text-center text-3xl">
                            {weatherData.location.name}
                        </p>
                        <p className="text-center">
                            {weatherData.location.country}
                        </p>
                        <p className="text-center bg text-3xl">
                            {weatherData.current.temp_c}°C
                        </p>
                    </>
                )}
                {weatherData && (
                    <div className="flex justify-between mt-3">
                        <div className="wind-speed mr-3  p-3 rounded-2xl backdrop-blur-md backdrop-filter bg-opacity-20 bg-gray-900">
                            <p>Wind Speed</p>
                            <p className="text-lg">{weatherData.current.wind_kph}km/h</p>
                        </div>
                        <div className="wind-direc p-3 rounded-2xl backdrop-blur-md backdrop-filter bg-opacity-20 bg-gray-900">
                            <p>Wind Direction</p>
                            <p className="text-lg">{weatherData.current.wind_dir}</p>
                        </div>
                    </div>
                )}
                {weatherData && (
                    <div className="w-full mt-3">
                        <div className="wind-speed mb-3 p-3 rounded-2xl backdrop-blur-md backdrop-filter bg-opacity-20 bg-gray-900">
                            <p>Pressure</p>
                            <p className="text-lg">{weatherData.current.pressure_mb} hPa</p>
                        </div>
                        <div className="wind-direc p-3 rounded-2xl backdrop-blur-md backdrop-filter bg-opacity-20 bg-gray-900">
                            <p>Humidity</p>
                            <p className="text-lg">{weatherData.current.humidity}%</p>
                        </div>
                    </div>
                )}
            </div>

            {error && <p>{error}</p>}
            </BackgroundGradientAnimation>
        </div>

    );
}
