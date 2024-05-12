import React, { useEffect } from "react";

interface FetchWeatherDataProps {
    setWeatherData: (data: any) => void;
    location: string;
    setError: (error: string | null) => void;
}
export default function FetchWeatherData({ setWeatherData, location, setError }: FetchWeatherDataProps) {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=58602036f88a4f79832120944241205&q=${location}`);
                if (!response.ok) {
                    setError('');
                    return;
                }
                const data = await response.json();
                setWeatherData(data);
                setError(null); // Clear the error message if the fetch operation is successful
            } catch (error) {
                 console.log(error);
            }
        };

        fetchData();
    }, [location]);

    return null;
}